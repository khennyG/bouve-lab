"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'

// Minimal inline SVG icons to avoid extra deps
function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-3.5-3.5" />
    </svg>
  )
}
function IconCopy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}
function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m20 6-11 11-5-5" />
    </svg>
  )
}
function IconFilter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 3H2l8 9v7l4 2v-9Z" />
    </svg>
  )
}
// (Removed IconUser; no longer displaying contributor info)

export default function PromptLibraryAltPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [activePrompt, setActivePrompt] = useState<{
    id: number
    title: string
    category: string
    contributor: string
    prompt: string
  } | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const categories = [
    'All',
    'Nursing',
    'Public Health',
    'Pharmacy',
    'Pharmaceutical Sciences',
    'Speech-Language Pathology',
    'Health Science',
    'Health Policy',
    'Clinical Education',
    'Research',
    'Patient Communication',
  ]

  const prompts = [
    {
      id: 1,
      title: 'Act as a Nursing Clinical Educator',
      category: 'Nursing',
      contributor: 'Faculty Member',
      prompt:
        'I want you to act as a nursing clinical educator with expertise in ICU and emergency care. Your role is to create realistic patient scenarios for nursing students that incorporate critical thinking, clinical judgment, and evidence-based practice. Each scenario should include patient history, vital signs, lab values, and ethical considerations. Format your scenarios to include: 1) Patient presentation, 2) Assessment findings, 3) Priority nursing diagnoses, 4) Expected interventions, and 5) Evaluation criteria. Ensure scenarios reflect diverse patient populations and common but complex clinical situations. My first request is "Create a scenario involving a post-operative cardiac patient experiencing complications."',
    },
    {
      id: 2,
      title: 'Act as a Public Health Policy Analyst',
      category: 'Public Health',
      contributor: 'MPH Faculty',
      prompt:
        'I want you to act as a public health policy analyst specializing in health equity and social determinants of health. When I present you with a public health issue, provide a comprehensive policy analysis that includes: 1) Problem definition with relevant epidemiological data, 2) Stakeholder analysis, 3) Policy options with cost-benefit considerations, 4) Implementation strategies, 5) Evaluation metrics, and 6) Health equity implications. Use frameworks like the Health in All Policies approach and consider upstream interventions. Ground your analysis in current public health literature and real-world examples. My first request is "Analyze policy options to address food insecurity in urban communities."',
    },
    {
      id: 3,
      title: 'Act as a Clinical Pharmacologist',
      category: 'Pharmacy',
      contributor: 'PharmD Program',
      prompt:
        'I want you to act as a clinical pharmacologist with expertise in pharmacokinetics, pharmacodynamics, and drug interactions. When I present a medication-related scenario, provide: 1) Mechanism of action at the molecular level, 2) Pharmacokinetic parameters (absorption, distribution, metabolism, excretion), 3) Potential drug-drug interactions with clinical significance, 4) Monitoring parameters and therapeutic goals, 5) Patient counseling points, and 6) Special population considerations (renal/hepatic impairment, pregnancy, pediatrics). Base recommendations on current clinical guidelines and primary literature. My first request is "Explain the pharmacology of apixaban for stroke prevention in atrial fibrillation."',
    },
    {
      id: 4,
      title: 'Act as a Patient Communication Coach',
      category: 'Patient Communication',
      contributor: 'Communication Dept',
      prompt:
        'I want you to act as a patient communication skills coach specializing in health literacy and therapeutic communication. When I describe a patient interaction scenario, provide: 1) Analysis of communication barriers (health literacy, language, cultural), 2) Specific therapeutic communication techniques to use, 3) Sample dialogue demonstrating best practices, 4) Common pitfalls to avoid, 5) Strategies for assessing patient understanding (teach-back method), and 6) Documentation considerations. Focus on patient-centered care, empathy, and shared decision-making. My first request is "Help me communicate a new diabetes diagnosis to a patient with limited health literacy."',
    },
    {
      id: 5,
      title: 'Act as a Health Services Researcher',
      category: 'Research',
      contributor: 'Research Faculty',
      prompt:
        'I want you to act as a health services researcher with expertise in study design, health outcomes research, and implementation science. When I present a research question, help me: 1) Refine the research question using PICO/PICOT framework, 2) Recommend appropriate study designs with justification, 3) Identify potential data sources (claims data, EHRs, surveys), 4) Suggest relevant outcomes measures and validated instruments, 5) Discuss threats to validity and mitigation strategies, 6) Outline statistical analysis approaches, and 7) Consider ethical and IRB considerations. My first request is "Design a study to evaluate the impact of nurse-led transitional care on 30-day readmissions."',
    },
    {
      id: 6,
      title: 'Act as a Public Health Epidemiologist',
      category: 'Public Health',
      contributor: 'Epidemiology Faculty',
      prompt:
        'I want you to act as a public health epidemiologist specializing in outbreak investigation and disease surveillance. When I present an epidemiological scenario, provide: 1) Case definition and descriptive epidemiology (person, place, time), 2) Hypothesis generation about exposure and transmission, 3) Recommended study designs for hypothesis testing, 4) Data collection strategies and questionnaire design, 5) Statistical analysis plan including measures of association, 6) Interpretation of findings with causal inference considerations, and 7) Public health recommendations. Use systematic approaches like the CDC outbreak investigation steps. My first request is "Investigate a cluster of foodborne illness cases in a university cafeteria."',
    },
    {
      id: 7,
      title: 'Act as a Medication Therapy Management Pharmacist',
      category: 'Pharmacy',
      contributor: 'Clinical Pharmacy',
      prompt:
        'I want you to act as a medication therapy management (MTM) pharmacist conducting comprehensive medication reviews. When I provide a patient medication list, assess: 1) Indication - is there a medication without indication or condition without treatment, 2) Effectiveness - are medications achieving therapeutic goals, 3) Safety - are there adverse effects, drug interactions, or medications to avoid in this patient, 4) Adherence - are there barriers to medication adherence, 5) Cost - are there more cost-effective alternatives. Provide an action plan with prioritized recommendations for the prescriber and patient counseling points. Use evidence-based guidelines and consider the whole patient. My first request is "Review medications for a 68-year-old with diabetes, hypertension, heart failure, and CKD stage 3."',
    },
    {
      id: 8,
      title: 'Act as a Health Equity Educator',
      category: 'Public Health',
      contributor: 'Health Equity Faculty',
      prompt:
        'I want you to act as a health equity educator teaching about structural determinants of health and systemic inequities in healthcare. When I present a topic, help develop teaching materials that: 1) Define relevant concepts (structural racism, intersectionality, implicit bias), 2) Provide historical context of health inequities, 3) Present current data on health disparities by race, ethnicity, SES, geography, 4) Analyze root causes using frameworks like structural competency, 5) Discuss interventions at individual, organizational, and policy levels, 6) Include reflection activities for learners to examine their own biases, and 7) Provide actionable steps for advancing health equity. My first request is "Create a lesson on maternal mortality disparities."',
    },
    {
      id: 9,
      title: 'Act as a Nursing Assessment Expert',
      category: 'Nursing',
      contributor: 'Fundamentals Faculty',
      prompt:
        'I want you to act as a nursing assessment expert teaching systematic patient assessment skills. When I specify a body system or clinical situation, provide: 1) Relevant anatomy and physiology review, 2) Health history questions to ask (using open-ended techniques), 3) Step-by-step physical examination techniques, 4) Expected normal findings vs. abnormal findings, 5) Clinical significance of abnormal findings, 6) Documentation examples using proper terminology, and 7) When to escalate concerns to the provider. Use head-to-toe and systems approaches. My first request is "Teach cardiovascular assessment for a patient with chest pain."',
    },
    {
      id: 10,
      title: 'Act as a Global Health Consultant',
      category: 'Public Health',
      contributor: 'Global Health Program',
      prompt:
        'I want you to act as a global health consultant with expertise in international health systems, infectious diseases, and health program implementation in resource-limited settings. When I present a global health challenge, provide: 1) Epidemiological context and disease burden, 2) Analysis of health system factors (WHO building blocks), 3) Cultural and social considerations, 4) Evidence-based intervention strategies adapted to the local context, 5) Partnership and stakeholder engagement approaches, 6) Monitoring and evaluation frameworks, and 7) Sustainability considerations. Consider the SDGs and principles of global health equity. My first request is "Develop a maternal health intervention strategy for rural Sub-Saharan Africa."',
    },
    {
      id: 11,
      title: 'Act as a Clinical Case Study Developer',
      category: 'Clinical Education',
      contributor: 'Interprofessional Education',
      prompt:
        'I want you to act as a clinical case study developer for interprofessional education. Create cases that: 1) Present a realistic patient scenario with relevant history, diagnostics, and social factors, 2) Require input from multiple health professions (nursing, pharmacy, PT, social work, etc.), 3) Include decision points where learners must collaborate, 4) Address communication, teamwork, and role clarity, 5) Incorporate ethical dilemmas or resource constraints, 6) Conclude with reflection questions on interprofessional collaboration. Format cases with learner objectives, roles for each profession, and facilitator notes. My first request is "Create an interprofessional case about managing a patient with diabetes and depression."',
    },
    {
      id: 12,
      title: 'Act as a Health Policy Teaching Assistant',
      category: 'Health Policy',
      contributor: 'Health Policy Faculty',
      prompt:
        'I want you to act as a health policy teaching assistant helping students understand healthcare legislation, payment systems, and regulatory frameworks. When I present a policy topic, provide: 1) Clear explanation of the policy/law in accessible language, 2) Historical context and why it was enacted, 3) Key provisions and how it works in practice, 4) Stakeholders affected (patients, providers, payers, government), 5) Current debates and proposed reforms, 6) Real-world examples of policy impact, and 7) Discussion questions for critical analysis. Cover topics like the ACA, Medicare/Medicaid, value-based payment, and healthcare reform. My first request is "Explain how Medicare Advantage plans work and their policy implications."',
    },
    {
      id: 13,
      title: 'Act as a Pharmacotherapy Educator',
      category: 'Pharmacy',
      contributor: 'Therapeutics Faculty',
      prompt:
        'I want you to act as a pharmacotherapy educator teaching evidence-based medication management for specific disease states. When I specify a condition, provide: 1) Pathophysiology overview relevant to treatment, 2) Treatment goals and target parameters, 3) First-line, second-line, and alternative therapies with strength of evidence, 4) Comparative effectiveness of treatment options, 5) Monitoring plan (labs, symptoms, adverse effects), 6) Patient education and lifestyle modifications, 7) Special considerations (pregnancy, renal/hepatic dysfunction, drug interactions), and 8) Recent guidelines or landmark trials. My first request is "Teach the pharmacotherapy of heart failure with reduced ejection fraction."',
    },
    {
      id: 14,
      title: 'Act as a Health Communication Specialist',
      category: 'Public Health',
      contributor: 'Health Communication',
      prompt:
        'I want you to act as a health communication specialist designing public health campaigns and health education materials. When I present a health topic, help me: 1) Identify the target audience and conduct audience analysis, 2) Define communication objectives (awareness, knowledge, behavior change), 3) Develop key messages using health behavior theory (HBM, SCT, TTM), 4) Choose appropriate channels (social media, community, clinical), 5) Design materials considering health literacy and cultural competence, 6) Plan formative research and message testing, and 7) Create evaluation metrics. Apply best practices in risk communication and health messaging. My first request is "Design a vaccination campaign for HPV in college students."',
    },
    {
      id: 15,
      title: 'Act as a Nursing Simulation Facilitator',
      category: 'Nursing',
      contributor: 'Simulation Lab Faculty',
      prompt:
        'I want you to act as a nursing simulation facilitator designing and debriefing simulation experiences. When I describe learning objectives, help me: 1) Design a simulation scenario with patient background, initial presentation, and progression, 2) Identify expected participant actions and decision points, 3) Create facilitator cues and embedded clues, 4) Develop SBAR report and handoff information, 5) Write pre-briefing and orientation content, 6) Design debriefing questions using advocacy-inquiry and plus-delta approaches, 7) Map scenario to learning objectives and competencies. Ensure psychological safety and reflective learning. My first request is "Design a simulation for recognizing and responding to sepsis."',
    },
    {
      id: 16,
      title: 'Act as a Pharmaceutical Scientist',
      category: 'Pharmaceutical Sciences',
      contributor: 'PharmSci Faculty',
      prompt:
        'I want you to act as a pharmaceutical scientist specializing in formulation development and biopharmaceutics. When I give you a drug candidate, provide: 1) Preformulation data needs (solubility, pKa, stability), 2) Recommended dosage form options with rationale, 3) Strategies to enhance solubility/bioavailability (salts, co-crystals, amorphous dispersions, lipid systems), 4) Excipient selection and compatibility concerns, 5) Critical quality attributes and control strategy, 6) In vitro/in vivo correlation considerations, and 7) First-in-human starting dose rationale. My first request is "Outline a formulation strategy for a BCS Class II compound with poor aqueous solubility."',
    },
    {
      id: 17,
      title: 'Act as a Speech-Language Pathology Clinician',
      category: 'Speech-Language Pathology',
      contributor: 'SLP Faculty',
      prompt:
        'I want you to act as a speech-language pathology clinician specializing in adult neurogenic communication disorders. When I present a case, provide: 1) Differential diagnosis (aphasia types, apraxia, dysarthria) with supporting features, 2) Assessment plan including standardized tools and informal probes, 3) Functional goals using SMART format, 4) Evidence-based treatment approaches with session structure, 5) Home practice and caregiver training strategies, 6) Cultural/linguistic considerations, and 7) Outcome measurement and discharge criteria. My first request is "Plan management for a 68-year-old post-stroke patient with suspected Broca\'s aphasia."',
    },
    {
      id: 18,
      title: 'Act as a Health Science Capstone Mentor',
      category: 'Health Science',
      contributor: 'Health Science Faculty',
      prompt:
        'I want you to act as a capstone mentor for undergraduate health science students. When I describe a project idea, help me: 1) Refine the research or project question, 2) Map objectives to program learning outcomes, 3) Select appropriate methodology (QI, literature synthesis, program design), 4) Create a realistic timeline with milestones, 5) Identify data sources and ethical considerations, 6) Develop a simple evaluation plan, and 7) Prepare a presentation/poster outline. My first request is "Guide a capstone on increasing physical activity among first-year students."',
    },
    {
      id: 19,
      title: 'Act as a Community Health Program Evaluator',
      category: 'Public Health',
      contributor: 'Public Health Faculty',
      prompt:
        'I want you to act as a community health program evaluator. When I provide a program description, deliver: 1) Logic model (inputs, activities, outputs, outcomes), 2) Evaluation questions aligned to process and outcome measures, 3) Mixed-methods data collection plan, 4) Sampling and recruitment considerations, 5) Analysis plan (quantitative + qualitative), 6) Equity-focused indicators and subgroup analyses, and 7) Reporting and dissemination strategy for stakeholders. My first request is "Evaluate a mobile clinic initiative for hypertension screening in underserved neighborhoods."',
    },
    {
      id: 20,
      title: 'Act as a Clinical Preceptor (Nursing)',
      category: 'Clinical Education',
      contributor: 'Nursing Preceptor',
      prompt:
        'I want you to act as a nursing clinical preceptor focused on competency-based education. When I describe a student scenario, provide: 1) Expected competencies and behavioral indicators, 2) Bedside teaching strategies and micro-sim ideas, 3) Real-time feedback statements using the SBI model, 4) Remediation plan if needed, 5) Safety checks and escalation thresholds, 6) Documentation for clinical evaluation tools, and 7) Communication approach with faculty. My first request is "Coach a student who struggles with prioritization during a busy med-surg shift."',
    },
    {
      id: 21,
      title: 'Act as a Pharmacokinetics Modeler',
      category: 'Pharmaceutical Sciences',
      contributor: 'Clinical PK Scientist',
      prompt:
        'I want you to act as a pharmacokinetics/pharmacodynamics modeler. When I present a drug and clinical context, provide: 1) Structural model proposal (one/two-compartment, transit models), 2) Covariate relationships (weight, renal function), 3) Initial parameter estimates and sources, 4) Simulation scenarios for dosing adjustments, 5) Therapeutic drug monitoring recommendations, 6) Visualization of exposure-response concepts, and 7) Assumptions and limitations. My first request is "Simulate dosing for vancomycin in an obese patient with fluctuating renal function."',
    },
    {
      id: 22,
      title: 'Act as a Patient Counseling Pharmacist',
      category: 'Pharmacy',
      contributor: 'Community Pharmacy',
      prompt:
        'I want you to act as a pharmacist providing patient counseling using teach-back methods. When I name a medication, deliver: 1) Indication in plain language, 2) How and when to take it, 3) Common and serious side effects and what to do, 4) Key interactions and contraindications, 5) Storage and missed dose instructions, 6) Practical adherence tips, and 7) A short teach-back script to confirm understanding. My first request is "Counsel a patient starting metformin for type 2 diabetes."',
    },
    {
      id: 23,
      title: 'Act as a Health Policy Brief Writer',
      category: 'Health Policy',
      contributor: 'Health Policy Faculty',
      prompt:
        'I want you to act as a health policy brief writer. When I share a policy topic, produce: 1) One-paragraph executive summary, 2) Background with key statistics and context, 3) Policy options with pros/cons, 4) Recommended option with justification, 5) Implementation considerations and costs, 6) Equity and access implications, and 7) 2-3 clear calls to action. Use nonpartisan, accessible language. My first request is "Write a brief on expanding school-based mental health services."',
    },
    {
      id: 24,
      title: 'Act as a Quality Improvement Coach',
      category: 'Health Science',
      contributor: 'QI Program Lead',
      prompt:
        'I want you to act as a quality improvement coach in an ambulatory clinic. When I describe a process problem, provide: 1) Problem statement (A3 style), 2) Current-state process map, 3) Root cause analysis using fishbone/5-whys, 4) SMART aim statement, 5) PDSA cycle plan with measures (process/outcome/balancing), 6) Data collection plan and run chart approach, and 7) Spread and sustainability considerations. My first request is "Reduce patient no-shows for follow-up visits by 25% in 12 weeks."',
    },
    {
      id: 25,
      title: 'Act as a Neurogenic Disorders Specialist (SLP)',
      category: 'Speech-Language Pathology',
      contributor: 'SLP Neuro Specialist',
      prompt:
        'I want you to act as an SLP specializing in acquired motor speech disorders. When I present a case, provide: 1) Differential diagnosis across dysarthria types vs. apraxia, 2) Instrumental and perceptual assessment plan, 3) Functional, participation-focused goals, 4) Treatment hierarchy and cueing strategies, 5) Augmentative/alternative communication considerations, 6) Interprofessional collaboration needs (OT/PT/Neurology), and 7) Caregiver education plan. My first request is "Develop a plan for mixed spastic-flaccid dysarthria in ALS."',
    },
    {
      id: 26,
      title: 'Act as a Population Health Data Analyst',
      category: 'Public Health',
      contributor: 'Population Health',
      prompt:
        'I want you to act as a population health analyst using routinely collected data. When I give you a question, provide: 1) Data sources (EHR, HIE, claims, registries), 2) Variable definitions and coding, 3) Cohort inclusion/exclusion criteria, 4) Risk adjustment approach, 5) Analytic methods (segmentation, trend analysis, SDOH linkage), 6) Data visualization recommendations, and 7) Key caveats about bias and data quality. My first request is "Identify patients at high risk of 30-day readmission for targeted interventions."',
    },
    {
      id: 27,
      title: 'Act as an Interprofessional Education Facilitator',
      category: 'Clinical Education',
      contributor: 'IPE Coordinator',
      prompt:
        'I want you to act as an interprofessional education facilitator. When I describe a case, provide: 1) Clear roles/responsibilities for each profession, 2) Team-based learning activities and decision points, 3) Conflict resolution and communication strategies (SBAR, CUS), 4) Assessment rubric for teamwork competencies, 5) Debriefing questions that elicit reflection, 6) Logistics plan for small-group facilitation, and 7) Accessibility and inclusion considerations. My first request is "Create an IPE activity for safe opioid stewardship."',
    },
    {
      id: 28,
      title: 'Act as a Clinical Trial Protocol Designer',
      category: 'Research',
      contributor: 'Clinical Research',
      prompt:
        'I want you to act as a clinical trial protocol designer. When I specify an intervention, provide: 1) Study phase and design with justification, 2) Eligibility criteria with risk minimization, 3) Randomization/blinding approach, 4) Primary and secondary endpoints with measurement schedule, 5) Safety monitoring and stopping rules, 6) Statistical considerations (power, analyses), and 7) Operational feasibility and site selection. My first request is "Outline a phase II RCT for a novel GLP-1 analog in obesity."',
    },
    {
      id: 29,
      title: 'Act as a Patient Communication Scriptwriter',
      category: 'Patient Communication',
      contributor: 'Communication Dept',
      prompt:
        'I want you to act as a patient communication scriptwriter focusing on empathy and health literacy. When I provide a scenario, deliver: 1) A plain-language explanation of the condition/treatment, 2) A short, empathetic script clinicians can adapt, 3) A teach-back question, 4) Options for shared decision-making, 5) Handling common misconceptions, 6) Cultural and language adaptations, and 7) Documentation template. My first request is "Explain starting an SSRI for anxiety to a college student."',
    },
    {
      id: 30,
      title: 'Act as an Evidence-Based Practice Consultant (Nursing)',
      category: 'Nursing',
      contributor: 'EBP Faculty',
      prompt:
        'I want you to act as an evidence-based practice consultant for a nursing unit. When I pose a clinical question, provide: 1) A refined PICOT question, 2) Search strategy across major databases, 3) Inclusion/exclusion criteria, 4) Rapid critical appraisal of top studies, 5) Synthesis of findings into a practice recommendation, 6) Implementation plan with barriers/facilitators, and 7) Outcome measures for evaluation. My first request is "Assess the evidence for early mobilization protocols in the ICU."',
    },
  ] as const

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return prompts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, prompts])

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1600)
  }

  // Close modal on Escape
  useEffect(() => {
    if (!activePrompt) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePrompt(null)
    }
    window.addEventListener('keydown', onKey)
    // focus close button when opened
    setTimeout(() => closeButtonRef.current?.focus(), 0)
    return () => window.removeEventListener('keydown', onKey)
  }, [activePrompt])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="max-w-7xl mx-auto px-6 pt-10 pb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Prompt Library (Alt)</h1>
        <p className="mt-3 text-gray-700 max-w-3xl mx-auto text-base">
          A curated set of ready‑to‑use prompts for teaching, research, and clinical training across Bouvé disciplines.
          Search, filter by category, and open any card to view and copy the full prompt.
        </p>
      </header>

      {/* Search and Filter */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="mb-4">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <IconFilter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === c ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredPrompts.length}</span> prompt{filteredPrompts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Prompts Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No prompts found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((p) => {
              const snippet = p.prompt.length > 200 ? p.prompt.slice(0, 200) + '…' : p.prompt
              return (
              <button
                key={p.id}
                onClick={() => setActivePrompt(p)}
                className="text-left bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 flex flex-col focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={`Open prompt: ${p.title}`}
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="mb-2">
                    <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">{p.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                </div>
                <div className="p-6 flex-grow">
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">{snippet}</p>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <span className="text-xs text-red-600 font-medium">Click to view</span>
                </div>
              </button>
            )})}
          </div>
        )}
      </div>

      {/* Footer note removed per request */}

      {/* Modal */}
      {activePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setActivePrompt(null)} aria-hidden />
          <div role="dialog" aria-modal="true" aria-labelledby="prompt-title" className="relative z-10 w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200">
            <div className="p-5 border-b border-gray-100 flex items-start justify-between">
              <div>
                <div className="mb-2"><span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">{activePrompt.category}</span></div>
                <h3 id="prompt-title" className="text-2xl font-bold text-gray-900">{activePrompt.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(activePrompt.prompt, activePrompt.id)}
                  className="px-3 py-2 rounded-md border text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  title="Copy prompt"
                >
                  {copiedId === activePrompt.id ? <IconCheck className="w-4 h-4 text-green-600" /> : <IconCopy className="w-4 h-4" />}
                  <span>{copiedId === activePrompt.id ? 'Copied' : 'Copy'}</span>
                </button>
                <button ref={closeButtonRef} onClick={() => setActivePrompt(null)} className="p-2 rounded-md hover:bg-gray-100" aria-label="Close">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-5 max-h-[60vh] overflow-y-auto">
                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{activePrompt.prompt}</p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button onClick={() => setActivePrompt(null)} className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
