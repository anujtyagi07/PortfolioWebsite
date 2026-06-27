require('dotenv').config()
const mongoose = require('mongoose')
const Project = require('../src/models/Project')
const Skill = require('../src/models/Skill')
const Experience = require('../src/models/Experience')
const Education = require('../src/models/Education')
const Settings = require('../src/models/Settings')

const di = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`

const projects = [
  {
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    tagline: 'Full-stack shopping with real-time inventory & payments',
    description: 'A complete MERN e-commerce solution handling 500+ SKUs with cart management, Stripe payments, and a full admin dashboard for inventory.',
    problem: 'Client was managing orders via spreadsheets, losing track of inventory and missing sales on peak days.',
    solution: 'Built a MERN stack platform with real-time inventory tracking, Stripe payment integration, and an admin dashboard covering products, orders, and analytics.',
    result: '40% reduction in order errors and 3× faster order processing within the first month of launch.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT'],
    images: [], liveUrl: '', githubUrl: '',
    featured: true, order: 1,
    coverGradient: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
  },
  {
    title: 'Task Management App',
    slug: 'task-management-app',
    tagline: 'Drag-and-drop collaboration with real-time sync',
    description: 'A Trello-inspired task manager for small teams featuring real-time WebSocket updates, role-based access, and email notifications.',
    problem: 'Remote teams had scattered task tracking across emails and chats with no single source of truth.',
    solution: 'Created a drag-and-drop Kanban board with Socket.io real-time sync, role-based permissions, and automated email notifications on task assignments.',
    result: 'Adopted by 3 teams; improved project delivery rate by 25% within 6 weeks.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind'],
    images: [], liveUrl: '', githubUrl: '',
    featured: true, order: 2,
    coverGradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  },
  {
    title: 'Restaurant Booking System',
    slug: 'restaurant-booking',
    tagline: 'Table reservations & order management for hospitality',
    description: 'An end-to-end reservation and table management platform built for hospitality clients during my internship at Technobull India.',
    problem: 'Restaurant staff were taking phone reservations manually, causing double-bookings and lost weekend revenue.',
    solution: 'Built a React booking UI with a Node.js/MongoDB backend, a table availability engine, and automated SMS confirmations via Twilio.',
    result: 'Eliminated double-bookings and reduced reservation drop-off by 35% in the first two weekends.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Twilio'],
    images: [], liveUrl: '', githubUrl: '',
    featured: false, order: 3,
    coverGradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  },
  {
    title: 'Dev Blog Platform',
    slug: 'dev-blog-platform',
    tagline: 'CMS-powered blogging engine with Markdown & search',
    description: 'A developer-focused blog platform with a custom headless CMS, Markdown rendering, tag filtering, and full-text search.',
    problem: 'Developers wanted a lightweight, self-hosted blogging tool without the bloat of WordPress or vendor lock-in.',
    solution: 'Built a headless CMS with a React frontend, Node.js REST API, MongoDB storage, and marked.js rendering with Prism code highlighting.',
    result: 'Sub-1.2s load time and a Lighthouse performance score of 96.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Markdown', 'JWT'],
    images: [], liveUrl: '', githubUrl: '',
    featured: false, order: 4,
    coverGradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  },
  {
    title: 'Real-time Chat App',
    slug: 'realtime-chat',
    tagline: 'WebSocket messaging with rooms, presence & history',
    description: 'A real-time chat app supporting public rooms, private DMs, user presence indicators, and full message history persistence.',
    problem: 'Team needed a lightweight self-hosted chat solution without third-party SaaS costs or data privacy concerns.',
    solution: 'Built with Socket.io for bidirectional events, React for the UI, MongoDB for message persistence, and JWT-based auth with room-level access control.',
    result: 'Sub-100ms message delivery supporting 50+ concurrent users per room under load tests.',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'JWT'],
    images: [], liveUrl: '', githubUrl: '',
    featured: false, order: 5,
    coverGradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
  },
  {
    title: 'Expense Tracker',
    slug: 'expense-tracker',
    tagline: 'Personal finance dashboard with charts & budgets',
    description: 'A full-stack expense tracking app with category budgets, monthly breakdowns, visual charts, and CSV export.',
    problem: 'Users had no clear visibility into their monthly spending patterns and were consistently over-budget.',
    solution: 'Built a MERN app with Recharts dashboards, category-based budget alerts, recurring expense tracking, and a clean monthly summary view.',
    result: 'Testers reported average 20% reduction in discretionary spending after 30 days of use.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Recharts', 'JWT'],
    images: [], liveUrl: '', githubUrl: '',
    featured: false, order: 6,
    coverGradient: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)',
  },
  {
    title: 'Hotel Booking Platform',
    slug: 'hotel-booking',
    tagline: 'Room availability, booking & guest management',
    description: 'A hospitality-sector web platform for managing room inventory, guest check-ins, and booking confirmations built during internship.',
    problem: 'Hotel front desk staff were managing reservations in disconnected spreadsheets, causing overbooking and slow check-ins.',
    solution: 'Developed a MERN booking system with real-time room availability, automated booking confirmations, and a staff dashboard for check-in/check-out management.',
    result: 'Reduced check-in time by 50% and eliminated overbooking incidents across 3 properties.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    images: [], liveUrl: '', githubUrl: '',
    featured: false, order: 7,
    coverGradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
  },
  {
    title: 'Quiz Platform',
    slug: 'quiz-platform',
    tagline: 'Timed quizzes, leaderboards & instant results',
    description: 'An interactive quiz application with timed rounds, multiple-choice questions, real-time leaderboards, and admin quiz builder.',
    problem: 'Educators needed an engaging online assessment tool that was easy to set up without technical knowledge.',
    solution: 'Built a React quiz UI with Socket.io for live leaderboard updates, a drag-and-drop admin question builder, and MongoDB-backed result analytics.',
    result: '200+ quizzes created by educators within the first month; average session time of 12 minutes.',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    images: [], liveUrl: '', githubUrl: '',
    featured: false, order: 8,
    coverGradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
  },
  {
    title: 'Job Application Tracker',
    slug: 'job-tracker',
    tagline: 'Track applications, interviews & follow-ups',
    description: 'A personal job-hunt dashboard to track applications by stage, schedule interviews, set follow-up reminders, and visualise pipeline progress.',
    problem: 'Job seekers were losing track of applications across dozens of companies, missing follow-up windows.',
    solution: 'Built a Kanban-style tracker with status columns (Applied → Interview → Offer), email reminder integration, and a stats overview for conversion rates per stage.',
    result: 'Used by 15 peers during campus placements; zero missed follow-ups reported by active users.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Nodemailer', 'JWT'],
    images: [], liveUrl: '', githubUrl: '',
    featured: false, order: 9,
    coverGradient: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
  },
]

const skills = [
  { name: 'React.js',     category: 'frontend', iconUrl: di('react'), order: 1 },
  { name: 'JavaScript',   category: 'frontend', iconUrl: di('javascript'), order: 2 },
  { name: 'HTML5',        category: 'frontend', iconUrl: di('html5'), order: 3 },
  { name: 'CSS3',         category: 'frontend', iconUrl: di('css3'), order: 4 },
  { name: 'Tailwind',     category: 'frontend', iconUrl: di('tailwindcss', 'plain'), order: 5 },

  { name: 'Node.js',      category: 'backend',  iconUrl: di('nodejs'), order: 6 },
  { name: 'Express.js',   category: 'backend',  iconUrl: di('express'), invert: true, order: 7 },
  { name: 'REST APIs',    category: 'backend',  abbr: 'REST', order: 8 },
  { name: 'JWT',          category: 'backend',  abbr: 'JWT', order: 9 },

  { name: 'MongoDB',      category: 'database', iconUrl: di('mongodb'), order: 10 },
  { name: 'Mongoose',     category: 'database', abbr: 'Mn', order: 11 },

  { name: 'Git',          category: 'tools',    iconUrl: di('git'), order: 12 },
  { name: 'GitHub',       category: 'tools',    iconUrl: di('github'), invert: true, order: 13 },
  { name: 'VS Code',      category: 'tools',    iconUrl: di('vscode'), order: 14 },
  { name: 'Postman',      category: 'tools',    iconUrl: di('postman'), order: 15 },
  { name: 'npm',          category: 'tools',    iconUrl: di('npm', 'original-wordmark'), order: 16 },

  { name: 'Claude AI',    category: 'ai-tools', abbr: 'Cl',  accent: '#f97316', order: 17 },
  { name: 'ChatGPT',      category: 'ai-tools', abbr: 'GPT', accent: '#10a37f', order: 18 },
  { name: 'Copilot',      category: 'ai-tools', abbr: 'Co',  accent: '#3b82f6', order: 19 },

  { name: 'LLM',                category: 'ai-llm', abbr: 'LLM', accent: '#8B5CF6', order: 20 },
  { name: 'RAG',                category: 'ai-llm', abbr: 'RAG', accent: '#8B5CF6', order: 21 },
  { name: 'Prompt Engineering', category: 'ai-llm', abbr: 'PE',  accent: '#8B5CF6', order: 22 },
  { name: 'Vector DB',          category: 'ai-llm', abbr: 'VDB', accent: '#8B5CF6', order: 23 },
  { name: 'Agentic AI',         category: 'ai-llm', abbr: 'AGT', accent: '#8B5CF6', order: 24 },
]

const experience = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Technobull India',
    type: 'Internship',
    period: '6 months',
    location: 'Remote · India',
    accent: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    description: 'Hospitality-sector web projects — full-stack MERN development inside a production environment with real client deliverables.',
    highlights: [
      'Add specific achievement or responsibility here',
      'Add specific achievement or responsibility here',
      'Add specific achievement or responsibility here',
      'Add specific achievement or responsibility here',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Git'],
    order: 1,
  },
  {
    role: 'Web Developer Intern',
    company: 'Unlink Technologies',
    type: 'Internship',
    period: '1 month',
    location: 'Remote · India',
    accent: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    description: 'Real-world development exposure with collaborative team workflows and exposure to live client deliverables.',
    highlights: [
      'Add specific achievement or responsibility here',
      'Add specific achievement or responsibility here',
      'Add specific achievement or responsibility here',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
    order: 2,
  },
]

const education = [
  {
    type: 'course',
    featured: true,
    title: 'Full Stack Web Development',
    school: 'Coding Ninjas',
    mode: 'Online',
    period: '2023 – 2024',
    location: '',
    description: 'Comprehensive program covering frontend, backend, databases, APIs, authentication, and scalable MERN architecture.',
    highlights: [
      'Built full-stack MERN applications from scratch',
      'Mastered React.js, Node.js, Express, and MongoDB',
      'Implemented authentication, authorization, and security best practices',
      'Worked on real-world projects and deployment workflows',
      'Learned modern web development workflows and clean architecture',
      'Practiced data structures and algorithms alongside the curriculum',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST APIs'],
    accent: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    glowColor: '#f59e0b',
    icon: 'certificate',
    order: 1,
  },
  {
    type: 'degree',
    title: 'B.Tech — Computer Science & Engineering',
    school: 'Meerut Institute of Engineering and Technology',
    mode: 'Offline',
    period: '2021 – 2025',
    location: 'Meerut, India',
    description: 'Bachelor of Technology focused on computer science fundamentals, software engineering, data structures, and applied technology.',
    accent: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
    glowColor: '#8b5cf6',
    icon: 'cap',
    order: 2,
  },
  {
    type: 'school',
    title: 'Class 12 — Senior Secondary',
    school: 'Add school name',
    mode: 'Offline',
    period: 'Add year',
    location: 'Add location',
    grade: 'Add percentage / grade',
    accent: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
    glowColor: '#06b6d4',
    icon: 'book',
    order: 3,
  },
  {
    type: 'school',
    title: 'Class 10 — Secondary',
    school: 'Add school name',
    mode: 'Offline',
    period: 'Add year',
    location: 'Add location',
    grade: 'Add percentage / grade',
    accent: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    glowColor: '#10b981',
    icon: 'book',
    order: 4,
  },
]

const settings = {
  key: 'site',
  name: 'Anuj Tyagi',
  role: 'MERN Stack Developer',
  tagline: 'Building fast, scalable web apps that drive real results.',
  email: 'anujtyagi0720@gmail.com',
  phone: '',
  location: 'India',
  available: true,
  github: 'https://github.com/anujtyagi',
  linkedin: 'https://linkedin.com/in/anujtyagi',
  twitter: '',
  instagram: '',
  resumeUrl: '',
}

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected — seeding...')

  await Promise.all([
    Project.deleteMany({}),
    Skill.deleteMany({}),
    Experience.deleteMany({}),
    Education.deleteMany({}),
    Settings.deleteMany({}),
  ])

  await Project.insertMany(projects)
  await Skill.insertMany(skills)
  await Experience.insertMany(experience)
  await Education.insertMany(education)
  await Settings.create(settings)

  console.log(`Seeded ${projects.length} projects, ${skills.length} skills, ${experience.length} experience entries, ${education.length} education entries, and site settings.`)
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
