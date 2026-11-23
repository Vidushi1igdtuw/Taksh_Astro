export interface NumerologyProfile {
  name: string;
  birthDate: string;
  lifePathNumber: number;
  destinyNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  birthDayNumber: number;
  personalYearNumber: number;
  interpretations: {
    lifePath: { title: string; summary: string; strengths: string[]; advice: string };
    destiny: { title: string; summary: string };
    soulUrge: { title: string; summary: string };
    personality: { title: string; summary: string };
    birthDay: { title: string; summary: string };
    personalYear: { title: string; summary: string };
  };
  luckyElements: {
    numbers: number[];
    colors: string[];
    gemstone: string;
    days: string[];
  };
}

// Pythagorean letter values (1 to 9)
const PYTHAGOREAN_VALUES: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

const VOWELS = new Set(["a", "e", "i", "o", "u"]);

// Reduce to single digit, preserving master numbers 11, 22, 33 when appropriate
function reduceNumber(num: number, preserveMaster = true): number {
  while (num > 9) {
    if (preserveMaster && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    const digits = num.toString().split("").map(Number);
    num = digits.reduce((sum, d) => sum + d, 0);
  }
  return num;
}

export function calculateNumerology(name: string, birthDate: string): NumerologyProfile {
  const [yearStr, monthStr, dayStr] = birthDate.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  // 1. Life Path Number: Sum of reduced day + month + year
  const rDay = reduceNumber(day);
  const rMonth = reduceNumber(month);
  const rYear = reduceNumber(year);
  const lifePath = reduceNumber(rDay + rMonth + rYear);

  // 2. Birth Day Number
  const birthDayNumber = reduceNumber(day, false);

  // 3. Name analysis
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, "");
  let destinySum = 0;
  let soulUrgeSum = 0;
  let personalitySum = 0;

  for (const char of cleanName) {
    const val = PYTHAGOREAN_VALUES[char] || 0;
    destinySum += val;
    if (VOWELS.has(char)) {
      soulUrgeSum += val;
    } else {
      personalitySum += val;
    }
  }

  const destinyNumber = reduceNumber(destinySum);
  const soulUrgeNumber = reduceNumber(soulUrgeSum);
  const personalityNumber = reduceNumber(personalitySum);

  // 4. Personal Year Number: Month + Day + Current Year
  const currentYear = new Date().getFullYear();
  const personalYearNumber = reduceNumber(rDay + rMonth + reduceNumber(currentYear), false);

  // Interpretations library
  const LIFE_PATH_DESC: Record<number, { title: string; summary: string; strengths: string[]; advice: string }> = {
    1: {
      title: "The Pioneer & Visionary Leader",
      summary: "You are imbued with self-reliance, innovative courage, and an innate drive to trailblaze new paths where none existed before.",
      strengths: ["Unyielding initiative", "Original vision", "Courageous problem-solving"],
      advice: "Practice active listening and embrace collaborative team spirit without fearing loss of autonomy.",
    },
    2: {
      title: "The Peacemaker & Intuitive Diplomat",
      summary: "You carry a gentle, deeply perceptive aura that harmonizes conflicts, bridges divides, and creates unity and emotional equilibrium.",
      strengths: ["Empathy", "Subtle mediation", "Artistic perception"],
      advice: "Protect your inner peace by setting firm personal boundaries against emotional overwhelm.",
    },
    3: {
      title: "The Creative Catalyst & Joyous Communicator",
      summary: "You bring vibrant charisma, expressive eloquence, and creative optimism that lifts the spirits of everyone around you.",
      strengths: ["Magnetic storytelling", "Humor and optimism", "Artistic versatility"],
      advice: "Channel your multitude of inspirations into disciplined daily craft to achieve tangible mastery.",
    },
    4: {
      title: "The Master Architect & Steadfast Anchor",
      summary: "You are the foundation upon which enduring institutions are built—practical, loyal, meticulously organized, and dependable.",
      strengths: ["Rock-solid integrity", "Strategic planning", "Infallible follow-through"],
      advice: "Allow room for spontaneous adventures and avoid overly rigid expectations of others.",
    },
    5: {
      title: "The Dynamic Explorer & Visionary of Freedom",
      summary: "You are an adaptable spirit who thrives on movement, diverse cultures, experiential learning, and boundless personal freedom.",
      strengths: ["High adaptability", "Quick learning", "Engaging versatility"],
      advice: "Cultivate patient depth in key relationships and long-term commitments to anchor your brilliance.",
    },
    6: {
      title: "The Sacred Nurturer & Harmonizer",
      summary: "You radiate compassionate responsibility, dedication to family, community healing, and a passionate appreciation for beauty and justice.",
      strengths: ["Devoted mentorship", "Aesthetic eye", "Reliable domestic leadership"],
      advice: "Remember to nurture yourself as devotedly as you care for others; avoid perfectionism.",
    },
    7: {
      title: "The Mystic Scholar & Truth Seeker",
      summary: "You possess a profound analytical mind paired with deep spiritual intuition, yearning to explore the unseen mysteries of existence.",
      strengths: ["Intellectual rigor", "Spiritual discernment", "Independent contemplation"],
      advice: "Balance solitary meditation with warm, authentic engagement with community and friends.",
    },
    8: {
      title: "The Powerhouse Executive & Manifestor",
      summary: "You embody material mastery, executive authority, and the ability to organize vast endeavors for the tangible upliftment of society.",
      strengths: ["Strategic acumen", "Financial insight", "Commanding presence"],
      advice: "Anchor your worldly ambitions in ethical dharma and spiritual charity for lasting legacy.",
    },
    9: {
      title: "The Universal Humanitarian & Sage",
      summary: "You are a broad-minded soul who feels the heartbeat of all humanity, driven to heal, inspire, and elevate collective consciousness.",
      strengths: ["Universal compassion", "Artistic breadth", "Selfless magnanimity"],
      advice: "Release past attachments with grace and forgive freely to keep your heart light and open.",
    },
    11: {
      title: "Master Number 11: The Cosmic Illuminator",
      summary: "A rare vibration of high spiritual intuition, inspiration, and charismatic light that serves as a bridge between spiritual dimensions.",
      strengths: ["Extrasensory intuition", "Inspirational catalyst", "Visionary ideals"],
      advice: "Ground your intense nervous energy in bodily wellness, meditation, and calm nature walks.",
    },
    22: {
      title: "Master Number 22: The Master Builder",
      summary: "The most potent manifestation number, capable of translating grand, cosmic ideals into enduring physical reality for generations.",
      strengths: ["Monumental manifestation", "Practical wisdom", "Global perspective"],
      advice: "Trust your grand vision step-by-step; do not get deterred by small daily friction.",
    },
    33: {
      title: "Master Number 33: The Master Teacher & Avatar of Compassion",
      summary: "The highest vibration of loving service, spiritual teaching, and profound altruism that transforms human suffering into divine light.",
      strengths: ["Universal love", "Transformative teaching", "Compassionate courage"],
      advice: "Preserve personal energetic boundaries and practice regular sacred silence.",
    },
  };

  const lpInfo = LIFE_PATH_DESC[lifePath] || LIFE_PATH_DESC[1];

  const luckyMapping: Record<number, { numbers: number[]; colors: string[]; gemstone: string; days: string[] }> = {
    1: { numbers: [1, 10, 19, 28], colors: ["Gold", "Orange", "Bright Yellow"], gemstone: "Ruby / Sunstone", days: ["Sunday", "Monday"] },
    2: { numbers: [2, 11, 20, 29], colors: ["Silver", "White", "Pearl Cream"], gemstone: "Pearl / Moonstone", days: ["Monday", "Friday"] },
    3: { numbers: [3, 12, 21, 30], colors: ["Saffron", "Golden Yellow", "Purple"], gemstone: "Yellow Sapphire / Citrine", days: ["Thursday", "Tuesday"] },
    4: { numbers: [4, 13, 22, 31], colors: ["Electric Blue", "Grey", "Teal"], gemstone: "Hessonite / Garnet", days: ["Sunday", "Saturday"] },
    5: { numbers: [5, 14, 23], colors: ["Emerald Green", "Turquoise", "Mint"], gemstone: "Emerald / Peridot", days: ["Wednesday", "Friday"] },
    6: { numbers: [6, 15, 24], colors: ["Rose Pink", "Royal Blue", "Diamond White"], gemstone: "Diamond / Opal", days: ["Friday", "Tuesday"] },
    7: { numbers: [7, 16, 25], colors: ["Smoky Violet", "White", "Pale Green"], gemstone: "Cat's Eye / Amethyst", days: ["Monday", "Thursday"] },
    8: { numbers: [8, 17, 26], colors: ["Midnight Blue", "Dark Violet", "Black"], gemstone: "Blue Sapphire / Lapis Lazuli", days: ["Saturday", "Wednesday"] },
    9: { numbers: [9, 18, 27], colors: ["Coral Red", "Crimson", "Rose"], gemstone: "Red Coral / Carnelian", days: ["Tuesday", "Thursday"] },
    11: { numbers: [2, 11, 7], colors: ["Platinum", "Violet", "Silver"], gemstone: "White Topaz / Moonstone", days: ["Monday", "Sunday"] },
    22: { numbers: [4, 22, 8], colors: ["Deep Gold", "Navy Blue", "Amber"], gemstone: "Spessartite / Sapphire", days: ["Saturday", "Thursday"] },
    33: { numbers: [6, 33, 9], colors: ["Iridescent Rose", "Gold", "Sky Blue"], gemstone: "Morganite / Emerald", days: ["Friday", "Thursday"] },
  };

  const lucky = luckyMapping[lifePath] || luckyMapping[1];

  return {
    name,
    birthDate,
    lifePathNumber: lifePath,
    destinyNumber,
    soulUrgeNumber,
    personalityNumber,
    birthDayNumber,
    personalYearNumber,
    interpretations: {
      lifePath: lpInfo,
      destiny: {
        title: `Destiny Number ${destinyNumber}`,
        summary: `Your Destiny (Expression) number reveals that your worldly mission is centered on expressing the traits of archetype ${destinyNumber} through meaningful career endeavors and personal creations.`,
      },
      soulUrge: {
        title: `Soul Urge Number ${soulUrgeNumber}`,
        summary: `Your Heart's Desire (Soul Urge) number whispers the quiet yearning of your spirit: you crave emotional authenticity, spiritual peace, and deep creative or interpersonal connection.`,
      },
      personality: {
        title: `Personality Number ${personalityNumber}`,
        summary: `The persona and first impression you project to the world carries the dignity, poise, and magnetic signature of number ${personalityNumber}.`,
      },
      birthDay: {
        title: `Birth Day Number ${birthDayNumber}`,
        summary: `Born on day ${day}, you have innate talent for ${
          birthDayNumber === 1
            ? "leadership and original enterprise"
            : birthDayNumber === 2
            ? "collaborative balance and intuition"
            : birthDayNumber === 3
            ? "joyful creative expression"
            : birthDayNumber === 4
            ? "methodical architecture and reliability"
            : birthDayNumber === 5
            ? "adaptability and fast communication"
            : birthDayNumber === 6
            ? "harmonious healing and caretaking"
            : birthDayNumber === 7
            ? "contemplative depth and analysis"
            : birthDayNumber === 8
            ? "executive focus and material triumph"
            : "broad humanitarian service and wisdom"
        }.`,
      },
      personalYear: {
        title: `Personal Year ${personalYearNumber} (${currentYear})`,
        summary: `This year is a cycle of ${
          personalYearNumber === 1
            ? "fresh starts, daring new seeds, and entrepreneurial beginnings"
            : personalYearNumber === 2
            ? "patience, gentle partnerships, and consolidating relationships"
            : personalYearNumber === 3
            ? "creative expansion, joyful social connections, and self-expression"
            : personalYearNumber === 4
            ? "disciplined building, hard work, and establishing security"
            : personalYearNumber === 5
            ? "unexpected positive shifts, exciting travel, and fresh freedom"
            : personalYearNumber === 6
            ? "domestic blessings, family focus, and community responsibility"
            : personalYearNumber === 7
            ? "deep introspection, study, spiritual reflection, and skill refinement"
            : personalYearNumber === 8
            ? "financial harvest, executive recognition, and career milestones"
            : "closure, spiritual culmination, compassionate release, and preparing for a new 9-year cycle"
        }.`,
      },
    },
    luckyElements: lucky,
  };
}
