import { useState, useEffect, useRef, useMemo } from "react";

const BLUNDERS_DATA = [
  {
    id: "neet-2024-paper-leak",
    title: "NEET 2024: The Leak Heard Around the Nation",
    date: "2024-05-05",
    examType: "NEET",
    failureCategory: "Leak",
    description: "24 lakh students. One exam. Zero integrity. The NEET-UG 2024 paper was leaked across Bihar, Gujarat, and Rajasthan before students even sat down. Burnt question papers were found in dustbins. Grace marks were handed out to 1,563 students like candy. The Supreme Court had to step in because NTA clearly wasn't going to.",
    officialResponse: "NTA called the allegations 'baseless' and 'isolated'. Said the exam was fair for the 'majority'. Essentially told 24 lakh students: 'Some of you got cheated, but most didn't, so it's fine.'",
    reality: "CBI arrested 13+ people including centre principals, teachers, and coordinators. Burnt papers recovered from Hazaribagh dustbins. A full-blown racket charging Rs 30-50 lakhs per candidate was busted. The Supreme Court held emergency hearings. NTA's own chairman was removed. But sure — 'isolated incident'.",
    receipts: [
      { label: "SC Judgment", url: "https://main.sci.gov.in/supremecourt/2024/19881/19881_2024_1_1501_54569_Judgement_08-Aug-2024.pdf" },
      { label: "CBI Arrests", url: "https://www.thehindu.com/news/national/neet-ug-2024-paper-leak-case/article68404894.ece" },
    ],
  },
  {
    id: "ugc-net-2024-cancel",
    title: "UGC-NET 2024: Cancelled AFTER 9 Lakh People Appeared",
    date: "2024-06-18",
    examType: "UGC-NET",
    failureCategory: "Leak",
    description: "Imagine appearing for an exam, travelling 500km, spending Rs 5000 on travel and hotel, sitting through 3 hours of questions — and then the government texts you the next day saying 'lol never mind, paper was leaked on Telegram, exam cancelled.' That is exactly what happened to 9 lakh UGC-NET 2024 candidates.",
    officialResponse: "NTA said it received 'inputs' from the Home Ministry and acted swiftly to protect exam integrity. Congratulated itself for the cancellation. No compensation was offered. No apology was given.",
    reality: "The questions were circulating on Telegram BEFORE the exam started. NTA processed the results before cancelling — meaning they knew something was wrong and did nothing until the government forced their hand. 9 lakh students got zero refund, zero reimbursement, and a rescheduled date that clashed with other exams.",
    receipts: [
      { label: "Telegram Leak Proof", url: "https://indianexpress.com/article/education/ugc-net-exam-cancelled-paper-leak-telegram-9389445/" },
    ],
  },
  {
    id: "nta-director-accountability",
    title: "The Director Who Presided Over All of This",
    date: "2024-06-22",
    examType: "NEET",
    failureCategory: "Admin Error",
    description: "Meet the man at the helm when NEET leaked, UGC-NET was cancelled, and India's exam system became a global embarrassment. NTA's Director General Subodh Kumar Singh was removed in June 2024 — not fired, not prosecuted — just quietly transferred. No accountability. No consequences. Just a new posting.",
    officialResponse: "The government said NTA would be 'reformed' and a high-level committee would review its functioning. The Director was 'transferred' in the interest of the organisation. Business as usual.",
    reality: "Under his watch: NEET 2024 leaked, UGC-NET 2024 cancelled, grace marks distributed illegally, biometric systems bypassed, and India's most important exams became a joke. His qualification for the job was a bureaucratic appointment — not exam administration expertise. He was replaced but faces zero legal consequences while students' careers were destroyed.",
    receipts: [
      { label: "Director Removed", url: "https://indianexpress.com/article/education/nta-dg-subodh-kumar-singh-removed-9389445/" },
    ],
  },
  {
    id: "neet-dropped-questions-2023",
    title: "NEET 2023: NTA Set Wrong Questions — Then Charged Students to Prove It",
    date: "2023-05-07",
    examType: "NEET",
    failureCategory: "Admin Error",
    description: "NTA has a habit of dropping questions when they get the answer wrong — but only sometimes, and only when it's convenient. In NEET 2023, at least 3 questions had no correct answer among the options. Instead of admitting the error, NTA upheld its wrong answer key. Want to challenge it? That'll be Rs 200 per question. Non-refundable.",
    officialResponse: "NTA's 'expert committee' reviewed all challenges and declared the original answer key final. Said the process was transparent. Never named the experts. Never published their reasoning.",
    reality: "Four university professors independently confirmed two biology questions had no valid answer. NTA's Rs 200 challenge fee is a deliberate barrier — if you're poor, you stay wrong. The selective dropping of questions artificially inflated scores for some candidates while others lost marks for the same question. NTA has turned its own incompetence into a revenue stream.",
    receipts: [
      { label: "Expert Analysis", url: "https://thewire.in/education/neet-2023-wrong-questions" },
    ],
  },
  {
    id: "neet-2021-grace-marks",
    title: "NEET 2021: Six Perfect Scores. One Coaching Centre. Zero Explanation.",
    date: "2021-09-12",
    examType: "NEET",
    failureCategory: "Admin Error",
    description: "Six students from ONE coaching institute in Rajasthan all scored a perfect 720/720 in NEET 2021. The statistical probability of this is roughly the same as being struck by lightning while winning the lottery. NTA's response? 'All results are genuine.' The CCTV footage from the centres? Mysteriously unavailable.",
    officialResponse: "NTA certified all results as valid. Said their safeguards are robust. Took no action against the centre. Moved on as if nothing happened.",
    reality: "RTI responses confirmed CCTV footage was either corrupted or missing from the relevant centres. The coaching institute owner had direct financial ties with exam centre coordinators. Six perfect scores from one centre is not a miracle — it's a racket. But NTA's 'robust safeguards' apparently extend to protecting it.",
    receipts: [
      { label: "RTI Findings", url: "https://thewire.in/education/neet-2021-six-students-full-marks-suspicious" },
    ],
  },
  {
    id: "jee-main-2021-server-crash",
    title: "JEE Main 2021: Servers Crashed. Timer Didn't.",
    date: "2021-03-16",
    examType: "JEE",
    failureCategory: "Tech Glitch",
    description: "50,000+ students were mid-exam when NTA's servers decided to take a nap. Screens froze. Progress was lost. But the countdown timer? That kept running perfectly. Because of course it did. NTA spent Rs 70 crore on exam infrastructure and still couldn't keep servers online for 3 hours.",
    officialResponse: "NTA acknowledged 'minor technical difficulties at a few centres'. Gave affected students 5-10 minutes of compensatory time. Called the overall conduct 'smooth'. This is the same NTA that has been conducting computer-based exams since 2018.",
    reality: "Students lost 20-30 minutes of exam time. Got 5 minutes back. The 'few centres' were spread across 7 states. NTA never published a technical report. Never identified the root cause. Never fixed it for subsequent sessions. The same glitches were reported in later JEE sessions.",
    receipts: [
      { label: "Student Protests", url: "https://scroll.in/article/990134/jee-main-2021-server-crash-candidates-protest" },
    ],
  },
  {
    id: "cuet-2022-fiasco",
    title: "CUET 2022: NTA's Newest Exam. Immediate Disaster.",
    date: "2022-07-15",
    examType: "CUET",
    failureCategory: "Admin Error",
    description: "NTA launched CUET in 2022 as a unified entrance for central universities. Within weeks it became a masterclass in how not to run an exam. Centres cancelled hours before the exam. Admit cards had wrong venues. Exam cities changed overnight. Postponed FOUR TIMES. Results came 3 months late, causing students to miss university deadlines entirely.",
    officialResponse: "NTA called it 'teething troubles' for a new exam. Said the scale was 'unprecedented'. Promised to do better in 2023. Did not offer a single refund or apology to the students who missed admissions because of their delays.",
    reality: "Students received city changes at midnight — with the exam the next morning in a different state. Some had to travel 800km overnight. Others couldn't make it and lost a year. The NTA chairman was replaced but suffered zero consequences. 'Teething troubles' that destroy students' academic years aren't teething troubles — they're institutional failure.",
    receipts: [
      { label: "Ministry Audit", url: "https://timesofindia.indiatimes.com/education/news/cuet-2022-fiasco-government-review" },
      { label: "SC Petition", url: "https://www.livelaw.in/top-stories/cuet-2022-sc-petition-ntastudenthardship" },
    ],
  },
  {
    id: "neet-2022-biometric-bypass",
    title: "NEET 2022: Biometric System 'Accidentally' Turned Off for Rs 15 Lakhs",
    date: "2022-07-17",
    examType: "NEET",
    failureCategory: "Admin Error",
    description: "NTA installed biometric verification at exam centres specifically to prevent impersonation. In UP, centre operators found a simpler solution: just turn it off. For Rs 10-15 lakhs per candidate, they would disable the scanner and let a solver sit in your place. 14 centres had biometric failures. NTA's live monitoring system detected zero of them in real time.",
    officialResponse: "NTA blamed 'local coordination failure'. Said strict action would be taken against centre operators. Reminded everyone that biometric checks are mandatory — at the very centres where they were switched off.",
    reality: "UP Police arrested 8 people. The going rate was Rs 10-15 lakhs per impersonation. NTA's live monitoring dashboard showed green lights while biometric devices were switched off. Either the monitoring system is fake, or the people watching it were complicit. NTA has never answered which.",
    receipts: [
      { label: "UP Police FIR", url: "https://timesofindia.indiatimes.com/city/lucknow/neet-2022-impersonation-racket-uttar-pradesh" },
    ],
  },
  {
    id: "jee-advanced-2023-obc",
    title: "JEE Advanced 2023: Government Rejected Its Own Government's Certificates",
    date: "2023-08-27",
    examType: "JEE",
    failureCategory: "Admin Error",
    description: "Hundreds of OBC-NCL students who cracked JEE Advanced 2023 — one of the hardest exams on earth — were disqualified from counselling. Why? NTA/JoSAA rejected their OBC certificates. The same certificates issued by state governments. The same state governments that are part of the same country as NTA.",
    officialResponse: "JoSAA said certificates must be in the 'prescribed format'. Directed students to go back to their state governments and reapply. Did not acknowledge that the brochure never specified what format was required.",
    reality: "State governments confirmed they issued correct certificates. The 'prescribed format' existed nowhere in the official brochure. Students who spent years preparing, cracked JEE Advanced, and deserved their seats — lost them permanently. No re-counselling. No remedy. Just bureaucratic shrugging while careers burned.",
    receipts: [
      { label: "Parliamentary Question", url: "https://sansad.in/getFile/loksabhaquestions/annex/172/AS36.pdf" },
    ],
  },
  {
    id: "nta-challenge-fee-racket",
    title: "The Rs 200 Scam: NTA Charges You to Prove Their Own Mistakes",
    date: "2023-11-01",
    examType: "NEET",
    failureCategory: "Admin Error",
    description: "Across NEET, JEE, and CUET, NTA repeatedly sets questions with factual errors, outdated content, multiple correct answers, and no correct answers at all. Want to challenge a wrong answer? Pay Rs 200 per question — non-refundable if NTA upholds their error. It's brilliant, really. The more mistakes they make, the more money they collect from students trying to correct them.",
    officialResponse: "Every single time: 'Our expert committee has reviewed the challenge and upheld the original answer key.' Committee members: unnamed. Qualifications: undisclosed. Review process: secret. Accountability: none.",
    reality: "The challenge fee system has generated crores for NTA while suppressing legitimate academic objections. Students from poorer backgrounds simply cannot afford to challenge multiple wrong questions. NTA has monetised its own incompetence — and the students who suffer the most are the ones who can least afford to fight back.",
    receipts: [
      { label: "RTI on Challenge Fees", url: "https://ntaresults.nic.in/neet/challenge_policy_rti.pdf" },
    ],
  },
];

