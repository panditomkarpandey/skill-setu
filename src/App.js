import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Award, ShieldCheck, TrendingUp, Briefcase, Users,
  ChevronRight, CheckCircle2, AlertCircle, MessageSquare, Send,
  Sun, Moon, Zap, WifiOff, Filter, ArrowUpRight, Check, BarChart3,
  Target, Flame
} from 'lucide-react';

const INITIAL_STUDENT_DATA = {
  name: "Aarav Sharma",
  department: "Computer Science & Engineering",
  college: "National Institute of Technology",
  year: "3rd Year (Batch 2026)",
  targetRole: "Full Stack Engineer",
  bridgeScore: 78,
  streakDays: 14,
  weeklyGoalProgress: 4, // out of 5
  nextNudge: {
    title: "Complete System Design Micro-Assessment",
    description: "Your target role requires High Availability concepts. Complete this 5-min quiz to boost your score by +4 pts.",
    actionText: "Take Quiz Now",
    targetScreen: "assessment"
  },
  skills: [
    { name: "React.js", level: 85, required: 80, category: "Frontend", status: "verified", proof: "Project: E-Commerce Web App" },
    { name: "Node.js & Express", level: 80, required: 85, category: "Backend", status: "verified", proof: "Cert: Backend Architecture" },
    { name: "System Design", level: 45, required: 75, category: "Architecture", status: "gap", proof: "None" },
    { name: "Database (PostgreSQL)", level: 70, required: 70, category: "Database", status: "verified", proof: "Project: Analytics Engine" },
    { name: "Data Structures & Algo", level: 90, required: 85, category: "Core CS", status: "verified", proof: "Assessment Score: 96%" },
    { name: "Cloud & DevOps (AWS)", level: 35, required: 65, category: "Infrastructure", status: "gap", proof: "None" }
  ],
  badges: [
    { id: 'b1', name: 'DS & Algo Master', issuer: 'Setu Verified Assessment', date: 'May 2026', icon: '⚡', proofType: 'Assessment' },
    { id: 'b2', name: 'React Frontend Specialist', issuer: 'GitHub Verified Commit Audit', date: 'Apr 2026', icon: '🎨', proofType: 'Project Repo' },
    { id: 'b3', name: 'SQL Query Architect', issuer: 'PostgreSQL Challenge', date: 'Mar 2026', icon: '🗄️', proofType: 'Certification' }
  ]
};

const MATCH_JOBS = [
  {
    id: 1,
    company: "NexusTech Labs",
    logo: "⚡",
    role: "Junior Full Stack Engineer",
    location: "Bengaluru / Remote",
    stipend: "₹18 LPA / Internship: ₹45,000/mo",
    matchPercent: 92,
    whyFits: "Strong overlap in React.js and DSA. Your verified project 'Analytics Engine' matches their tech stack.",
    verifiedSkills: ["React.js", "Node.js", "DSA"],
    type: "Internship + PPO"
  },
  {
    id: 2,
    company: "CloudScale Systems",
    logo: "☁️",
    role: "Backend Engineer Intern",
    location: "Hyderabad",
    stipend: "₹40,000/mo",
    matchPercent: 84,
    whyFits: "High database proficiency. Improving your Cloud/DevOps score will bump this to 95%+.",
    verifiedSkills: ["Node.js", "PostgreSQL"],
    type: "Internship"
  },
  {
    id: 3,
    company: "Innovate AI",
    logo: "🤖",
    role: "Frontend Developer (React Specialist)",
    location: "Remote",
    stipend: "₹14 - ₹16 LPA",
    matchPercent: 88,
    whyFits: "Your React.js badge puts you in the top 5% of student applicants for this role.",
    verifiedSkills: ["React.js", "JavaScript"],
    type: "Full-Time"
  }
];

const INITIAL_APPLICATIONS = [
  { id: 101, company: "NexusTech Labs", role: "Junior Full Stack Engineer", status: "Assessment", date: "22 Sep 2026", nextStep: "Online Coding Test due in 2 days" },
  { id: 102, company: "Zeta Data Systems", role: "Frontend Dev Intern", status: "Shortlisted", date: "18 Sep 2026", nextStep: "Technical Interview scheduling" },
  { id: 103, company: "Apex Cloud Services", role: "DevOps Engineer Trainee", status: "Applied", date: "15 Sep 2026", nextStep: "Application under TPO review" }
];

const COLLEGE_METRICS = {
  totalStudents: 1240,
  placedPercent: 74,
  avgBridgeScore: 68,
  deptGaps: [
    { dept: "Computer Science", topGap: "System Design & AWS", score: 76, students: 320 },
    { dept: "Information Tech", topGap: "Cloud Native & Docker", score: 71, students: 280 },
    { dept: "Electronics (ECE)", topGap: "Embedded C++ & Python", score: 62, students: 340 },
    { dept: "Mechanical Engg", topGap: "CAD Automation & Data Skills", score: 54, students: 300 }
  ],
  topRecruiters: ["NexusTech", "CloudScale", "Infosys", "Tata Consultancy", "Innovate AI"]
};

