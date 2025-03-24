import { generateWithDeepseek } from "@/lib/deepseek"

async function runDiagnostic() {
  console.log("Starting Deepseek API Diagnostic...")

  try {
    // Test 1: Basic API Connection
    console.log("\nTest 1: Basic API Connection")
    const testPrompt = "Hello, this is a test prompt."
    const response = await generateWithDeepseek(testPrompt)
    console.log("✅ Basic API connection successful")

    // Test 2: JSON Parsing
    console.log("\nTest 2: JSON Response Parsing")
    const jsonPrompt = `Generate a simple JSON object with the following structure:
    {
      "test": "value"
    }`
    const jsonResponse = await generateWithDeepseek(jsonPrompt)
    JSON.parse(jsonResponse)
    console.log("✅ JSON parsing successful")

    // Test 3: Complex Generation
    console.log("\nTest 3: Complex Generation")
    const complexPrompt = `Generate a career recommendation with the following structure:
    {
      "title": "Career Title",
      "description": "Description",
      "keyPoints": ["Point 1", "Point 2", "Point 3"]
    }`
    const complexResponse = await generateWithDeepseek(complexPrompt)
    const parsed = JSON.parse(complexResponse)
    console.log("✅ Complex generation successful")
    console.log("Sample output:", parsed)

    console.log("\nDiagnostic Summary:")
    console.log("✅ All tests passed")
    console.log("✅ Deepseek API is fully functional")
    console.log("✅ JSON parsing is working correctly")
    console.log("✅ Complex generations are properly formatted")
  } catch (error) {
    console.error("\n❌ Diagnostic Failed:")
    console.error(error)
    process.exit(1)
  }
}

runDiagnostic()