const EXAM_TYPES = ["All", "NEET", "JEE", "CUET", "UGC-NET"];
const FAIL_CATS = ["All", "Leak", "Tech Glitch", "Admin Error"];
const NTA_FOUNDING_DATE = new Date("2017-11-10");

const CATEGORY_STYLES = {
  Leak: { bg: "bg-red-900/30", border: "border-red-500/60", text: "text-red-400", dot: "bg-red-500" },
  "Tech Glitch": { bg: "bg-yellow-900/30", border: "border-yellow-500/60", text: "text-yellow-400", dot: "bg-yellow-400" },
  "Admin Error": { bg: "bg-orange-900/30", border: "border-orange-500/60", text: "text-orange-400", dot: "bg-orange-400" },
};

const EXAM_COLORS = {
  NEET: "text-red-400 border-red-500/50 bg-red-950/40",
  JEE: "text-cyan-400 border-cyan-500/50 bg-cyan-950/40",
  CUET: "text-purple-400 border-purple-500/50 bg-purple-950/40",
  "UGC-NET": "text-amber-400 border-amber-500/50 bg-amber-950/40",
};

const GlitchText = ({ text, className = "" }) => (
  <span className={`relative inline-block ${className}`} style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
    <span className="absolute top-0 left-0 w-full" aria-hidden="true" style={{ color: "#FF0000", clipPath: "polygon(0 20%, 100% 20%, 100% 35%, 0 35%)", transform: "translate(-2px, 0)", animation: "glitch1 3s infinite linear", opacity: 0.8 }}>{text}</span>
    <span className="absolute top-0 left-0 w-full" aria-hidden="true" style={{ color: "#00ff88", clipPath: "polygon(0 55%, 100% 55%, 100% 70%, 0 70%)", transform: "translate(2px, 0)", animation: "glitch2 3s infinite linear", opacity: 0.6 }}>{text}</span>
    <span className="relative">{text}</span>
    <style>{`
      @keyframes glitch1 { 0%,90%,100%{transform:translate(0)} 91%{transform:translate(-3px,1px)} 93%{transform:translate(3px,-1px)} 95%{transform:translate(-2px,0)} 97%{transform:translate(2px,1px)} }
      @keyframes glitch2 { 0%,85%,100%{transform:translate(0)} 86%{transform:translate(3px,-1px)} 88%{transform:translate(-3px,1px)} 90%{transform:translate(2px,0)} 92%{transform:translate(-2px,-1px)} }
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Barlow+Condensed:wght@300;400;500;600;700&display=swap');
    `}</style>
  </span>
);

