import http from 'http'
import { handleAITutorChat, detectActiveProvider, loadEnvVariables } from './aiTutorService.js'

loadEnvVariables()

const PORT = process.env.PORT || 5000

export function createServerHandler() {
  return async function (req, res, next) {
    // CORS headers for development
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    if (req.method === 'OPTIONS') {
      res.writeHead(204)
      res.end()
      return
    }

    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)

    // 1. Health / Provider Status endpoint
    if (url.pathname === '/api/ai-tutor/status' && req.method === 'GET') {
      loadEnvVariables()
      const provider = detectActiveProvider()
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        status: 'online',
        hasApiKey: !!provider,
        activeProvider: provider || 'none',
        supportedProviders: ['groq', 'openai', 'gemini', 'anthropic', 'custom']
      }))
      return
    }

    // 2. Chat Query endpoint
    if (url.pathname === '/api/ai-tutor/chat' && req.method === 'POST') {
      let body = ''
      req.on('data', chunk => {
        body += chunk
      })

      req.on('end', async () => {
        try {
          let parsed = {}
          try {
            parsed = JSON.parse(body || '{}')
          } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
              success: false,
              error: 'INVALID_JSON',
              message: 'Invalid JSON payload received.'
            }))
            return
          }

          const result = await handleAITutorChat({
            query: parsed.query,
            domain: parsed.domain,
            conversationHistory: parsed.conversationHistory || []
          })

          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({
            success: true,
            ...result
          }))
        } catch (err) {
          const status = err.status || 500
          res.writeHead(status, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({
            success: false,
            error: err.code || 'SERVER_ERROR',
            message: err.message || 'An error occurred during AI processing.'
          }))
        }
      })
      return
    }

    if (next) {
      next()
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'NOT_FOUND', message: 'API route not found.' }))
    }
  }
}

// If executed directly: `node server/index.js`
if (process.argv[1]?.endsWith('server/index.js') || process.argv[1]?.endsWith('server\\index.js')) {
  const handler = createServerHandler()
  const server = http.createServer(handler)
  server.listen(PORT, () => {
    console.log(`[SkillVerse AI Server] Running on http://localhost:${PORT}`)
    console.log(`[SkillVerse AI Server] Active LLM Provider: ${detectActiveProvider() || 'None detected (Add API Key in .env)'}`)
  })
}
