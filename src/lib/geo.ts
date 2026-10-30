/**
 * BFS Geolocation & Address Resolver
 * Resolves Client IP or Coordinates to Detailed City, State, Country & Google Maps URL
 * High-concurrency optimized with Cloudflare Edge Headers & In-Memory IP Caching.
 */

export interface GeoLocationResult {
  ip: string;
  city: string;
  region: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  mapsUrl: string;
  fullAddress: string;
}

// In-memory cache for IP locations (TTL: 1 hour, Max 5000 items)
const ipCache = new Map<string, { result: GeoLocationResult; expiresAt: number }>();

export async function resolveClientLocation(req: Request, clientLat?: number, clientLng?: number): Promise<GeoLocationResult> {
  const forwarded = req.headers.get("x-forwarded-for");
  let ip = forwarded ? forwarded.split(",")[0].trim() : "";
  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    ip = req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || "127.0.0.1";
  }

  // 1. If precise GPS coordinates supplied from browser
  if (clientLat && clientLng && !isNaN(clientLat) && !isNaN(clientLng)) {
    const mapsUrl = `https://www.google.com/maps?q=${clientLat},${clientLng}`;
    return {
      ip,
      city: "GPS Location",
      region: "",
      country: "India",
      latitude: clientLat,
      longitude: clientLng,
      mapsUrl,
      fullAddress: `GPS Coordinates: ${clientLat.toFixed(5)}, ${clientLng.toFixed(5)} (${mapsUrl})`
    };
  }

  // 2. High-speed Cloudflare Edge Headers (0ms latency, zero external network calls)
  const cfCity = req.headers.get("cf-ipcity");
  const cfRegion = req.headers.get("cf-region") || req.headers.get("cf-region-code");
  const cfCountry = req.headers.get("cf-ipcountry");
  const cfLat = req.headers.get("cf-iplatitude");
  const cfLng = req.headers.get("cf-iplongitude");

  if (cfCity || cfCountry) {
    const city = cfCity ? decodeURIComponent(cfCity) : "Agra";
    const region = cfRegion ? decodeURIComponent(cfRegion) : "Uttar Pradesh";
    const country = cfCountry || "India";
    const lat = cfLat ? parseFloat(cfLat) : null;
    const lng = cfLng ? parseFloat(cfLng) : null;
    const mapsUrl = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : `https://www.google.com/maps/search/${encodeURIComponent(city + ", " + region + ", " + country)}`;

    return {
      ip,
      city,
      region,
      country,
      latitude: lat,
      longitude: lng,
      mapsUrl,
      fullAddress: `${city}, ${region}, ${country} [IP: ${ip}]`
    };
  }

  // 3. Check In-Memory IP Cache
  const now = Date.now();
  const cached = ipCache.get(ip);
  if (cached && cached.expiresAt > now) {
    return cached.result;
  }

  // 4. Localhost fallback
  if (ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    const localResult: GeoLocationResult = {
      ip: ip || "Localhost",
      city: "Agra",
      region: "Uttar Pradesh",
      country: "India",
      latitude: 27.1767,
      longitude: 78.0081,
      mapsUrl: "https://www.google.com/maps?q=27.1767,78.0081",
      fullAddress: "Agra, Uttar Pradesh, India (Localhost Test IP)"
    };
    ipCache.set(ip, { result: localResult, expiresAt: now + 3600 * 1000 });
    return localResult;
  }

  // 5. Fast Resolve Public IP via external lookup (with strict 1.5s timeout)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: controller.signal,
      headers: { "User-Agent": "BFS-Agra-Portal/1.0" }
    });
    clearTimeout(timeoutId);

    if (geoRes.ok) {
      const geoData = await geoRes.json();
      const city = geoData.city || "Agra";
      const region = geoData.region || "Uttar Pradesh";
      const country = geoData.country_name || "India";
      const lat = geoData.latitude || null;
      const lng = geoData.longitude || null;
      const mapsUrl = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : `https://www.google.com/maps/search/${encodeURIComponent(city + ", " + region + ", " + country)}`;
      
      const res: GeoLocationResult = {
        ip,
        city,
        region,
        country,
        latitude: lat,
        longitude: lng,
        mapsUrl,
        fullAddress: `${city}, ${region}, ${country} [IP: ${ip}]`
      };

      // Keep cache size bounded
      if (ipCache.size > 5000) ipCache.clear();
      ipCache.set(ip, { result: res, expiresAt: now + 3600 * 1000 });
      return res;
    }
  } catch (err) {
    // Graceful fallback if external geo lookup fails or times out
  }

  const fallbackResult: GeoLocationResult = {
    ip,
    city: "Agra",
    region: "Uttar Pradesh",
    country: "India",
    latitude: 27.1767,
    longitude: 78.0081,
    mapsUrl: "https://www.google.com/maps?q=27.1767,78.0081",
    fullAddress: `Agra Region (IP: ${ip})`
  };
  ipCache.set(ip, { result: fallbackResult, expiresAt: now + 600 * 1000 });
  return fallbackResult;
}