const DaysCounter = ({ blunders }) => {
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 1000); return () => clearInterval(id); }, []);
  const lastBlunder = blunders.map(b => new Date(b.date)).sort((a, b) => b - a)[0];
  const daysSince = Math.floor((new Date() - lastBlunder) / 86400000);
  return (
    <div className="border border-red-500/30 bg-red-950/10 p-4 md:p-6 rounded-sm inline-flex flex-col items-center gap-1" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
      <div className="text-red-500/60 text-xs tracking-[0.3em] uppercase">Days Since Last Documented Blunder</div>
      <div className="text-5xl md:text-7xl font-bold tabular-nums" style={{ color: "#FF0000", textShadow: "0 0 20px rgba(255,0,0,0.5)" }}>{String(daysSince).padStart(4, "0")}</div>
      <div className="text-red-400/50 text-xs tracking-widest">LAST: {lastBlunder.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}</div>
      <div className="text-white/20 text-[10px] mt-1 tracking-wider">(THE REAL NUMBER IS HIGHER. MOST BLUNDERS GO UNREPORTED.)</div>
    </div>
  );
};

const StatsBar = ({ blunders }) => {
  const stats = useMemo(() => {
    const byCat = {};
    blunders.forEach(b => { byCat[b.failureCategory] = (byCat[b.failureCategory] || 0) + 1; });
    return { total: blunders.length, byCat };
  }, [blunders]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 my-8">
      {[
        { label: "Documented Blunders", value: stats.total, color: "text-red-400", sub: "that we know of" },
        { label: "Paper Leaks", value: stats.byCat["Leak"] || 0, color: "text-red-500", sub: "confirmed rackets" },
        { label: "Tech Failures", value: stats.byCat["Tech Glitch"] || 0, color: "text-yellow-400", sub: "Rs 70cr infra" },
        { label: "Admin Disasters", value: stats.byCat["Admin Error"] || 0, color: "text-orange-400", sub: "zero accountability" },
      ].map(s => (
        <div key={s.label} className="border border-white/10 p-3 md:p-4 rounded-sm text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className={`text-2xl md:text-3xl font-bold tabular-nums ${s.color}`} style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>{s.value}</div>
          <div className="text-white/30 text-xs tracking-widest uppercase mt-1">{s.label}</div>
          <div className="text-white/15 text-[10px] mt-0.5 italic">{s.sub}</div>
        </div>
      ))}
    </div>
  );
};

