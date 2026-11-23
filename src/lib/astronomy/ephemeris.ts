import * as Astronomy from "astronomy-engine";

// Vedic Signs (Rashis)
export const ZODIAC_SIGNS = [
  { id: 1, name: "Aries", sanskrit: "Mesha", symbol: "♈", element: "Fire", ruler: "Mars", lord: "Mars" },
  { id: 2, name: "Taurus", sanskrit: "Vrishabha", symbol: "♉", element: "Earth", ruler: "Venus", lord: "Venus" },
  { id: 3, name: "Gemini", sanskrit: "Mithuna", symbol: "♊", element: "Air", ruler: "Mercury", lord: "Mercury" },
  { id: 4, name: "Cancer", sanskrit: "Karka", symbol: "♋", element: "Water", ruler: "Moon", lord: "Moon" },
  { id: 5, name: "Leo", sanskrit: "Simha", symbol: "♌", element: "Fire", ruler: "Sun", lord: "Sun" },
  { id: 6, name: "Virgo", sanskrit: "Kanya", symbol: "♍", element: "Earth", ruler: "Mercury", lord: "Mercury" },
  { id: 7, name: "Libra", sanskrit: "Tula", symbol: "♎", element: "Air", ruler: "Venus", lord: "Venus" },
  { id: 8, name: "Scorpio", sanskrit: "Vrishchika", symbol: "♏", element: "Water", ruler: "Mars", lord: "Mars" },
  { id: 9, name: "Sagittarius", sanskrit: "Dhanu", symbol: "♐", element: "Fire", ruler: "Jupiter", lord: "Jupiter" },
  { id: 10, name: "Capricorn", sanskrit: "Makara", symbol: "♑", element: "Earth", ruler: "Saturn", lord: "Saturn" },
  { id: 11, name: "Aquarius", sanskrit: "Kumbha", symbol: "♒", element: "Air", ruler: "Saturn", lord: "Saturn" },
  { id: 12, name: "Pisces", sanskrit: "Meena", symbol: "♓", element: "Water", ruler: "Jupiter", lord: "Jupiter" },
];

