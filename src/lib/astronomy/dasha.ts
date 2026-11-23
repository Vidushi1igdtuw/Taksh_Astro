import { NAKSHATRAS, PlanetPosition } from "./ephemeris";

export interface DashaPeriod {
  planet: string;
  startDate: string; // ISO string / formatted date
  endDate: string;
  durationYears: number;
  isCurrent: boolean;
  subPeriods?: DashaPeriod[]; // Antardashas
}

// 120-year Vimshottari Dasha lengths
export const DASHA_YEARS: Record<string, number> = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
};

export const DASHA_ORDER = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
];

export function calculateVimshottariDasha(
  birthDateUtc: Date,
  moonPlanet: PlanetPosition
): {
  mahadashas: DashaPeriod[];
  currentMahadasha: DashaPeriod;
  currentAntardasha: DashaPeriod | null;
  currentPratyantardasha: DashaPeriod | null;
} {
  const nakshatraIndex = moonPlanet.nakshatraId - 1; // 0 to 26
  const lordIndex = nakshatraIndex % 9;
  const startingLord = DASHA_ORDER[lordIndex];

  // Fraction of nakshatra traversed by Moon
  const nakshatraSpan = 360 / 27; // 13.333333°
  const posInNakshatra = moonPlanet.siderealLongitude % nakshatraSpan;
  const fractionElapsed = posInNakshatra / nakshatraSpan;
  const fractionRemaining = 1 - fractionElapsed;

  const totalStartingYears = DASHA_YEARS[startingLord];
  const balanceYears = totalStartingYears * fractionRemaining;

  const now = new Date();
  const mahadashas: DashaPeriod[] = [];

  let currentDate = new Date(birthDateUtc.getTime());

  // First Mahadasha (partial balance)
  const firstEndDate = new Date(currentDate.getTime() + balanceYears * 365.25 * 86400000);
  const isFirstCurrent = now >= currentDate && now < firstEndDate;

  mahadashas.push({
    planet: startingLord,
    startDate: currentDate.toISOString().split("T")[0],
    endDate: firstEndDate.toISOString().split("T")[0],
    durationYears: balanceYears,
    isCurrent: isFirstCurrent,
  });

  currentDate = new Date(firstEndDate.getTime());

  // Subsequent Mahadashas up to 100+ years
  let currentLordIdx = (lordIndex + 1) % 9;
  for (let i = 1; i < 9; i++) {
    const lord = DASHA_ORDER[currentLordIdx];
    const years = DASHA_YEARS[lord];
    const endDate = new Date(currentDate.getTime() + years * 365.25 * 86400000);
    const isCurrent = now >= currentDate && now < endDate;

    mahadashas.push({
      planet: lord,
      startDate: currentDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      durationYears: years,
      isCurrent,
    });

    currentDate = new Date(endDate.getTime());
    currentLordIdx = (currentLordIdx + 1) % 9;
  }

  // Find active Mahadasha
  let currentMaha = mahadashas.find((m) => m.isCurrent) || mahadashas[0];

  // Calculate Antardashas for the current Mahadasha
  const antardashas: DashaPeriod[] = [];
  const mahaLord = currentMaha.planet;
  const mahaStart = new Date(currentMaha.startDate).getTime();
  const mahaTotalYears = DASHA_YEARS[mahaLord];
  let antarDate = new Date(mahaStart);

  const mahaIdx = DASHA_ORDER.indexOf(mahaLord);
  let currentAntar: DashaPeriod | null = null;

  for (let j = 0; j < 9; j++) {
    const antarLord = DASHA_ORDER[(mahaIdx + j) % 9];
    // Formula: (Maha years * Antar years) / 120
    const antarYears = (mahaTotalYears * DASHA_YEARS[antarLord]) / 120;
    const antarEndDate = new Date(antarDate.getTime() + antarYears * 365.25 * 86400000);
    const isAntarCurrent = now >= antarDate && now < antarEndDate;

    const antarItem: DashaPeriod = {
      planet: antarLord,
      startDate: antarDate.toISOString().split("T")[0],
      endDate: antarEndDate.toISOString().split("T")[0],
      durationYears: antarYears,
      isCurrent: isAntarCurrent,
    };

    antardashas.push(antarItem);
    if (isAntarCurrent) currentAntar = antarItem;
    antarDate = new Date(antarEndDate.getTime());
  }

  currentMaha.subPeriods = antardashas;
  if (!currentAntar && antardashas.length > 0) currentAntar = antardashas[0];

  // Calculate Pratyantardasha for current Antardasha
  let currentPraty: DashaPeriod | null = null;
  if (currentAntar) {
    const pratyStart = new Date(currentAntar.startDate).getTime();
    let pratyDate = new Date(pratyStart);
    const antarIdx = DASHA_ORDER.indexOf(currentAntar.planet);

    for (let k = 0; k < 9; k++) {
      const pratyLord = DASHA_ORDER[(antarIdx + k) % 9];
      // Formula: (Maha * Antar * Praty) / (120 * 120)
      const pratyYears =
        (mahaTotalYears * DASHA_YEARS[currentAntar.planet] * DASHA_YEARS[pratyLord]) /
        (120 * 120);
      const pratyEndDate = new Date(pratyDate.getTime() + pratyYears * 365.25 * 86400000);
      const isPratyCurrent = now >= pratyDate && now < pratyEndDate;

      if (isPratyCurrent) {
        currentPraty = {
          planet: pratyLord,
          startDate: pratyDate.toISOString().split("T")[0],
          endDate: pratyEndDate.toISOString().split("T")[0],
          durationYears: pratyYears,
          isCurrent: true,
        };
        break;
      }
      pratyDate = new Date(pratyEndDate.getTime());
    }
  }

  return {
    mahadashas,
    currentMahadasha: currentMaha,
    currentAntardasha: currentAntar,
    currentPratyantardasha: currentPraty,
  };
}