const RECRUITER_CANDIDATES = [
  { id: "c1", name: "Aarav Sharma", dept: "CSE", score: 78, verifiedBadges: 3, matchRole: "Full Stack Engineer", status: "Available", topSkills: ["React.js", "Node.js", "DSA"] },
  { id: "c2", name: "Priya Patel", dept: "IT", score: 89, verifiedBadges: 5, matchRole: "Cloud Engineer", status: "Interviewing", topSkills: ["AWS", "Docker", "Python"] },
  { id: "c3", name: "Rohan Verma", dept: "ECE", score: 72, verifiedBadges: 2, matchRole: "Embedded Systems", status: "Available", topSkills: ["C++", "IoT", "Microcontrollers"] },
  { id: "c4", name: "Ananya Iyer", dept: "CSE", score: 91, verifiedBadges: 6, matchRole: "Backend Architect", status: "Placed", topSkills: ["System Design", "Go", "PostgreSQL"] }
];

export default function SkillSetuApp() {
  // Global State
  const [role, setRole] = useState('student'); // 'student', 'college', 'recruiter'
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'assessment', 'coach', 'feed', 'applications', 'college', 'recruiter', 'profile'
  const [darkMode, setDarkMode] = useState(false);
  const [lowBandwidth, setLowBandwidth] = useState(false);
  
  // Student Context State
  const [studentData, setStudentData] = useState(INITIAL_STUDENT_DATA);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  
  // AI Coach Chat State
  const [chatLanguage, setChatLanguage] = useState('en'); // 'en' | 'hi'
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste Aarav! 🙏 I am Setu AI, your career mentor. I see you are aiming for Full Stack Engineer roles. How can I guide you today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Assessment Quiz State
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0);

  // Sync role switch with appropriate initial screen
  useEffect(() => {
    if (role === 'college') setCurrentScreen('college');
    else if (role === 'recruiter') setCurrentScreen('recruiter');
    else setCurrentScreen('home');
  }, [role]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMsg = inputMessage;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      const query = userMsg.toLowerCase();

      if (chatLanguage === 'hi') {
        if (query.includes('score') || query.includes('bridge')) {
          aiResponse = "आपका Bridge Score अभी 78 है। System Design और Cloud (AWS) का टेस्ट पूरा करके आप इसे 85+ तक पहुंचा सकते हैं! 🚀";
        } else if (query.includes('interview') || query.includes('prep')) {
          aiResponse = "Full Stack इंटरव्यू के लिए, पहले DSA और React State Management पर ध्यान दें। क्या आप Mock Question हल करना चाहेंगे?";
        } else {
          aiResponse = "मैं आपकी कैसे सहायता कर सकता हूँ? आप मुझसे Bridge Score बढ़ाने, Resume Review या Placement Strategy के बारे में पूछ सकते हैं।";
        }
      } else {
        if (query.includes('score') || query.includes('bridge') || query.includes('gap')) {
          aiResponse = "Your Bridge Score is currently 78/100. Your biggest gap is System Design (45%). Improving this will increase your match rate for High-paying Full Stack roles by 24%!";
        } else if (query.includes('resume') || query.includes('project')) {
          aiResponse = "Your 'Analytics Engine' project is verified! I recommend adding AWS deployment metrics to your portfolio to convert your cloud skill gap into a verified badge.";
        } else {
          aiResponse = "Great question! Focusing on problem-solving consistency (14-day streak active!) and completing 1 micro-assessment per week is the fastest way to get shortlisted by recruiters on Skill Setu.";
        }
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const quizQuestions = [
    {
      q: "In high-traffic system design, what primary problem does a Read Replica database solve?",
      options: [
        "Increases write throughput drastically",
        "Offloads heavy SELECT query load from the primary DB",
        "Replaces the need for caching layers like Redis",
        "Ensures automatic encryption at rest"
      ],
      correct: 1
    },
    {
      q: "Which HTTP header is essential to prevent Cross-Site Scripting (XSS) in modern web apps?",
      options: [
        "Content-Security-Policy",
        "Access-Control-Allow-Origin",
        "Cache-Control",
        "X-Forwarded-For"
      ],
      correct: 0
    }
  ];

  const handleAnswerQuiz = (index) => {
    if (index === quizQuestions[quizStep].correct) {
    }

    if (quizStep + 1 < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    } else {
      // Finished
      setQuizActive(false);
      setStudentData(prev => {
        const newScore = Math.min(100, prev.bridgeScore + 5);
        const updatedSkills = prev.skills.map(s => {
          if (s.name.includes("System Design")) {
            return { ...s, level: 70, status: "verified", proof: "Quiz Verified (+25%)" };
          }
          return s;
        });
        return { ...prev, bridgeScore: newScore, skills: updatedSkills };
      });
      setQuizStep(0);
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-[#0E1A29] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${darkMode ? 'bg-[#1B3A5C]/90 border-slate-700' : 'bg-[#1B3A5C] text-white border-[#17756F]/30'}`}>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Theme Bridge Concept */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentScreen('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#17756F] to-[#6B4FA0] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#17756F]/30">
              🌉
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">Skill Setu</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#17756F] text-teal-100 font-medium">AI Bridge</span>
              </div>
              <p className="text-xs text-slate-300 hidden sm:block">Academia to Industry Platform</p>
            </div>
          </div>

          {/* Controls: Role Selector, Mode, Bandwidth Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Bandwidth mode toggle */}
            <button 
              onClick={() => setLowBandwidth(!lowBandwidth)} 
              title={lowBandwidth ? "Low Bandwidth Mode Active (Data Saver)" : "Normal Mode"}
              className={`p-2 rounded-lg text-xs flex items-center space-x-1 border transition-all ${
                lowBandwidth ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-800/40 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <WifiOff className="w-4 h-4" />
              <span className="hidden md:inline">{lowBandwidth ? 'Lite Mode' : '4G/5G'}</span>
            </button>

            {/* Dark / Light Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-200" />}
            </button>

            {/* Role Switcher Pill */}
            <div className="bg-slate-800/60 p-1 rounded-xl border border-slate-700 flex items-center">
              <button
                onClick={() => setRole('student')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  role === 'student' 
                    ? 'bg-[#17756F] text-white shadow' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setRole('college')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  role === 'college' 
                    ? 'bg-[#17756F] text-white shadow' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                College
              </button>
              <button
                onClick={() => setRole('recruiter')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  role === 'recruiter' 
                    ? 'bg-[#6B4FA0] text-white shadow' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Recruiter
              </button>
            </div>

          </div>
        </div>
      </header>

      {}
      {role === 'student' && (
        <nav className={`border-b hidden md:block ${darkMode ? 'bg-[#122338] border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4 flex space-x-8 text-sm font-medium">
            {[
              { id: 'home', label: 'Bridge Dashboard', icon: Target },
              { id: 'assessment', label: 'Skill Radar & Quiz', icon: BarChart3 },
              { id: 'feed', label: 'Smart Match Feed', icon: Sparkles },
              { id: 'applications', label: 'Application Tracker', icon: Briefcase },
              { id: 'coach', label: 'Setu AI Coach', icon: MessageSquare },
              { id: 'profile', label: 'Verified Profile', icon: Award }
            ].map(tab => {
              const Icon = tab.icon;
              const active = currentScreen === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentScreen(tab.id)}
                  className={`flex items-center space-x-2 py-3.5 border-b-2 transition-colors ${
                    active 
                      ? 'border-[#17756F] text-[#17756F] font-semibold' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        
        {/* STUDENT ROLE SCREENS */}
        {role === 'student' && (
          <>
            {currentScreen === 'home' && (
              <StudentHomeScreen 
                student={studentData} 
                darkMode={darkMode}
                onNavigate={(screen) => setCurrentScreen(screen)}
                onStartQuiz={() => { setCurrentScreen('assessment'); setQuizActive(true); }}
              />
            )}

            {currentScreen === 'assessment' && (
              <SkillAssessmentScreen 
                student={studentData} 
                darkMode={darkMode}
                quizActive={quizActive}
                setQuizActive={setQuizActive}
                quizStep={quizStep}
                quizQuestions={quizQuestions}
                handleAnswerQuiz={handleAnswerQuiz}
              />
            )}

            {currentScreen === 'feed' && (
              <SmartMatchFeedScreen 
                darkMode={darkMode}
                onApply={(job) => {
                  setApplications(prev => [
                    { id: Date.now(), company: job.company, role: job.role, status: "Applied", date: "Today", nextStep: "Pending TPO Verification" },
                    ...prev
                  ]);
                }}
              />
            )}

            {currentScreen === 'applications' && (
              <ApplicationTrackerScreen 
                applications={applications} 
                darkMode={darkMode} 
              />
            )}

            {currentScreen === 'coach' && (
              <AICoachScreen 
                messages={messages} 
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
                isTyping={isTyping}
                chatLanguage={chatLanguage}
                setChatLanguage={setChatLanguage}
                darkMode={darkMode}
              />
            )}

            {currentScreen === 'profile' && (
              <VerifiedProfileScreen student={studentData} darkMode={darkMode} />
            )}
          </>
        )}

        {/* COLLEGE ROLE SCREEN */}
        {role === 'college' && (
          <CollegeDashboardScreen metrics={COLLEGE_METRICS} darkMode={darkMode} />
        )}

        {/* RECRUITER ROLE SCREEN */}
        {role === 'recruiter' && (
          <RecruiterDashboardScreen candidates={RECRUITER_CANDIDATES} darkMode={darkMode} />
        )}

      </main>

      {}
      {role === 'student' && (
        <div className={`fixed bottom-0 left-0 right-0 md:hidden border-t z-50 transition-colors ${darkMode ? 'bg-[#1B3A5C] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
          <div className="grid grid-cols-5 h-16">
            {[
              { id: 'home', label: 'Home', icon: Target },
              { id: 'assessment', label: 'Radar', icon: BarChart3 },
              { id: 'feed', label: 'Matches', icon: Sparkles },
              { id: 'coach', label: 'Setu AI', icon: MessageSquare },
              { id: 'profile', label: 'Profile', icon: Award }
            ].map(tab => {
              const Icon = tab.icon;
              const active = currentScreen === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentScreen(tab.id)}
                  className={`flex flex-col items-center justify-center space-y-1 ${
                    active ? 'text-[#17756F] dark:text-teal-400 font-bold' : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px]">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}

function StudentHomeScreen({ student, darkMode, onNavigate, onStartQuiz }) {
  const score = student.bridgeScore;

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className={`p-6 rounded-2xl border shadow-sm relative overflow-hidden transition-all ${
        darkMode ? 'bg-gradient-to-r from-[#1B3A5C] to-[#122338] border-slate-700' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#17756F] dark:text-teal-400">Campus to Career Path</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/10 text-[#6B4FA0] font-bold">Target: {student.targetRole}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Welcome back, {student.name} 👋
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {student.college} • {student.department}
            </p>
          </div>

          {/* Gamification Streaks */}
          <div className="flex items-center space-x-4 bg-slate-100 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                <Flame className="w-5 h-5 fill-orange-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Skill Streak</p>
                <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{student.streakDays} Days Active</p>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Weekly Goal</p>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{student.weeklyGoalProgress}/5 Skills</p>
            </div>
          </div>
        </div>
      </div>

      {/* CENTRAL VISUAL THEME: THE GLOWING BRIDGE ARCH */}
      <div className={`p-6 sm:p-8 rounded-2xl border shadow-md relative transition-all ${
        darkMode ? 'bg-[#122338] border-slate-700' : 'bg-gradient-to-b from-slate-900 to-[#1B3A5C] text-white'
      }`}>
        <div className="text-center max-w-xl mx-auto mb-2">
          <span className="text-xs uppercase tracking-widest text-teal-400 font-bold">Setu Bridge Readiness Index</span>
          <h2 className="text-2xl font-bold mt-1 text-white">Your Skill Bridge Score: <span className="text-teal-300">{score}/100</span></h2>
          <p className="text-xs text-slate-300 mt-1">
            Visualizing your bridge from Academic Prep to Industry Placement for <span className="text-teal-200 font-semibold">{student.targetRole}</span>.
          </p>
        </div>

        {/* Dynamic Animated Bridge SVG */}
        <div className="relative w-full max-w-2xl mx-auto my-6 h-48 sm:h-56 flex items-center justify-center">
          <svg viewBox="0 0 500 220" className="w-full h-full overflow-visible">
            <defs>
              {/* Arch Gradient */}
              <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#17756F" />
                <stop offset="50%" stopColor="#6B4FA0" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Structural Bridge Path (Dashed/Gray) */}
            <path
              d="M 50 180 Q 250 20 450 180"
              fill="none"
              stroke="#334155"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 50 180 Q 250 20 450 180"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="6 6"
            />

            {/* Fill Bridge Path according to Score */}
            <path
              d="M 50 180 Q 250 20 450 180"
              fill="none"
              stroke="url(#bridgeGradient)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="628"
              strokeDashoffset={628 - (628 * (score / 100))}
              filter="url(#glow)"
              className="transition-all duration-1000 ease-out"
            />

            {/* Vertical Support Cables */}
            {[100, 150, 200, 250, 300, 350, 400].map((x, idx) => (
              <line 
                key={idx}
                x1={x} 
                y1="180" 
                x2={x} 
                y2={180 - Math.sin((x - 50) / 400 * Math.PI) * 125} 
                stroke="#64748B" 
                strokeWidth="1" 
                strokeDasharray="2 2"
                opacity="0.6"
              />
            ))}

            {/* Bridge Deck Base Line */}
            <line x1="30" y1="180" x2="470" y2="180" stroke="#94A3B8" strokeWidth="4" />

            {/* Left Pillar: Campus */}
            <g transform="translate(30, 120)">
              <rect x="0" y="0" width="40" height="70" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="2" />
              <path d="M 5 15 L 35 15 M 5 30 L 35 30 M 5 45 L 35 45" stroke="#17756F" strokeWidth="3" />
              <text x="20" y="85" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold">CAMPUS</text>
            </g>

            {/* Right Pillar: Career */}
            <g transform="translate(430, 120)">
              <rect x="-10" y="0" width="40" height="70" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="2" />
              <path d="M -5 15 L 25 15 M -5 30 L 25 30 M -5 45 L 25 45" stroke="#6B4FA0" strokeWidth="3" />
              <text x="10" y="85" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold">CAREER</text>
            </g>

            {/* Student Avatar Icon on Bridge Position based on Score */}
            <g transform={`translate(${50 + (score / 100) * 400}, ${180 - Math.sin((score / 100) * Math.PI) * 125 - 18})`}>
              <circle r="16" fill="#17756F" stroke="#FFFFFF" strokeWidth="3" className="animate-pulse" />
              <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">🎓</text>
            </g>
          </svg>
        </div>

        {/* Bridge Status Summary Footer */}
        <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-700/60 pt-4 text-xs text-slate-300">
          <div>
            <span className="block text-slate-400">Verified Skills</span>
            <span className="font-bold text-sm text-teal-400">4 / 6 Skills</span>
          </div>
          <div>
            <span className="block text-slate-400">Estimated Match</span>
            <span className="font-bold text-sm text-purple-300">Top 12% in Batch</span>
          </div>
          <div>
            <span className="block text-slate-400">Industry Gap</span>
            <span className="font-bold text-sm text-amber-300">2 Micro-Gaps</span>
          </div>
        </div>

      </div>

      {/* NEXT STEP NUDGE BANNER */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#17756F]/10 via-[#6B4FA0]/10 to-teal-500/10 border border-[#17756F]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-3 rounded-xl bg-[#17756F] text-white shrink-0 shadow-md">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-extrabold uppercase tracking-wide text-[#17756F] dark:text-teal-400">AI Next Step Nudge</span>
              <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 px-2 py-0.5 rounded font-bold">+4 Pts Boost</span>
            </div>
            <h3 className="font-bold text-base mt-0.5 text-slate-900 dark:text-white">{student.nextNudge.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              {student.nextNudge.description}
            </p>
          </div>
        </div>
        <button 
          onClick={onStartQuiz}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#17756F] hover:bg-[#135d58] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 shrink-0"
        >
          <span>{student.nextNudge.actionText}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* QUICK MODULE TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Skill-Gap Radar", desc: "Compare skills with role demands", icon: BarChart3, screen: "assessment", tag: "2 Gaps Found" },
          { title: "Smart Match Feed", desc: "View top internships & full-time roles", icon: Sparkles, screen: "feed", tag: "92% Top Match" },
          { title: "Setu AI Career Coach", desc: "Mock interviews & bilingual advice", icon: MessageSquare, screen: "coach", tag: "Online" },
          { title: "Verified Badges", desc: "Github & Certificate evidence proof", icon: Award, screen: "profile", tag: "3 Badges" }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(item.screen)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                darkMode ? 'bg-[#122338] border-slate-700 hover:border-slate-600' : 'bg-white border-slate-200 hover:border-[#17756F]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-[#1B3A5C]/10 text-[#1B3A5C] dark:bg-slate-800 dark:text-teal-400">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {item.tag}
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}

function SkillAssessmentScreen({ student, darkMode, quizActive, setQuizActive, quizStep, quizQuestions, handleAnswerQuiz }) {
  
  // Render Custom SVG Skill Radar Chart
  const renderRadarChart = () => {
    const skills = student.skills;
    const center = 120;
    const radius = 90;
    const total = skills.length;

    const getCoordinates = (index, val) => {
      const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
      const r = (val / 100) * radius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle)
      };
    };

    const currentPoints = skills.map((s, i) => {
      const { x, y } = getCoordinates(i, s.level);
      return `${x},${y}`;
    }).join(' ');

    const requiredPoints = skills.map((s, i) => {
      const { x, y } = getCoordinates(i, s.required);
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg viewBox="0 0 240 240" className="w-full max-w-xs mx-auto overflow-visible">
        {/* Radar Rings */}
        {[0.25, 0.5, 0.75, 1].map((level, idx) => (
          <circle
            key={idx}
            cx={center}
            cy={center}
            r={radius * level}
            fill="none"
            stroke={darkMode ? '#334155' : '#E2E8F0'}
            strokeWidth="1"
            strokeDasharray={level === 1 ? 'none' : '3 3'}
          />
        ))}

        {/* Axis Lines */}
        {skills.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={darkMode ? '#334155' : '#CBD5E1'}
              strokeWidth="1"
            />
          );
        })}

        {/* Required Overlay (Soft Purple Target Area) */}
        <polygon
          points={requiredPoints}
          fill="rgba(107, 79, 160, 0.15)"
          stroke="#6B4FA0"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Current Student Skill Area (Teal Solid) */}
        <polygon
          points={currentPoints}
          fill="rgba(23, 117, 111, 0.35)"
          stroke="#17756F"
          strokeWidth="2.5"
        />

        {/* Labels */}
        {skills.map((s, i) => {
          const { x, y } = getCoordinates(i, 115);
          return (
            <text
              key={i}
              x={x}
              y={y}
              fontSize="9"
              fontWeight="bold"
              fill={darkMode ? '#94A3B8' : '#475569'}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {s.name}
            </text>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Quiz Modal Simulator */}
      {quizActive && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`max-w-lg w-full p-6 rounded-2xl border shadow-xl ${darkMode ? 'bg-[#122338] border-slate-700 text-white' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#17756F] uppercase tracking-wider">Skill Verification Quiz</span>
              <span className="text-xs font-medium text-slate-400">Question {quizStep + 1} of {quizQuestions.length}</span>
            </div>

            <h3 className="text-base font-bold mb-4">{quizQuestions[quizStep].q}</h3>

            <div className="space-y-2.5 mb-6">
              {quizQuestions[quizStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerQuiz(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all hover:border-[#17756F] ${
                    darkMode ? 'bg-slate-800/60 border-slate-700 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold mr-2 text-[#17756F]">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setQuizActive(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                Cancel Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Skill-Gap Radar & Micro-Assessments</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Compare your current proficiencies against real-time target job expectations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Radar Chart Card */}
        <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center ${
          darkMode ? 'bg-[#122338] border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <h3 className="text-sm font-bold text-center mb-2">Skill Requirements Breakdown</h3>
          <div className="flex items-center space-x-4 mb-4 text-[11px]">
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-[#17756F]" />
              <span className="text-slate-600 dark:text-slate-300">My Profile</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-[#6B4FA0]" />
              <span className="text-slate-600 dark:text-slate-300">Role Benchmark</span>
            </div>
          </div>

          {renderRadarChart()}

          <button 
            onClick={() => setQuizActive(true)}
            className="w-full mt-6 py-2.5 rounded-xl bg-[#17756F] text-white font-semibold text-xs hover:bg-[#135d58] transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Take Skill Boost Assessment</span>
          </button>
        </div>

        {/* Skill Breakdown List & Learning Nudges */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${
          darkMode ? 'bg-[#122338] border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <h3 className="text-sm font-bold mb-4">Detailed Skill Proficiency & Gap Analysis</h3>
          
          <div className="space-y-4">
            {student.skills.map((skill, idx) => {
              const isGap = skill.level < skill.required;
              return (
                <div key={idx} className={`p-4 rounded-xl border transition-all ${
                  isGap 
                    ? 'border-amber-500/30 bg-amber-500/5' 
                    : darkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-100 bg-slate-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm">{skill.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {skill.category}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isGap ? (
                        <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Gap: -{skill.required - skill.level}%</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-teal-600 bg-teal-500/10 px-2 py-0.5 rounded flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified ({skill.proof})</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar comparison */}
                  <div className="space-y-1">
                    <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
                      {/* Target Required Marker Line */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-[#6B4FA0] z-10" 
                        style={{ left: `${skill.required}%` }}
                        title={`Required: ${skill.required}%`}
                      />
                      {/* Current Level Bar */}
                      <div 
                        className={`h-full transition-all duration-500 ${isGap ? 'bg-amber-500' : 'bg-[#17756F]'}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Current: {skill.level}%</span>
                      <span>Target Requirement: {skill.required}%</span>
                    </div>
                  </div>

                  {/* One-tap recommendation for identified gaps */}
                  {isGap && (
                    <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between">
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        💡 Suggested: Watch 15-min System Design Crash Course on Setu Learn.
                      </p>
                      <button 
                        onClick={() => setQuizActive(true)}
                        className="text-xs text-[#17756F] dark:text-teal-400 font-bold hover:underline flex items-center space-x-1 shrink-0"
                      >
                        <span>Fix Gap</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}

function SmartMatchFeedScreen({ darkMode, onApply }) {
  const [appliedIds, setAppliedIds] = useState([]);

  const handleApplyClick = (job) => {
    setAppliedIds(prev => [...prev, job.id]);
    onApply(job);
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold">Smart Skill-Match Feed</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Roles and internships matched directly to your verified skills rather than test scores alone.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {MATCH_JOBS.map(job => {
          const isApplied = appliedIds.includes(job.id);
          return (
            <div 
              key={job.id}
              className={`p-6 rounded-2xl border transition-all ${
                darkMode ? 'bg-[#122338] border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl border border-slate-200 dark:border-slate-700">
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{job.role}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{job.company} • {job.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <span className="px-3 py-1 rounded-full bg-teal-500/10 text-[#17756F] dark:text-teal-400 font-extrabold text-xs border border-teal-500/20">
                    {job.matchPercent}% Match
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-xs">
                    {job.type}
                  </span>
                </div>
              </div>

              {/* Why This Fits You AI Line */}
              <div className="p-3 rounded-xl bg-[#17756F]/10 border border-[#17756F]/20 text-xs mb-4">
                <p className="text-slate-800 dark:text-slate-200 font-medium">
                  ✨ <span className="font-bold text-[#17756F] dark:text-teal-300">Why this fits you:</span> {job.whyFits}
                </p>
              </div>

              {/* Skills and Apply Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold mb-1">Matching Verified Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.verifiedSkills.map((sk, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  disabled={isApplied}
                  onClick={() => handleApplyClick(job)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 shrink-0 ${
                    isApplied
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-[#17756F] hover:bg-[#135d58] text-white shadow-md'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Applied & Verified</span>
                    </>
                  ) : (
                    <>
                      <span>1-Tap Skill Apply</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

function ApplicationTrackerScreen({ applications, darkMode }) {
  const stages = ["Applied", "Shortlisted", "Assessment", "Interview", "Offer"];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold">Application Tracker</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Track transparent placement pipeline status updated directly by College TPO & Hiring Managers.
        </p>
      </div>

      <div className="space-y-4">
        {applications.map(app => {
          const currentStageIndex = stages.indexOf(app.status);

          return (
            <div 
              key={app.id}
              className={`p-6 rounded-2xl border ${
                darkMode ? 'bg-[#122338] border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
                <div>
                  <h3 className="font-bold text-base">{app.role}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{app.company} • Applied on {app.date}</p>
                </div>
                <div className="text-xs font-semibold px-3 py-1 rounded-full bg-[#17756F]/10 text-[#17756F] dark:text-teal-400 border border-[#17756F]/20 self-start sm:self-auto">
                  Next: {app.nextStep}
                </div>
              </div>

              {/* Progress Stepper Bar */}
              <div className="relative mt-6 mb-2">
                <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 w-full absolute top-1/2 -translate-y-1/2 z-0" />
                <div 
                  className="h-1.5 rounded-full bg-[#17756F] absolute top-1/2 -translate-y-1/2 z-0 transition-all duration-500" 
                  style={{ width: `${(Math.max(0, currentStageIndex) / (stages.length - 1)) * 100}%` }}
                />

                <div className="relative z-10 flex justify-between">
                  {stages.map((stage, idx) => {
                    const isPassed = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCurrent 
                            ? 'bg-[#17756F] text-white ring-4 ring-teal-500/20' 
                            : isPassed 
                            ? 'bg-teal-700 text-white' 
                            : darkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-400'
                        }`}>
                          {isPassed ? "✓" : idx + 1}
                        </div>
                        <span className={`text-[10px] font-medium mt-2 ${
                          isCurrent ? 'font-bold text-[#17756F] dark:text-teal-400' : 'text-slate-400'
                        }`}>
                          {stage}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

function AICoachScreen({ messages, inputMessage, setInputMessage, handleSendMessage, isTyping, chatLanguage, setChatLanguage, darkMode }) {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      
      {/* Header and Language Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <span>Setu AI Career Mentor</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-[#6B4FA0] font-bold">24/7 Available</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ask for instant resume critiques, interview mock questions, or skill roadmap advice.
          </p>
        </div>

        {/* Bilingual Switcher */}
        <div className="flex items-center space-x-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setChatLanguage('en')}
            className={`px-3 py-1 rounded-lg transition-all ${chatLanguage === 'en' ? 'bg-[#17756F] text-white' : 'text-slate-600 dark:text-slate-400'}`}
          >
            English
          </button>
          <button
            onClick={() => setChatLanguage('hi')}
            className={`px-3 py-1 rounded-lg transition-all ${chatLanguage === 'hi' ? 'bg-[#17756F] text-white' : 'text-slate-600 dark:text-slate-400'}`}
          >
            हिंदी (Hindi)
          </button>
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className={`p-4 rounded-2xl border min-h-[380px] max-h-[500px] overflow-y-auto flex flex-col space-y-3 ${
        darkMode ? 'bg-[#122338] border-slate-700' : 'bg-white border-slate-200'
      }`}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-[#17756F] text-white rounded-br-none shadow-sm'
                : darkMode 
                ? 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700' 
                : 'bg-slate-100 text-slate-800 rounded-bl-none'
            }`}>
              {msg.sender === 'ai' && (
                <div className="flex items-center space-x-1 mb-1 font-bold text-[10px] text-[#6B4FA0] dark:text-purple-300 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Setu AI Coach</span>
                </div>
              )}
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className={`p-3 rounded-2xl text-xs text-slate-400 ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <span className="animate-pulse">Setu AI is analyzing your profile...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Row */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={chatLanguage === 'hi' ? "अपने करियर या कौशल के बारे में पूछें..." : "Ask Setu AI about your Bridge Score, interviews, or cloud gap..."}
          className={`flex-1 p-3.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#17756F] ${
            darkMode ? 'bg-[#122338] border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900'
          }`}
        />
        <button
          onClick={handleSendMessage}
          className="p-3.5 rounded-xl bg-[#17756F] hover:bg-[#135d58] text-white font-bold transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

function VerifiedProfileScreen({ student, darkMode }) {
  return (
    <div className="space-y-6">
      
      {/* Profile Card */}
      <div className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-[#122338] border-slate-700' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1B3A5C] text-white flex items-center justify-center font-extrabold text-2xl border-2 border-teal-500">
              AS
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold">{student.name}</h2>
                <span className="p-1 rounded-full bg-teal-500/20 text-[#17756F] dark:text-teal-400" title="Verified Academic Identity">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{student.department} • {student.college}</p>
              <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold mt-0.5">Target Role: {student.targetRole}</p>
            </div>
          </div>

          <div className="text-right bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400">Skill Bridge Score</p>
            <p className="text-2xl font-extrabold text-[#17756F] dark:text-teal-400">{student.bridgeScore}/100</p>
          </div>
        </div>
      </div>

      {/* Verified Badges Portfolio Grid */}
      <div>
        <h3 className="text-base font-bold mb-3">Verified Skill Badges & Evidence Proof</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Every badge on Skill Setu is backed by audited code commits, proctored assessments, or verified certs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {student.badges.map(badge => (
            <div 
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all ${
                darkMode ? 'bg-[#122338] border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">{badge.icon}</span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{badge.name}</h4>
                  <p className="text-[11px] text-slate-400">{badge.issuer}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Proof: <span className="font-semibold text-slate-700 dark:text-slate-200">{badge.proofType}</span></span>
                <span className="text-teal-600 dark:text-teal-400 font-bold">✓ Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function CollegeDashboardScreen({ metrics, darkMode }) {
  return (
    <div className="space-y-6">
      
      <div>
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-[#6B4FA0] text-xs font-bold">TPO & Administration Portal</span>
        </div>
        <h1 className="text-2xl font-bold mt-1">Campus Skill & Placement Analytics</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Real-time visibility into student skill readiness and corporate placement funnels.
        </p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Students Tracked", val: metrics.totalStudents, icon: Users, color: "text-[#1B3A5C]" },
          { label: "Avg Bridge Score", val: `${metrics.avgBridgeScore}/100`, icon: Target, color: "text-[#17756F]" },
          { label: "Current Placement Rate", val: `${metrics.placedPercent}%`, icon: TrendingUp, color: "text-[#6B4FA0]" }
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className={`p-5 rounded-2xl border ${darkMode ? 'bg-[#122338] border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{m.label}</span>
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <p className="text-2xl font-extrabold mt-2 text-slate-900 dark:text-white">{m.val}</p>
            </div>
          );
        })}
      </div>

      {/* Department Skill Gap Heatmap */}
      <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#122338] border-slate-700' : 'bg-white border-slate-200'}`}>
        <h3 className="text-base font-bold mb-4">Departmental Skill Gap Heatmap</h3>
        <div className="space-y-4">
          {metrics.deptGaps.map((d, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-bold text-sm">{d.dept}</h4>
                  <p className="text-xs text-amber-500 font-medium">Critical Gap: {d.topGap}</p>
                </div>
                <div className="text-xs text-slate-400">
                  {d.students} Students Tracked
                </div>
              </div>

              {/* Department Readiness Bar */}
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#17756F] to-[#6B4FA0]" 
                  style={{ width: `${d.score}%` }} 
                />
              </div>
              <p className="text-[10px] text-right text-slate-400 mt-1">Readiness Index: {d.score}%</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function RecruiterDashboardScreen({ candidates, darkMode }) {
  const [filterScore, setFilterScore] = useState(70);

  const filteredCandidates = candidates.filter(c => c.score >= filterScore);

  return (
    <div className="space-y-6">
      
      <div>
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#17756F]/10 text-[#17756F] text-xs font-bold">Recruiter Portal</span>
        </div>
        <h1 className="text-2xl font-bold mt-1">Verified Talent Search</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Source pre-assessed candidates filtered by verified practical skills and Bridge Scores.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
        darkMode ? 'bg-[#122338] border-slate-700' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold">Min Bridge Score:</span>
          <input 
            type="range" 
            min="50" 
            max="90" 
            value={filterScore} 
            onChange={(e) => setFilterScore(Number(e.target.value))}
            className="accent-[#17756F]"
          />
          <span className="text-xs font-extrabold text-[#17756F]">{filterScore}+</span>
        </div>

        <div className="text-xs text-slate-400">
          Showing <span className="font-bold text-slate-800 dark:text-white">{filteredCandidates.length}</span> candidates
        </div>
      </div>

      {/* Candidates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCandidates.map(cand => (
          <div 
            key={cand.id}
            className={`p-5 rounded-2xl border transition-all hover:shadow-md ${
              darkMode ? 'bg-[#122338] border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{cand.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{cand.dept} • Target: {cand.matchRole}</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-500/10 text-[#17756F] dark:text-teal-400 border border-teal-500/20">
                  {cand.score} Score
                </span>
              </div>
            </div>

            <div className="my-3">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Top Verified Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {cand.topSkills.map((sk, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">{cand.verifiedBadges} Verified Badges</span>
              <button className="px-3 py-1 rounded-lg bg-[#17756F] text-white font-semibold hover:bg-[#135d58] transition-all">
                Request Interview
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}