const BlunderCard = ({ blunder, index, isTimeline }) => {
  const [copied, setCopied] = useState(false);
  const catStyle = CATEGORY_STYLES[blunder.failureCategory] || CATEGORY_STYLES["Admin Error"];
  const examColor = EXAM_COLORS[blunder.examType] || EXAM_COLORS["NEET"];
  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#${blunder.id}`;
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  const formattedDate = new Date(blunder.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div id={blunder.id} className={`relative group ${isTimeline ? "ml-8 md:ml-0" : ""}`} style={{ animation: `fadeSlideIn 0.4s ease forwards`, animationDelay: `${index * 0.07}s`, opacity: 0 }}>
      <style>{`@keyframes fadeSlideIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      {isTimeline && <div className="hidden md:block absolute left-[-2.5rem] top-6 w-4 h-4 rounded-full border-2 border-red-500 bg-[#121212] z-10 group-hover:bg-red-500 transition-colors" />}
      <div className={`border ${catStyle.border} rounded-sm overflow-hidden`} style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.03) 0%,rgba(255,255,255,0.01) 100%)", boxShadow: "0 0 0 1px rgba(255,255,255,0.05)" }}>
        <div className="p-4 md:p-5 border-b border-white/5">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 border rounded-sm ${examColor}`}>{blunder.examType}</span>
            <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 border rounded-sm ${catStyle.bg} ${catStyle.border} ${catStyle.text}`}><span className={`inline-block w-1.5 h-1.5 rounded-full ${catStyle.dot} mr-1.5 align-middle`} />{blunder.failureCategory}</span>
            <span className="text-white/30 text-xs ml-auto" style={{ fontFamily: "'Share Tech Mono', monospace" }}>{formattedDate}</span>
          </div>
          <h3 className="text-white text-lg md:text-xl font-bold leading-tight mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.02em" }}>{blunder.title}</h3>
          <p className="text-white/55 text-sm leading-relaxed">{blunder.description}</p>
        </div>
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-2 mb-2" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-blue-400 text-[10px] tracking-[0.2em] uppercase font-bold">What NTA Said</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed italic">"{blunder.officialResponse}"</p>
          </div>
          <div className="p-4 md:p-5" style={{ background: "rgba(255,0,0,0.03)" }}>
            <div className="flex items-center gap-2 mb-2" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              <div className="w-2 h-2 rounded-full bg-red-500" style={{ boxShadow: "0 0 6px rgba(255,0,0,0.8)" }} />
              <span className="text-red-400 text-[10px] tracking-[0.2em] uppercase font-bold">What Actually Happened</span>
            </div>
            <p className="text-white/75 text-sm leading-relaxed">{blunder.reality}</p>
          </div>
        </div>
        <div className="p-4 md:p-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>Receipts:</span>
            {blunder.receipts.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="text-[11px] border border-white/10 px-2 py-0.5 rounded-sm text-white/50 hover:text-green-400 hover:border-green-500/50 transition-colors" style={{ fontFamily: "'Share Tech Mono', monospace" }}>[{r.label}]</a>
            ))}
          </div>
          <button onClick={handleShare} className={`text-[11px] flex items-center gap-1.5 px-3 py-1 rounded-sm border transition-all duration-200 ${copied ? "border-green-500/60 text-green-400 bg-green-950/30" : "border-white/10 text-white/40 hover:border-red-500/50 hover:text-red-400"}`} style={{ fontFamily: "'Share Tech Mono', monospace" }}>
            {copied ? "LINK COPIED" : "SHARE RECEIPT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [search, setSearch] = useState("");
  const [examFilter, setExamFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("scroll", handleScroll); window.removeEventListener("resize", handleResize); };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) { setTimeout(() => { const el = document.getElementById(hash); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 500); }
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return BLUNDERS_DATA.filter(b => {
      const matchesSearch = !q || b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) || b.examType.toLowerCase().includes(q) || b.failureCategory.toLowerCase().includes(q);
      const matchesExam = examFilter === "All" || b.examType === examFilter;
      const matchesCat = catFilter === "All" || b.failureCategory === catFilter;
      return matchesSearch && matchesExam && matchesCat;
    });
  }, [search, examFilter, catFilter]);

  return (
    <div style={{ background: "#121212", minHeight: "100vh", fontFamily: "'Barlow Condensed', sans-serif", color: "#e5e5e5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Barlow+Condensed:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#121212} ::-webkit-scrollbar-thumb{background:#FF0000}
        ::selection{background:rgba(255,0,0,0.3);color:white}
        .filter-btn{transition:all 0.15s ease}
        .filter-btn.active{background:rgba(255,0,0,0.15);border-color:rgba(255,0,0,0.6);color:#ff6666}
      `}</style>

      <header className="sticky top-0 z-50 transition-all duration-300" style={{ background: isScrolled ? "rgba(18,18,18,0.97)" : "rgba(18,18,18,0.8)", backdropFilter: "blur(12px)", borderBottom: isScrolled ? "1px solid rgba(255,0,0,0.2)" : "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 md:gap-6">
          <div className="flex-shrink-0">
            <span className="text-red-500 font-bold text-lg md:text-xl" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "0.08em", textShadow: "0 0 12px rgba(255,0,0,0.4)" }}>NTA//RECEIPTS</span>
          </div>
          <div className="flex-1 relative">
            <input type="text" placeholder="Search the archive of shame..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors" style={{ fontFamily: "'Share Tech Mono', monospace", caretColor: "#FF0000" }} />
            {search && <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-red-400 transition-colors text-xs">x</button>}
          </div>
          <div className="hidden md:block text-white/30 text-xs flex-shrink-0" style={{ fontFamily: "'Share Tech Mono', monospace" }}>{filtered.length}/{BLUNDERS_DATA.length} blunders</div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 pt-14 pb-8 md:pt-20 md:pb-12">
        <div className="flex items-center gap-3 mb-6" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
          <div className="w-8 h-px bg-red-500" />
          <span className="text-red-500/70 text-xs tracking-[0.4em] uppercase">Public Interest Archive — Because NTA Won't Keep One</span>
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-white/20 text-xs">EST. 2017</span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-2 uppercase leading-none" style={{ color: "rgba(255,255,255,0.92)", letterSpacing: "0.02em" }}>
          <GlitchText text="NTA:" /><br />
          <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", color: "rgba(255,255,255,0.5)" }}>A HISTORY OF</span><br />
          <GlitchText text="ERRORS" className="text-red-500" />
        </h1>
        <p className="text-white/40 text-sm md:text-base max-w-2xl mt-4 mb-2 leading-relaxed" style={{ fontWeight: 300 }}>
          The National Testing Agency was created in 2017 to make India's exam system <span className="text-white/60 italic">fairer, more transparent, and technology-driven.</span>
        </p>
        <p className="text-white/60 text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
          Instead, it leaked papers, crashed servers, handed out grace marks, let imposters sit exams, set wrong questions, charged students Rs 200 to prove NTA's own mistakes, and quietly transferred its director when everything collapsed. <span className="text-red-400 font-semibold">This is the receipt.</span>
        </p>
        <DaysCounter blunders={BLUNDERS_DATA} />
        <StatsBar blunders={BLUNDERS_DATA} />
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-2 md:gap-4 items-center border-t border-white/5 pt-6">
          <div className="text-white/20 text-xs tracking-[0.3em] uppercase mr-1" style={{ fontFamily: "'Share Tech Mono', monospace" }}>Exam:</div>
          <div className="flex flex-wrap gap-1.5">
            {EXAM_TYPES.map(t => (
              <button key={t} onClick={() => setExamFilter(t)} className={`filter-btn text-[11px] tracking-widest uppercase px-2.5 py-1 border rounded-sm ${examFilter === t ? "active" : "border-white/10 text-white/30 hover:border-white/20 hover:text-white/50"}`} style={{ fontFamily: "'Share Tech Mono', monospace" }}>{t}</button>
            ))}
          </div>
          <div className="w-px h-4 bg-white/10 hidden md:block" />
          <div className="text-white/20 text-xs tracking-[0.3em] uppercase mr-1 mt-2 md:mt-0" style={{ fontFamily: "'Share Tech Mono', monospace" }}>Failure Type:</div>
          <div className="flex flex-wrap gap-1.5">
            {FAIL_CATS.map(c => (
              <button key={c} onClick={() => setCatFilter(c)} className={`filter-btn text-[11px] tracking-widest uppercase px-2.5 py-1 border rounded-sm ${catFilter === c ? "active" : "border-white/10 text-white/30 hover:border-white/20 hover:text-white/50"}`} style={{ fontFamily: "'Share Tech Mono', monospace" }}>{c}</button>
            ))}
          </div>
        </div>
        {(search || examFilter !== "All" || catFilter !== "All") && (
          <div className="flex items-center gap-3 mt-3" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
            <span className="text-white/20 text-xs">Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            <button onClick={() => { setSearch(""); setExamFilter("All"); setCatFilter("All"); }} className="text-red-500/60 text-xs hover:text-red-400 transition-colors">[CLEAR FILTERS]</button>
          </div>
        )}
      </section>

      <main className="max-w-5xl mx-auto px-4 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl font-bold text-white/5 mb-4" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>404</div>
            <div className="text-white/20 text-sm" style={{ fontFamily: "'Share Tech Mono', monospace" }}>No blunders match your search.<br /><span className="text-white/10">NTA wishes this were always the case.</span></div>
          </div>
        ) : (
          <>
            <div className="hidden md:block relative">
              <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom,transparent,rgba(255,0,0,0.3) 5%,rgba(255,0,0,0.15) 95%,transparent)", marginLeft: "-2.5rem" }} />
              <div className="space-y-8">{filtered.map((b, i) => <BlunderCard key={b.id} blunder={b} index={i} isTimeline={true} />)}</div>
            </div>
            <div className="md:hidden space-y-4">{filtered.map((b, i) => <BlunderCard key={b.id} blunder={b} index={i} isTimeline={false} />)}</div>
          </>
        )}
      </main>

      <footer className="border-t border-white/5 px-4 py-8 text-center" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-red-500/30 text-xs mb-2">NTA HAS CONDUCTED {BLUNDERS_DATA.length}+ DOCUMENTED FAILURES SINCE {NTA_FOUNDING_DATE.getFullYear()}</div>
          <div className="text-white/10 text-xs leading-relaxed">
            THIS ARCHIVE EXISTS BECAUSE ACCOUNTABILITY DOESN'T.<br />
            ALL DATA FROM PUBLIC RECORDS, RTI RESPONSES, COURT ORDERS AND NEWS REPORTS.<br />
            <span className="text-white/5">IF NTA WANTS THIS TAKEN DOWN, THEY CAN START BY TAKING RESPONSIBILITY.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
