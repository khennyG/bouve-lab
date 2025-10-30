"use client"

import React, { useState } from 'react'
import Link from 'next/link'

export default function PromptEngineeringPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [currentExample, setCurrentExample] = useState(0)
  const [showWeakOutput, setShowWeakOutput] = useState(false)
  const [showStrongOutput, setShowStrongOutput] = useState(false)
  const prevExample = () => setCurrentExample((prev) => (prev - 1 + examples.length) % examples.length)
  const nextExample = () => setCurrentExample((prev) => (prev + 1) % examples.length)

  // Autoplay disabled per request; users can navigate with Prev/Next only

  const flipCards = [
    {
      id: 'why',
      front: 'Why does it matter?',
      back: 'Because phrasing changes everything.',
      color: 'bg-orange-100',
    },
    {
      id: 'what',
      front: 'What does AI understand?',
      back: 'Patterns, roles, and structure—not intuition.',
      color: 'bg-green-100',
    },
    {
      id: 'start',
      front: 'Where do I start?',
      back: 'Begin with clarity, context, and purpose.',
      color: 'bg-purple-100',
    },
  ]

  const examples = [
    {
      category: 'Education',
      weak: {
        prompt: 'Write about climate change.',
        output:
          'Climate change is a significant environmental issue affecting the planet. It involves rising temperatures and changing weather patterns that impact ecosystems and human life.',
      },
      strong: {
        prompt:
          'You are an environmental policy analyst. Write a 200-word policy brief explaining the economic implications of climate change for developing nations.',
        output:
          'Climate change poses severe economic threats to developing nations, where adaptive capacity remains limited and vulnerability is highest. Agricultural sectors—employing 60-70% of populations in sub-Saharan Africa and South Asia—face declining yields due to temperature increases and precipitation variability. The World Bank estimates climate impacts could push 100 million people into poverty by 2030. Infrastructure damage from extreme weather events diverts scarce resources from development priorities; Bangladesh alone faces annual losses of 2% GDP from flooding. Water scarcity threatens hydroelectric power generation, while heat stress reduces labor productivity by up to 20% in outdoor sectors. Healthcare costs escalate as vector-borne diseases expand geographic range. These nations contributed minimally to historical emissions yet bear disproportionate costs, raising equity concerns in international climate finance. Adaptation requires substantial investment—estimated at $140-300 billion annually by 2030—but faces funding gaps as development aid stagnates. Without urgent mitigation and robust financial support mechanisms, climate change will reverse decades of development gains, widen global inequality, and destabilize vulnerable economies already constrained by debt and limited fiscal space.',
      },
    },
    {
      category: 'Feedback',
      weak: {
        prompt: 'Give feedback on this essay.',
        output:
          'Your essay is well-written and covers the topic adequately. You might want to add more details in some sections and check your grammar. Overall, good work.',
      },
      strong: {
        prompt:
          "You are a writing instructor. Provide constructive feedback on this student essay's thesis clarity, evidence quality, and argument structure. Use specific examples and suggest concrete improvements.",
        output:
          "Your thesis statement \"Social media affects teenagers\" needs significant strengthening. Currently, it's too vague—what specific effects? Consider revising to: \"Social media platforms exploit adolescent psychology through variable reward mechanisms, contributing to increased anxiety and disrupted sleep patterns among 13-17 year-olds.\" Your second paragraph cites a 2015 statistic; update with recent research (2023-2024 studies show 95% teen usage). The transition between paragraphs 3 and 4 is abrupt—add a bridging sentence connecting the mental health discussion to academic performance. Strengthen your evidence by incorporating the counterargument that social media enables beneficial peer support networks, then refute it with data on comparison anxiety. Your conclusion currently just restates points; instead, synthesize your findings and propose a specific call-to-action: what should educators, parents, or teens themselves do with this information?",
      },
    },
    {
      category: 'Lesson Design',
      weak: {
        prompt: 'Create a lesson about photosynthesis.',
        output:
          'Lesson: Photosynthesis. Objective: Students will learn about photosynthesis. Activity: Read textbook pages 45-50. Discussion: Talk about what plants need. Assignment: Write a summary of photosynthesis.',
      },
      strong: {
        prompt:
          'You are a high school biology teacher. Design a 50-minute lesson on photosynthesis for 10th graders using the 5E instructional model (Engage, Explore, Explain, Elaborate, Evaluate). Include a hands-on activity and formative assessment.',
        output:
          "ENGAGE (10 min): Show time-lapse video of plant growth in darkness vs. light. Ask: 'Where does the plant's mass come from—soil, water, or air?' Record predictions. EXPLORE (15 min): Lab activity—students place Elodea in test tubes with bromothymol blue (BTB) indicator. One tube in light, one in darkness. Observe color changes indicating CO2 consumption. EXPLAIN (10 min): Present the photosynthesis equation: 6CO2 + 6H2O + light → C6H12O6 + 6O2. Connect to lab results—plants consume CO2 (BTB turns blue) and produce oxygen. Introduce chloroplast structure and light-dependent vs. light-independent reactions. ELABORATE (10 min): Students calculate: if one tree absorbs 48 lbs CO2/year and average American produces 16 tons CO2/year, how many trees needed to offset one person? Discuss real-world applications: carbon credits, reforestation. EVALUATE (5 min): Exit ticket—diagram a chloroplast, label thylakoid and stroma, and write one sentence explaining where each reaction stage occurs.",
      },
    },
  ]

  const buildSteps = [
    { icon: 'target', title: 'Define the goal', description: 'What do you want AI to do?', color: 'bg-red-600' },
    { icon: 'role', title: 'Set the role', description: 'Who should the AI act as?', color: 'bg-yellow-500' },
    { icon: 'format', title: 'Specify the format', description: 'What should the output look like?', color: 'bg-green-600' },
  ]

  const floatingPrompts = ['Summarize this paper', 'Design a case study', 'Create quiz questions']


  return (
    <div className="min-h-screen bg-white">
      {/* Hero removed per request; start directly with intro section */}

  {/* Section 1: What Is Prompt Engineering - Flip Cards */}
  <div id="flip" className="max-w-6xl mx-auto px-6 pt-10 pb-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">What is Prompt Engineering?</h2>
        <p className="text-xl text-gray-600 mb-12 text-center">Get to know how prompts shape AI output.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {flipCards.map((card) => (
            <div
              key={card.id}
              className="relative h-64 cursor-pointer perspective-1000"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                  hoveredCard === card.id ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front */}
                <div className={`absolute w-full h-full backface-hidden ${card.color} rounded-2xl shadow-lg p-8 flex items-center justify-center border-2 border-gray-200`}>
                  <h3 className="text-2xl font-bold text-green-700 text-center">{card.front}</h3>
                </div>

                {/* Back */}
                <div className={`absolute w-full h-full backface-hidden ${card.color} rounded-2xl shadow-lg p-8 flex items-center justify-center rotate-y-180 border-2 border-gray-200`}>
                  <p className="text-xl font-semibold text-green-700 text-center">{card.back}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Weak vs Strong Prompts */}
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Small Changes, Big Differences</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">See how wording transforms output.</p>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* Weak Prompt Panel */}
              <div className="bg-gray-50 rounded-xl p-7 border border-gray-200 shadow-sm">
                <div className="mb-4 space-y-4">
                  <span className="inline-block bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">Weak Prompt</span>
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <p className="text-gray-800 italic text-sm md:text-base leading-6">&ldquo;{examples[currentExample].weak.prompt}&rdquo;</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-500 font-semibold mb-2">Output Preview:</p>
                    <div className={`${showWeakOutput ? '' : 'max-h-72 overflow-auto pr-2'} relative`}> 
                      <p className="text-gray-600 text-sm md:text-base leading-6 opacity-60">{examples[currentExample].weak.output}</p>
                    </div>
                    <div className="mt-3 text-right">
                      <button
                        onClick={() => setShowWeakOutput((v) => !v)}
                        className="text-xs font-medium text-gray-700 hover:text-gray-900 underline"
                      >
                        {showWeakOutput ? 'Show less' : 'Show full output'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strong Prompt Panel */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200 shadow-sm">
                <div className="mb-4 space-y-4">
                  <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">Strong Prompt</span>
                  <div className="bg-white rounded-lg p-5 mb-4 border border-green-200">
                    <p className="text-gray-800 font-medium text-sm md:text-base leading-6">&ldquo;{examples[currentExample].strong.prompt}&rdquo;</p>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-green-200">
                    <p className="text-sm text-green-800 font-semibold mb-2">Output Preview:</p>
                    <div className={`${showStrongOutput ? '' : 'max-h-80 overflow-auto pr-2'} relative`}>
                      <p className="text-gray-700 text-base leading-7">{examples[currentExample].strong.output}</p>
                    </div>
                    <div className="mt-3 text-right">
                      <button
                        onClick={() => setShowStrongOutput((v) => !v)}
                        className="text-xs font-medium text-green-800 hover:text-green-900 underline"
                      >
                        {showStrongOutput ? 'Show less' : 'Show full output'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination + Controls */}
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                {examples.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to example ${i + 1}`}
                    onClick={() => setCurrentExample(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      i === currentExample ? 'bg-green-600 w-5' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button onClick={prevExample} className="px-3 py-1.5 rounded-md border text-sm text-gray-700 hover:bg-gray-50">Prev</button>
                <span className="text-xs text-gray-500">{examples[currentExample].category}</span>
                <button onClick={nextExample} className="px-3 py-1.5 rounded-md border text-sm text-gray-700 hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Build a Better Prompt */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">How to Build a Better Prompt</h2>
        <p className="text-xl text-gray-600 mb-12 text-center">Three quick steps to refine your ask.</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {buildSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 hover:border-red-300 transition-all cursor-pointer group hover:-translate-y-2"
            >
              <div className="mb-4 text-gray-800 group-hover:animate-bounce">
                {step.icon === 'target' && (
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
                  </svg>
                )}
                {step.icon === 'role' && (
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
                    <path d="M20 21a8 8 0 1 0-16 0" />
                  </svg>
                )}
                {step.icon === 'format' && (
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6" />
                    <path d="M8 13h8" />
                    <path d="M8 17h5" />
                  </svg>
                )}
              </div>
              <div className={`inline-block ${step.color} text-white px-4 py-2 rounded-full text-lg font-bold mb-3`}>
                Step {idx + 1}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/explore/prompts" className="inline-block">
            <span className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-all">Go to Prompt Library</span>
          </Link>
        </div>
      </div>

      {/* Section 5: Call to Action */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-50 to-orange-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Ready to Start Prompting Smarter?</h2>
          <p className="text-xl text-gray-700 mb-10">Explore the Prompt Library.</p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/explore/prompts" className="inline-block">
              <span className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Go to Prompt Library
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-bubble {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float-bubble { animation: float-bubble 0.8s ease-out; }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  )
}
