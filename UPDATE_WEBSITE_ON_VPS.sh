#!/bin/bash
set -e

echo "======================================================================"
echo "🚀 BFS CIRCLE - UPDATE MAIN WEBSITE (bfsfin.com) ON VPS"
echo "======================================================================"

# Step 1: Find Website Directory
WEB_DIR=""
for candidate in "/var/www/bfsfin" "/var/www/bfsfin.com" "/var/www/bfs" "/var/www/website" "/var/www/frontend" "/var/www/main" "/var/www/client"; do
    if [ -d "$candidate" ] && [ -f "$candidate/package.json" ]; then
        WEB_DIR="$candidate"
        break
    fi
done

if [ -z "$WEB_DIR" ]; then
    # Search PM2 for running bfsfin process cwd
    if command -v pm2 &> /dev/null; then
        PM2_CWD=$(pm2 jlist | grep -o '"pm_cwd":"[^"]*"' | grep -v 'crm' | head -n 1 | cut -d'"' -f4 || true)
        if [ -n "$PM2_CWD" ] && [ -d "$PM2_CWD" ]; then
            WEB_DIR="$PM2_CWD"
        fi
    fi
fi

if [ -z "$WEB_DIR" ]; then
    echo "❌ Error: Could not locate main website directory on VPS."
    exit 1
fi

echo "📂 Found website directory: $WEB_DIR"
cd "$WEB_DIR"

echo ""
echo "📥 1/4: Pulling latest changes from GitHub (master)..."
git fetch origin
git checkout master || true
git pull origin master

echo ""
echo "📦 2/4: Generating Prisma Client..."
npx prisma generate || true

echo ""
echo "🔨 3/4: Building Next.js for Production..."
npm run build

echo ""
echo "🔄 4/4: Restarting Main Website in PM2 (Port 3000)..."
if pm2 describe bfsfin > /dev/null 2>&1; then
    pm2 restart bfsfin
elif pm2 describe bfs-main > /dev/null 2>&1; then
    pm2 restart bfs-main
elif pm2 describe website > /dev/null 2>&1; then
    pm2 restart website
else
    PORT=3000 pm2 start npm --name "bfsfin" -- start -- -p 3000
fi
pm2 save

echo ""
echo "======================================================================"
echo "🧪 Verification of bfsfin.com..."
echo "======================================================================"
sleep 3
HTTP_LOCAL=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/ || true)
HTTP_PUBLIC=$(curl -s -o /dev/null -w "%{http_code}" https://bfsfin.com/ || true)

echo "Local (Port 3000) : HTTP $HTTP_LOCAL"
echo "Public Website    : HTTP $HTTP_PUBLIC"
echo ""
pm2 list
echo ""
echo "======================================================================"
echo "🎉 BFSFIN.COM UPDATED AND DEPLOYED SUCCESSFULLY!"
echo "======================================================================"
