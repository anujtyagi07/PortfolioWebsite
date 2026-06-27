export const SITE = {
  name: 'Anuj Tyagi',
  role: 'MERN Stack Developer',
  tagline: 'Building fast, scalable web apps that drive real results.',
  email: 'anujtyagi0720@gmail.com',
  phone: '',
  location: 'India',
  available: true,
}

export const NAV_LINKS = [
  { label: 'Home',       href: '/',            inPill: true,  group: 'main',   external: false },
  { label: 'About',      href: '/#about',      inPill: true,  group: 'main',   external: false },
  { label: 'Skills',     href: '/#skills',     inPill: false, group: 'main',   external: false },
  { label: 'Projects',   href: '/#projects',   inPill: true,  group: 'main',   external: false },
  { label: 'Experience', href: '/#experience', inPill: false, group: 'career', external: false },
  { label: 'Education',  href: '/#education',  inPill: false, group: 'career', external: false },
  { label: 'Services',   href: '/#services',   inPill: false, group: 'career', external: false },
  { label: 'GitHub',     href: 'https://github.com/anujtyagi', inPill: false, group: 'action', external: true },
  { label: 'Resume',     href: '/api/uploads/resume.pdf', inPill: true, group: 'action', external: true },
  { label: 'Contact',    href: '/#contact',    inPill: true,  group: 'action', external: false },
]

export const SOCIAL = {
  github: 'https://github.com/anujtyagi',
  linkedin: 'https://linkedin.com/in/anujtyagi',
  twitter: '',
  instagram: '',
}

export const SERVICES = [
  {
    title: 'Full-Stack Web Apps',
    description: 'End-to-end React + Node.js applications with clean architecture and production-ready code.',
    icon: 'layers',
  },
  {
    title: 'REST API Development',
    description: 'Scalable, documented Express APIs with proper auth, validation, and error handling.',
    icon: 'server',
  },
  {
    title: 'MongoDB Database Design',
    description: 'Efficient schema design, indexing, and aggregation pipelines for performance at scale.',
    icon: 'database',
  },
  {
    title: 'Freelance Consulting',
    description: 'Technical guidance, code reviews, and architecture decisions for your product.',
    icon: 'briefcase',
  },
]
