import { NextRequest, NextResponse } from "next/server";
import { KundliData } from "@/lib/astronomy/ephemeris";
import { getUserFromRequest } from "@/lib/auth";
import { saveAIConversation } from "@/lib/db";

interface ChatMessageInput {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [], kundli, conversationId } = await req.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
    }

    const user = await getUserFromRequest(req);

    // Build Astrological Context from active Kundli
    let contextSummary = "";
    if (kundli) {
      const k = kundli as KundliData;
      const planetsStr = k.planets
        .map(
          (p) =>
            `${p.name} in ${p.signName} (House ${p.house}, ${p.dms}, ${p.nakshatraName} pada ${p.pada}, Dignity: ${p.dignity}${
              p.isRetrograde ? ", Retrograde" : ""
            })`
        )
        .join("; ");

      const yogasStr = (k.yogas || []).map((y) => y.name).join(", ");

      contextSummary = `
USER BIRTH CHART PROFILE:
- Name: ${k.birthDetails.name}
- Date & Time of Birth: ${k.birthDetails.date} at ${k.birthDetails.time}
- Place: ${k.birthDetails.place}, ${k.birthDetails.country} (Lat: ${k.birthDetails.latitude}, Lng: ${k.birthDetails.longitude})
- Ascendant (Lagna): ${k.lagna.signName} (${k.lagna.signSanskrit}) at ${k.lagna.dms}, Nakshatra: ${k.lagna.nakshatraName} (Lord: ${k.lagna.nakshatraLord})
- Moon Sign (Rashi): ${k.moonSign.signName} (${k.moonSign.signSanskrit}), Nakshatra: ${k.moonSign.nakshatraName}
- Sun Sign: ${k.sunSign.signName} (${k.sunSign.signSanskrit})
- Planetary Placements: ${planetsStr}
- Major Yogas Detected: ${yogasStr || "General auspicious alignments"}
`;
    }

    let reply = "";

    // Check if an external LLM key is configured (OpenAI or Gemini)
    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const sysPrompt = `You are Astroverse AI, a venerable, master Vedic Jyotish Acharya and compassionate spiritual guide.
Speak with profound wisdom, clarity, reverence, and positivity. Always use the user's authentic birth chart placements provided below.
Explain classical planetary houses, Bhavas, Drishti (aspects), and Nakshatras in an accessible yet authentic manner.
Never make terrifying or fatalistic predictions. Always offer uplifting perspective and practical Vedic remedies (mantras, mindfulness, charity, constructive actions).

${contextSummary}`;

        const prompt = `${sysPrompt}\n\nUser Question: ${message}`;
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );
        const data = await response.json();
        reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (e) {
        console.error("Gemini call error:", e);
      }
    } else if (openAiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `You are Astroverse AI, a revered Vedic Jyotish Acharya and compassionate spiritual guide.
Use the authentic birth chart data: ${contextSummary}. Explain houses and planetary influences clearly with constructive Vedic remedies.`,
              },
              ...history.slice(-6),
              { role: "user", content: message },
            ],
          }),
        });
        const data = await response.json();
        reply = data?.choices?.[0]?.message?.content;
      } catch (e) {
        console.error("OpenAI call error:", e);
      }
    }

    // High-precision Vedic Jyotish Expert Synthesis Engine (Fallback & Default)
    if (!reply) {
      reply = generateVedicAstroResponse(message, kundli as KundliData | undefined);
    }

    // Persist conversation if user is logged in
    let savedConvId = conversationId;
    if (user) {
      const updatedMessages = [
        ...history,
        { id: `msg_${Date.now()}_u`, role: "user", content: message, timestamp: new Date().toISOString() },
        { id: `msg_${Date.now()}_a`, role: "assistant", content: reply, timestamp: new Date().toISOString() },
      ];
      const conv = saveAIConversation(
        user.id,
        history.length === 0 ? message.slice(0, 40) + "..." : "Astrology Session",
        updatedMessages,
        conversationId
      );
      savedConvId = conv.id;
    }

    return NextResponse.json({
      success: true,
      reply,
      conversationId: savedConvId,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "AI consultation failed" }, { status: 500 });
  }
}

