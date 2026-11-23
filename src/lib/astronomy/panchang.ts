import * as Astronomy from "astronomy-engine";
import { getLahiriAyanamsa, NAKSHATRAS } from "./ephemeris";

export interface PanchangData {
  date: string;
  city: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  tithi: {
    number: number;
    name: string;
    paksha: "Shukla" | "Krishna";
    details: string;
  };
  vara: {
    dayName: string;
    sanskritName: string;
    rulingPlanet: string;
  };
  nakshatra: {
    name: string;
    ruler: string;
    pada: number;
    deity: string;
  };
  yoga: {
    name: string;
    number: number;
    nature: "Auspicious" | "Inauspicious" | "Neutral";
  };
  karana: {
    name: string;
    number: number;
  };
  inauspiciousTimings: {
    rahuKaal: string;
    yamaganda: string;
    gulikaKaal: string;
    durMuhurat: string;
  };
  auspiciousTimings: {
    abhijitMuhurat: string;
    brahmaMuhurat: string;
    amritKaal: string;
  };
  upcomingFestivals: { name: string; date: string; significance: string }[];
}

// 30 Tithis
const TITHI_NAMES = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima", // Shukla
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya", // Krishna
];

// 27 Yogas
const YOGA_NAMES = [
  { name: "Vishkambha", nature: "Inauspicious" },
  { name: "Priti", nature: "Auspicious" },
  { name: "Ayushman", nature: "Auspicious" },
  { name: "Saubhagya", nature: "Auspicious" },
  { name: "Shobhana", nature: "Auspicious" },
  { name: "Atiganda", nature: "Inauspicious" },
  { name: "Sukarma", nature: "Auspicious" },
  { name: "Dhriti", nature: "Auspicious" },
  { name: "Shula", nature: "Inauspicious" },
  { name: "Ganda", nature: "Inauspicious" },
  { name: "Vriddhi", nature: "Auspicious" },
  { name: "Dhruva", nature: "Auspicious" },
  { name: "Vyaghata", nature: "Inauspicious" },
  { name: "Harshana", nature: "Auspicious" },
  { name: "Vajra", nature: "Inauspicious" },
  { name: "Siddhi", nature: "Auspicious" },
  { name: "Vyatipata", nature: "Inauspicious" },
  { name: "Variyana", nature: "Auspicious" },
  { name: "Parigha", nature: "Inauspicious" },
  { name: "Shiva", nature: "Auspicious" },
  { name: "Siddha", nature: "Auspicious" },
  { name: "Sadhya", nature: "Auspicious" },
  { name: "Shubha", nature: "Auspicious" },
  { name: "Shukla", nature: "Auspicious" },
  { name: "Brahma", nature: "Auspicious" },
  { name: "Indra", nature: "Auspicious" },
  { name: "Vaidhriti", nature: "Inauspicious" },
];

// 11 Karanas (7 repeating movable + 4 fixed)
const KARANA_NAMES = [
  "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti (Bhadra)",
  "Shakuni", "Chatushpada", "Naga", "Kintughna"
];

// Vara information
const VARA_INFO = [
  { dayName: "Sunday", sanskritName: "Ravivara", rulingPlanet: "Sun" },
  { dayName: "Monday", sanskritName: "Somavara", rulingPlanet: "Moon" },
  { dayName: "Tuesday", sanskritName: "Mangalavara", rulingPlanet: "Mars" },
  { dayName: "Wednesday", sanskritName: "Budhavara", rulingPlanet: "Mercury" },
  { dayName: "Thursday", sanskritName: "Guruvara", rulingPlanet: "Jupiter" },
  { dayName: "Friday", sanskritName: "Shukravara", rulingPlanet: "Venus" },
  { dayName: "Saturday", sanskritName: "Shanivara", rulingPlanet: "Saturn" },
];

// Rahu Kaal slot (1 to 8 parts of day from sunrise to sunset) for days Sunday (0) to Saturday (6)
// Sun: 8th, Mon: 2nd, Tue: 7th, Wed: 5th, Thu: 6th, Fri: 4th, Sat: 3rd
const RAHU_SLOTS = [8, 2, 7, 5, 6, 4, 3];
// Yamaganda: Sun: 5, Mon: 4, Tue: 3, Wed: 2, Thu: 1, Fri: 7, Sat: 6
const YAMA_SLOTS = [5, 4, 3, 2, 1, 7, 6];
// Gulika: Sun: 7, Mon: 6, Tue: 5, Wed: 4, Thu: 3, Fri: 2, Sat: 1
const GULIKA_SLOTS = [7, 6, 5, 4, 3, 2, 1];