// 27 Nakshatras
export const NAKSHATRAS = [
  { id: 1, name: "Ashwini", ruler: "Ketu", deity: "Ashwini Kumaras", symbol: "Horse's Head", yoni: "Horse", gana: "Deva" },
  { id: 2, name: "Bharani", ruler: "Venus", deity: "Yama", symbol: "Yoni / Triangle", yoni: "Elephant", gana: "Manushya" },
  { id: 3, name: "Krittika", ruler: "Sun", deity: "Agni", symbol: "Knife / Flame", yoni: "Sheep", gana: "Rakshasa" },
  { id: 4, name: "Rohini", ruler: "Moon", deity: "Brahma", symbol: "Cart / Chariot", yoni: "Serpent", gana: "Manushya" },
  { id: 5, name: "Mrigashira", ruler: "Mars", deity: "Soma", symbol: "Deer's Head", yoni: "Serpent", gana: "Deva" },
  { id: 6, name: "Ardra", ruler: "Rahu", deity: "Rudra", symbol: "Teardrop", yoni: "Dog", gana: "Manushya" },
  { id: 7, name: "Punarvasu", ruler: "Jupiter", deity: "Aditi", symbol: "Bow & Quiver", yoni: "Cat", gana: "Deva" },
  { id: 8, name: "Pushya", ruler: "Saturn", deity: "Brihaspati", symbol: "Cow's Udder / Flower", yoni: "Sheep", gana: "Deva" },
  { id: 9, name: "Ashlesha", ruler: "Mercury", deity: "Nagas", symbol: "Coiled Serpent", yoni: "Cat", gana: "Rakshasa" },
  { id: 10, name: "Magha", ruler: "Ketu", deity: "Pitras (Ancestors)", symbol: "Royal Throne", yoni: "Rat", gana: "Rakshasa" },
  { id: 11, name: "Purva Phalguni", ruler: "Venus", deity: "Bhaga", symbol: "Front legs of bed", yoni: "Rat", gana: "Manushya" },
  { id: 12, name: "Uttara Phalguni", ruler: "Sun", deity: "Aryaman", symbol: "Back legs of bed", yoni: "Cow", gana: "Manushya" },
  { id: 13, name: "Hasta", ruler: "Moon", deity: "Savitr", symbol: "Open Palm", yoni: "Buffalo", gana: "Deva" },
  { id: 14, name: "Chitra", ruler: "Mars", deity: "Vishvakarma", symbol: "Bright Jewel", yoni: "Tiger", gana: "Rakshasa" },
  { id: 15, name: "Swati", ruler: "Rahu", deity: "Vayu", symbol: "Shoot of plant / Coral", yoni: "Buffalo", gana: "Deva" },
  { id: 16, name: "Vishakha", ruler: "Jupiter", deity: "Indra & Agni", symbol: "Triumphal Arch", yoni: "Tiger", gana: "Rakshasa" },
  { id: 17, name: "Anuradha", ruler: "Saturn", deity: "Mitra", symbol: "Lotus flower", yoni: "Deer", gana: "Deva" },
  { id: 18, name: "Jyeshtha", ruler: "Mercury", deity: "Indra", symbol: "Earring / Umbrella", yoni: "Deer", gana: "Rakshasa" },
  { id: 19, name: "Mula", ruler: "Ketu", deity: "Nirriti", symbol: "Tied bunch of roots", yoni: "Dog", gana: "Rakshasa" },
  { id: 20, name: "Purva Ashadha", ruler: "Venus", deity: "Apas (Water)", symbol: "Elephant tusk / Fan", yoni: "Monkey", gana: "Manushya" },
  { id: 21, name: "Uttara Ashadha", ruler: "Sun", deity: "Vishwadevas", symbol: "Elephant tusk", yoni: "Mongoose", gana: "Manushya" },
  { id: 22, name: "Shravana", ruler: "Moon", deity: "Vishnu", symbol: "Three footprints / Ear", yoni: "Monkey", gana: "Deva" },
  { id: 23, name: "Dhanishta", ruler: "Mars", deity: "Eight Vasus", symbol: "Drum (Damru) / Flute", yoni: "Lion", gana: "Rakshasa" },
  { id: 24, name: "Shatabhisha", ruler: "Rahu", deity: "Varuna", symbol: "100 Physicians / Empty Circle", yoni: "Horse", gana: "Rakshasa" },
  { id: 25, name: "Purva Bhadrapada", ruler: "Jupiter", deity: "Aja Ekapada", symbol: "Sword / Front legs of funeral cot", yoni: "Lion", gana: "Manushya" },
  { id: 26, name: "Uttara Bhadrapada", ruler: "Saturn", deity: "Ahirbudhnya", symbol: "Back legs of funeral cot", yoni: "Cow", gana: "Manushya" },
  { id: 27, name: "Revati", ruler: "Mercury", deity: "Pushan", symbol: "Fish / Pair of fish", yoni: "Elephant", gana: "Deva" },
];

export interface PlanetPosition {
  name: string;
  sanskrit: string;
  tropicalLongitude: number;
  siderealLongitude: number;
  signId: number;
  signName: string;
  signSanskrit: string;
  signLord: string;
  degreeInSign: number;
  dms: string; // Degrees, Minutes, Seconds e.g. 14° 23' 45"
  nakshatraId: number;
  nakshatraName: string;
  nakshatraLord: string;
  pada: number;
  house: number; // 1 to 12
  isRetrograde: boolean;
  dignity: "Exalted" | "Mooltrikona" | "Own" | "Debilitated" | "Friendly" | "Enemy" | "Neutral";
  navamsaSignId: number;
  navamsaSignName: string;
}

export interface HouseInfo {
  houseNumber: number;
  signId: number;
  signName: string;
  signSanskrit: string;
  signLord: string;
  significations: string;
  planetsInHouse: string[];
  aspectingPlanets: string[];
}

export interface VedicYoga {
  name: string;
  type: "Benefic" | "Raja" | "Dhana" | "Malefic";
  description: string;
  planetsInvolved: string[];
  effects: string;
}

export interface KundliData {
  ayanamsaName: string;
  ayanamsaValue: number;
  ayanamsaDms: string;
  lagna: {
    tropicalLongitude: number;
    siderealLongitude: number;
    signId: number;
    signName: string;
    signSanskrit: string;
    signLord: string;
    degreeInSign: number;
    dms: string;
    nakshatraName: string;
    nakshatraLord: string;
    pada: number;
  };
  moonSign: {
    signId: number;
    signName: string;
    signSanskrit: string;
    nakshatraName: string;
    nakshatraLord: string;
    pada: number;
    degreeInSign: number;
  };
  sunSign: {
    signId: number;
    signName: string;
    signSanskrit: string;
    degreeInSign: number;
  };
  planets: PlanetPosition[];
  houses: HouseInfo[];
  navamsaChart: {
    planets: { name: string; signId: number; signName: string; house: number }[];
    lagnaSignId: number;
    lagnaSignName: string;
  };
  yogas: VedicYoga[];
  birthDetails: {
    name: string;
    date: string;
    time: string;
    place: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: number;
  };
}

