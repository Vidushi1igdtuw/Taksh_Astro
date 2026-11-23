import { KundliData, PlanetPosition } from "./ephemeris";
import * as Astronomy from "astronomy-engine";
import { getLahiriAyanamsa } from "./ephemeris";

export interface DoshaReport {
  mangalDosha: {
    isPresent: boolean;
    severity: "None" | "Low" | "Medium" | "High";
    isCancelled: boolean;
    cancellationReason?: string;
    affectedHouse: number;
    details: string;
    remedies: string[];
  };
  kaalSarpDosha: {
    isPresent: boolean;
    type: string; // e.g. Anant, Kulik, Vasuki, etc.
    isPurna: boolean; // Purna (Full) vs Anshik (Partial)
    description: string;
    remedies: string[];
  };
  pitraDosha: {
    isPresent: boolean;
    intensity: "None" | "Mild" | "Moderate" | "Strong";
    description: string;
    remedies: string[];
  };
  guruChandalDosha: {
    isPresent: boolean;
    description: string;
    remedies: string[];
  };
  sadeSati: {
    status: "None" | "Phase 1 (Rising)" | "Phase 2 (Peak)" | "Phase 3 (Setting)" | "Dhaiya (4th)" | "Dhaiya (8th)";
    currentSaturnSign: string;
    natalMoonSign: string;
    explanation: string;
    remedies: string[];
  };
}