// Sophisticated Vedic Jyotish synthesis logic based on actual Kundli
function generateVedicAstroResponse(query: string, kundli?: KundliData): string {
  const q = query.toLowerCase();

  if (!kundli) {
    return `Namaste! Welcome to the sacred chambers of Astroverse. 🌟
To give you an exact, personalized Vedic reading that aligns with planetary truth, please calculate or select your Janam Kundli using your birth date, exact time, and birthplace coordinates.

In general Vedic wisdom:
- **Career & Purpose** are governed by the 10th house (Karma Bhava) and 10th Lord.
- **Relationships & Marriage** are revealed through the 7th house (Kalatra Bhava) and Venus/Jupiter.
- **Wealth & Assets** are reflected in the 2nd and 11th houses (Dhana & Labha Bhavas).
- **Inner Peace & Mind** are guided by the Moon and 4th house (Sukha Bhava).

Load your birth chart to explore your unique planetary alignments!`;
  }

  const k = kundli;
  const lagna = k.lagna;
  const moon = k.moonSign;
  const sun = k.sunSign;
  const h10 = k.houses[9]; // 10th house
  const h7 = k.houses[6]; // 7th house
  const h5 = k.houses[4]; // 5th house
  const h9 = k.houses[8]; // 9th house

  const getPlanet = (name: string) => k.planets.find((p) => p.name === name);
  const jupiter = getPlanet("Jupiter");
  const saturn = getPlanet("Saturn");
  const mars = getPlanet("Mars");
  const venus = getPlanet("Venus");
  const mercury = getPlanet("Mercury");

  // CAREER / JOB / PROFESSION
  if (q.includes("career") || q.includes("job") || q.includes("profession") || q.includes("work") || q.includes("business")) {
    const occupants = h10.planetsInHouse.length > 0 ? h10.planetsInHouse.join(", ") : "no direct planetary occupants (governed primarily by sign ruler)";
    const aspects = h10.aspectingPlanets.length > 0 ? h10.aspectingPlanets.join(", ") : "gentle universal transits";

    return `Namaste ${k.birthDetails.name}. Looking at your 10th House of Karma and Profession:

1. **Ascendant & 10th House Ruler**:
   With your Ascendant in **${lagna.signName} (${lagna.signSanskrit})**, your 10th house falls in the sign of **${h10.signName} (${h10.signSanskrit})**, ruled by **${h10.signLord}**.
   - Your 10th house has ${occupants}.
   - It receives planetary aspects from: ${aspects}.

2. **Professional Temperament & Strengths**:
   - Because ${h10.signLord} governs your professional dharma, you naturally excel in domains that prize strategic leadership, methodical planning, and authentic responsibility.
   ${jupiter ? `- Jupiter in ${jupiter.signName} (House ${jupiter.house}) infuses your work with ethical vision and mentorship ability.` : ""}
   ${saturn ? `- Saturn in ${saturn.signName} (House ${saturn.house}) grants endurance, patience during steep learning curves, and long-term institutional authority.` : ""}

3. **Favorable Directions**:
   Roles in technical architecture, strategy, enterprise leadership, advisory, finance, or analytical research resonate with your planetary lords.

4. **Vedic Career Remedy**:
   - Chant the Gayatri Mantra or Aditya Hridaya Stotram on Sunday mornings to strengthen the Sun's career brilliance.
   - Maintain ethical consistency and offer assistance to juniors or interns to attract Saturn's stabilizing rewards.`;
  }

  // 7th HOUSE / MARRIAGE / RELATIONSHIP / SPOUSE
  if (q.includes("7th") || q.includes("seventh") || q.includes("marriage") || q.includes("relationship") || q.includes("spouse") || q.includes("partner")) {
    const occupants = h7.planetsInHouse.length > 0 ? h7.planetsInHouse.join(", ") : "no harsh malefic occupants, providing peaceful balance";

    return `Namaste ${k.birthDetails.name}. In Vedic astrology, your 7th House (Kalatra Bhava) governs marriage, partnerships, and lifelong companionship:

1. **Sign & Ruler of the 7th House**:
   - Your 7th house is situated in **${h7.signName} (${h7.signSanskrit})**, ruled by **${h7.signLord}**.
   - Placed in this house: ${occupants}.
   - Natural Karaka for relationships: **Venus** is currently situated in **${venus?.signName} (House ${venus?.house})** in your chart, holding **${venus?.dignity}** status.

2. **Spouse Characteristics**:
   - The influence of ${h7.signName} and ${h7.signLord} points to a partner who values mutual intellectual respect, emotional sincerity, and shared life purpose.
   - They bring grounding balance to your ${lagna.signName} Lagna temperament.

3. **Relationship Harmony & Timing**:
   - Partnerships flourish best when built on open, unhurried communication without premature assumptions.
   ${mars && [1, 2, 4, 7, 8, 12].includes(mars.house) ? "- Note: Mars occupies house " + mars.house + ", bringing energetic passion; channel this into shared sports, adventures, or creative home projects rather than heated debate." : "- Your 7th house is unmarred by harsh malefic combinations, promising steady relationship evolution."}

4. **Sacred Vedic Remedy**:
   - Light a fragrant ghee lamp on Friday evenings dedicated to Goddess Mahalakshmi.
   - Keep a silver or sandalwood accent in your private resting space to enhance planetary harmony.`;
  }

  // DASHA / TIME PERIOD / WHEN
  if (q.includes("dasha") || q.includes("mahadasha") || q.includes("timing") || q.includes("when") || q.includes("transit") || q.includes("gochar")) {
    return `Namaste ${k.birthDetails.name}. Timing in Vedic Jyotish is revealed through the interplay of your Vimshottari Dasha and Gochar (planetary transits):

1. **Birth Nakshatra Foundation**:
   Your natal Moon is in **${moon.nakshatraName} Nakshatra** (Pada ${moon.pada}) in the sign of **${moon.signName}**.
   - This birth placement sets the master clock of your Vimshottari cycles starting under ${moon.nakshatraLord}.

2. **Planetary Transit (Gochar) Alignment**:
   - **Jupiter Transit**: Jupiter's benevolent rays are currently illuminating key houses from your natal Moon, fostering expansion, new wisdom, and promising collaborative ventures.
   - **Saturn Transit**: Saturn teaches mastery through discipline, encouraging you to solidify foundations, eliminate distractions, and take your personal commitments seriously.

3. **Upcoming Astrological Window**:
   - The most favorable windows for major new initiatives occur during sub-periods (Antardashas) of benefic planets (${jupiter ? "Jupiter" : "benefic lords"} and ${mercury ? "Mercury" : "Venus"}) or when transiting Moon activates your 1st, 5th, 9th, or 11th houses.

4. **Recommendation**:
   Focus on self-mastery and diligent daily effort rather than anxious anticipation. Planetary grace flows easiest to those who take mindful, steady action!`;
  }

  // DOSHAS / REMEDIES / GEMSTONES
  if (q.includes("dosha") || q.includes("remedy") || q.includes("gemstone") || q.includes("mantra") || q.includes("mangal") || q.includes("kaal sarp")) {
    return `Namaste ${k.birthDetails.name}. Here is your Vedic remedial and gemstone assessment:

1. **Planetary Dosha Status**:
   - **Mangal Placement**: Mars is located in **${mars?.signName} (House ${mars?.house})**.
   ${mars && [1, 2, 4, 7, 8, 12].includes(mars.house) ? "Mars holds a relational placement. However, classical cancellations and benefic aspects provide gentle balancing." : "Mars is placed auspiciously outside sensitive relational houses."}
   - **Rahu-Ketu Axis**: Rahu in **${getPlanet("Rahu")?.signName} (House ${getPlanet("Rahu")?.house})** and Ketu in **${getPlanet("Ketu")?.signName} (House ${getPlanet("Ketu")?.house})** define your spiritual growth axis: moving from past karma into modern evolutionary lessons.

2. **Benefic Gemstones (Ratna)**:
   - For your ${lagna.signName} Ascendant, auspicious gemstones include:
     ${lagna.signLord === "Sun" ? "• **Ruby (Manikya)** to empower vitality and leadership." : ""}
     ${lagna.signLord === "Moon" ? "• **Natural Pearl (Moti)** in silver for emotional serenity." : ""}
     ${lagna.signLord === "Mars" ? "• **Red Coral (Moonga)** in copper/gold for courage." : ""}
     ${lagna.signLord === "Mercury" ? "• **Emerald (Panna)** in gold/brass for sharp intellect." : ""}
     ${lagna.signLord === "Jupiter" ? "• **Yellow Sapphire (Pukhraj)** for wisdom and prosperity." : ""}
     ${lagna.signLord === "Venus" ? "• **White Diamond or Opal** for grace and refined joy." : ""}
     ${lagna.signLord === "Saturn" ? "• **Blue Sapphire (Neelam)** or Amethyst for grounded perseverance." : ""}

3. **Universal Vedic Remedies**:
   - Recite the **Maha Mrityunjaya Mantra** for vitality and planetary shielding.
   - Practice daily gratitude and offer clean drinking water to birds or plants each morning.
   - Engage in selfless acts of seva (charity) on Saturdays to pacify karmic debts.`;
  }

  // DEFAULT COMPREHENSIVE SYNTHESIS
  return `Namaste ${k.birthDetails.name}. 🙏

According to your authentic Janam Kundli calculated with Lahiri Ayanamsa:
- **Lagna (Ascendant)**: ${lagna.signName} (${lagna.signSanskrit}) at ${lagna.dms} — defines your vitality, worldview, and outer persona.
- **Rashi (Moon Sign)**: ${moon.signName} in **${moon.nakshatraName} Nakshatra** — guides your emotional mind and subconscious instincts.
- **Surya (Sun Sign)**: ${sun.signName} — fuels your core soul purpose and willpower.

Regarding your question:
Your chart reflects active planetary influences, particularly through your Ascendant lord **${lagna.signLord}** and 10th house lord **${h10.signLord}**.
${jupiter ? `Benefic **Jupiter** in ${jupiter.signName} provides wisdom and expansive opportunities.` : ""}
${saturn ? `Disciplinarian **Saturn** in ${saturn.signName} ensures that consistent, honest effort yields enduring rewards.` : ""}

Feel free to ask specifically about:
- Your career, job prospects, and business timings
- Your 7th house and relationship compatibility
- Your current Vimshottari Mahadasha and planetary transits
- Suitable gemstones, mantras, and Vedic remedies!`;
}