// Compute Julian Day from UTC Date
export function getJulianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

// Compute Lahiri Ayanamsa
export function getLahiriAyanamsa(date: Date): number {
  const jd = getJulianDay(date);
  const T = (jd - 2451545.0) / 36525;
  // Standard Lahiri formula: 23° 51' 25.532" at J2000.0 with precession rate
  const ayanamsa = 23.857092 + 1.396042 * T + 0.000308 * T * T;
  return ayanamsa;
}

export function toDMS(deg: number): string {
  const d = Math.floor(deg);
  const remMin = (deg - d) * 60;
  const m = Math.floor(remMin);
  const s = Math.round((remMin - m) * 60);
  return `${d}° ${m.toString().padStart(2, "0")}' ${s.toString().padStart(2, "0")}"`;
}

// Calculate Tropical Ascendant from Local Sidereal Time and Latitude
export function calculateAscendant(dateUtc: Date, latitude: number, longitude: number): number {
  const gmstHours = Astronomy.SiderealTime(dateUtc);
  const gmstDeg = (gmstHours * 15) % 360;
  // Local Sidereal Time (RAMC)
  const lstDeg = (gmstDeg + longitude + 360) % 360;
  const lstRad = (lstDeg * Math.PI) / 180;
  
  // Obliquity of ecliptic
  const jd = getJulianDay(dateUtc);
  const T = (jd - 2451545.0) / 36525;
  const epsDeg = 23.4392911 - 0.0130042 * T;
  const epsRad = (epsDeg * Math.PI) / 180;
  const phiRad = (latitude * Math.PI) / 180;

  // Ascendant formula
  const y = Math.cos(lstRad);
  const x = -Math.sin(lstRad) * Math.cos(epsRad) - Math.tan(phiRad) * Math.sin(epsRad);
  let ascDeg = (Math.atan2(y, x) * 180) / Math.PI;
  if (ascDeg < 0) ascDeg += 360;
  return ascDeg;
}

// Get Geocentric Ecliptic Longitude for a celestial body
function getBodyLongitude(body: Astronomy.Body, dateUtc: Date): number {
  const vec = Astronomy.GeoVector(body, dateUtc, false);
  const ecl = Astronomy.Ecliptic(vec);
  let lon = ecl.elon;
  if (lon < 0) lon += 360;
  return lon;
}

// Get Mean Lunar Node (Rahu)
function getMeanRahuLongitude(dateUtc: Date): number {
  const jd = getJulianDay(dateUtc);
  const T = (jd - 2451545.0) / 36525;
  // Standard astronomical formula for Moon's ascending node
  let omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + 0.0000022 * T * T * T;
  omega = ((omega % 360) + 360) % 360;
  return omega;
}

// Calculate Navamsa (D9) sign from sidereal longitude
export function getNavamsaSignId(siderealLon: number): number {
  // Each navamsa is 3° 20' = 3.333333°
  const totalNavamsa = Math.floor(siderealLon / (10 / 3));
  return (totalNavamsa % 12) + 1;
}

