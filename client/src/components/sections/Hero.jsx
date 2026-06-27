import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '../ui/Button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
})

// Stagger container for word-by-word animation
const wordContainer = (delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
})

const wordVariant = {
  hidden: { opacity: 0, y: 48, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

// Letter-by-letter blur reveal
const letterContainer = (delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: delay } },
})

const letterVariant = {
  hidden: { opacity: 0, y: 16, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

function WordReveal({ text, delay = 0, className = '' }) {
  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center gap-x-[0.3em] ${className}`}
      style={{ perspective: '600px' }}
      variants={wordContainer(delay)}
      initial="hidden"
      animate="visible"
    >
      {text.split(' ').map((word, i) => (
        <motion.span key={i} variants={wordVariant} style={{ display: 'inline-block' }}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

function LetterReveal({ text, delay = 0, className = '', letterClassName = '' }) {
  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center ${className}`}
      variants={letterContainer(delay)}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariant}
          className={letterClassName}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

function VSCodeMockup() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-line shadow-2xl shadow-black/40 font-mono text-xs">
      {/* Title bar */}
      <div className="bg-[#2d2d2d] px-4 py-2.5 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[#6b7280] text-[11px]">app.js — portfolio-server</span>
      </div>

      {/* Code area */}
      <div className="bg-[#1e1e2e] p-5 leading-6 text-[13px] overflow-x-auto">
        {/* Line numbers + code */}
        <div className="flex gap-4">
          <div className="select-none text-[#4b5563] text-right" style={{ minWidth: '1.5rem' }}>
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div>
            <div><span className="text-[#c084fc]">const</span> <span className="text-[#60a5fa]">express</span> <span className="text-[#f8fafc]">= require(</span><span className="text-[#34d399]">'express'</span><span className="text-[#f8fafc]">)</span></div>
            <div><span className="text-[#c084fc]">const</span> <span className="text-[#60a5fa]">app</span> <span className="text-[#f8fafc]">= express()</span></div>
            <div>&nbsp;</div>
            <div><span className="text-[#4b5563]">// The most important endpoint</span></div>
            <div><span className="text-[#60a5fa]">app</span><span className="text-[#f8fafc]">.get(</span><span className="text-[#34d399]">'/api/hire-me'</span><span className="text-[#f8fafc]">, (req, res) =&gt; {'{'}</span></div>
            <div><span className="text-[#f8fafc]">&nbsp;&nbsp;res.json({'{'}</span></div>
            <div><span className="text-[#34d399]">&nbsp;&nbsp;&nbsp;&nbsp;developer</span><span className="text-[#f8fafc]">: </span><span className="text-[#34d399]">'Anuj Tyagi'</span><span className="text-[#f8fafc]">,</span></div>
            <div><span className="text-[#34d399]">&nbsp;&nbsp;&nbsp;&nbsp;stack</span><span className="text-[#f8fafc]">: [</span><span className="text-[#34d399]">'React'</span><span className="text-[#f8fafc]">, </span><span className="text-[#34d399]">'Node.js'</span><span className="text-[#f8fafc]">, </span><span className="text-[#34d399]">'MongoDB'</span><span className="text-[#f8fafc]">, </span><span className="text-[#34d399]">'AI'</span><span className="text-[#f8fafc]">],</span></div>
            <div><span className="text-[#34d399]">&nbsp;&nbsp;&nbsp;&nbsp;available</span><span className="text-[#f8fafc]">: </span><span className="text-[#fb923c]">true</span><span className="text-[#f8fafc]">,</span></div>
            <div><span className="text-[#34d399]">&nbsp;&nbsp;&nbsp;&nbsp;message</span><span className="text-[#f8fafc]">: </span><span className="text-[#34d399]">'Let\'s build something great'</span></div>
            <div><span className="text-[#f8fafc]">&nbsp;&nbsp;{'}'})</span></div>
            <div><span className="text-[#f8fafc]">{'}'})</span></div>
            <div>&nbsp;</div>
            <div><span className="text-[#60a5fa]">app</span><span className="text-[#f8fafc]">.listen(</span><span className="text-[#fb923c]">5000</span><span className="text-[#f8fafc]">, () =&gt; console.log(</span><span className="text-[#34d399]">'Ready to ship 🚀'</span><span className="text-[#f8fafc]">))</span></div>
            <div>&nbsp;</div>
          </div>
        </div>

        {/* Terminal output */}
        <div className="mt-4 pt-4 border-t border-[#2d2d2d]">
          <div className="text-[#4b5563] mb-1">TERMINAL</div>
          <div className="text-[#28c840]">▶ Server running on http://localhost:5000</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#60a5fa]">GET</span>
            <span className="text-[#f8fafc]">/api/hire-me</span>
            <span className="inline-block bg-[#28c84020] text-[#28c840] px-1.5 py-0.5 rounded text-[10px]">200 OK</span>
          </div>
          <div className="text-[#94a3b8] mt-1 pl-2">
            {'{ developer: "Anuj Tyagi", available: '}<span className="text-[#fb923c]">true</span>{' }'}
          </div>
        </div>
      </div>
    </div>
  )
}

