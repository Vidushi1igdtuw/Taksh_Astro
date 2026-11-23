import { KundliData, NAKSHATRAS, ZODIAC_SIGNS } from "./ephemeris";

export interface KootaScore {
  name: string;
  hindiName: string;
  maxPoints: number;
  obtainedPoints: number;
  area: string;
  description: string;
  status: "Excellent" | "Good" | "Average" | "Poor";
}

export interface CompatibilityResult {
  partner1: { name: string; moonSign: string; nakshatra: string; pada: number };
  partner2: { name: string; moonSign: string; nakshatra: string; pada: number };
  totalScore: number;
  maxScore: number;
  percentage: number;
  verdict: "Exceptional Match" | "Very Good Match" | "Average Match" | "Requires Astrological Remedies";
  summary: string;
  kootas: KootaScore[];
  mangalDoshaMatch: {
    partner1HasDosha: boolean;
    partner2HasDosha: boolean;
    isCompatible: boolean;
    explanation: string;
  };
  strengths: string[];
  challenges: string[];
  remedies: string[];
}

// Varna lookup (1: Brahmin, 2: Kshatriya, 3: Vaishya, 4: Shudra)
const SIGN_VARNA: Record<number, number> = {
  4: 1, 8: 1, 12: 1, // Water: Brahmin
  1: 2, 5: 2, 9: 2,  // Fire: Kshatriya
  2: 3, 6: 3, 10: 3, // Earth: Vaishya
  3: 4, 7: 4, 11: 4, // Air: Shudra
};

// Vashya categories:
// 1: Chatushpada (Quadruped), 2: Manav (Human), 3: Jalchar (Water), 4: Vanchar (Wild), 5: Keeta (Insect)
const SIGN_VASHYA: Record<number, number> = {
  1: 1, 2: 1, 9: 1, 10: 1, // Mesha, Vrishabha, 2nd half Dhanu, 1st half Makara
  3: 2, 6: 2, 7: 2, 11: 2, // Gemini, Virgo, Libra, Kumbha, 1st half Dhanu
  4: 3, 12: 3,             // Cancer, Pisces, 2nd half Makara
  5: 4,                    // Leo
  8: 5,                    // Scorpio
};

// Planetary Friendships for Graha Maitri
const GRAHA_FRIENDS: Record<string, { friends: string[]; neutrals: string[]; enemies: string[] }> = {
  Sun: { friends: ["Moon", "Mars", "Jupiter"], neutrals: ["Mercury"], enemies: ["Venus", "Saturn"] },
  Moon: { friends: ["Sun", "Mercury"], neutrals: ["Mars", "Jupiter", "Venus", "Saturn"], enemies: [] },
  Mars: { friends: ["Sun", "Moon", "Jupiter"], neutrals: ["Venus", "Saturn"], enemies: ["Mercury"] },
  Mercury: { friends: ["Sun", "Venus"], neutrals: ["Mars", "Jupiter", "Saturn"], enemies: ["Moon"] },
  Jupiter: { friends: ["Sun", "Moon", "Mars"], neutrals: ["Saturn"], enemies: ["Mercury", "Venus"] },
  Venus: { friends: ["Mercury", "Saturn"], neutrals: ["Mars", "Jupiter"], enemies: ["Sun", "Moon"] },
  Saturn: { friends: ["Mercury", "Venus"], neutrals: ["Jupiter"], enemies: ["Sun", "Moon", "Mars"] },
};

// Nadi categories for 27 nakshatras (1: Adi, 2: Madhya, 3: Antya)
const NAKSHATRA_NADI: number[] = [
  1, 2, 3, 3, 2, 1, 1, 2, 3, // 1 to 9
  3, 2, 1, 1, 2, 3, 3, 2, 1, // 10 to 18
  1, 2, 3, 3, 2, 1, 1, 2, 3, // 19 to 27
];