// Determine planet dignity
function calculateDignity(
  planet: string,
  signId: number,
  degreeInSign: number
): "Exalted" | "Mooltrikona" | "Own" | "Debilitated" | "Friendly" | "Enemy" | "Neutral" {
  switch (planet) {
    case "Sun":
      if (signId === 1 && degreeInSign <= 10) return "Exalted";
      if (signId === 7 && degreeInSign <= 10) return "Debilitated";
      if (signId === 5) return degreeInSign <= 20 ? "Mooltrikona" : "Own";
      if ([1, 4, 8, 9, 12].includes(signId)) return "Friendly";
      if ([2, 7, 10, 11].includes(signId)) return "Enemy";
      return "Neutral";
    case "Moon":
      if (signId === 2 && degreeInSign <= 3) return "Exalted";
      if (signId === 8 && degreeInSign <= 3) return "Debilitated";
      if (signId === 2 && degreeInSign > 3) return "Mooltrikona";
      if (signId === 4) return "Own";
      if ([1, 3, 5, 6].includes(signId)) return "Friendly";
      return "Neutral";
    case "Mars":
      if (signId === 10 && degreeInSign <= 28) return "Exalted";
      if (signId === 4 && degreeInSign <= 28) return "Debilitated";
      if (signId === 1 && degreeInSign <= 12) return "Mooltrikona";
      if ([1, 8].includes(signId)) return "Own";
      if ([4, 5, 9, 12].includes(signId)) return "Friendly";
      if ([3, 6].includes(signId)) return "Enemy";
      return "Neutral";
    case "Mercury":
      if (signId === 6 && degreeInSign <= 15) return "Exalted";
      if (signId === 12 && degreeInSign <= 15) return "Debilitated";
      if (signId === 6 && degreeInSign > 15 && degreeInSign <= 20) return "Mooltrikona";
      if ([3, 6].includes(signId)) return "Own";
      if ([2, 5, 7].includes(signId)) return "Friendly";
      if ([4].includes(signId)) return "Enemy";
      return "Neutral";
    case "Jupiter":
      if (signId === 4 && degreeInSign <= 5) return "Exalted";
      if (signId === 10 && degreeInSign <= 5) return "Debilitated";
      if (signId === 9 && degreeInSign <= 10) return "Mooltrikona";
      if ([9, 12].includes(signId)) return "Own";
      if ([1, 5, 8].includes(signId)) return "Friendly";
      if ([3, 6, 2, 7].includes(signId)) return "Enemy";
      return "Neutral";
    case "Venus":
      if (signId === 12 && degreeInSign <= 27) return "Exalted";
      if (signId === 6 && degreeInSign <= 27) return "Debilitated";
      if (signId === 7 && degreeInSign <= 15) return "Mooltrikona";
      if ([2, 7].includes(signId)) return "Own";
      if ([3, 6, 10, 11].includes(signId)) return "Friendly";
      if ([1, 4, 8].includes(signId)) return "Enemy";
      return "Neutral";
    case "Saturn":
      if (signId === 7 && degreeInSign <= 20) return "Exalted";
      if (signId === 1 && degreeInSign <= 20) return "Debilitated";
      if (signId === 11 && degreeInSign <= 20) return "Mooltrikona";
      if ([10, 11].includes(signId)) return "Own";
      if ([2, 3, 6, 7].includes(signId)) return "Friendly";
      if ([1, 4, 5, 8].includes(signId)) return "Enemy";
      return "Neutral";
    case "Rahu":
      if (signId === 2 || signId === 3) return "Exalted";
      if (signId === 8 || signId === 9) return "Debilitated";
      if (signId === 11) return "Own";
      return "Neutral";
    case "Ketu":
      if (signId === 8 || signId === 9) return "Exalted";
      if (signId === 2 || signId === 3) return "Debilitated";
      if (signId === 12) return "Own";
      return "Neutral";
    default:
      return "Neutral";
  }
}

