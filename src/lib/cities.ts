export interface CityData {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number; // UTC offset in hours (e.g. 5.5 for IST)
  tzName: string;
}

export const POPULAR_CITIES: CityData[] = [
  // India
  { name: "New Delhi", country: "India", latitude: 28.6139, longitude: 77.2090, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Mumbai", country: "India", latitude: 19.0760, longitude: 72.8777, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Bengaluru", country: "India", latitude: 12.9716, longitude: 77.5946, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Kolkata", country: "India", latitude: 22.5726, longitude: 88.3639, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Chennai", country: "India", latitude: 13.0827, longitude: 80.2707, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Hyderabad", country: "India", latitude: 17.3850, longitude: 78.4867, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Ahmedabad", country: "India", latitude: 23.0225, longitude: 72.5714, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Pune", country: "India", latitude: 18.5204, longitude: 73.8567, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Jaipur", country: "India", latitude: 26.9124, longitude: 75.7873, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Lucknow", country: "India", latitude: 26.8467, longitude: 80.9462, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Varanasi", country: "India", latitude: 25.3176, longitude: 82.9739, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Ujjain", country: "India", latitude: 23.1765, longitude: 75.7885, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Patna", country: "India", latitude: 25.5941, longitude: 85.1376, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Bhopal", country: "India", latitude: 23.2599, longitude: 77.4126, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Chandigarh", country: "India", latitude: 30.7333, longitude: 76.7794, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Indore", country: "India", latitude: 22.7196, longitude: 75.8577, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Surat", country: "India", latitude: 21.1702, longitude: 72.8311, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Nagpur", country: "India", latitude: 21.1458, longitude: 79.0882, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Kochi", country: "India", latitude: 9.9312, longitude: 76.2673, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Guwahati", country: "India", latitude: 26.1445, longitude: 91.7362, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Haridwar", country: "India", latitude: 29.9457, longitude: 78.1642, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Rishikesh", country: "India", latitude: 30.0869, longitude: 78.2676, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Ayodhya", country: "India", latitude: 26.7922, longitude: 82.1998, timezone: 5.5, tzName: "Asia/Kolkata" },
  { name: "Amritsar", country: "India", latitude: 31.6340, longitude: 74.8723, timezone: 5.5, tzName: "Asia/Kolkata" },

  // USA & Canada
  { name: "New York", country: "United States", latitude: 40.7128, longitude: -74.0060, timezone: -5.0, tzName: "America/New_York" },
  { name: "Los Angeles", country: "United States", latitude: 34.0522, longitude: -118.2437, timezone: -8.0, tzName: "America/Los_Angeles" },
  { name: "San Francisco", country: "United States", latitude: 37.7749, longitude: -122.4194, timezone: -8.0, tzName: "America/Los_Angeles" },
  { name: "Chicago", country: "United States", latitude: 41.8781, longitude: -87.6298, timezone: -6.0, tzName: "America/Chicago" },
  { name: "Houston", country: "United States", latitude: 29.7604, longitude: -95.3698, timezone: -6.0, tzName: "America/Chicago" },
  { name: "Dallas", country: "United States", latitude: 32.7767, longitude: -96.7970, timezone: -6.0, tzName: "America/Chicago" },
  { name: "Seattle", country: "United States", latitude: 47.6062, longitude: -122.3321, timezone: -8.0, tzName: "America/Los_Angeles" },
  { name: "Atlanta", country: "United States", latitude: 33.7490, longitude: -84.3880, timezone: -5.0, tzName: "America/New_York" },
  { name: "Miami", country: "United States", latitude: 25.7617, longitude: -80.1918, timezone: -5.0, tzName: "America/New_York" },
  { name: "Boston", country: "United States", latitude: 42.3601, longitude: -71.0589, timezone: -5.0, tzName: "America/New_York" },
  { name: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832, timezone: -5.0, tzName: "America/Toronto" },
  { name: "Vancouver", country: "Canada", latitude: 49.2827, longitude: -123.1207, timezone: -8.0, tzName: "America/Vancouver" },

  // Europe & UK
  { name: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278, timezone: 0.0, tzName: "Europe/London" },
  { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522, timezone: 1.0, tzName: "Europe/Paris" },
  { name: "Berlin", country: "Germany", latitude: 52.5200, longitude: 13.4050, timezone: 1.0, tzName: "Europe/Berlin" },
  { name: "Amsterdam", country: "Netherlands", latitude: 52.3676, longitude: 4.9041, timezone: 1.0, tzName: "Europe/Amsterdam" },
  { name: "Rome", country: "Italy", latitude: 41.9028, longitude: 12.4964, timezone: 1.0, tzName: "Europe/Rome" },
  { name: "Dublin", country: "Ireland", latitude: 53.3498, longitude: -6.2603, timezone: 0.0, tzName: "Europe/Dublin" },

  // Middle East & Asia Pacific
  { name: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708, timezone: 4.0, tzName: "Asia/Dubai" },
  { name: "Singapore", country: "Singapore", latitude: 1.3521, longitude: 103.8198, timezone: 8.0, tzName: "Asia/Singapore" },
  { name: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503, timezone: 9.0, tzName: "Asia/Tokyo" },
  { name: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093, timezone: 10.0, tzName: "Australia/Sydney" },
  { name: "Melbourne", country: "Australia", latitude: -37.8136, longitude: 144.9631, timezone: 10.0, tzName: "Australia/Melbourne" },
  { name: "Kuala Lumpur", country: "Malaysia", latitude: 3.1390, longitude: 101.6869, timezone: 8.0, tzName: "Asia/Kuala_Lumpur" },
  { name: "Bangkok", country: "Thailand", latitude: 13.7563, longitude: 100.5018, timezone: 7.0, tzName: "Asia/Bangkok" },
  { name: "Kathmandu", country: "Nepal", latitude: 27.7172, longitude: 85.3240, timezone: 5.75, tzName: "Asia/Kathmandu" },
  { name: "Colombo", country: "Sri Lanka", latitude: 6.9271, longitude: 79.8612, timezone: 5.5, tzName: "Asia/Colombo" },
];

export function searchCities(query: string): CityData[] {
  if (!query || query.trim().length === 0) return POPULAR_CITIES.slice(0, 8);
  const q = query.toLowerCase().trim();
  return POPULAR_CITIES.filter(
    (c) => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
  ).slice(0, 10);
}
