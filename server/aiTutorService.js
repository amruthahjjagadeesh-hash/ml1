import fs from 'fs'
import path from 'path'

// Helper to load .env and .env.local without requiring external packages
export function loadEnvVariables() {
  const envFiles = ['.env', '.env.local', '.env.development']
  for (const filename of envFiles) {
    const fullPath = path.resolve(process.cwd(), filename)
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8')
        for (const line of content.split('\n')) {
          const trimmed = line.trim()
          if (!trimmed || trimmed.startsWith('#')) continue
          const eqIdx = trimmed.indexOf('=')
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim()
            let val = trimmed.slice(eqIdx + 1).trim()
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1)
            }
            if (!process.env[key]) {
              process.env[key] = val
            }
          }
        }
      } catch (err) {
        console.warn(`[SkillVerse AI Server] Could not read ${filename}:`, err.message)
      }
    }
  }
}

// Automatically load on import
loadEnvVariables()

export function detectActiveProvider() {
  loadEnvVariables()
  if (process.env.GROQ_API_KEY) return 'groq'
  if (process.env.OPENAI_API_KEY) return 'openai'
  if (process.env.GEMINI_API_KEY) return 'gemini'
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic'
  if (process.env.LLM_API_BASE_URL || process.env.LLM_API_KEY) return 'custom'
  return null
}

const SYSTEM_PROMPTS = {
  default: `You are SkillVerse AI Tutor, an advanced, patient, and mathematically rigorous educational AI mentor.
You specialize in Machine Learning, Deep Learning, Python programming, Mathematics (Linear Algebra, Calculus, Statistics), Algorithms, and MLOps.

Guidelines:
1. Explain concepts from first principles with intuitive real-world analogies followed by rigorous mathematical formulations.
2. Provide clean, robust, commented Python code examples (using NumPy, Pandas, Scikit-Learn, PyTorch) where helpful.
3. If the user asks for code debugging, analyze edge cases, data types, and explain the fix step by step.
4. Format mathematical equations clearly using standard text or LaTeX notation.
5. Keep explanations structured with headings, bullet points, and actionable takeaways.`
}

export async function handleAITutorChat({ query, domain = 'General AI', conversationHistory = [] }) {
  loadEnvVariables()
  const provider = detectActiveProvider()

  if (!query || typeof query !== 'string' || !query.trim()) {
    throw {
      status: 400,
      code: 'EMPTY_QUERY',
      message: 'Query cannot be empty. Please ask a technical question.'
    }
  }

  if (!provider) {
    throw {
      status: 503,
      code: 'MISSING_API_KEY',
      message: 'No LLM API key configured on the server. Please add your GROQ_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY to your .env file and restart the server.'
    }
  }

  const systemMessage = `${SYSTEM_PROMPTS.default}\nCurrent Topic Domain: ${domain}`

  try {
    switch (provider) {
      case 'groq':
        return await callGroqAPI({ query, systemMessage, conversationHistory })
      case 'openai':
        return await callOpenAIAPI({ query, systemMessage, conversationHistory })
      case 'gemini':
        return await callGeminiAPI({ query, systemMessage, conversationHistory })
      case 'anthropic':
        return await callAnthropicAPI({ query, systemMessage, conversationHistory })
      case 'custom':
        return await callCustomOpenAICompatibleAPI({ query, systemMessage, conversationHistory })
      default:
        throw {
          status: 500,
          code: 'UNSUPPORTED_PROVIDER',
          message: `Provider ${provider} is not supported.`
        }
    }
  } catch (error) {
    // If it's already a formatted error, rethrow
    if (error.status && error.message) {
      throw error
    }
    console.error('[SkillVerse AI Backend Error]', error)
    throw {
      status: 500,
      code: 'PROVIDER_ERROR',
      message: error.message || 'An unexpected error occurred while communicating with the AI service.'
    }
  }
}

// 1. Groq Provider
async function callGroqAPI({ query, systemMessage, conversationHistory }) {
  const apiKey = process.env.GROQ_API_KEY
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'

  const messages = [
    { role: 'system', content: systemMessage },
    ...conversationHistory.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: query }
  ]

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      temperature: 0.6,
      max_tokens: 1500
    })
  })

  if (!response.ok) {
    const errorBody = await response.text()
    if (response.status === 401) {
      throw { status: 401, code: 'INVALID_API_KEY', message: 'Groq API Key is invalid or expired. Check GROQ_API_KEY in .env.' }
    }
    if (response.status === 429) {
      throw { status: 429, code: 'RATE_LIMIT', message: 'Groq API rate limit exceeded. Please wait a few seconds before retrying.' }
    }
    throw { status: response.status, code: 'GROQ_ERROR', message: `Groq API Error (${response.status}): ${errorBody}` }
  }

  const data = await response.json()
  const reply = data.choices?.[0]?.message?.content || 'No response generated.'

  return {
    reply: reply,
    provider: 'Groq',
    model: model,
    timestamp: new Date().toLocaleTimeString()
  }
}