// Full Kundli calculation
export function calculateVedicKundli(params: {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  place: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number; // e.g. +5.5 for IST
}): KundliData {
  // Convert local date/time into UTC Date
  const [year, month, day] = params.birthDate.split("-").map(Number);
  const [hour, min] = params.birthTime.split(":").map(Number);

  // Time in UTC milliseconds
  const localDateObj = new Date(Date.UTC(year, month - 1, day, hour, min));
  const offsetMs = params.timezone * 3600 * 1000;
  const utcDate = new Date(localDateObj.getTime() - offsetMs);

  // Calculate Ayanamsa
  const ayanamsa = getLahiriAyanamsa(utcDate);

  // Calculate Ascendant (Lagna)
  const tropAsc = calculateAscendant(utcDate, params.latitude, params.longitude);
  const siderealAsc = ((tropAsc - ayanamsa) % 360 + 360) % 360;
  const lagnaSignId = Math.floor(siderealAsc / 30) + 1;
  const lagnaSign = ZODIAC_SIGNS[lagnaSignId - 1];
  const lagnaDegInSign = siderealAsc % 30;
  const lagnaNakIdx = Math.floor(siderealAsc / (360 / 27));
  const lagnaNak = NAKSHATRAS[lagnaNakIdx];
  const lagnaPada = Math.floor((siderealAsc % (360 / 27)) / (360 / 108)) + 1;

  // Celestial Bodies
  const bodiesList = [
    { name: "Sun", sanskrit: "Surya", body: Astronomy.Body.Sun },
    { name: "Moon", sanskrit: "Chandra", body: Astronomy.Body.Moon },
    { name: "Mars", sanskrit: "Mangala", body: Astronomy.Body.Mars },
    { name: "Mercury", sanskrit: "Budha", body: Astronomy.Body.Mercury },
    { name: "Jupiter", sanskrit: "Guru", body: Astronomy.Body.Jupiter },
    { name: "Venus", sanskrit: "Shukra", body: Astronomy.Body.Venus },
    { name: "Saturn", sanskrit: "Shani", body: Astronomy.Body.Saturn },
  ];

  const calculatedPlanets: PlanetPosition[] = [];

  // Helper for house number from Lagna (1 to 12)
  const getHouseFromLagna = (signId: number) => {
    let h = signId - lagnaSignId + 1;
    if (h <= 0) h += 12;
    return h;
  };

  // 1 hour difference for retrograde speed check
  const utcMinus1H = new Date(utcDate.getTime() - 3600000);
  const utcPlus1H = new Date(utcDate.getTime() + 3600000);

  // Compute 7 main Grahas
  for (const b of bodiesList) {
    const tropLon = getBodyLongitude(b.body, utcDate);
    const siderealLon = ((tropLon - ayanamsa) % 360 + 360) % 360;

    // Speed check for retrograde
    const lon1 = getBodyLongitude(b.body, utcMinus1H);
    const lon2 = getBodyLongitude(b.body, utcPlus1H);
    let diff = lon2 - lon1;
    if (diff < -180) diff += 360;
    if (diff > 180) diff -= 360;
    const isRetrograde = b.name !== "Sun" && b.name !== "Moon" && diff < 0;

    const signId = Math.floor(siderealLon / 30) + 1;
    const sign = ZODIAC_SIGNS[signId - 1];
    const degreeInSign = siderealLon % 30;
    const nakIdx = Math.floor(siderealLon / (360 / 27));
    const nak = NAKSHATRAS[nakIdx];
    const pada = Math.floor((siderealLon % (360 / 27)) / (360 / 108)) + 1;
    const house = getHouseFromLagna(signId);
    const dignity = calculateDignity(b.name, signId, degreeInSign);
    const navamsaSignId = getNavamsaSignId(siderealLon);
    const navamsaSign = ZODIAC_SIGNS[navamsaSignId - 1];

    calculatedPlanets.push({
      name: b.name,
      sanskrit: b.sanskrit,
      tropicalLongitude: tropLon,
      siderealLongitude: siderealLon,
      signId,
      signName: sign.name,
      signSanskrit: sign.sanskrit,
      signLord: sign.ruler,
      degreeInSign,
      dms: toDMS(degreeInSign),
      nakshatraId: nak.id,
      nakshatraName: nak.name,
      nakshatraLord: nak.ruler,
      pada,
      house,
      isRetrograde,
      dignity,
      navamsaSignId,
      navamsaSignName: navamsaSign.name,
    });
  }

  // Rahu & Ketu (Shadow planets - always retrograde in mean motion)
  const rahuTropLon = getMeanRahuLongitude(utcDate);
  const rahuSiderealLon = ((rahuTropLon - ayanamsa) % 360 + 360) % 360;
  const rahuSignId = Math.floor(rahuSiderealLon / 30) + 1;
  const rahuSign = ZODIAC_SIGNS[rahuSignId - 1];
  const rahuDeg = rahuSiderealLon % 30;
  const rahuNakIdx = Math.floor(rahuSiderealLon / (360 / 27));
  const rahuNak = NAKSHATRAS[rahuNakIdx];
  const rahuPada = Math.floor((rahuSiderealLon % (360 / 27)) / (360 / 108)) + 1;
  const rahuHouse = getHouseFromLagna(rahuSignId);
  const rahuNavamsaSignId = getNavamsaSignId(rahuSiderealLon);

  calculatedPlanets.push({
    name: "Rahu",
    sanskrit: "Rahu",
    tropicalLongitude: rahuTropLon,
    siderealLongitude: rahuSiderealLon,
    signId: rahuSignId,
    signName: rahuSign.name,
    signSanskrit: rahuSign.sanskrit,
    signLord: rahuSign.ruler,
    degreeInSign: rahuDeg,
    dms: toDMS(rahuDeg),
    nakshatraId: rahuNak.id,
    nakshatraName: rahuNak.name,
    nakshatraLord: rahuNak.ruler,
    pada: rahuPada,
    house: rahuHouse,
    isRetrograde: true,
    dignity: calculateDignity("Rahu", rahuSignId, rahuDeg),
    navamsaSignId: rahuNavamsaSignId,
    navamsaSignName: ZODIAC_SIGNS[rahuNavamsaSignId - 1].name,
  });

  // Ketu (180° opposite Rahu)
  const ketuSiderealLon = (rahuSiderealLon + 180) % 360;
  const ketuSignId = Math.floor(ketuSiderealLon / 30) + 1;
  const ketuSign = ZODIAC_SIGNS[ketuSignId - 1];
  const ketuDeg = ketuSiderealLon % 30;
  const ketuNakIdx = Math.floor(ketuSiderealLon / (360 / 27));
  const ketuNak = NAKSHATRAS[ketuNakIdx];
  const ketuPada = Math.floor((ketuSiderealLon % (360 / 27)) / (360 / 108)) + 1;
  const ketuHouse = getHouseFromLagna(ketuSignId);
  const ketuNavamsaSignId = getNavamsaSignId(ketuSiderealLon);

  calculatedPlanets.push({
    name: "Ketu",
    sanskrit: "Ketu",
    tropicalLongitude: (rahuTropLon + 180) % 360,
    siderealLongitude: ketuSiderealLon,
    signId: ketuSignId,
    signName: ketuSign.name,
    signSanskrit: ketuSign.sanskrit,
    signLord: ketuSign.ruler,
    degreeInSign: ketuDeg,
    dms: toDMS(ketuDeg),
    nakshatraId: ketuNak.id,
    nakshatraName: ketuNak.name,
    nakshatraLord: ketuNak.ruler,
    pada: ketuPada,
    house: ketuHouse,
    isRetrograde: true,
    dignity: calculateDignity("Ketu", ketuSignId, ketuDeg),
    navamsaSignId: ketuNavamsaSignId,
    navamsaSignName: ZODIAC_SIGNS[ketuNavamsaSignId - 1].name,
  });

  // Bhavas / 12 Houses
  const houseSignifications = [
    "Self, Physical body, Vitality, Temperament, Complexion, Longevity",
    "Wealth, Family, Speech, Eyes, Food habits, Accumulated assets",
    "Courage, Younger siblings, Communication, Effort, Short travels, Talents",
    "Mother, Home, Land, Vehicles, Peace of mind, Emotional security",
    "Intelligence, Children, Creativity, Past life merits (Purva Punya), Romance",
    "Health, Debts, Enemies, Daily work, Service, Overcoming obstacles",
    "Marriage, Spouse, Business partnerships, Legal affairs, Public dealings",
    "Longevity, Sudden events, Mysteries, Occult knowledge, Transformation, Research",
    "Dharma, Fortune (Bhagya), Father, Higher learning, Philosophy, Long journeys",
    "Career, Reputation, Profession, Status, Karma, Social achievements",
    "Gains (Labha), Income, Elder siblings, Hopes & Wishes, Social networks",
    "Moksha, Spiritual liberation, Foreign travels, Expenses, Sleep, Subconscious",
  ];

  const calculatedHouses: HouseInfo[] = [];
  for (let h = 1; h <= 12; h++) {
    const signId = ((lagnaSignId - 1 + (h - 1)) % 12) + 1;
    const sign = ZODIAC_SIGNS[signId - 1];

    const planetsInHouse = calculatedPlanets
      .filter((p) => p.house === h)
      .map((p) => p.name);

    // Planetary aspects to this house
    const aspectingPlanets: string[] = [];
    for (const p of calculatedPlanets) {
      const fromHouse = p.house;
      const dist = ((h - fromHouse + 12) % 12) + 1; // 1 to 12
      // 7th house aspect applies to all
      if (dist === 7) aspectingPlanets.push(p.name);
      // Mars aspects 4th and 8th
      if (p.name === "Mars" && (dist === 4 || dist === 8)) aspectingPlanets.push(p.name);
      // Jupiter aspects 5th and 9th
      if (p.name === "Jupiter" && (dist === 5 || dist === 9)) aspectingPlanets.push(p.name);
      // Saturn aspects 3rd and 10th
      if (p.name === "Saturn" && (dist === 3 || dist === 10)) aspectingPlanets.push(p.name);
      // Rahu / Ketu aspect 5th and 9th
      if ((p.name === "Rahu" || p.name === "Ketu") && (dist === 5 || dist === 9)) aspectingPlanets.push(p.name);
    }

    calculatedHouses.push({
      houseNumber: h,
      signId,
      signName: sign.name,
      signSanskrit: sign.sanskrit,
      signLord: sign.ruler,
      significations: houseSignifications[h - 1],
      planetsInHouse,
      aspectingPlanets: Array.from(new Set(aspectingPlanets)),
    });
  }

  // Navamsa Chart mapping
  const navamsaLagnaSignId = getNavamsaSignId(siderealAsc);
  const navamsaPlanets = calculatedPlanets.map((p) => {
    let house = p.navamsaSignId - navamsaLagnaSignId + 1;
    if (house <= 0) house += 12;
    return {
      name: p.name,
      signId: p.navamsaSignId,
      signName: p.navamsaSignName,
      house,
    };
  });

  // Major Yogas detection
  const detectedYogas: VedicYoga[] = [];

  const getPlanet = (name: string) => calculatedPlanets.find((p) => p.name === name);
  const jup = getPlanet("Jupiter");
  const moon = getPlanet("Moon");
  const sun = getPlanet("Sun");
  const merc = getPlanet("Mercury");
  const mars = getPlanet("Mars");
  const ven = getPlanet("Venus");
  const sat = getPlanet("Saturn");

  // Gaja Kesari Yoga
  if (jup && moon) {
    const distFromMoon = ((jup.house - moon.house + 12) % 12) + 1;
    if ([1, 4, 7, 10].includes(distFromMoon)) {
      detectedYogas.push({
        name: "Gaja Kesari Yoga",
        type: "Benefic",
        description: "Jupiter is in a Kendra (1st, 4th, 7th, or 10th house) from the Moon.",
        planetsInvolved: ["Jupiter", "Moon"],
        effects: "Bestows high wisdom, eloquence, lasting reputation, virtuous conduct, and royal honors.",
      });
    }
  }

  // Budhaditya Yoga
  if (sun && merc && sun.house === merc.house) {
    detectedYogas.push({
      name: "Budhaditya Yoga",
      type: "Benefic",
      description: "Sun and Mercury are conjunct in the same house.",
      planetsInvolved: ["Sun", "Mercury"],
      effects: "Grants sharp intellect, keen analytical ability, administrative aptitude, and social esteem.",
    });
  }

  // Chandra-Mangal Yoga
  if (moon && mars && moon.house === mars.house) {
    detectedYogas.push({
      name: "Chandra-Mangala Yoga",
      type: "Dhana",
      description: "Moon and Mars conjoin in the same house.",
      planetsInvolved: ["Moon", "Mars"],
      effects: "Creates great entrepreneurial enterprise, wealth accumulation, and courage in business.",
    });
  }

  // Pancha Mahapurusha Yogas
  // Ruchaka (Mars in Kendra in Own/Exalted sign)
  if (mars && [1, 4, 7, 10].includes(mars.house) && ["Exalted", "Own", "Mooltrikona"].includes(mars.dignity)) {
    detectedYogas.push({
      name: "Ruchaka Yoga (Mahapurusha)",
      type: "Raja",
      description: "Mars is in a Kendra house in its own or exaltation sign.",
      planetsInvolved: ["Mars"],
      effects: "Physical strength, leadership courage, victory over adversaries, and commanding executive authority.",
    });
  }

  // Bhadra (Mercury in Kendra in Own/Exalted sign)
  if (merc && [1, 4, 7, 10].includes(merc.house) && ["Exalted", "Own", "Mooltrikona"].includes(merc.dignity)) {
    detectedYogas.push({
      name: "Bhadra Yoga (Mahapurusha)",
      type: "Benefic",
      description: "Mercury is placed in a Kendra house in Gemini or Virgo.",
      planetsInvolved: ["Mercury"],
      effects: "Unsurpassed scholarly genius, mathematical mastery, wit, and high commercial fortune.",
    });
  }

  // Hamsa (Jupiter in Kendra in Own/Exalted sign)
  if (jup && [1, 4, 7, 10].includes(jup.house) && ["Exalted", "Own", "Mooltrikona"].includes(jup.dignity)) {
    detectedYogas.push({
      name: "Hamsa Yoga (Mahapurusha)",
      type: "Raja",
      description: "Jupiter occupies a Kendra house in Cancer, Sagittarius, or Pisces.",
      planetsInvolved: ["Jupiter"],
      effects: "Purity of heart, deep spiritual insight, broad respect, and guidance to masses.",
    });
  }

  // Malavya (Venus in Kendra in Own/Exalted sign)
  if (ven && [1, 4, 7, 10].includes(ven.house) && ["Exalted", "Own", "Mooltrikona"].includes(ven.dignity)) {
    detectedYogas.push({
      name: "Malavya Yoga (Mahapurusha)",
      type: "Benefic",
      description: "Venus occupies a Kendra house in Taurus, Libra, or Pisces.",
      planetsInvolved: ["Venus"],
      effects: "Artistic talent, refined luxury, charismatic aura, beauty, and marital joy.",
    });
  }

  // Sasa (Saturn in Kendra in Own/Exalted sign)
  if (sat && [1, 4, 7, 10].includes(sat.house) && ["Exalted", "Own", "Mooltrikona"].includes(sat.dignity)) {
    detectedYogas.push({
      name: "Sasa Yoga (Mahapurusha)",
      type: "Raja",
      description: "Saturn is positioned in a Kendra house in Libra, Capricorn, or Aquarius.",
      planetsInvolved: ["Saturn"],
      effects: "Disciplined mastery, political endurance, loyal followers, and organizational command.",
    });
  }

  // Vipreet Raja Yoga check (6th, 8th, 12th lords placed in 6th, 8th, or 12th)
  const h6Lord = calculatedHouses[5].signLord;
  const h8Lord = calculatedHouses[7].signLord;
  const h12Lord = calculatedHouses[11].signLord;

  const p6 = getPlanet(h6Lord);
  const p8 = getPlanet(h8Lord);
  const p12 = getPlanet(h12Lord);

  if (p6 && [6, 8, 12].includes(p6.house)) {
    detectedYogas.push({
      name: "Harsha Yoga (Vipreet Raja)",
      type: "Raja",
      description: "6th house lord is situated in a Dusthana (6th, 8th, or 12th) house.",
      planetsInvolved: [h6Lord],
      effects: "Ability to overcome heavy odds, victory over competitors, immune resilience, and sudden gains from challenges.",
    });
  }
  if (p8 && [6, 8, 12].includes(p8.house)) {
    detectedYogas.push({
      name: "Sarala Yoga (Vipreet Raja)",
      type: "Raja",
      description: "8th house lord is placed in a Dusthana (6th, 8th, or 12th) house.",
      planetsInvolved: [h8Lord],
      effects: "Courage, fearlessness, financial longevity, and sudden reversals in adversity.",
    });
  }
  if (p12 && [6, 8, 12].includes(p12.house)) {
    detectedYogas.push({
      name: "Vimala Yoga (Vipreet Raja)",
      type: "Raja",
      description: "12th house lord is situated in a Dusthana (6th, 8th, or 12th) house.",
      planetsInvolved: [h12Lord],
      effects: "Purity of conduct, independent spirit, wealth preservation, and happiness through virtuous deeds.",
    });
  }

  const moonPlanet = calculatedPlanets.find((p) => p.name === "Moon")!;
  const sunPlanet = calculatedPlanets.find((p) => p.name === "Sun")!;

  return {
    ayanamsaName: "Lahiri (Chitrapaksha)",
    ayanamsaValue: ayanamsa,
    ayanamsaDms: toDMS(ayanamsa),
    lagna: {
      tropicalLongitude: tropAsc,
      siderealLongitude: siderealAsc,
      signId: lagnaSignId,
      signName: lagnaSign.name,
      signSanskrit: lagnaSign.sanskrit,
      signLord: lagnaSign.ruler,
      degreeInSign: lagnaDegInSign,
      dms: toDMS(lagnaDegInSign),
      nakshatraName: lagnaNak.name,
      nakshatraLord: lagnaNak.ruler,
      pada: lagnaPada,
    },
    moonSign: {
      signId: moonPlanet.signId,
      signName: moonPlanet.signName,
      signSanskrit: moonPlanet.signSanskrit,
      nakshatraName: moonPlanet.nakshatraName,
      nakshatraLord: moonPlanet.nakshatraLord,
      pada: moonPlanet.pada,
      degreeInSign: moonPlanet.degreeInSign,
    },
    sunSign: {
      signId: sunPlanet.signId,
      signName: sunPlanet.signName,
      signSanskrit: sunPlanet.signSanskrit,
      degreeInSign: sunPlanet.degreeInSign,
    },
    planets: calculatedPlanets,
    houses: calculatedHouses,
    navamsaChart: {
      planets: navamsaPlanets,
      lagnaSignId: navamsaLagnaSignId,
      lagnaSignName: ZODIAC_SIGNS[navamsaLagnaSignId - 1].name,
    },
    yogas: detectedYogas,
    birthDetails: {
      name: params.name,
      date: params.birthDate,
      time: params.birthTime,
      place: params.place,
      country: params.country,
      latitude: params.latitude,
      longitude: params.longitude,
      timezone: params.timezone,
    },
  };
}
