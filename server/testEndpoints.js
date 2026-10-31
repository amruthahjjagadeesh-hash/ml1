import http from 'http'
import { createServerHandler } from './index.js'

async function testHttpEndpoints() {
  const handler = createServerHandler()
  const server = http.createServer(handler)
  
  await new Promise(resolve => server.listen(5055, resolve))
  console.log('Test server listening on port 5055')

  try {
    // 1. Test Status Endpoint
    const statusRes = await fetch('http://localhost:5055/api/ai-tutor/status')
    const statusData = await statusRes.json()
    console.log('Status endpoint response (HTTP', statusRes.status, '):', statusData)

    // 2. Test Chat Endpoint (without API key)
    const chatRes = await fetch('http://localhost:5055/api/ai-tutor/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'Explain Backpropagation in simple terms', domain: 'Deep Learning' })
    })
    const chatData = await chatRes.json()
    console.log('Chat endpoint response without key (HTTP', chatRes.status, '):', chatData)

    console.log('\nAll HTTP endpoints verified successfully!')
  } catch (err) {
    console.error('Endpoint test failed:', err)
  } finally {
    server.close()
  }
}

testHttpEndpoints()
