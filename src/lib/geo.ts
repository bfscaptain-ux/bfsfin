/**
 * BFS Geolocation & Address Resolver
 * Resolves Client IP or Coordinates to Detailed City, State, Country & Google Maps URL
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

  // 2. Localhost fallback
  if (ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return {
      ip: ip || "Localhost",
      city: "Agra",
      region: "Uttar Pradesh",
      country: "India",
      latitude: 27.1767,
      longitude: 78.0081,
      mapsUrl: "https://www.google.com/maps?q=27.1767,78.0081",
      fullAddress: "Agra, Uttar Pradesh, India (Localhost Test IP)"
    };
  }

  // 3. Resolve Public IP via free IP lookup service
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

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
  } catch (err) {
    // Graceful fallback if external geo lookup fails
  }

  return {
    ip,
    city: "Agra",
    region: "Uttar Pradesh",
    country: "India",
    latitude: 27.1767,
    longitude: 78.0081,
    mapsUrl: "https://www.google.com/maps?q=27.1767,78.0081",
    fullAddress: `Agra Region (IP: ${ip})`
  };
}
