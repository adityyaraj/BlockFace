export default function HowItWorksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 relative">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-left">How It Works</h1>
        <ol className="list-decimal list-inside space-y-4 text-lg">
          <li>
            <strong>Input:</strong> You provide a prompt or topic for the content you want to generate.
          </li>
          <li>
            <strong>Processing:</strong> Our AI model, based on advanced language understanding, analyzes your input.
          </li>
          <li>
            <strong>Generation:</strong> The AI creates original content based on your prompt, drawing from its vast
            knowledge base.
          </li>
          <li>
            <strong>Refinement:</strong> The generated content is processed to ensure coherence and relevance.
          </li>
          <li>
            <strong>Output:</strong> The final, polished content is presented to you, ready for use or further editing.
          </li>
        </ol>
      </div>
    </main>
  )
}