export function analyzeDoshas(kundli: KundliData): DoshaReport {
  const getPlanet = (name: string): PlanetPosition | undefined =>
    kundli.planets.find((p) => p.name === name);

  const mars = getPlanet("Mars");
  const moon = getPlanet("Moon");
  const sun = getPlanet("Sun");
  const jupiter = getPlanet("Jupiter");
  const saturn = getPlanet("Saturn");
  const rahu = getPlanet("Rahu");
  const ketu = getPlanet("Ketu");
  const venus = getPlanet("Venus");

  // 1. MANGAL DOSHA (Kuja Dosha)
  // Mars in houses 1, 2, 4, 7, 8, 12 from Lagna
  let mangalPresent = false;
  let affectedHouse = 0;
  let severity: "None" | "Low" | "Medium" | "High" = "None";
  let isCancelled = false;
  let cancellationReason = "";

  if (mars) {
    const doshaHouses = [1, 2, 4, 7, 8, 12];
    if (doshaHouses.includes(mars.house)) {
      mangalPresent = true;
      affectedHouse = mars.house;
      severity = [7, 8].includes(mars.house) ? "High" : [1, 4].includes(mars.house) ? "Medium" : "Low";

      // Classical cancellations
      if (mars.signName === "Aries" && mars.house === 1) {
        isCancelled = true;
        cancellationReason = "Mars is in its own sign Aries in the 1st house (Ruchaka Yoga nullification).";
      } else if (mars.signName === "Scorpio" && mars.house === 4) {
        isCancelled = true;
        cancellationReason = "Mars is in its own sign Scorpio in the 4th house.";
      } else if (mars.signName === "Capricorn" && mars.house === 7) {
        isCancelled = true;
        cancellationReason = "Mars is exalted in Capricorn in the 7th house.";
      } else if (mars.signName === "Leo" && mars.house === 8) {
        isCancelled = true;
        cancellationReason = "Mars is in friendly royal sign Leo in the 8th house.";
      } else if (mars.signName === "Sagittarius" && mars.house === 12) {
        isCancelled = true;
        cancellationReason = "Mars is in friendly sign Sagittarius in the 12th house.";
      } else if (jupiter && ((jupiter.house - mars.house + 12) % 12 === 6 || (mars.house - jupiter.house + 12) % 12 === 4 || (mars.house - jupiter.house + 12) % 12 === 8)) {
        isCancelled = true;
        cancellationReason = "Mars is aspected by divine benefic Jupiter.";
      } else if (moon && mars.house === moon.house) {
        isCancelled = true;
        cancellationReason = "Moon and Mars conjoin forming Chandra-Mangala auspicious yoga.";
      }
    }
  }

  const mangalRemedies = [
    "Chant the sacred Gayatri Mantra or Mangal Gayatri: 'Om Angarkaya Vidmahe, Bhoomipalaya Dheemahi, Tanno Bhoumah Prachodayat'.",
    "Observe fasting on Tuesdays and donate red lentils (masoor dal) or jaggery to the underprivileged.",
    "Practice conscious, patient communication in relationships to channel the Martian dynamic energy constructively.",
    "Keep a neem tree or water sacred Tulsi plants regularly at home.",
  ];

  // 2. KAAL SARP DOSHA
  // When all 7 planets are hemmed in between Rahu and Ketu
  let kaalSarpPresent = false;
  let kaalSarpType = "None";
  let isPurna = false;

  if (rahu && ketu) {
    const rahuHouse = rahu.house;
    const ketuHouse = ketu.house;

    // Check if other 7 planets are on one side of Rahu-Ketu axis
    const nonNodePlanets = kundli.planets.filter((p) => p.name !== "Rahu" && p.name !== "Ketu");
    let countClockwise = 0;
    let countCounterClockwise = 0;

    for (const p of nonNodePlanets) {
      const dist = (p.house - rahuHouse + 12) % 12;
      if (dist > 0 && dist < 6) {
        countClockwise++;
      } else if (dist > 6 && dist < 12) {
        countCounterClockwise++;
      }
    }

    if (countClockwise === 7 || countCounterClockwise === 7) {
      kaalSarpPresent = true;
      isPurna = true;
    } else if (countClockwise === 6 || countCounterClockwise === 6) {
      kaalSarpPresent = true;
      isPurna = false; // Anshik
    }

    if (kaalSarpPresent) {
      const kaalSarpTypes = [
        "Anant Kaal Sarp (Rahu in 1st, Ketu in 7th)",
        "Kulik Kaal Sarp (Rahu in 2nd, Ketu in 8th)",
        "Vasuki Kaal Sarp (Rahu in 3rd, Ketu in 9th)",
        "Shankhpal Kaal Sarp (Rahu in 4th, Ketu in 10th)",
        "Padma Kaal Sarp (Rahu in 5th, Ketu in 11th)",
        "Mahapadma Kaal Sarp (Rahu in 6th, Ketu in 12th)",
        "Takshak Kaal Sarp (Rahu in 7th, Ketu in 1st)",
        "Karkotak Kaal Sarp (Rahu in 8th, Ketu in 2nd)",
        "Shankhachur Kaal Sarp (Rahu in 9th, Ketu in 3rd)",
        "Ghatak Kaal Sarp (Rahu in 10th, Ketu in 4th)",
        "Vishdhar Kaal Sarp (Rahu in 11th, Ketu in 5th)",
        "Sheshnag Kaal Sarp (Rahu in 12th, Ketu in 6th)",
      ];
      kaalSarpType = kaalSarpTypes[rahuHouse - 1] || "Kaal Sarp Yoga";
    }
  }

  const kaalSarpRemedies = [
    "Recite Maha Mrityunjaya Mantra 108 times on Mondays for planetary peace and inner clarity.",
    "Perform Jalabhishekam on Shivling on Pradosham days or Mondays with fresh water and bilva leaves.",
    "Serve elders and maintain harmonious balance between material goals and spiritual disciplines.",
    "Feed birds and stray animals on Saturdays or Wednesdays.",
  ];

  // 3. PITRA DOSHA
  // Sun conjunct or aspected by Rahu/Saturn, or 9th house affliction
  let pitraPresent = false;
  let pitraIntensity: "None" | "Mild" | "Moderate" | "Strong" = "None";

  if (sun && rahu && saturn) {
    const sunRahuConj = sun.house === rahu.house;
    const sunSaturnConj = sun.house === saturn.house;
    const h9 = kundli.houses[8];
    const rahuInH9 = h9.planetsInHouse.includes("Rahu");

    if (sunRahuConj && rahuInH9) {
      pitraPresent = true;
      pitraIntensity = "Strong";
    } else if (sunRahuConj || (sunSaturnConj && h9.signLord === "Sun")) {
      pitraPresent = true;
      pitraIntensity = "Moderate";
    } else if (rahuInH9 || sunSaturnConj) {
      pitraPresent = true;
      pitraIntensity = "Mild";
    }
  }

  const pitraRemedies = [
    "Offer water (Tarpan) and respect to ancestors during Amavasya (new moon) and Pitru Paksha.",
    "Donate cooked food, grains, or warm clothes to the needy in honor of ancestral blessings.",
    "Cultivate respect for parents and senior family members, seeking their daily blessings.",
    "Feed cows fresh green grass or chapatis on Sundays.",
  ];

  // 4. GURU CHANDAL DOSHA
  // Jupiter conjunct Rahu or Ketu
  let guruChandalPresent = false;
  if (jupiter && rahu && ketu) {
    if (jupiter.house === rahu.house || jupiter.house === ketu.house) {
      guruChandalPresent = true;
    }
  }

  const guruChandalRemedies = [
    "Respect teachers, gurus, and spiritual mentors; avoid cynicism towards higher wisdom.",
    "Chant Brihaspati Beej Mantra: 'Om Gram Greem Groom Sah Gurave Namah'.",
    "Donate yellow items (turmeric, yellow cloth, chana dal) on Thursdays.",
  ];

  // 5. SHANI SADE SATI & DHAIYA
  // Calculate current transiting Saturn position in the sky right now
  const now = new Date();
  const currentAyanamsa = getLahiriAyanamsa(now);
  const saturnVec = Astronomy.GeoVector(Astronomy.Body.Saturn, now, false);
  const saturnEcl = Astronomy.Ecliptic(saturnVec);
  const currentSaturnSidereal = ((saturnEcl.elon - currentAyanamsa) % 360 + 360) % 360;
  const currentSaturnSignId = Math.floor(currentSaturnSidereal / 30) + 1; // 1 to 12

  const signNames = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  const currentSaturnSignName = signNames[currentSaturnSignId - 1];
  const natalMoonSignId = kundli.moonSign.signId;
  const natalMoonSignName = kundli.moonSign.signName;

  // Relative house of transiting Saturn from natal Moon
  const relHouse = ((currentSaturnSignId - natalMoonSignId + 12) % 12) + 1;

  let sadeSatiStatus: DoshaReport["sadeSati"]["status"] = "None";
  let sadeSatiExplanation = "";

  if (relHouse === 12) {
    sadeSatiStatus = "Phase 1 (Rising)";
    sadeSatiExplanation = `Saturn is transiting your 12th house from natal Moon (${currentSaturnSignName}). This initial phase invites introspection, streamlining financial expenditures, and letting go of unproductive habits.`;
  } else if (relHouse === 1) {
    sadeSatiStatus = "Phase 2 (Peak)";
    sadeSatiExplanation = `Saturn is currently transiting directly over your natal Moon sign (${currentSaturnSignName}). This is the core transformation phase that builds tremendous resilience, emotional discipline, and character.`;
  } else if (relHouse === 2) {
    sadeSatiStatus = "Phase 3 (Setting)";
    sadeSatiExplanation = `Saturn is transiting your 2nd house from natal Moon (${currentSaturnSignName}). This concluding phase helps stabilize wealth, solidify lasting life foundations, and bring practical clarity to speech and family life.`;
  } else if (relHouse === 4) {
    sadeSatiStatus = "Dhaiya (4th)";
    sadeSatiExplanation = `Saturn is currently transiting your 4th house from natal Moon (Kantaka Shani), encouraging focus on domestic balance, home harmony, and mental calm.`;
  } else if (relHouse === 8) {
    sadeSatiStatus = "Dhaiya (8th)";
    sadeSatiExplanation = `Saturn is transiting your 8th house from natal Moon (Ashtama Shani), fostering deep transformation, patience in career milestones, and careful physical wellbeing.`;
  } else {
    sadeSatiExplanation = `Saturn is currently transiting ${currentSaturnSignName} (House ${relHouse} from your natal Moon). You are not currently under Sade Sati or Dhaiya. Planetary influences remain balanced.`;
  }

  const sadeSatiRemedies = [
    "Recite the Hanuman Chalisa on Tuesdays and Saturdays for courage, mental clarity, and protection.",
    "Light an oil lamp with sesame or mustard oil under a Peepal tree or in a quiet sacred corner on Saturday evenings.",
    "Cultivate honesty, humble work ethics, and avoid haste in financial transactions.",
    "Help laborers, helpers, and individuals with disabilities without expecting reciprocal favor.",
  ];

  return {
    mangalDosha: {
      isPresent: mangalPresent,
      severity,
      isCancelled,
      cancellationReason: isCancelled ? cancellationReason : undefined,
      affectedHouse,
      details: mangalPresent
        ? `Mars is situated in house ${affectedHouse} (${mars?.signName}). ${
            isCancelled
              ? `Benefic Vedic combinations cancel this Dosha: ${cancellationReason}`
              : "Produces vigorous vitality that yields highest dividends when channeled with emotional composure."
          }`
        : "Mars is favorably placed in your chart outside the sensitive relational houses. No Mangal Dosha detected.",
      remedies: mangalRemedies,
    },
    kaalSarpDosha: {
      isPresent: kaalSarpPresent,
      type: kaalSarpType,
      isPurna,
      description: kaalSarpPresent
        ? `Identified as ${kaalSarpType} (${isPurna ? "Full/Purna" : "Partial/Anshik"}). Planets are aligned within the nodal axis, creating an intense life trajectory with profound eventual triumphs.`
        : "Planets are distributed across multiple sectors of your chart. No Kaal Sarp combination exists.",
      remedies: kaalSarpRemedies,
    },
    pitraDosha: {
      isPresent: pitraPresent,
      intensity: pitraIntensity,
      description: pitraPresent
        ? `Ancestral influence detected at ${pitraIntensity} level. Indicates karmic duties towards lineage and ancestral goodwill.`
        : "Sun and the 9th house of Dharma enjoy auspicious aspects. No Pitra Dosha detected.",
      remedies: pitraRemedies,
    },
    guruChandalDosha: {
      isPresent: guruChandalPresent,
      description: guruChandalPresent
        ? "Jupiter and Rahu/Ketu share a house. Prompts unconventional thinking and non-traditional wisdom pathways."
        : "Jupiter is unhindered by shadow planet conjunctions, offering clear judgment and moral clarity.",
      remedies: guruChandalRemedies,
    },
    sadeSati: {
      status: sadeSatiStatus,
      currentSaturnSign: currentSaturnSignName,
      natalMoonSign: natalMoonSignName,
      explanation: sadeSatiExplanation,
      remedies: sadeSatiRemedies,
    },
  };
}