// 2. OpenAI Provider
async function callOpenAIAPI({ query, systemMessage, conversationHistory }) {
  const apiKey = process.env.OPENAI_API_KEY
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  const messages = [
    { role: 'system', content: systemMessage },
    ...conversationHistory.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: query }
  ]

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      temperature: 0.6,
      max_tokens: 1500
    })
  })

  if (!response.ok) {
    const errorBody = await response.text()
    if (response.status === 401) {
      throw { status: 401, code: 'INVALID_API_KEY', message: 'OpenAI API Key is invalid or expired. Check OPENAI_API_KEY in .env.' }
    }
    if (response.status === 429) {
      throw { status: 429, code: 'RATE_LIMIT', message: 'OpenAI quota or rate limit exceeded. Check your OpenAI account billing.' }
    }
    throw { status: response.status, code: 'OPENAI_ERROR', message: `OpenAI API Error (${response.status}): ${errorBody}` }
  }

  const data = await response.json()
  const reply = data.choices?.[0]?.message?.content || 'No response generated.'

  return {
    reply: reply,
    provider: 'OpenAI',
    model: model,
    timestamp: new Date().toLocaleTimeString()
  }
}

// 3. Google Gemini Provider
async function callGeminiAPI({ query, systemMessage, conversationHistory }) {
  const apiKey = process.env.GEMINI_API_KEY
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash'

  // Using Google Gemini Native REST API
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  const contents = [
    ...conversationHistory.slice(-4).map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    })),
    {
      role: 'user',
      parts: [{ text: `${systemMessage}\n\nStudent Question:\n${query}` }]
    }
  ]

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: contents,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 1500
      }
    })
  })

  if (!response.ok) {
    const errorBody = await response.text()
    if (response.status === 400 && errorBody.includes('API_KEY_INVALID')) {
      throw { status: 401, code: 'INVALID_API_KEY', message: 'Gemini API Key is invalid. Check GEMINI_API_KEY in .env.' }
    }
    if (response.status === 429) {
      throw { status: 429, code: 'RATE_LIMIT', message: 'Gemini rate limit exceeded. Please wait a moment.' }
    }
    throw { status: response.status, code: 'GEMINI_ERROR', message: `Gemini API Error: ${errorBody}` }
  }

  const data = await response.json()
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated by Gemini.'

  return {
    reply: reply,
    provider: 'Google Gemini',
    model: model,
    timestamp: new Date().toLocaleTimeString()
  }
}

// 4. Anthropic Provider
async function callAnthropicAPI({ query, systemMessage, conversationHistory }) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022'

  const messages = [
    ...conversationHistory.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: query }
  ]

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      system: systemMessage,
      messages: messages,
      max_tokens: 1500,
      temperature: 0.6
    })
  })

  if (!response.ok) {
    const errorBody = await response.text()
    if (response.status === 401) {
      throw { status: 401, code: 'INVALID_API_KEY', message: 'Anthropic API Key is invalid or expired. Check ANTHROPIC_API_KEY in .env.' }
    }
    if (response.status === 429) {
      throw { status: 429, code: 'RATE_LIMIT', message: 'Anthropic rate limit exceeded. Please wait.' }
    }
    throw { status: response.status, code: 'ANTHROPIC_ERROR', message: `Anthropic API Error: ${errorBody}` }
  }

  const data = await response.json()
  const reply = data.content?.[0]?.text || 'No response generated.'

  return {
    reply: reply,
    provider: 'Anthropic',
    model: model,
    timestamp: new Date().toLocaleTimeString()
  }
}

// 5. Custom / Ollama / OpenAI-compatible endpoint
async function callCustomOpenAICompatibleAPI({ query, systemMessage, conversationHistory }) {
  const baseUrl = (process.env.LLM_API_BASE_URL || 'http://localhost:11434/v1').replace(/\/+$/, '')
  const apiKey = process.env.LLM_API_KEY || 'not-needed'
  const model = process.env.LLM_MODEL || 'llama3'

  const messages = [
    { role: 'system', content: systemMessage },
    ...conversationHistory.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: query }
  ]

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      temperature: 0.6,
      max_tokens: 1500
    })
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw { status: response.status, code: 'CUSTOM_LLM_ERROR', message: `Custom LLM Error: ${errorBody}` }
  }

  const data = await response.json()
  const reply = data.choices?.[0]?.message?.content || 'No response generated.'

  return {
    reply: reply,
    provider: `Custom (${baseUrl})`,
    model: model,
    timestamp: new Date().toLocaleTimeString()
  }
}