function ScrollContainer() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.35], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.88, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.6, 1])

  return (
    <div ref={containerRef} className="w-full mt-16 px-4 sm:px-8 lg:px-0">
      <div
        className="relative"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          style={{ rotateX, scale, opacity, transformOrigin: 'center top' }}
          className="w-full max-w-4xl mx-auto"
        >
          {/* Glow effect behind editor */}
          <div
            className="absolute inset-0 rounded-xl blur-3xl opacity-20 -z-10"
            style={{ background: 'radial-gradient(ellipse at center, #8b5cf6 0%, transparent 70%)' }}
          />
          <VSCodeMockup />
        </motion.div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-16 pb-0 px-4 sm:px-6 lg:px-8">

      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="container-max flex flex-col items-center text-center gap-5 w-full">

        {/* Headline */}
        <div className="flex flex-col items-center gap-2">

          {/* Intro line — fade up with blinking cursor */}
          <motion.p
            {...fadeIn(0.15)}
            className="text-lg sm:text-xl text-muted font-medium"
          >
            Hi, I'm{' '}
            <motion.span
              className="text-copy font-semibold relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Anuj Tyagi
            </motion.span>
            <motion.span
              className="cursor-blink inline-block ml-0.5 w-0.5 h-5 bg-brand align-middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            />
          </motion.p>

          {/* Main headline — word-by-word flip up */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-copy leading-tight"
            style={{ perspective: '600px' }}
          >
            <WordReveal text="I Build MERN Apps" delay={0.35} />
          </h1>

          {/* Gradient line — letter-by-letter blur reveal + shimmer */}
          <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            <LetterReveal
              text="with the Power of AI"
              delay={0.75}
              letterClassName="gradient-shimmer"
            />
          </span>
        </div>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.5)}
          className="max-w-xl text-base sm:text-lg text-muted leading-relaxed"
        >
          Full stack web apps using{' '}
          <span className="text-copy font-medium">React</span>,{' '}
          <span className="text-copy font-medium">Node.js</span> &amp;{' '}
          <span className="text-copy font-medium">MongoDB</span>{' '}
          — intelligently built, production-ready
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.6)} className="flex flex-wrap items-center justify-center gap-3 mt-1">
          <Button as="a" href="/#contact" size="lg">
            Hire Me
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
          <Button as="a" href="/#projects" variant="secondary" size="lg">
            View Work
          </Button>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          {...fadeIn(0.75)}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2 text-sm text-muted"
        >
          {[
            { label: '5+ Projects', highlight: false },
            { label: '2yr Experience', highlight: false },
            { label: 'React', highlight: true },
            { label: 'Node.js', highlight: true },
            { label: 'MongoDB', highlight: true },
            { label: 'AI', highlight: true },
          ].map((item, i) => (
            <span
              key={i}
              className={`flex items-center gap-1.5 ${item.highlight ? 'text-brand font-medium' : ''}`}
            >
              {i > 0 && <span className="text-line text-xs">·</span>}
              {item.label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll container — VS Code editor */}
      <div className="w-full max-w-4xl mx-auto">
        <ScrollContainer />
      </div>

      {/* Scroll hint */}
      <motion.div
        {...fadeIn(1)}
        className="mt-8 pb-6 flex flex-col items-center gap-1.5 text-muted text-xs"
      >
        <span>scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>

    </section>
  )
}
