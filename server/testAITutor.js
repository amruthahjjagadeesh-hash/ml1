import { handleAITutorChat, detectActiveProvider, loadEnvVariables } from './aiTutorService.js'

async function runDiagnostics() {
  console.log('=== SkillVerse AI Tutor Diagnostics ===')
  loadEnvVariables()
  
  const provider = detectActiveProvider()
  console.log('1. Active Provider Detection:', provider || 'None (no API key in .env)')
  
  console.log('\n2. Testing Missing/Handled Query without Key:')
  try {
    await handleAITutorChat({ query: 'What is gradient descent?' })
    console.log('UNEXPECTED: Call succeeded without API key!')
  } catch (err) {
    console.log('SUCCESS: Expected error handled properly:', err.code, '-', err.message)
  }

  console.log('\n3. Testing Empty Query validation:')
  try {
    await handleAITutorChat({ query: '   ' })
  } catch (err) {
    console.log('SUCCESS: Empty query rejected properly:', err.code, '-', err.message)
  }

  if (provider) {
    console.log(`\n4. Testing Live Call to ${provider}:`)
    try {
      const response = await handleAITutorChat({
        query: 'Reply in one short sentence: What is Linear Regression?',
        domain: 'Classical ML'
      })
      console.log('SUCCESS: Real AI Response received from', response.provider, 'model:', response.model)
      console.log('Reply preview:', response.reply.slice(0, 100))
    } catch (err) {
      console.error('FAILURE: Error during live call:', err)
    }
  } else {
    console.log('\n4. Live call test skipped: No API key set in .env yet.')
    console.log('To test with live LLM, add GROQ_API_KEY=gsk_... or OPENAI_API_KEY=sk-... to .env')
  }

  console.log('\n=== Diagnostics Completed ===')
}

runDiagnostics()