function formatTime(d: Date): string {
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function calculatePanchang(
  dateStr: string, // YYYY-MM-DD
  cityName: string,
  latitude: number,
  longitude: number,
  timezone: number // e.g. 5.5
): PanchangData {
  const [y, m, d] = dateStr.split("-").map(Number);
  // Reference noon in local time converted to UTC
  const localNoon = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const utcDate = new Date(localNoon.getTime() - timezone * 3600000);

  // Compute geocentric Moon & Sun positions
  const sunVec = Astronomy.GeoVector(Astronomy.Body.Sun, utcDate, false);
  const sunEcl = Astronomy.Ecliptic(sunVec);
  const moonVec = Astronomy.GeoVector(Astronomy.Body.Moon, utcDate, false);
  const moonEcl = Astronomy.Ecliptic(moonVec);

  const ayanamsa = getLahiriAyanamsa(utcDate);
  const sunSidereal = ((sunEcl.elon - ayanamsa) % 360 + 360) % 360;
  const moonSidereal = ((moonEcl.elon - ayanamsa) % 360 + 360) % 360;

  // 1. Tithi: (Moon Lon - Sun Lon) / 12 degrees
  let diffLon = (moonSidereal - sunSidereal + 360) % 360;
  const tithiIndex = Math.floor(diffLon / 12); // 0 to 29
  const isShukla = tithiIndex < 15;
  const tithiName = TITHI_NAMES[tithiIndex];

  // 2. Vara (Day)
  const dayOfWeek = new Date(y, m - 1, d).getDay(); // 0 = Sunday
  const vara = VARA_INFO[dayOfWeek];

  // 3. Nakshatra of Moon
  const nakIndex = Math.floor(moonSidereal / (360 / 27));
  const nak = NAKSHATRAS[nakIndex];
  const nakPada = Math.floor((moonSidereal % (360 / 27)) / (360 / 108)) + 1;

  // 4. Yoga: (Sun Lon + Moon Lon) / 13.333333°
  const yogaIndex = Math.floor(((sunSidereal + moonSidereal) % 360) / (360 / 27));
  const yoga = YOGA_NAMES[yogaIndex] || YOGA_NAMES[0];

  // 5. Karana: (diffLon / 6)
  const karanaIndex = Math.floor(diffLon / 6);
  let karanaName = "";
  if (karanaIndex === 0) karanaName = "Kintughna";
  else if (karanaIndex >= 57) {
    const fixedKaranas = ["Shakuni", "Chatushpada", "Naga"];
    karanaName = fixedKaranas[karanaIndex - 57] || "Naga";
  } else {
    karanaName = KARANA_NAMES[(karanaIndex - 1) % 7];
  }

  // Sunrise and Sunset (Astrological approximation for the location)
  // Observer location
  const observer = new Astronomy.Observer(latitude, longitude, 0);
  const sunriseTime = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, 1, utcDate, 1);
  const sunsetTime = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, utcDate, 1);

  let sunriseLocal = new Date(localNoon.getTime() - 6 * 3600000); // 06:00 default fallback
  let sunsetLocal = new Date(localNoon.getTime() + 6 * 3600000); // 18:00 default fallback

  if (sunriseTime) {
    sunriseLocal = new Date(sunriseTime.date.getTime() + timezone * 3600000);
  }
  if (sunsetTime) {
    sunsetLocal = new Date(sunsetTime.date.getTime() + timezone * 3600000);
  }

  const dayLengthMs = sunsetLocal.getTime() - sunriseLocal.getTime();
  const partMs = dayLengthMs / 8;

  // Rahu Kaal
  const rahuSlot = RAHU_SLOTS[dayOfWeek];
  const rahuStart = new Date(sunriseLocal.getTime() + (rahuSlot - 1) * partMs);
  const rahuEnd = new Date(sunriseLocal.getTime() + rahuSlot * partMs);

  // Yamaganda
  const yamaSlot = YAMA_SLOTS[dayOfWeek];
  const yamaStart = new Date(sunriseLocal.getTime() + (yamaSlot - 1) * partMs);
  const yamaEnd = new Date(sunriseLocal.getTime() + yamaSlot * partMs);

  // Gulika
  const gulikaSlot = GULIKA_SLOTS[dayOfWeek];
  const gulikaStart = new Date(sunriseLocal.getTime() + (gulikaSlot - 1) * partMs);
  const gulikaEnd = new Date(sunriseLocal.getTime() + gulikaSlot * partMs);

  // Abhijit Muhurat: Middle 8th muhurat of 15 daytime muhurats (around midday)
  const muhuratLengthMs = dayLengthMs / 15;
  const abhijitStart = new Date(sunriseLocal.getTime() + 7 * muhuratLengthMs);
  const abhijitEnd = new Date(sunriseLocal.getTime() + 8 * muhuratLengthMs);

  // Brahma Muhurat: 1 hour 36 minutes before sunrise
  const brahmaStart = new Date(sunriseLocal.getTime() - 96 * 60000);
  const brahmaEnd = new Date(sunriseLocal.getTime() - 48 * 60000);

  // Sample upcoming seasonal festivals
  const festivals = [
    { name: "Maha Shivaratri", date: "Falgun Krishna Chaturdashi", significance: "Night of Lord Shiva's Cosmic Dance & Spiritual Vigil" },
    { name: "Holi (Holika Dahan)", date: "Phalguna Purnima", significance: "Victory of Divine devotion (Prahlada) over ego & darkness" },
    { name: "Chaitra Navratri & Ram Navami", date: "Chaitra Shukla Pratipada - Navami", significance: "Nine sacred nights of the Divine Mother & Birth of Shri Rama" },
    { name: "Guru Purnima", date: "Ashadha Purnima", significance: "Honoring spiritual masters, sages, and ancestral lineage of wisdom" },
    { name: "Janmashtami", date: "Bhadrapada Krishna Ashtami", significance: "Advent of Bhagavan Shri Krishna & Geeta wisdom" },
    { name: "Sharad Navratri & Vijayadashami", date: "Ashwin Shukla Pratipada - Dashami", significance: "Divine Mother Durga's victory and triumph of Dharma" },
    { name: "Deepavali & Lakshmi Puja", date: "Kartika Amavasya", significance: "Festival of inner lights, prosperity, and divine radiance" },
  ];

  return {
    date: dateStr,
    city: cityName,
    sunrise: formatTime(sunriseLocal),
    sunset: formatTime(sunsetLocal),
    moonrise: formatTime(new Date(sunriseLocal.getTime() + 4 * 3600000)),
    moonset: formatTime(new Date(sunsetLocal.getTime() + 5 * 3600000)),
    tithi: {
      number: (tithiIndex % 15) + 1,
      name: tithiName,
      paksha: isShukla ? "Shukla" : "Krishna",
      details: `${isShukla ? "Shukla Paksha" : "Krishna Paksha"} ${tithiName} (${(tithiIndex % 15) + 1}th Lunar Day)`,
    },
    vara,
    nakshatra: {
      name: nak.name,
      ruler: nak.ruler,
      pada: nakPada,
      deity: nak.deity,
    },
    yoga: {
      name: yoga.name,
      number: yogaIndex + 1,
      nature: yoga.nature as "Auspicious" | "Inauspicious" | "Neutral",
    },
    karana: {
      name: karanaName,
      number: karanaIndex + 1,
    },
    inauspiciousTimings: {
      rahuKaal: `${formatTime(rahuStart)} - ${formatTime(rahuEnd)}`,
      yamaganda: `${formatTime(yamaStart)} - ${formatTime(yamaEnd)}`,
      gulikaKaal: `${formatTime(gulikaStart)} - ${formatTime(gulikaEnd)}`,
      durMuhurat: `${formatTime(new Date(sunriseLocal.getTime() + 2 * 3600000))} - ${formatTime(new Date(sunriseLocal.getTime() + 2.8 * 3600000))}`,
    },
    auspiciousTimings: {
      abhijitMuhurat: `${formatTime(abhijitStart)} - ${formatTime(abhijitEnd)}`,
      brahmaMuhurat: `${formatTime(brahmaStart)} - ${formatTime(brahmaEnd)}`,
      amritKaal: `${formatTime(new Date(sunriseLocal.getTime() + 8.5 * muhuratLengthMs))} - ${formatTime(new Date(sunriseLocal.getTime() + 10 * muhuratLengthMs))}`,
    },
    upcomingFestivals: festivals.slice(0, 4),
  };
}