export function calculateAshtakootaMilan(
  k1: KundliData,
  k2: KundliData
): CompatibilityResult {
  const p1MoonSignId = k1.moonSign.signId;
  const p2MoonSignId = k2.moonSign.signId;

  const p1PlanetMoon = k1.planets.find((p) => p.name === "Moon")!;
  const p2PlanetMoon = k2.planets.find((p) => p.name === "Moon")!;

  const p1NakId = p1PlanetMoon.nakshatraId; // 1 to 27
  const p2NakId = p2PlanetMoon.nakshatraId;

  const p1Lord = ZODIAC_SIGNS[p1MoonSignId - 1].ruler;
  const p2Lord = ZODIAC_SIGNS[p2MoonSignId - 1].ruler;

  const kootas: KootaScore[] = [];

  // 1. VARNA (1 Point) - Spiritual ego & caste compatibility
  const v1 = SIGN_VARNA[p1MoonSignId] || 2;
  const v2 = SIGN_VARNA[p2MoonSignId] || 2;
  let varnaScore = 0;
  if (v1 <= v2) {
    varnaScore = 1;
  }
  kootas.push({
    name: "Varna",
    hindiName: "वर्ण",
    maxPoints: 1,
    obtainedPoints: varnaScore,
    area: "Spiritual Harmony & Ego Compatibility",
    description: varnaScore === 1
      ? "Mutual spiritual respect and ego equilibrium are naturally balanced."
      : "Minor ego adjustments recommended; neither partner should impose dominance.",
    status: varnaScore === 1 ? "Excellent" : "Average",
  });

  // 2. VASHYA (2 Points) - Mutual attraction & magnetic control
  const vashya1 = SIGN_VASHYA[p1MoonSignId] || 1;
  const vashya2 = SIGN_VASHYA[p2MoonSignId] || 1;
  let vashyaScore = 0;
  if (vashya1 === vashya2) {
    vashyaScore = 2;
  } else if ((vashya1 === 1 && vashya2 === 2) || (vashya1 === 2 && vashya2 === 1)) {
    vashyaScore = 1;
  } else {
    vashyaScore = 0.5;
  }
  kootas.push({
    name: "Vashya",
    hindiName: "वश्य",
    maxPoints: 2,
    obtainedPoints: vashyaScore,
    area: "Mutual Attraction & Relational Magnetic Power",
    description: vashyaScore >= 1.5
      ? "Harmonious balance of influence; partners naturally align on common life goals."
      : "Balanced mutual decision making prevents uneven power dynamics.",
    status: vashyaScore >= 1.5 ? "Excellent" : "Average",
  });

  // 3. TARA (3 Points) - Destiny & birth star longevity
  // Distance from Nak1 to Nak2 mod 9, and vice versa
  const diff1 = ((p2NakId - p1NakId + 27) % 9) + 1;
  const diff2 = ((p1NakId - p2NakId + 27) % 9) + 1;
  const auspiciousTaras = [1, 2, 4, 6, 8, 9]; // Janma, Sampat, Kshema, Sadhana, Mitra, Param Mitra
  const t1Good = auspiciousTaras.includes(diff1);
  const t2Good = auspiciousTaras.includes(diff2);
  let taraScore = 0;
  if (t1Good && t2Good) taraScore = 3;
  else if (t1Good || t2Good) taraScore = 1.5;
  else taraScore = 0;

  kootas.push({
    name: "Tara",
    hindiName: "तारा",
    maxPoints: 3,
    obtainedPoints: taraScore,
    area: "Destiny, Well-being & Longevity Alignment",
    description: taraScore >= 2
      ? "Auspicious Tara alignment promises mutual prosperity, protection, and vital health."
      : "Average Tara balance; routine mindfulness sustains steady wellbeing.",
    status: taraScore >= 2 ? "Excellent" : taraScore > 0 ? "Average" : "Poor",
  });

  // 4. YONI (4 Points) - Biological & physical intimacy
  const nak1 = NAKSHATRAS[p1NakId - 1];
  const nak2 = NAKSHATRAS[p2NakId - 1];
  let yoniScore = 2;
  if (nak1.yoni === nak2.yoni) {
    yoniScore = 4;
  } else {
    // Enemy animal pairs: Cat-Rat, Cow-Tiger, Horse-Buffalo, Dog-Deer, Monkey-Sheep, Serpent-Mongoose
    const enemyPairs: [string, string][] = [
      ["Cat", "Rat"],
      ["Cow", "Tiger"],
      ["Horse", "Buffalo"],
      ["Dog", "Deer"],
      ["Monkey", "Sheep"],
      ["Serpent", "Mongoose"],
      ["Lion", "Elephant"],
    ];
    const isEnemy = enemyPairs.some(
      ([a, b]) => (nak1.yoni === a && nak2.yoni === b) || (nak1.yoni === b && nak2.yoni === a)
    );
    if (isEnemy) yoniScore = 0;
    else yoniScore = 2.5;
  }

  kootas.push({
    name: "Yoni",
    hindiName: "योनि",
    maxPoints: 4,
    obtainedPoints: yoniScore,
    area: "Intimacy, Physical Temperament & Biology",
    description: yoniScore >= 3
      ? `High intimacy harmony (${nak1.yoni} & ${nak2.yoni}). Deep affectionate resonance.`
      : yoniScore > 0
      ? `Neutral animal yoni affinity (${nak1.yoni} & ${nak2.yoni}). Genuine affection flourishes through empathy.`
      : `Challenging yoni dynamic (${nak1.yoni} & ${nak2.yoni}). Requires extra tenderness and physical patience.`,
    status: yoniScore >= 3 ? "Excellent" : yoniScore > 1 ? "Good" : "Poor",
  });

  // 5. GRAHA MAITRI (5 Points) - Mental rapport & friendship
  const p1Friends = GRAHA_FRIENDS[p1Lord] || { friends: [], neutrals: [], enemies: [] };
  const p2Friends = GRAHA_FRIENDS[p2Lord] || { friends: [], neutrals: [], enemies: [] };

  const p1IsFriend = p2Friends.friends.includes(p1Lord);
  const p2IsFriend = p1Friends.friends.includes(p2Lord);
  const p1IsEnemy = p2Friends.enemies.includes(p1Lord);
  const p2IsEnemy = p1Friends.enemies.includes(p2Lord);

  let grahaScore = 2.5;
  if (p1Lord === p2Lord) {
    grahaScore = 5;
  } else if (p1IsFriend && p2IsFriend) {
    grahaScore = 5;
  } else if ((p1IsFriend && !p2IsEnemy) || (p2IsFriend && !p1IsEnemy)) {
    grahaScore = 4;
  } else if (p1IsEnemy && p2IsEnemy) {
    grahaScore = 0;
  } else if (p1IsEnemy || p2IsEnemy) {
    grahaScore = 1;
  }

  kootas.push({
    name: "Graha Maitri",
    hindiName: "ग्रह मैत्री",
    maxPoints: 5,
    obtainedPoints: grahaScore,
    area: "Psychological Rapport & Friendship",
    description: grahaScore >= 4
      ? `Governed by harmonious planetary lords (${p1Lord} and ${p2Lord}). Effortless intellectual bonding and mutual affection.`
      : grahaScore >= 2
      ? `Moderate planetary friendship (${p1Lord} and ${p2Lord}). Shared interests create solid understanding.`
      : `Differing planetary temperaments (${p1Lord} and ${p2Lord}). Conscious communication builds the bridge.`,
    status: grahaScore >= 4 ? "Excellent" : grahaScore >= 2 ? "Good" : "Poor",
  });

  // 6. GANA (6 Points) - Temperament (Deva, Manushya, Rakshasa)
  const g1 = nak1.gana;
  const g2 = nak2.gana;
  let ganaScore = 0;
  if (g1 === g2) {
    ganaScore = 6;
  } else if ((g1 === "Deva" && g2 === "Manushya") || (g1 === "Manushya" && g2 === "Deva")) {
    ganaScore = 5;
  } else if ((g1 === "Manushya" && g2 === "Rakshasa") || (g1 === "Rakshasa" && g2 === "Manushya")) {
    ganaScore = 1;
  } else {
    // Deva and Rakshasa
    ganaScore = 0;
  }

  kootas.push({
    name: "Gana",
    hindiName: "गण",
    maxPoints: 6,
    obtainedPoints: ganaScore,
    area: "Temperamental Alignment & Societal Nature",
    description: ganaScore >= 5
      ? `Complementary ganas (${g1} and ${g2}). Naturally aligned values and domestic rhythm.`
      : ganaScore >= 1
      ? `Varied ganas (${g1} and ${g2}). Diversity of perspective enriches personal growth.`
      : `Contrasting temperaments (${g1} and ${g2}). Cultivate mutual acceptance and space.`,
    status: ganaScore >= 5 ? "Excellent" : ganaScore >= 1 ? "Average" : "Poor",
  });

  // 7. BHAKOOT (7 Points) - Family welfare & emotional bond
  // Relative sign distance: 2/12, 6/8, 9/5 are classic Bhakoot doshas
  const signDistance = ((p2MoonSignId - p1MoonSignId + 12) % 12) + 1;
  let bhakootScore = 7;
  let bhakootNote = "Auspicious Bhakoot alignment indicating sustained marital bliss and family harmony.";
  if (signDistance === 2 || signDistance === 12) {
    bhakootScore = 0;
    bhakootNote = "2/12 Dwi-Dwadash combination (expenditure & financial variance; mitigated if lords are friendly).";
  } else if (signDistance === 6 || signDistance === 8) {
    bhakootScore = 0;
    bhakootNote = "6/8 Shadashtaka combination (health & emotional friction; requires shared hobbies).";
  } else if (signDistance === 9 || signDistance === 5) {
    bhakootScore = 0;
    bhakootNote = "9/5 Navapancham combination (philosophical variance; deeply educational when appreciated).";
  }

  // Mitigation: If same lord or friendly lords, Bhakoot dosha is cancelled!
  if (bhakootScore === 0 && (p1Lord === p2Lord || grahaScore >= 4)) {
    bhakootScore = 7;
    bhakootNote += " Cancelled by auspicious planetary lordship friendship!";
  }

  kootas.push({
    name: "Bhakoot",
    hindiName: "भकूट",
    maxPoints: 7,
    obtainedPoints: bhakootScore,
    area: "Emotional Welfare, Prosperity & Family Growth",
    description: bhakootNote,
    status: bhakootScore === 7 ? "Excellent" : "Poor",
  });

  // 8. NADI (8 Points) - Genetic compatibility & vitality
  const n1 = NAKSHATRA_NADI[p1NakId - 1] || 1;
  const n2 = NAKSHATRA_NADI[p2NakId - 1] || 1;
  const nadiNames = ["Adi (Vata)", "Madhya (Pitta)", "Antya (Kapha)"];
  let nadiScore = 8;
  let nadiStatus: "Excellent" | "Good" | "Average" | "Poor" = "Excellent";
  let nadiDesc = `Different Nadis (${nadiNames[n1 - 1]} & ${nadiNames[n2 - 1]}). Excellent genetic balance and physical longevity.`;

  if (n1 === n2) {
    // Same Nadi: classical Nadi Dosha
    // Check classical cancellations: different signs, same sign but different nakshatras, etc.
    if (p1MoonSignId !== p2MoonSignId) {
      nadiScore = 8;
      nadiDesc = `Same Nadi (${nadiNames[n1 - 1]}), but neutralized because Moon signs are different (${ZODIAC_SIGNS[p1MoonSignId - 1].name} and ${ZODIAC_SIGNS[p2MoonSignId - 1].name}).`;
      nadiStatus = "Good";
    } else {
      nadiScore = 0;
      nadiDesc = `Same Nadi (${nadiNames[n1 - 1]}). Classical Nadi Dosha present; traditional Vedic remedies and Mahamrityunjaya chanting recommended.`;
      nadiStatus = "Poor";
    }
  }

  kootas.push({
    name: "Nadi",
    hindiName: "नाड़ी",
    maxPoints: 8,
    obtainedPoints: nadiScore,
    area: "Genetic Vitality, Health & Progeny",
    description: nadiDesc,
    status: nadiStatus,
  });

  // Total Score
  const totalScore = kootas.reduce((acc, k) => acc + k.obtainedPoints, 0);
  const maxScore = 36;
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Verdict
  let verdict: CompatibilityResult["verdict"] = "Average Match";
  if (totalScore >= 28) verdict = "Exceptional Match";
  else if (totalScore >= 21) verdict = "Very Good Match";
  else if (totalScore >= 18) verdict = "Average Match";
  else verdict = "Requires Astrological Remedies";

  // Mangal Dosha check for both
  const p1Mars = k1.planets.find((p) => p.name === "Mars");
  const p2Mars = k2.planets.find((p) => p.name === "Mars");
  const doshaHouses = [1, 2, 4, 7, 8, 12];
  const p1HasDosha = p1Mars ? doshaHouses.includes(p1Mars.house) : false;
  const p2HasDosha = p2Mars ? doshaHouses.includes(p2Mars.house) : false;

  let mangalCompatible = true;
  let mangalExplanation = "";
  if (p1HasDosha && p2HasDosha) {
    mangalCompatible = true;
    mangalExplanation = "Both partners possess Mangal Dosha; classical Vedic astrology teaches that mutual Manglik placements balance and neutralize each other!";
  } else if (!p1HasDosha && !p2HasDosha) {
    mangalCompatible = true;
    mangalExplanation = "Neither partner has Mangal Dosha. Highly balanced relational alignment.";
  } else {
    mangalCompatible = false;
    mangalExplanation = `${p1HasDosha ? k1.birthDetails.name : k2.birthDetails.name} has Mangal Dosha while the other does not. Simple traditional pacifications bring harmonious equilibrium.`;
  }

  const strengths: string[] = [];
  const challenges: string[] = [];

  if (grahaScore >= 4) strengths.push("Exceptional mental and communicative rapport (High Graha Maitri).");
  if (nadiScore === 8) strengths.push("Strong biological, energetic, and genetic vitality (Nadi Koota cleared).");
  if (bhakootScore === 7) strengths.push("Deep enduring emotional commitment and family joy (Bhakoot harmony).");
  if (varnaScore === 1 && vashyaScore >= 1.5) strengths.push("Balanced mutual respect without ego clashes.");

  if (nadiScore === 0) challenges.push("Nadi Dosha detected: recommend reciting Maha Mrityunjaya mantra.");
  if (bhakootScore === 0) challenges.push("Bhakoot variance: mindful communication on finances and family planning.");
  if (ganaScore === 0) challenges.push("Different behavioral temperaments: embrace each other's individual space.");
  if (!mangalCompatible) challenges.push("Single-sided Manglik combination: practice patience during Martian transits.");

  const remedies = [
    "Recite the sacred Gayatri Mantra together in the morning for mutual peace and spiritual aura.",
    "Observe kindness towards elders in both families to cultivate ancestral blessings (Pitra Kripa).",
    "Keep a pair of rose quartz crystals or light a scented sandalwood diya in the northeast corner of the home.",
    "On wedding anniversaries, feed cows or donate grains and fruits to charity.",
  ];

  return {
    partner1: {
      name: k1.birthDetails.name,
      moonSign: k1.moonSign.signName,
      nakshatra: k1.moonSign.nakshatraName,
      pada: k1.moonSign.pada,
    },
    partner2: {
      name: k2.birthDetails.name,
      moonSign: k2.moonSign.signName,
      nakshatra: k2.moonSign.nakshatraName,
      pada: k2.moonSign.pada,
    },
    totalScore,
    maxScore,
    percentage,
    verdict,
    summary: `Ashtakoota Milan achieves ${totalScore} out of 36 points (${percentage}%). This pairing holds ${
      totalScore >= 21
        ? "excellent cosmic potential for enduring love, companionship, and mutual fulfillment."
        : "a meaningful bond that thrives with patient understanding and traditional remedies."
    }`,
    kootas,
    mangalDoshaMatch: {
      partner1HasDosha: p1HasDosha,
      partner2HasDosha: p2HasDosha,
      isCompatible: mangalCompatible,
      explanation: mangalExplanation,
    },
    strengths: strengths.length ? strengths : ["Mutual willingness to grow and evolve together."],
    challenges: challenges.length ? challenges : ["No major planetary roadblocks detected."],
    remedies,
  };
}
