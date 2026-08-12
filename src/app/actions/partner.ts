'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This Server Action fetches real database data for the Partner's Earnings Dashboard
export async function getPartnerEarnings() {
  try {
    // 1. Fetch the mock partner by email (Since we don't have real auth yet)
    const user = await prisma.user.findUnique({
      where: { email: 'john@doerealestate.com' },
      include: {
        partnerProfile: true,
      }
    });

    if (!user) {
      throw new Error('Partner user not found in database.');
    }

    // 2. Fetch all payouts for this partner
    const payouts = await prisma.payout.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
    });

    // 3. Calculate total withdrawn
    const totalWithdrawn = payouts
      .filter(p => p.status === 'Completed')
      .reduce((sum, p) => sum + p.amount, 0);

    // 4. Format data for the frontend
    const formattedPayouts = payouts.map(p => ({
      id: p.id.substring(0, 8).toUpperCase(), // Mock short TX ID
      date: p.date.toISOString(),
      amount: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p.amount),
      status: p.status,
      bankAccount: user.partnerProfile?.accountNumber || '****',
      leadName: p.leadName || 'Unknown Lead',
    }));

    return {
      success: true,
      data: {
        totalWithdrawn: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalWithdrawn),
        bankAccount: user.partnerProfile?.accountNumber,
        payoutHistory: formattedPayouts,
      }
    };
  } catch (error: any) {
    console.error('Error fetching partner earnings:', error);
    return { success: false, error: error.message };
  }
}

// Fetches leads for the Partner Dashboard with pagination and search
export async function getPartnerLeads(page: number = 1, limit: number = 5, search: string = '') {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'john@doerealestate.com' },
    });

    if (!user) throw new Error('Partner user not found.');

    const skip = (page - 1) * limit;

    const whereClause: any = {
      userId: user.id,
    };

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { id: { contains: search } } // SQLite UUIDs can be searched this way
      ];
    }

    const [leads, totalCount] = await Promise.all([
      prisma.lead.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.lead.count({ where: whereClause })
    ]);

    const formattedLeads = leads.map(l => ({
      id: `LD-${l.id.substring(0, 4).toUpperCase()}`,
      realId: l.id,
      name: l.name,
      phone: l.phone,
      loanType: l.loanType,
      amount: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(l.loanAmount),
      status: l.status.replace('_', ' '), // Fix PENDING_DOCS -> PENDING DOCS
      date: l.createdAt.toISOString(),
    }));

    return {
      success: true,
      data: {
        leads: formattedLeads,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page
      }
    };

  } catch (error: any) {
    console.error('Error fetching partner leads:', error);
    return { success: false, error: error.message };
  }
}

// Phase 2: Fetches the Partner's Network (Sub-Partners)
export async function getPartnerNetwork() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'john@doerealestate.com' },
    });
    if (!user) throw new Error('Partner not found');

    const subPartners = await prisma.user.findMany({
      where: { referredById: user.id },
      include: {
        partnerProfile: true,
        payouts: true,
      }
    });

    const network = subPartners.map(sp => {
      const totalEarnings = sp.payouts.reduce((sum, p) => sum + p.amount, 0);
      return {
        id: sp.id,
        name: sp.name,
        joinDate: sp.createdAt.toISOString(),
        tier: sp.partnerProfile?.tier || 'Silver',
        activeLeads: Math.floor(Math.random() * 15), // Mock active leads for now
        totalEarnings: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalEarnings)
      };
    });

    return { success: true, data: network };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Phase 2: Fetches the Global Leaderboard
export async function getLeaderboard() {
  try {
    const allProfiles = await prisma.rewardProfile.findMany({
      include: {
        user: {
          include: { partnerProfile: true }
        }
      },
      orderBy: { totalPoints: 'desc' },
      take: 10
    });

    const leaderboard = allProfiles.map((p, index) => ({
      rank: index + 1,
      name: p.user.name,
      tier: p.user.partnerProfile?.tier || 'Silver',
      points: p.totalPoints,
      isCurrentUser: p.user.email === 'john@doerealestate.com'
    }));

    return { success: true, data: leaderboard };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Phase 2: Fetches Rewards Profile
export async function getPartnerRewards() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'john@doerealestate.com' },
      include: { rewardProfile: true }
    });
    if (!user) throw new Error('Partner not found');

    return { 
      success: true, 
      data: {
        rank: user.rewardProfile?.rank || 0,
        totalPoints: user.rewardProfile?.totalPoints || 0,
        badges: user.rewardProfile?.badges ? JSON.parse(user.rewardProfile.badges) : []
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Fetch Dynamic Reward Targets
export async function getRewardTargets() {
  try {
    const targets = await prisma.rewardTarget.findMany({
      where: { isActive: true },
      orderBy: { targetValue: 'asc' }
    });
    return { success: true, data: targets };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Claim a Reward
export async function claimReward(rewardId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'john@doerealestate.com' }
    });
    if (!user) throw new Error('Partner not found');

    // Check if already claimed
    const existingClaim = await prisma.rewardClaim.findFirst({
      where: { userId: user.id, rewardId }
    });

    if (existingClaim) {
      return { success: false, error: 'You have already claimed this reward.' };
    }

    const claim = await prisma.rewardClaim.create({
      data: {
        userId: user.id,
        rewardId
      }
    });

    return { success: true, data: claim };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Fetch Marketing Assets available to this partner
export async function getPartnerMarketingAssets() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'john@doerealestate.com' }
    });
    if (!user) throw new Error('Partner not found');

    const assets = await prisma.marketingAsset.findMany({
      where: {
        OR: [
          { userId: null }, // Global assets
          { userId: user.id } // Partner specific assets
        ],
        fileType: { in: ['JPG', 'PNG'] } // Only images for the Studio
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return { success: true, data: { assets, partner: user } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
