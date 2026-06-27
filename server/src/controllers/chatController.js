const Anthropic = require('@anthropic-ai/sdk')
const Project = require('../models/Project')

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

exports.chat = async (req, res) => {
  try {
    const { message, history = [] } = req.body

    const projects = await Project.find({ featured: true }).select('title tagline techStack result').lean()
    const projectSummary = projects.map(p => `- ${p.title}: ${p.tagline} (${p.techStack.join(', ')}) — Result: ${p.result}`).join('\n')

    const systemPrompt = `You are a helpful assistant for Anuj Tyagi's portfolio website. Anuj is a MERN Stack Developer specializing in React, Node.js, Express, and MongoDB.

Featured Projects:
${projectSummary || 'Projects will be listed here.'}

Skills: React, JavaScript, Node.js, Express, MongoDB, Tailwind CSS, REST APIs, Git

Answer visitor questions about Anuj's work, skills, experience, and how to hire him. Be concise, friendly, and professional. If asked about pricing or availability, suggest contacting via the contact form.`

    const messages = [
      ...history.slice(-6).map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ]

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 512,
      system: systemPrompt,
      messages,
    })

    res.json({ reply: response.content[0].text })
  } catch (err) {
    console.error('Chat error:', err.message)
    res.status(500).json({ message: 'Chat unavailable at the moment.' })
  }
}
