export type CHSDiscipline =
  | 'Nursing'
  | 'Pharmacy'
  | 'Public Health'
  | 'Physical Therapy'
  | 'Physician Assistant'
  | 'Nutrition & Dietetics'
  | 'Medical Laboratory Science'
  | 'Speech-Language Pathology'

export type UseCaseSlug =
  | 'redesign-assignment'
  | 'lecture-notes'

export type UseCase = {
  id: UseCaseSlug
  title: string
  category: string
  description: string
  generalPrompts: { id: string; title: string; approach: string; promptText: string }[]
  disciplinePrompts: Partial<Record<CHSDiscipline, { id: string; title: string; approach: string; promptText: string }[]>>
}

export const CHS_DISCIPLINES: CHSDiscipline[] = [
  'Nursing',
  'Pharmacy',
  'Public Health',
  'Physical Therapy',
  'Physician Assistant',
  'Nutrition & Dietetics',
  'Medical Laboratory Science',
  'Speech-Language Pathology',
]

export const USE_CASES: UseCase[] = [
  {
    id: 'redesign-assignment',
    title: 'Redesign an Assignment',
    category: 'Assessment & Assignments',
    description:
      'Transform traditional tasks into authentic, higher-order learning experiences that support academic integrity and clinical reasoning.',
    generalPrompts: [
      {
        id: 'ga-1',
        title: 'Authentic Clinical Scenario Redesign',
        approach: 'Shift to real-world context with clear outcomes and rubric hooks.',
        promptText:
          'You are an instructional design assistant. Redesign the following assignment to emphasize real-world clinical or community relevance, critical thinking, and academic integrity. Include clear criteria and specific deliverables.\n\nCourse/Topic: [Insert Topic]\nCurrent Assignment: [Paste current prompt]\nConstraints: [Time, resources]\n\nReturn: 1) Revised prompt, 2) Learning outcomes, 3) Evaluation criteria, 4) Optional scaffolding.',
      },
      {
        id: 'ga-2',
        title: 'Socratic Case Redevelopment',
        approach: 'Convert to progressive case questions requiring justification.',
        promptText:
          'Redesign this assignment as a progressive case. Provide 4–6 questions that move from recall to application to synthesis. Require justification and professional rationale in each answer.\n\nTopic: [Topic]\nOriginal Task: [Paste]\n\nReturn: Case background, stepwise questions, expected evidence-based justifications.',
      },
      {
        id: 'ga-3',
        title: 'Team-Based Redesign',
        approach: 'Structure a small-team deliverable with transparent roles.',
        promptText:
          'Redesign the task for small teams (3–4). Define roles (facilitator, analyst, scribe, validator) and a shared artifact. Include peer-assessment prompts tied to contribution and professionalism.\n\nTopic: [Topic]\nDeliverable: [Slide deck, brief, protocol]\n\nReturn: Prompt, roles, deliverable criteria, peer-assessment items.',
      },
      {
        id: 'ga-4',
        title: 'Clinically Safe Simulation Task',
        approach: 'Design a low-stakes simulation that rehearses safety and communication.',
        promptText:
          'Redesign as a 20–30 minute simulated scenario emphasizing patient safety and interprofessional communication. Include briefing, scenario cues, and debrief prompts.\n\nSetting: [In-person/Online]\nLearners: [Level]\n\nReturn: Briefing, scenario steps, observable behaviors, debrief questions.',
      },
      {
        id: 'ga-5',
        title: 'Community-Engaged Redesign',
        approach: 'Anchor to a public health or community partner frame.',
        promptText:
          'Reframe the assignment around a community partner need (real or hypothetical). Include stakeholder, equity, and feasibility considerations.\n\nCommunity Context: [Describe]\nConstraints: [List]\n\nReturn: Partner brief, task prompt, success criteria, equity considerations.',
      },
    ],
    disciplinePrompts: {
      Nursing: [
        {
          id: 'nu-1',
          title: 'Medication Safety Handoff',
          approach: 'Handoff note and SBAR simulation.',
          promptText:
            'Redesign as an SBAR (Situation–Background–Assessment–Recommendation) handoff exercise on medication reconciliation. Provide patient history, MAR discrepancies, and error-prevention checks. Deliverable: 2-minute SBAR recording + checklist.',
        },
        {
          id: 'nu-2',
          title: 'Pressure Injury Plan',
          approach: 'Care plan development with NPUAP stages.',
          promptText:
            'Redesign into a care-plan build focused on pressure injury prevention and staging. Include risk assessment (Braden), turning schedule, and patient education artifact. Deliverable: plan table + 250-word rationale with citations.',
        },
      ],
      Pharmacy: [
        {
          id: 'ph-1',
          title: 'Pharmacokinetics Consult',
          approach: 'PK dosing note in clinical consult style.',
          promptText:
            'Redesign as a clinical consult note recommending initial dosing and monitoring for a renally cleared antibiotic. Provide patient labs, culture, and co-meds. Deliverable: concise consult note + monitoring plan.',
        },
        {
          id: 'ph-2',
          title: 'OTC Counseling OSCE',
          approach: 'Simulated counseling with ethics flags.',
          promptText:
            'Create a simulated OTC counseling scenario highlighting red flags and referral. Include standardized patient script and checklist. Deliverable: counseling script + risk/benefit summary.',
        },
      ],
      'Public Health': [
        {
          id: 'phl-1',
          title: 'Policy Brief Redesign',
          approach: 'Equity-forward brief for a local board.',
          promptText:
            'Redesign as a 1-page policy brief advocating for an intervention addressing a local health disparity. Include target population, evidence, implementation steps, and evaluation metric.',
        },
        {
          id: 'phl-2',
          title: 'Data Storytelling Task',
          approach: 'Visual + narrative synthesis.',
          promptText:
            'Students convert surveillance data into a concise visual + 300-word narrative for a community newsletter. Provide dataset excerpt and style constraints.',
        },
      ],
      'Physical Therapy': [
        { id: 'pt-1', title: 'Gait Analysis Redesign', approach: 'SOAP focus.', promptText: 'Redesign as a SOAP note after gait analysis with video clips. Include dx, goals (SMART), plan, and patient education element.' },
        { id: 'pt-2', title: 'Return-to-Play Plan', approach: 'Criteria-based progression.', promptText: 'Build a progression plan for post-ACL repair with objective criteria and decision points. Deliverable: protocol table + rationale.' },
      ],
      'Physician Assistant': [
        { id: 'pa-1', title: 'Differential Diagnosis Brief', approach: 'Top-5 ddx with reasoning.', promptText: 'Redesign into a differential diagnosis brief from HPI/ROS snippets. Require evidence ranking and test selection rationale.' },
        { id: 'pa-2', title: 'Patient Education Sheet', approach: 'Plain-language handout.', promptText: 'Create a one-page patient education sheet at 6th-grade reading level on a chosen condition, with teach-back prompts.' },
      ],
      'Nutrition & Dietetics': [
        { id: 'nd-1', title: 'Medical Nutrition Therapy Plan', approach: 'Case-based MNT.', promptText: 'Redesign as an MNT plan for T2DM with cultural considerations and budget constraints. Include SMART goals and follow-up metrics.' },
        { id: 'nd-2', title: 'Menu Redesign', approach: 'Healthy swaps with labeling.', promptText: 'Students redesign a cafeteria menu to meet specified macros and allergens with clear labeling and cost notes.' },
      ],
      'Medical Laboratory Science': [
        { id: 'mls-1', title: 'Quality Control Investigation', approach: 'Root-cause analysis.', promptText: 'Redesign as a QC investigation report for an assay drift incident. Include data review, likely causes, and corrective actions.' },
        { id: 'mls-2', title: 'Specimen Handling SOP', approach: 'SOP drafting.', promptText: 'Draft a specimen handling SOP for a new analyte, covering pre-analytical variables and safety.' },
      ],
      'Speech-Language Pathology': [
        { id: 'slp-1', title: 'Treatment Plan Redesign', approach: 'Goal-writing practice.', promptText: 'Redesign into a treatment plan with short- and long-term goals for aphasia therapy; include session outline and outcome measures.' },
        { id: 'slp-2', title: 'Caregiver Coaching Script', approach: 'Coaching micro-skills.', promptText: 'Students produce a coaching script for caregivers supporting a child with phonological disorder, using teach-back elements.' },
      ],
    },
  },
  {
    id: 'lecture-notes',
    title: 'Generate Lecture Notes & Misconceptions',
    category: 'Teaching Materials',
    description:
      'Produce structured notes with key concepts, worked examples, and common misconceptions to address proactively.',
    generalPrompts: [
      { id: 'gl-1', title: 'Structured Lecture Notes', approach: 'Headings + examples.', promptText: 'Create lecture notes for the topic. Use headings, concise explanations, examples, and 3 formative questions. Return sections: Overview, Key Concepts, Examples, Misconceptions, Practice Questions.\n\nTopic: [Insert]\nLevel: [Intro/Advanced]' },
      { id: 'gl-2', title: 'Concept-Misconception Map', approach: 'Two-column focus.', promptText: 'List 6–10 core concepts and a paired common misconception for each, with a corrective explanation and an in-class check.' },
      { id: 'gl-3', title: 'Worked Problem Set', approach: '3 worked + 2 unworked.', promptText: 'Provide 3 worked examples and 2 practice questions with answer keys for the topic. Include step-by-step reasoning and pitfalls.' },
      { id: 'gl-4', title: 'Minute Papers', approach: 'Quick reflections.', promptText: 'Draft 5 one-minute paper prompts for formative assessment across the lecture, aligned to core learning outcomes.' },
      { id: 'gl-5', title: 'Visual Explainer', approach: 'Diagrams + captions.', promptText: 'Describe a slide-friendly visual explainer (diagram or flow) with captions that clarifies a complex process in the topic.' },
    ],
    disciplinePrompts: {
      Nursing: [
        { id: 'nu-l-1', title: 'Sepsis Bundle Notes', approach: 'Protocol emphasis.', promptText: 'Generate notes summarizing sepsis bundle elements, early warning signs, and nursing actions. Include misconceptions and safety reminders.' },
        { id: 'nu-l-2', title: 'Cardiac Rhythms', approach: 'Strip interpretation.', promptText: 'Create notes on common ECG rhythms with identification tips, misconceptions, and quick practice questions.' },
      ],
      Pharmacy: [
        { id: 'ph-l-1', title: 'ADME Fundamentals', approach: 'PK/PD crosswalk.', promptText: 'Lecture notes on ADME with connections to pharmacodynamics; include misconceptions about half-life vs. steady state.' },
        { id: 'ph-l-2', title: 'Drug Interactions', approach: 'CYP focus.', promptText: 'Notes on common CYP-mediated interactions with case snippets and misconception corrections.' },
      ],
      'Public Health': [
        { id: 'phl-l-1', title: 'Epidemiology Basics', approach: 'Rates and ratios.', promptText: 'Notes covering incidence, prevalence, relative risk, and when to use each; add common misinterpretations.' },
        { id: 'phl-l-2', title: 'Program Evaluation', approach: 'Logic models.', promptText: 'Generate notes that outline logic models, indicators, and data collection pitfalls.' },
      ],
      'Physical Therapy': [
        { id: 'pt-l-1', title: 'Neuroplasticity', approach: 'Principles list.', promptText: 'Notes on neuroplasticity principles applied to rehab exercises with quick checks.' },
        { id: 'pt-l-2', title: 'Balance Assessment', approach: 'Tools overview.', promptText: 'Summarize standardized balance assessments with scenarios and misconceptions.' },
      ],
      'Physician Assistant': [
        { id: 'pa-l-1', title: 'Dermatology Patterns', approach: 'Pattern recognition.', promptText: 'Notes covering lesion morphology and distribution patterns; include common misdiagnoses.' },
        { id: 'pa-l-2', title: 'Antibiotics Primer', approach: 'Coverage + pitfalls.', promptText: 'Summarize antibiotic classes with coverage and pitfalls; add case questions.' },
      ],
      'Nutrition & Dietetics': [
        { id: 'nd-l-1', title: 'Macronutrients', approach: 'Digestible summary.', promptText: 'Notes on macros, digestion, absorption, and metabolism; include common myths.' },
        { id: 'nd-l-2', title: 'Dietary Assessment', approach: '24-hour recall.', promptText: 'Summarize methods for dietary assessment and typical sources of bias.' },
      ],
      'Medical Laboratory Science': [
        { id: 'mls-l-1', title: 'Quality Assurance', approach: 'QA/QC overview.', promptText: 'Notes on QA vs QC, Levey–Jennings charts, Westgard rules, and misconceptions.' },
        { id: 'mls-l-2', title: 'Specimen Variables', approach: 'Pre-analytical errors.', promptText: 'Summarize pre-analytical variables and how to mitigate errors.' },
      ],
      'Speech-Language Pathology': [
        { id: 'slp-l-1', title: 'Aphasia Types', approach: 'Comparison table.', promptText: 'Notes comparing aphasia types with diagnostics and misconceptions.' },
        { id: 'slp-l-2', title: 'Phonological Processes', approach: 'Developmental patterns.', promptText: 'Outline typical vs atypical phonological processes with practice items.' },
      ],
    },
  },
]
