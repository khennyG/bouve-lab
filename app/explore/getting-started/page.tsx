"use client";
import { useState } from 'react';
import 'katex/dist/katex.min.css';
import FacultySubmissionFormBouve from '@/app/components/forms/FacultySubmissionFormBouve';
import SectionFacultySubmissions from '@/app/components/forms/SectionFacultySubmissions';

const ACCORDION_ITEMS = [
  'Redesign Assignments',
  'Generate Lecture Notes & Misconceptions',
  'Create Case Studies & Scenarios',
  'Scaffold Student Work',
  'Build In-Class Activities',
  'Use AI for Feedback & Rubrics',
  'Research & Efficiency Support'
];

export default function GettingStartedPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Nursing');

  const DISCIPLINES = [
    'Nursing',
    'Pharmacy',
    'Public Health',
    'Speech-Language Pathology',
    'Health Science',
    'Pharmaceutical Sciences'
  ];

  // Dummy example data per discipline (to be replaced later)
  // Updated placeholder examples aligned with Bouvé disciplines (to be expanded later)
  const DISCIPLINE_EXAMPLES: Record<string, { id: string; title: string; old: React.ReactNode; redesigned: React.ReactNode }[]> = {
    'Nursing': [
      {
        id: 'n-med-error',
  title: 'Medication Error Analysis',
        old: (<p className="mb-2">Write a short paragraph describing the “five rights” of medication administration.</p>),
        redesigned: (<p className="mb-2">You are the charge nurse reviewing a medication error report where a patient received the wrong dose. Identify which “right” was breached, explain the human factors that likely contributed, and propose two system-level safeguards to prevent recurrence. Support your response with evidence from nursing safety standards.</p>)
      },
      {
        id: 'n-clinical-prioritization',
  title: 'Clinical Prioritization in Acute Care',
        old: (<p className="mb-2">Describe the steps in assessing a postoperative patient.</p>),
        redesigned: (<p className="mb-2">A nurse has four patients post-surgery with varying complications. Rank the order in which you would assess each one and explain the clinical reasoning behind your prioritization.</p>)
      },
      {
        id: 'n-patient-education',
  title: 'Patient Education on Chronic Illness',
        old: (<p className="mb-2">Explain diabetes self-management principles.</p>),
        redesigned: (<p className="mb-2">Design a 5-minute patient education plan for a newly diagnosed Type 2 diabetes patient with low health literacy. Include teaching strategies, learning outcomes, and how you would evaluate understanding.</p>)
      }
    ],
    'Pharmacy': [
      {
        id: 'pharm-tdm',
  title: 'Therapeutic Drug Monitoring',
        old: (<p className="mb-2">Calculate the correct vancomycin dose for a patient with impaired renal function.</p>),
        redesigned: (<p className="mb-2">A 62-year-old patient with stage 3 CKD is prescribed vancomycin. Using the pharmacokinetic data provided, determine an appropriate dosing regimen and justify your decision. Then explain how changes in renal clearance or protein binding would alter your calculation and clinical monitoring strategy.</p>)
      },
      {
        id: 'pharm-pharmacoecon',
  title: 'Pharmacoeconomics Case Analysis',
        old: (<p className="mb-2">Define cost-effectiveness analysis and cost-utility analysis.</p>),
        redesigned: (<p className="mb-2">Compare two antihypertensive medications—one brand, one generic—using cost-effectiveness principles. Recommend which option you’d include in a formulary and justify using both economic and clinical outcomes.</p>)
      },
      {
        id: 'pharm-adr',
  title: 'Adverse Drug Reaction Investigation',
        old: (<p className="mb-2">List common side effects of ACE inhibitors.</p>),
        redesigned: (<p className="mb-2">A patient on lisinopril presents with a persistent cough. Explain your clinical reasoning to determine if this is an adverse reaction or a comorbid symptom, and outline the steps you’d take before substituting therapy.</p>)
      }
    ],
    'Public Health': [
      {
        id: 'ph-needs',
  title: 'Community Needs Assessment',
        old: (<p className="mb-2">List the social determinants of health affecting a low-income neighborhood.</p>),
        redesigned: (<p className="mb-2">You are preparing a brief for a local health department on health disparities in a low-income neighborhood. Prioritize the three most influential determinants of health for this community and explain why they interact synergistically. Propose one evidence-based intervention for each determinant and justify how it addresses root causes.</p>)
      },
      {
        id: 'ph-policy-brief',
  title: 'Health Policy Brief',
        old: (<p className="mb-2">Summarize the key components of the Affordable Care Act.</p>),
        redesigned: (<p className="mb-2">Write a one-page policy brief for a state senator advocating for increased funding for maternal health. Include a problem statement, data-driven justification, and one feasible legislative recommendation.</p>)
      },
      {
        id: 'ph-program-eval',
  title: 'Program Evaluation Framework',
        old: (<p className="mb-2">List the steps in evaluating a public health program.</p>),
        redesigned: (<p className="mb-2">You are tasked with evaluating a smoking cessation program that had poor retention. Identify the most significant barriers to participant adherence and propose three modifications to improve engagement based on evaluation data.</p>)
      }
    ],
    'Speech-Language Pathology': [
      {
        id: 'slp-plan',
  title: 'Treatment Planning for Broca’s Aphasia',
        old: (<p className="mb-2">Describe therapy techniques used for clients with Broca’s aphasia.</p>),
        redesigned: (<p className="mb-2">A 55-year-old post-stroke client presents with non-fluent speech and intact comprehension. Develop a short-term treatment plan outlining three therapy goals. For each goal, describe the rationale and expected linguistic or behavioral outcome, explaining how you would measure progress over time.</p>)
      },
      {
        id: 'slp-peds-delay',
  title: 'Pediatric Speech Delay Case Study',
        old: (<p className="mb-2">Define expressive and receptive language delay.</p>),
        redesigned: (<p className="mb-2">Given a transcript of a 4-year-old with expressive delay, identify three speech-language targets and create one intervention activity for each. Justify your approach using evidence-based practices.</p>)
      },
      {
        id: 'slp-voice-eval',
  title: 'Voice Disorder Evaluation',
        old: (<p className="mb-2">Describe vocal nodules and their treatment.</p>),
        redesigned: (<p className="mb-2">Review a simulated laryngeal exam and client interview notes. Identify the probable voice disorder, explain how you would confirm diagnosis, and propose a voice hygiene plan with rationale.</p>)
      }
    ],
    'Health Science': [
      {
        id: 'hs-bioethics',
  title: 'Bioethics in Clinical Decision-Making',
        old: (<p className="mb-2">List and define the four principles of biomedical ethics.</p>),
        redesigned: (<p className="mb-2">A hospital must decide whether to withdraw life-sustaining treatment from an unresponsive patient without family contact. Analyze this dilemma using the four principles of biomedical ethics, identify which principles conflict, and propose a balanced course of action with justification.</p>)
      },
      {
        id: 'hs-ebp',
  title: 'Evidence-Based Practice Application',
        old: (<p className="mb-2">Describe the hierarchy of evidence in research.</p>),
        redesigned: (<p className="mb-2">Select a clinical claim from a recent media article (e.g., “new diet reduces cancer risk”). Use the hierarchy of evidence to evaluate the claim’s validity and discuss how you would communicate findings to a non-expert audience.</p>)
      },
      {
        id: 'hs-behavior-change',
  title: 'Health Behavior Change Model',
        old: (<p className="mb-2">Explain the stages of the Transtheoretical Model.</p>),
        redesigned: (<p className="mb-2">Given a client case struggling with weight loss, identify their current stage of change and develop one tailored intervention for moving them to the next stage. Justify using behavioral theory.</p>)
      }
    ],
    'Pharmaceutical Sciences': [
      {
        id: 'ps-formulation',
  title: 'Drug Formulation Design',
        old: (<p className="mb-2">Describe factors that affect drug bioavailability.</p>),
        redesigned: (<p className="mb-2">You are developing an oral formulation for a poorly soluble drug. Compare two formulation strategies that could improve bioavailability. Evaluate the trade-offs between stability, manufacturing feasibility, and patient adherence, then recommend the optimal approach with justification.</p>)
      },
      {
        id: 'ps-stability',
  title: 'Stability and Shelf-Life Study',
        old: (<p className="mb-2">Define drug stability and factors affecting shelf life.</p>),
        redesigned: (<p className="mb-2">Design a stability testing protocol for a new liquid formulation, explaining how pH, temperature, and light exposure affect degradation. Recommend storage conditions supported by data interpretation.</p>)
      },
      {
        id: 'ps-clinical-translation',
  title: 'Clinical Translation of Drug Research',
        old: (<p className="mb-2">Describe the phases of clinical trials.</p>),
        redesigned: (<p className="mb-2">A new compound has shown 70% efficacy in preclinical trials. Outline a Phase I study design addressing sample selection, ethical safeguards, and key success metrics for progressing to Phase II.</p>)
      }
    ]
  };

  // Lecture note + misconceptions examples (for second accordion panel)
  const LECTURE_EXAMPLES: { id: string; discipline: string; title: string; old: React.ReactNode; redesigned: React.ReactNode }[] = [
    // Nursing
    { id: 'ln-n-vitals', discipline: 'Nursing', title: 'Vital Signs Interpretation', old: (<p className="mb-2">Present normal ranges for vital signs in adults.</p>), redesigned: (<p className="mb-2">Present three patient cases with “normal” vitals but worsening conditions. Ask students to identify early warning patterns and explain why stability can be misleading without context.</p>) },
    { id: 'ln-n-fluid-electrolyte', discipline: 'Nursing', title: 'Fluid & Electrolyte Balance', old: (<p className="mb-2">List symptoms of hypokalemia and hyperkalemia.</p>), redesigned: (<p className="mb-2">Provide conflicting lab results from two patients; have students interpret which electrolyte imbalance each represents, predict complications, and link symptoms to underlying pathophysiology.</p>) },
    { id: 'ln-n-pain', discipline: 'Nursing', title: 'Pain Assessment', old: (<p className="mb-2">Teach the use of the 0–10 pain scale.</p>), redesigned: (<p className="mb-2">Introduce scenarios where patients’ reported pain levels don’t align with observable cues. Discuss bias, communication barriers, and cultural factors that affect pain interpretation.</p>) },
    // Pharmacy
    { id: 'ln-ph-drug-metabolism', discipline: 'Pharmacy', title: 'Drug Metabolism', old: (<p className="mb-2">Explain the function of CYP450 enzymes.</p>), redesigned: (<p className="mb-2">Present two patients taking the same drug with different outcomes. Ask students to analyze how genetic polymorphisms in CYP450 could explain this difference.</p>) },
    { id: 'ln-ph-antimicrobial', discipline: 'Pharmacy', title: 'Antimicrobial Stewardship', old: (<p className="mb-2">Review the classes of antibiotics and their mechanisms.</p>), redesigned: (<p className="mb-2">Show three antibiotic prescriptions—one appropriate, one unnecessary, one incomplete. Have students critique each, identify risks of resistance, and propose better stewardship decisions.</p>) },
    { id: 'ln-ph-pk-geriatrics', discipline: 'Pharmacy', title: 'Pharmacokinetics in Geriatric Patients', old: (<p className="mb-2">Describe absorption, distribution, metabolism, and excretion.</p>), redesigned: (<p className="mb-2">Present a 78-year-old patient’s medication list and lab values; have students predict pharmacokinetic changes and discuss dose adjustments.</p>) },
    // Public Health
    { id: 'ln-pub-epi', discipline: 'Public Health', title: 'Epidemiologic Reasoning', old: (<p className="mb-2">Define incidence, prevalence, and risk ratio.</p>), redesigned: (<p className="mb-2">Provide real-world outbreak data with missing pieces. Ask students to calculate both incidence and prevalence, discuss what each metric reveals, and identify potential data collection biases.</p>) },
    { id: 'ln-pub-health-behavior', discipline: 'Public Health', title: 'Health Behavior Models', old: (<p className="mb-2">Summarize the stages of the Health Belief Model.</p>), redesigned: (<p className="mb-2">Use a case about low vaccination uptake. Have students identify which belief barriers apply and craft a short intervention message for a specific audience.</p>) },
    { id: 'ln-pub-environmental', discipline: 'Public Health', title: 'Environmental Health', old: (<p className="mb-2">List major sources of air pollution.</p>), redesigned: (<p className="mb-2">Show satellite data and community exposure levels; have students interpret patterns, discuss inequities, and connect findings to policy recommendations.</p>) },
    // Speech-Language Pathology
    { id: 'ln-slp-phonological', discipline: 'Speech-Language Pathology', title: 'Phonological Disorders', old: (<p className="mb-2">Define phonological vs. articulation errors.</p>), redesigned: (<p className="mb-2">Play three speech samples and ask students to classify the errors, explain the underlying process, and discuss treatment implications.</p>) },
    { id: 'ln-slp-language-dev', discipline: 'Speech-Language Pathology', title: 'Language Development in Children', old: (<p className="mb-2">Describe stages of language acquisition.</p>), redesigned: (<p className="mb-2">Present transcripts from children at different developmental stages with atypical patterns. Have students diagnose possible delays and design one activity per child to target a deficit.</p>) },
    { id: 'ln-slp-cognitive-communication', discipline: 'Speech-Language Pathology', title: 'Cognitive-Communication Disorders', old: (<p className="mb-2">List communication deficits in traumatic brain injury.</p>), redesigned: (<p className="mb-2">Provide excerpts from TBI patients’ conversations and have students analyze pragmatic breakdowns, infer cognitive causes, and propose compensatory strategies.</p>) },
    // Health Science
    { id: 'ln-hs-physiology', discipline: 'Health Science', title: 'Human Physiology', old: (<p className="mb-2">Label parts of the cardiovascular system.</p>), redesigned: (<p className="mb-2">Provide physiological data from a stress test. Have students interpret what’s happening to heart rate, stroke volume, and cardiac output — explaining how the body maintains homeostasis.</p>) },
    { id: 'ln-hs-ethics', discipline: 'Health Science', title: 'Ethics and Professionalism', old: (<p className="mb-2">Define autonomy, beneficence, and justice.</p>), redesigned: (<p className="mb-2">Present a short ethics vignette (e.g., confidentiality breach). Have students debate which ethical principle should take priority and why.</p>) },
    { id: 'ln-hs-informatics', discipline: 'Health Science', title: 'Health Informatics', old: (<p className="mb-2">List benefits of electronic health records.</p>), redesigned: (<p className="mb-2">Examine a simulated EHR with data errors. Ask students to identify risks to patient safety and suggest workflow changes to improve accuracy.</p>) },
    // Pharmaceutical Sciences
    { id: 'ln-ps-discovery', discipline: 'Pharmaceutical Sciences', title: 'Drug Discovery Pipeline', old: (<p className="mb-2">Explain the stages of drug discovery.</p>), redesigned: (<p className="mb-2">Present a failed drug candidate. Ask students to hypothesize at which stage the failure occurred and suggest modifications that could have improved translational success.</p>) },
    { id: 'ln-ps-interactions', discipline: 'Pharmaceutical Sciences', title: 'Drug-Drug Interactions', old: (<p className="mb-2">List examples of drug-drug interactions.</p>), redesigned: (<p className="mb-2">Present a complex polypharmacy case. Have students identify potential interactions, rank them by clinical significance, and recommend management strategies.</p>) },
    { id: 'ln-ps-formulation-challenges', discipline: 'Pharmaceutical Sciences', title: 'Formulation Challenges', old: (<p className="mb-2">Describe methods of increasing solubility.</p>), redesigned: (<p className="mb-2">Give examples of two poorly soluble compounds. Students must select an appropriate formulation strategy for each and justify based on physicochemical data.</p>) },
  ];

  // Case studies & scenarios examples (third accordion panel)
  const CASE_EXAMPLES: { id: string; discipline: string; title: string; old: React.ReactNode; redesigned: React.ReactNode }[] = [
    // Nursing
    { id: 'cs-n-deterioration', discipline: 'Nursing', title: 'Patient Deterioration Recognition', old: (<p className="mb-2">Read about early warning signs of patient deterioration.</p>), redesigned: (<p className="mb-2">Present a simulated patient with fluctuating vital signs and subtle mental status changes. Students must identify red flags, prioritize actions, and justify when to escalate care.</p>) },
    { id: 'cs-n-end-of-life', discipline: 'Nursing', title: 'End-of-Life Decision-Making', old: (<p className="mb-2">List the stages of the dying process.</p>), redesigned: (<p className="mb-2">Provide a palliative care scenario where a family disagrees with the patient’s DNR wishes. Students discuss communication strategies, ethical principles, and documentation requirements.</p>) },
    { id: 'cs-n-communication-breakdown', discipline: 'Nursing', title: 'Interprofessional Communication Breakdown', old: (<p className="mb-2">Define SBAR (Situation-Background-Assessment-Recommendation).</p>), redesigned: (<p className="mb-2">Simulate a nurse-to-physician handoff that leads to confusion about orders. Students identify what went wrong and rewrite the SBAR communication to improve clarity.</p>) },
    // Pharmacy
    { id: 'cs-ph-prescription-error', discipline: 'Pharmacy', title: 'Prescription Error Analysis', old: (<p className="mb-2">Memorize the top ten causes of prescription errors.</p>), redesigned: (<p className="mb-2">Provide a prescription with ambiguous dosing instructions. Students identify potential sources of error, clarify the order, and propose a safer alternative.</p>) },
    { id: 'cs-ph-adverse-event', discipline: 'Pharmacy', title: 'Adverse Drug Event Investigation', old: (<p className="mb-2">Define “adverse drug reaction” and give examples.</p>), redesigned: (<p className="mb-2">Present a hospitalized patient with unexplained symptoms after starting a new medication. Students review chart notes, lab results, and drug lists to determine the most likely culprit and prevention strategy.</p>) },
    { id: 'cs-ph-pediatrics', discipline: 'Pharmacy', title: 'Pharmacotherapy in Pediatrics', old: (<p className="mb-2">List considerations when prescribing for children.</p>), redesigned: (<p className="mb-2">Present a 5-year-old with an infection. Students calculate the correct pediatric dose, adjust for weight and renal function, and explain the rationale for antibiotic choice.</p>) },
    // Public Health
    { id: 'cs-pub-outbreak-response', discipline: 'Public Health', title: 'Outbreak Response Planning', old: (<p className="mb-2">Explain the steps of outbreak investigation.</p>), redesigned: (<p className="mb-2">Provide incomplete outbreak data from a community. Students identify what data they’d need next, interpret trends, and outline a response plan prioritizing vulnerable groups.</p>) },
    { id: 'cs-pub-disaster-preparedness', discipline: 'Public Health', title: 'Disaster Preparedness Simulation', old: (<p className="mb-2">Describe components of an emergency response plan.</p>), redesigned: (<p className="mb-2">Simulate a hurricane hitting a small town. Students must coordinate shelter operations, allocate resources, and assess the long-term impact on community health systems.</p>) },
    { id: 'cs-pub-health-equity', discipline: 'Public Health', title: 'Health Equity in Policy', old: (<p className="mb-2">Summarize disparities in maternal health.</p>), redesigned: (<p className="mb-2">Present two counties with differing maternal mortality rates. Students analyze systemic causes and draft a policy memo with one concrete intervention to reduce inequity.</p>) },
    // Speech-Language Pathology
    { id: 'cs-slp-stroke-rehab', discipline: 'Speech-Language Pathology', title: 'Stroke Rehabilitation Case', old: (<p className="mb-2">Identify language deficits in Wernicke’s aphasia.</p>), redesigned: (<p className="mb-2">Provide a transcript of a post-stroke patient’s conversation. Students identify the aphasia type, describe therapy goals, and anticipate potential communication barriers.</p>) },
    { id: 'cs-slp-cultural-competence', discipline: 'Speech-Language Pathology', title: 'Cultural Competence in Therapy', old: (<p className="mb-2">List strategies for culturally responsive care.</p>), redesigned: (<p className="mb-2">A bilingual child exhibits code-switching during sessions. Students discuss how to adapt assessment tools and treatment plans for linguistic diversity.</p>) },
    { id: 'cs-slp-voice-disorder', discipline: 'Speech-Language Pathology', title: 'Voice Disorder in Professional Speakers', old: (<p className="mb-2">Define functional vs. organic voice disorders.</p>), redesigned: (<p className="mb-2">Present a teacher with chronic hoarseness. Students analyze contributing lifestyle factors, propose treatment approaches, and outline vocal hygiene education.</p>) },
    // Health Science
    { id: 'cs-hs-clinical-ethics', discipline: 'Health Science', title: 'Clinical Ethics Scenario', old: (<p className="mb-2">Describe confidentiality in healthcare.</p>), redesigned: (<p className="mb-2">A student intern overhears sensitive patient information being shared in a hallway. Students discuss HIPAA implications, corrective action, and reflection on professionalism.</p>) },
    { id: 'cs-hs-behavior-change', discipline: 'Health Science', title: 'Health Behavior Change Challenge', old: (<p className="mb-2">Explain motivational interviewing techniques.</p>), redesigned: (<p className="mb-2">Present a client resistant to exercise post-surgery. Students role-play a short dialogue applying motivational interviewing skills and evaluate which strategies were most effective.</p>) },
    { id: 'cs-hs-team-coordination', discipline: 'Health Science', title: 'Team-Based Care Coordination', old: (<p className="mb-2">List members of the interprofessional healthcare team.</p>), redesigned: (<p className="mb-2">Provide a miscommunication event between nursing, PT, and nutrition teams. Students identify system-level communication gaps and propose workflow improvements.</p>) },
    // Pharmaceutical Sciences
    { id: 'cs-ps-drug-failure', discipline: 'Pharmaceutical Sciences', title: 'Drug Development Failure Review', old: (<p className="mb-2">Describe the stages of drug development.</p>), redesigned: (<p className="mb-2">A Phase II oncology drug shows strong efficacy but severe toxicity. Students identify the scientific and ethical factors influencing whether to halt or continue the trial.</p>) },
    { id: 'cs-ps-manufacturing-contamination', discipline: 'Pharmaceutical Sciences', title: 'Manufacturing Contamination Event', old: (<p className="mb-2">Explain good manufacturing practices (GMP).</p>), redesigned: (<p className="mb-2">Present a sterile production line contamination report. Students analyze data, identify root causes, and propose corrective and preventive actions.</p>) },
    { id: 'cs-ps-clinical-translation', discipline: 'Pharmaceutical Sciences', title: 'Clinical Translation of Preclinical Data', old: (<p className="mb-2">Define pharmacodynamics and pharmacokinetics.</p>), redesigned: (<p className="mb-2">Provide preclinical animal data for a new compound. Students must predict human dose ranges, anticipate safety issues, and design the outline for a Phase I trial.</p>) },
  ];

  // Scaffold Student Work examples (panel 4)
  const SCAFFOLD_EXAMPLES: { id: string; discipline: string; title: string; old: React.ReactNode; redesigned: React.ReactNode }[] = [
    // Nursing
    { id: 'sc-n-clinical-reflection', discipline: 'Nursing', title: 'Clinical Reflection Journals', old: (<p className="mb-2">Submit a 2-page reflection about your clinical day.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Write a short reflection focusing only on one decision made during the shift.</p>
        <p>Stage 2: Peer review a classmate’s reflection and identify one strength and one area for deeper ethical consideration.</p>
        <p>Stage 3: Revise your reflection incorporating feedback and connect your insight to an evidence-based guideline.</p>
      </div>) },
    { id: 'sc-n-patient-safety-sim', discipline: 'Nursing', title: 'Patient Safety Simulation', old: (<p className="mb-2">Describe how to prevent patient falls.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Review a fall incident report and identify contributing factors.</p>
        <p>Stage 2: Collaborate in small groups to create a prevention checklist.</p>
        <p>Stage 3: Simulate a patient care round and document one real-time risk mitigation decision.</p>
      </div>) },
    { id: 'sc-n-health-assessment', discipline: 'Nursing', title: 'Health Assessment Project', old: (<p className="mb-2">Conduct a full patient assessment and submit documentation.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Perform a focused systems assessment (e.g., cardiovascular).</p>
        <p>Stage 2: Combine findings into a holistic care summary.</p>
        <p>Stage 3: Reflect on how your documentation supports clinical reasoning and patient safety.</p>
      </div>) },
    // Pharmacy
    { id: 'sc-ph-therapeutic-plan', discipline: 'Pharmacy', title: 'Therapeutic Plan Development', old: (<p className="mb-2">Write a full treatment plan for a patient with hypertension.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Identify one primary drug therapy and explain the mechanism of action.</p>
        <p>Stage 2: Justify the choice using patient comorbidities.</p>
        <p>Stage 3: Create a patient counseling guide focusing on adherence and monitoring.</p>
      </div>) },
    { id: 'sc-ph-literature-eval', discipline: 'Pharmacy', title: 'Drug Literature Evaluation', old: (<p className="mb-2">Summarize a journal article on diabetes management.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Extract the clinical question and study design.</p>
        <p>Stage 2: Evaluate internal validity and limitations.</p>
        <p>Stage 3: Write a one-paragraph clinical takeaway linked to patient care.</p>
      </div>) },
    { id: 'sc-ph-compounding', discipline: 'Pharmacy', title: 'Compounding Practice', old: (<p className="mb-2">Prepare a medication compound following instructions.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Review the stability and compatibility of ingredients.</p>
        <p>Stage 2: Perform compounding with instructor observation.</p>
        <p>Stage 3: Write a reflection explaining how accuracy impacts patient safety.</p>
      </div>) },
    // Public Health
    { id: 'sc-pub-program-planning', discipline: 'Public Health', title: 'Program Planning Project', old: (<p className="mb-2">Design a community health program from start to finish.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Define the problem and target population.</p>
        <p>Stage 2: Create measurable objectives and draft an evaluation plan.</p>
        <p>Stage 3: Develop the final intervention plan incorporating feedback.</p>
      </div>) },
    { id: 'sc-pub-policy-analysis', discipline: 'Public Health', title: 'Policy Analysis Brief', old: (<p className="mb-2">Write a report analyzing a public health policy.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Select and summarize one health policy issue.</p>
        <p>Stage 2: Draft a one-page policy brief.</p>
        <p>Stage 3: Peer review and revise using clarity and feasibility criteria.</p>
      </div>) },
    { id: 'sc-pub-epi-report', discipline: 'Public Health', title: 'Epidemiologic Report', old: (<p className="mb-2">Submit a 5-page disease surveillance report.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Identify your data source and variables.</p>
        <p>Stage 2: Create tables or charts summarizing findings.</p>
        <p>Stage 3: Write a discussion interpreting trends and limitations.</p>
      </div>) },
    // Speech-Language Pathology
    { id: 'sc-slp-session-planning', discipline: 'Speech-Language Pathology', title: 'Session Planning Exercise', old: (<p className="mb-2">Write one treatment plan for a speech sound disorder.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Identify the target sound and context.</p>
        <p>Stage 2: Draft three therapy activities aligned with the goal.</p>
        <p>Stage 3: Record a mock session reflection discussing expected challenges.</p>
      </div>) },
    { id: 'sc-slp-case-doc', discipline: 'Speech-Language Pathology', title: 'Case Documentation Skills', old: (<p className="mb-2">Submit SOAP notes from a client session.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Write the “Subjective” and “Objective” portions.</p>
        <p>Stage 2: Peer review another student’s note.</p>
        <p>Stage 3: Add “Assessment” and “Plan,” improving precision and conciseness.</p>
      </div>) },
    { id: 'sc-slp-diagnostic-reasoning', discipline: 'Speech-Language Pathology', title: 'Diagnostic Reasoning', old: (<p className="mb-2">List the criteria for diagnosing childhood apraxia.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Review a video of a child’s speech assessment.</p>
        <p>Stage 2: Identify patterns consistent or inconsistent with apraxia.</p>
        <p>Stage 3: Develop a brief rationale for the final diagnosis.</p>
      </div>) },
    // Health Science
    { id: 'sc-hs-research-paper', discipline: 'Health Science', title: 'Evidence-Based Research Paper', old: (<p className="mb-2">Write a 5-page paper on an assigned health topic.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Develop a research question and annotated bibliography.</p>
        <p>Stage 2: Submit an outline with thesis and supporting arguments.</p>
        <p>Stage 3: Submit the final paper after peer feedback.</p>
      </div>) },
    { id: 'sc-hs-ethics-reflection', discipline: 'Health Science', title: 'Professional Ethics Reflection', old: (<p className="mb-2">Reflect on professionalism in healthcare.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Describe a hypothetical professionalism dilemma.</p>
        <p>Stage 2: Discuss applicable ethical principles.</p>
        <p>Stage 3: Reflect on how your values influence decision-making.</p>
      </div>) },
    { id: 'sc-hs-education-presentation', discipline: 'Health Science', title: 'Health Education Presentation', old: (<p className="mb-2">Deliver a 10-minute presentation on a health topic.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Draft your learning objectives.</p>
        <p>Stage 2: Submit slides for formative review.</p>
        <p>Stage 3: Present to class and write a post-reflection on audience engagement.</p>
      </div>) },
    // Pharmaceutical Sciences
    { id: 'sc-ps-research-proposal', discipline: 'Pharmaceutical Sciences', title: 'Research Proposal Development', old: (<p className="mb-2">Write a full research proposal on drug stability.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Identify the hypothesis and key variables.</p>
        <p>Stage 2: Create the experimental design and timeline.</p>
        <p>Stage 3: Write the final proposal integrating instructor feedback.</p>
      </div>) },
    { id: 'sc-ps-method-validation', discipline: 'Pharmaceutical Sciences', title: 'Analytical Method Validation', old: (<p className="mb-2">List the parameters for HPLC validation.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Choose one drug compound and explain what needs validation.</p>
        <p>Stage 2: Draft validation parameters (accuracy, precision, linearity).</p>
        <p>Stage 3: Interpret mock data and report results.</p>
      </div>) },
    { id: 'sc-ps-drug-stability', discipline: 'Pharmaceutical Sciences', title: 'Drug Stability Study', old: (<p className="mb-2">Discuss stability factors in drug storage.</p>), redesigned: (
      <div className="space-y-1 text-[13px]">
        <p>Stage 1: Analyze raw temperature and pH data.</p>
        <p>Stage 2: Predict degradation rate.</p>
        <p>Stage 3: Propose an optimized storage protocol.</p>
      </div>) },
  ];

  // In-Class Activities examples (panel 5 - index 4)
  const IN_CLASS_EXAMPLES: { id: string; discipline: string; title: string; old: React.ReactNode; redesigned: React.ReactNode }[] = [
    // Nursing
    { id: 'ica-n-clinical-prioritization', discipline: 'Nursing', title: 'Clinical Prioritization Drill', old: (<p className="mb-2">Discuss which patient should be seen first based on case descriptions.</p>), redesigned: (<p className="mb-2">Use AI to generate 3 new patient scenarios with varying urgency levels. Students work in teams to triage and justify their prioritization decisions.</p>) },
    { id: 'ica-n-shift-handover', discipline: 'Nursing', title: 'Shift Handover Practice', old: (<p className="mb-2">Read a pre-written report and summarize for next shift.</p>), redesigned: (<p className="mb-2">AI generates unique patient updates with missing details or conflicting notes. Students clarify and re-write accurate handover reports.</p>) },
    { id: 'ica-n-therapeutic-communication', discipline: 'Nursing', title: 'Therapeutic Communication Roleplay', old: (<p className="mb-2">Pair up to practice nurse–patient communication.</p>), redesigned: (<p className="mb-2">Use AI to generate emotionally complex patient responses (e.g., anxiety, resistance). Students adapt tone and approach in real time.</p>) },
    // Pharmacy
    { id: 'ica-ph-counseling-scenarios', discipline: 'Pharmacy', title: 'Counseling Scenarios', old: (<p className="mb-2">Practice explaining drug instructions to a standard patient.</p>), redesigned: (<p className="mb-2">Use AI to create 3 different patient profiles (elderly, low health literacy, language barrier). Students adapt counseling techniques accordingly.</p>) },
    { id: 'ica-ph-medication-error', discipline: 'Pharmacy', title: 'Medication Error Discussion', old: (<p className="mb-2">Review a single medication error case.</p>), redesigned: (<div className="space-y-1 text-[13px]"><p>AI produces varied versions of the same case — each with different root causes (labeling error, dosage misread, communication lapse).</p><p>Students identify prevention strategies across scenarios.</p></div>) },
    { id: 'ica-ph-drug-interaction', discipline: 'Pharmacy', title: 'Drug Interaction Challenge', old: (<p className="mb-2">List known drug interactions from a textbook.</p>), redesigned: (<p className="mb-2">Ask AI to generate a simulated prescription with potential conflicts. Teams detect and explain interactions — citing clinical reasoning.</p>) },
    // Public Health
    { id: 'ica-pub-crisis-simulation', discipline: 'Public Health', title: 'Crisis Simulation', old: (<p className="mb-2">Debate responses to a health outbreak.</p>), redesigned: (<p className="mb-2">AI creates a simulated community outbreak (location, population, risk factors). Students develop and present rapid-response strategies as health officials.</p>) },
    { id: 'ica-pub-health-equity-mapping', discipline: 'Public Health', title: 'Health Equity Mapping', old: (<p className="mb-2">Examine existing census data.</p>), redesigned: (<p className="mb-2">AI generates synthetic community datasets showing disparities. Students analyze and visualize equity issues using these datasets.</p>) },
    { id: 'ica-pub-policy-framing-debate', discipline: 'Public Health', title: 'Policy Framing Debate', old: (<p className="mb-2">Discuss pros/cons of a public health law.</p>), redesigned: (<p className="mb-2">AI provides different stakeholder statements (patient, policymaker, advocate). Students role-play a policy hearing to balance perspectives.</p>) },
    // Speech-Language Pathology
    { id: 'ica-slp-therapy-simulation', discipline: 'Speech-Language Pathology', title: 'Therapy Simulation', old: (<p className="mb-2">Discuss therapy plans for articulation errors.</p>), redesigned: (<p className="mb-2">Use AI to generate simulated client speech errors and session notes. Students design therapy adjustments based on the “client’s” progress.</p>) },
    { id: 'ica-slp-family-counseling', discipline: 'Speech-Language Pathology', title: 'Family Counseling Practice', old: (<p className="mb-2">Write a family education script.</p>), redesigned: (<p className="mb-2">AI generates parent questions filled with emotion or misunderstanding. Students role-play responses that educate with empathy.</p>) },
    { id: 'ica-slp-diagnosis-practice', discipline: 'Speech-Language Pathology', title: 'Diagnosis Practice', old: (<p className="mb-2">Analyze a provided case for diagnosis.</p>), redesigned: (<p className="mb-2">AI generates incomplete case histories. Students request additional information and make diagnostic decisions based on reasoning.</p>) },
    // Health Science
    { id: 'ica-hs-interprofessional-collab', discipline: 'Health Science', title: 'Interprofessional Collaboration', old: (<p className="mb-2">Discuss how teamwork improves patient outcomes.</p>), redesigned: (<p className="mb-2">AI simulates communication logs between healthcare roles (nurse, pharmacist, PT). Students identify breakdowns and propose fixes.</p>) },
    { id: 'ica-hs-ethics-in-action', discipline: 'Health Science', title: 'Ethics in Action', old: (<p className="mb-2">Discuss an ethical dilemma in small groups.</p>), redesigned: (<p className="mb-2">Ask AI to generate new ethical case updates (each with added constraints). Students re-evaluate their stance after each update.</p>) },
    { id: 'ica-hs-health-policy-debate', discipline: 'Health Science', title: 'Health Policy Debate', old: (<p className="mb-2">Present on an existing health policy.</p>), redesigned: (<p className="mb-2">AI provides 3 country-specific variations of a similar policy. Students compare outcomes and discuss implementation feasibility.</p>) },
    // Pharmaceutical Sciences
    { id: 'ica-ps-drug-mechanism-visualization', discipline: 'Pharmaceutical Sciences', title: 'Drug Mechanism Visualization', old: (<p className="mb-2">Explain how a drug works using lecture slides.</p>), redesigned: (<p className="mb-2">AI generates visual analogies and molecular diagrams to illustrate mechanisms. Students critique which analogy communicates best to peers.</p>) },
    { id: 'ica-ps-experimental-design-sprint', discipline: 'Pharmaceutical Sciences', title: 'Experimental Design Sprint', old: (<p className="mb-2">Outline a research protocol.</p>), redesigned: (<p className="mb-2">AI provides experimental limitations (budget, timeline, reagent access). Students must redesign their methods under those constraints.</p>) },
    { id: 'ica-ps-data-anomaly-hunt', discipline: 'Pharmaceutical Sciences', title: 'Data Anomaly Hunt', old: (<p className="mb-2">Interpret clean data tables.</p>), redesigned: (<p className="mb-2">AI generates noisy or partial datasets. Students identify anomalies, discuss validity, and decide whether data can still support conclusions.</p>) },
  ];

  // Feedback & Rubrics examples (panel 6 - index 5)
  const FEEDBACK_EXAMPLES: {
    id: string;
    discipline: string;
    title: string;
    old: React.ReactNode;
    redesigned: React.ReactNode;
    note: React.ReactNode;
    output: React.ReactNode;
  }[] = [
    // Nursing
    {
      id: 'fb-n-clinical-doc',
      discipline: 'Nursing',
      title: 'Clinical Documentation Feedback',
      old: (<p className="mb-2">Students submit SOAP notes; instructor provides all feedback manually.</p>),
      redesigned: (<p className="mb-2">Use AI to generate formative comments highlighting missing details, unclear rationales, or weak clinical reasoning. Students revise before instructor review — reducing grading load and improving reflection.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for example prompts you can adapt to generate structured feedback for clinical writing.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Criterion: Clinical reasoning (3/5) — Your assessment section describes the patient’s symptoms well, but the plan lacks justification for your chosen intervention. Consider referencing the latest cardiac protocol.”</div>)
    },
    {
      id: 'fb-n-sim-reflection-rubric',
      discipline: 'Nursing',
      title: 'Simulation Reflection Rubric',
      old: (<p className="mb-2">Students write unstructured reflections after clinical simulations.</p>),
      redesigned: (<p className="mb-2">Use AI to co-create a reflection rubric (e.g., critical thinking, communication, safety awareness). Students self-assess using the rubric before submitting — helping them internalize evaluation criteria.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for prompts on designing reflection rubrics with clear criteria.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Reflection Rubric (Excerpt):\n\nClinical Judgment (0–4): Connects observations to clinical reasoning.\nCommunication (0–4): Describes collaboration and patient interaction clearly.\nProfessional Growth (0–4): Identifies takeaways for future practice.”</div>)
    },
    {
      id: 'fb-n-skills-checklist-calibration',
      discipline: 'Nursing',
      title: 'Clinical Skills Checklist Calibration',
      old: (<p className="mb-2">Instructor individually corrects inconsistently completed skills checklists.</p>),
      redesigned: (<p className="mb-2">Feed anonymized student checklist entries into AI to surface common omissions or vague language. Share an aggregated “patterns” summary with the class plus one exemplar. Students revise their own before instructor validation.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for prompts that identify aggregate performance trends.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Aggregate Findings: 42% omitted rationale for intervention timing; 31% used non-specific terms (e.g., ‘stable’). Model Revision: ‘Respirations shallow (16/min) with diminished effort — repositioned patient and encouraged IS use to prevent atelectasis.’”</div>)
    },
    // Pharmacy
    {
      id: 'fb-ph-patient-counseling',
      discipline: 'Pharmacy',
      title: 'Patient Counseling Evaluation',
      old: (<p className="mb-2">Instructor grades counseling sessions using a checklist.</p>),
      redesigned: (<p className="mb-2">Ask AI to generate specific, rubric-based feedback on clarity, empathy, and accuracy from instructor notes or transcripts. AI can also model what an excellent response might sound like.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for sample prompts on creating behavior-based feedback rubrics.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Feedback: You maintained eye contact and spoke with empathy (4/5). To improve, add a follow-up question that confirms patient understanding before closing the session.”</div>)
    },
    {
      id: 'fb-ph-drug-info-report',
      discipline: 'Pharmacy',
      title: 'Drug Information Report Review',
      old: (<p className="mb-2">Students submit reports with minimal formative feedback.</p>),
      redesigned: (<p className="mb-2">Use AI to provide targeted comments on clarity, citation quality, and clinical reasoning — allowing revision before grading.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for prompts that focus on feedback alignment with learning objectives.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Your summary includes the correct dosage but omits potential contraindications for geriatric patients. Add that context to strengthen your evidence-based reasoning.”</div>)
    },
    {
      id: 'fb-ph-pk-formative-feedback',
      discipline: 'Pharmacy',
      title: 'Formative Pharmacokinetics Feedback',
      old: (<p className="mb-2">Students solve dosing problems and wait for instructor grading.</p>),
      redesigned: (<p className="mb-2">Students submit their calculation steps; AI flags missing assumptions (e.g., volume of distribution estimate) and prompts them to justify half-life selection before final answer submission.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for stepwise reasoning feedback prompts.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Check: You applied t½ = 8h but didn’t justify the renal adjustment. Prompt: ‘Explain how CrCl influenced your interval choice.’”</div>)
    },
    // Public Health
    {
      id: 'fb-pub-data-interpretation',
      discipline: 'Public Health',
      title: 'Data Interpretation Reports',
      old: (<p className="mb-2">Instructor provides brief comments on report accuracy.</p>),
      redesigned: (<p className="mb-2">AI identifies logical gaps or unsupported claims and offers structured suggestions for improvement (e.g., evidence, population scope, clarity).</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for prompts to help AI critique analytical writing and reasoning.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“The relationship you described between vaccination rates and mortality needs statistical evidence. Consider including a correlation coefficient or adjusted risk ratio.”</div>)
    },
    {
      id: 'fb-pub-policy-analysis-rubric',
      discipline: 'Public Health',
      title: 'Policy Analysis Rubric Creation',
      old: (<p className="mb-2">Instructor manually builds new rubrics for each policy brief.</p>),
      redesigned: (<p className="mb-2">Use AI to generate rubric drafts based on assignment goals (e.g., clarity, argument strength, policy relevance). Faculty refine and validate them before class use.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for prompts that generate rubric structures aligned with Bloom’s Taxonomy.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Rubric Categories: Argument Coherence • Policy Feasibility • Use of Evidence • Communication Clarity.”</div>)
    },
    {
      id: 'fb-pub-peer-policy-feedback',
      discipline: 'Public Health',
      title: 'Peer Feedback on Policy Briefs',
      old: (<p className="mb-2">Peers give unstructured, superficial comments.</p>),
      redesigned: (<p className="mb-2">AI provides a structured peer review scaffold (claim strength, evidence quality, feasibility) students must complete; AI then suggests follow-up questions to deepen critique.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for structured peer review prompt patterns.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Peer Review Prompt: ‘Identify 1 unsupported claim. Suggest a specific statistic or source that would strengthen it.’”</div>)
    },
    // Speech-Language Pathology
    {
      id: 'fb-slp-diagnostic-report-feedback',
      discipline: 'Speech-Language Pathology',
      title: 'Diagnostic Report Feedback',
      old: (<p className="mb-2">Instructor writes long individual comments.</p>),
      redesigned: (<p className="mb-2">AI summarizes key strengths and weaknesses in tone, organization, and interpretation accuracy.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for prompts to summarize and categorize student feedback.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Strengths: Clear case summary and accurate differential diagnosis. Improvement: Clarify language-sample analysis — note which phonological patterns persist.”</div>)
    },
    {
      id: 'fb-slp-peer-review-calibration',
      discipline: 'Speech-Language Pathology',
      title: 'Peer Review Calibration',
      old: (<p className="mb-2">Students review therapy plans with limited structure.</p>),
      redesigned: (<p className="mb-2">Use AI to generate model peer feedback examples showing specificity and evidence-based critique.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for peer review training prompts.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Model Feedback: ‘Goal 2 lacks a measurable accuracy threshold — suggest specifying 80% consonant cluster production over 2 sessions.’”</div>)
    },
    {
      id: 'fb-slp-articulation-progress-rubric',
      discipline: 'Speech-Language Pathology',
      title: 'Rubric for Articulation Progress',
      old: (<p className="mb-2">Progress judged informally across sessions.</p>),
      redesigned: (<p className="mb-2">AI drafts a progress rubric (accuracy, generalization, stimulability). Students self-rate weekly and justify scores with transcription excerpts.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for creating progress monitoring rubrics.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Rubric Excerpt: Generalization (0–3): 0 = isolated word only; 3 = spontaneous phrase-level accuracy & carryover noted.”</div>)
    },
    // Health Science
    {
      id: 'fb-hs-research-paper-rubric',
      discipline: 'Health Science',
      title: 'Research Paper Rubric',
      old: (<p className="mb-2">Rubrics are generic and reused.</p>),
      redesigned: (<p className="mb-2">Ask AI to draft adaptive rubrics emphasizing current competencies (e.g., data ethics, cultural humility). Faculty review and adapt them.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for adaptive rubric creation prompts.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Rubric Excerpt: Ethical Data Use (4 pts) • Interdisciplinary Integration (4 pts) • Clarity & Coherence (4 pts).”</div>)
    },
    {
      id: 'fb-hs-case-reflection-feedback',
      discipline: 'Health Science',
      title: 'Case Reflection Feedback',
      old: (<p className="mb-2">Instructor provides generic comments on reflections.</p>),
      redesigned: (<p className="mb-2">AI identifies patterns in reasoning and generates targeted follow-up questions to deepen analysis.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for reflective questioning prompts.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“You demonstrated empathy but stopped short of linking this to patient outcomes. What communication adjustments might improve long-term adherence?”</div>)
    },
    {
      id: 'fb-hs-self-assessment-feedback',
      discipline: 'Health Science',
      title: 'Self-Assessment Reflection Feedback',
      old: (<p className="mb-2">Students write end-of-unit reflections with no structured review.</p>),
      redesigned: (<p className="mb-2">Students submit reflections; AI highlights growth statements vs. vague claims and prompts students to replace vague phrases with observable behaviors.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for specificity enhancement prompts.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Vague: ‘I understand epidemiology better.’ Revision Prompt: ‘Specify one analytic skill you can now perform that you could not before.’”</div>)
    },
    // Pharmaceutical Sciences
    {
      id: 'fb-ps-lab-report-feedback',
      discipline: 'Pharmaceutical Sciences',
      title: 'Lab Report Feedback',
      old: (<p className="mb-2">Instructor comments manually on each lab report.</p>),
      redesigned: (<p className="mb-2">AI identifies unclear methods or unsupported interpretations, then produces structured comments mapped to rubric criteria.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for structured feedback prompts.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Results are complete but the conclusion lacks discussion of statistical variance. Add error margins or a comparison with control data.”</div>)
    },
    {
      id: 'fb-ps-rubric-generation-exp-design',
      discipline: 'Pharmaceutical Sciences',
      title: 'Rubric Generation for Experimental Design',
      old: (<p className="mb-2">Instructor builds rubrics from scratch.</p>),
      redesigned: (<p className="mb-2">Provide AI with assignment outcomes to draft a rubric focusing on hypothesis clarity, feasibility, and ethics. Faculty refine wording and scoring scales.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for rubric drafting and calibration prompts.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Rubric Excerpt: Hypothesis Clarity (5) • Design Feasibility (5) • Ethical Considerations (5).”</div>)
    },
    {
      id: 'fb-ps-peer-experimental-eval',
      discipline: 'Pharmaceutical Sciences',
      title: 'Peer Evaluation of Experimental Design',
      old: (<p className="mb-2">Peer feedback focuses only on correctness.</p>),
      redesigned: (<p className="mb-2">AI provides a structured lens (clarity, controls, reproducibility). Students rate each dimension and AI suggests one probing question they must answer before final submission.</p>),
      note: (<p className="italic text-[12.5px] text-gray-600">See the Prompt Library for multi-criteria peer review prompts.</p>),
      output: (<div className="whitespace-pre-line text-[13px] leading-relaxed">“Probe: ‘How will you verify specificity of your assay without introducing a new confounding variable?’”</div>)
    },
  ];

  // Icons for each discipline (simple inline SVGs for consistency with existing style)
  const DISCIPLINE_ICONS: Record<string, React.ReactNode> = {
    'Nursing': <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M5 8h14"/><path d="M8 5h8"/><path d="M9 12h6"/></svg>,
    'Pharmacy': <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18"/><path d="M6 3v6a6 6 0 0 0 12 0V3"/><path d="M9 14h6"/><path d="M10 18h4"/></svg>,
    'Public Health': <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18"/><path d="M12 3a15 15 0 0 0 0 18"/></svg>,
    'Speech-Language Pathology': <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5h9a5 5 0 0 1 0 10H9l-4 4V5z"/></svg>,
    'Health Science': <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-6-4.35-9-10A5 5 0 0 1 12 5a5 5 0 0 1 9 6c-3 5.65-9 10-9 10Z"/></svg>,
    'Pharmaceutical Sciences': <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h10l4 8H3l4-8Z"/><path d="M10 12v8a2 2 0 0 0 4 0v-8"/></svg>
  };

  const [openExampleIds, setOpenExampleIds] = useState<Set<string>>(new Set());
  const toggleExample = (id: string) => {
    setOpenExampleIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggle = (idx: number) => setOpenIndex(prev => prev === idx ? null : idx);

  // Map accordion index to Firestore collection name for counts
  // No count badges; success toasts remain handled within submission components

  // Accent color configuration for each panel (index aligned with ACCORDION_ITEMS)
  const ACCENT_CONFIG: { text: string; textHover: string; textExpanded: string; borderExpanded: string; borderHover: string; ring: string; iconCollapsed: string; iconHover: string; iconExpanded: string }[] = [
    { // Redesign Assignments - now teal styling
      text: 'text-teal-700/90', textHover: 'group-hover:text-teal-700', textExpanded: 'text-teal-700',
      borderExpanded: 'border-l-[#e85c4a]', borderHover: 'hover:border-l-[#f07a68]', ring: 'focus-visible:ring-[#e85c4a]',
      iconCollapsed: 'text-[#f3a396]', iconHover: 'group-hover:text-[#e85c4a]', iconExpanded: 'text-[#e85c4a]'
    },
    { // Generate Lecture Notes & Misconceptions - Blue
      text: 'text-blue-800/90', textHover: 'group-hover:text-blue-800', textExpanded: 'text-blue-800',
      borderExpanded: 'border-l-blue-500/80', borderHover: 'hover:border-l-blue-400/70', ring: 'focus-visible:ring-blue-600',
      iconCollapsed: 'text-blue-400', iconHover: 'group-hover:text-blue-500', iconExpanded: 'text-blue-500'
    },
    { // Create Case Studies & Scenarios - Green
      text: 'text-green-800/90', textHover: 'group-hover:text-green-800', textExpanded: 'text-green-800',
      borderExpanded: 'border-l-green-500/80', borderHover: 'hover:border-l-green-400/70', ring: 'focus-visible:ring-green-600',
      iconCollapsed: 'text-green-400', iconHover: 'group-hover:text-green-500', iconExpanded: 'text-green-500'
    },
    { // Scaffold Student Work - Orange
      text: 'text-orange-800/90', textHover: 'group-hover:text-orange-800', textExpanded: 'text-orange-800',
      borderExpanded: 'border-l-orange-500/80', borderHover: 'hover:border-l-orange-400/70', ring: 'focus-visible:ring-orange-600',
      iconCollapsed: 'text-orange-400', iconHover: 'group-hover:text-orange-500', iconExpanded: 'text-orange-500'
    },
    { // Build In-Class Activities - Purple
      text: 'text-purple-800/90', textHover: 'group-hover:text-purple-800', textExpanded: 'text-purple-800',
      borderExpanded: 'border-l-purple-500/80', borderHover: 'hover:border-l-purple-400/70', ring: 'focus-visible:ring-purple-600',
      iconCollapsed: 'text-purple-400', iconHover: 'group-hover:text-purple-500', iconExpanded: 'text-purple-500'
    },
    { // Use AI for Feedback & Rubrics - Teal
      text: 'text-teal-800/90', textHover: 'group-hover:text-teal-800', textExpanded: 'text-teal-800',
      borderExpanded: 'border-l-teal-500/80', borderHover: 'hover:border-l-teal-400/70', ring: 'focus-visible:ring-teal-600',
      iconCollapsed: 'text-teal-400', iconHover: 'group-hover:text-teal-500', iconExpanded: 'text-teal-500'
    },
    // Fallback (if more items added later)
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 md:py-16 px-5">
      <header className="text-center mb-10 md:mb-14">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Getting Started: <span className="text-teal-700 italic">Practical Ways to Use AI in Your Teaching</span>
        </h1>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          AI can be a powerful teaching assistant when used thoughtfully. This toolkit offers starting points for exploring how AI might enrich your teaching—adapt these ideas to fit your course, your students, and your context.
        </p>
      </header>

      <ul className="space-y-4" role="list">
        {ACCORDION_ITEMS.map((label, idx) => {
          const expanded = openIndex === idx;
          const accent = ACCENT_CONFIG[idx] || ACCENT_CONFIG[0];
          return (
            <li key={label} className="rounded-2xl overflow-hidden transition-colors shadow-sm relative bg-white border border-gray-200">
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={expanded}
                className={[
                  'w-full flex items-center justify-between gap-4 text-left pl-4 pr-5 py-4 md:py-5 focus:outline-none focus-visible:ring-2 group border-l-4',
                  expanded ? accent.borderExpanded : `border-l-transparent ${accent.borderHover}`,
                  accent.ring
                ].join(' ')}
              >
                <span className={[
                  'font-semibold text-base md:text-lg tracking-tight transition-colors',
                  expanded ? accent.textExpanded : `${accent.text} ${accent.textHover}`
                ].join(' ')}>{label}</span>
                <span className={[
                  'shrink-0 transition-colors',
                  expanded ? accent.iconExpanded : `${accent.iconCollapsed} ${accent.iconHover}`
                ].join(' ')}>
                  <svg className={`w-5 h-5 transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </button>
              <div
                role="region"
                aria-hidden={!expanded}
                className={`px-5 pt-0 pb-5 md:pb-6 text-sm text-gray-600 transition-[grid-template-rows] duration-300 ease-in-out ${expanded ? 'grid' : 'grid'} ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} overflow-hidden`}
              >
                <div className="overflow-hidden">
                  {idx === 0 ? (
                    <div className="space-y-8 pt-5">
                      <p className="text-sm md:text-[15px] leading-relaxed text-[#443a33]">
                        AI can help you redesign assignments so students must think critically, synthesize ideas, and apply knowledge — not just copy answers from AI. Use this space to experiment with your own assignments and see how they could be reframed.
                      </p>
                      <div className="h-px bg-gray-200" />
                      {/* Filter bar */}
                      <div className="px-2 py-2">
                        <div className="mb-3 text-center">
                          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#e85c4a] opacity-90">Filter by discipline</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {DISCIPLINES.map(d => {
                            const active = d === selectedDiscipline;
                            return (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setSelectedDiscipline(d)}
                                className={[
                                  'inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium tracking-tight border border-gray-300/70 backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a] focus-visible:ring-offset-1',
                                  active
                                    ? 'bg-[#e85c4a] text-white border-[#e85c4a] shadow-sm hover:shadow-md'
                                    : 'bg-white/70 text-[#4f4540] hover:bg-gray-50 hover:shadow-sm'
                                ].join(' ')}
                                aria-pressed={active}
                              >
                                <span className="flex items-center gap-1.5"><span aria-hidden className="opacity-80">{DISCIPLINE_ICONS[d]}</span><span className="whitespace-nowrap">{d}</span></span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {/* Faculty submission form (live Firestore submissions) */}
                      <div className="mt-2">
                        <FacultySubmissionFormBouve selectedDiscipline={selectedDiscipline as unknown as 'Nursing' | 'Pharmacy' | 'Public Health' | 'Speech-Language Pathology' | 'Health Science' | 'Pharmaceutical Sciences'} />
                      </div>

                      {/* Examples list */}
                      <div className="space-y-5">
                        <div className="h-px bg-gray-200" />
                        <h4 className="text-sm font-semibold tracking-tight text-[#e85c4a]">Examples <span className="text-gray-400 font-normal">({selectedDiscipline})</span></h4>
                        {DISCIPLINE_EXAMPLES[selectedDiscipline] && DISCIPLINE_EXAMPLES[selectedDiscipline].length > 0 ? (
                          <ul className="space-y-4">
                            {DISCIPLINE_EXAMPLES[selectedDiscipline].map(ex => {
                              const open = openExampleIds.has(ex.id);
                              return (
                                <li key={ex.id} className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                                  <button
                                    type="button"
                                    onClick={() => toggleExample(ex.id)}
                                    aria-expanded={open}
                                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a]/60"
                                  >
                                    <span className="flex items-center gap-3">
                                      <span className="h-2 w-2 rounded-full bg-[#e85c4a] shadow shadow-[#e85c4a]/40" />
                                      <span className="font-medium text-[13px] md:text-sm text-[#5a3d37] tracking-tight">{ex.title}</span>
                                    </span>
                                    <svg className={`w-5 h-5 text-[#e85c4a] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                  </button>
                                  <div
                                    className={`transition-all duration-500 ease-out ${open ? 'max-h-[900px]' : 'max-h-0'} overflow-hidden`}
                                    aria-hidden={!open}
                                  >
                                    {open && (
                                      <div className="px-5 pb-5 pt-0 space-y-5">
                                        <div>
                                          <p className="text-[11px] font-semibold uppercase tracking-wider text-red-600 mb-2 flex items-center gap-2">🔴 <span>Old Assignment</span></p>
                                          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-[13px] leading-relaxed text-red-800">
                                            {ex.old}
                                          </div>
                                        </div>
                                        <div>
                                          <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600 mb-2 flex items-center gap-2">🟢 <span>Redesigned Assignment</span></p>
                                          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-[13px] leading-relaxed text-green-800">
                                            {ex.redesigned}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <div className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-6 text-[13px] text-gray-500 italic text-center">No examples yet for {selectedDiscipline}.</div>
                        )}
                        {/* Prompt Tip Box */}
                        {selectedDiscipline === 'Nursing' && (
                          <div className="rounded-xl border border-amber-200 bg-amber-50/80 shadow-sm px-5 py-4 flex gap-3 items-start" role="note" aria-label="Prompt Tip">
                            <div className="mt-0.5 text-amber-500" aria-hidden="true">
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-4 12.83V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.17A7 7 0 0 0 12 2Z"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                            </div>
                            <p className="text-[13px] leading-relaxed text-amber-800">
                              <span className="font-semibold text-amber-700">Prompt Tip:</span> Ask AI to “rewrite this assignment so it requires higher-order thinking skills” and include specific learning outcomes. Focus on <span className="font-medium italic">evaluation</span>, <span className="font-medium italic">synthesis</span>, or <span className="font-medium italic">comparison</span> — not simple recall.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : idx === 1 ? (
                    <div className="space-y-8 pt-5">
                      <p className="text-sm md:text-[15px] leading-relaxed text-[#2f3742]">
                        AI can help you generate lecture notes that highlight common student misconceptions, simplify complex ideas, and create richer discussion prompts. Use this space to explore how AI might assist in clarifying tough concepts—while keeping your own expertise and voice at the center.
                      </p>
                      <div className="h-px bg-gray-200" />
                      {/* Filter bar (reusing discipline state) */}
                      <div className="px-2 py-2">
                        <div className="mb-3 text-center">
                          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#e85c4a] opacity-90">Filter by discipline</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {DISCIPLINES.map(d => {
                            const active = d === selectedDiscipline;
                            return (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setSelectedDiscipline(d)}
                                className={[
                                  'inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium tracking-tight border border-gray-300/70 backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a] focus-visible:ring-offset-1',
                                  active
                                    ? 'bg-[#e85c4a] text-white border-[#e85c4a] shadow-sm hover:shadow-md'
                                    : 'bg-white/70 text-[#394248] hover:bg-gray-50 hover:shadow-sm'
                                ].join(' ')}
                                aria-pressed={active}
                              >
                                <span className="flex items-center gap-1.5"><span aria-hidden className="opacity-80">{DISCIPLINE_ICONS[d]}</span><span className="whitespace-nowrap">{d}</span></span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {/* Faculty submission form for Lecture Notes */}
                      <div className="mt-2">
                        <SectionFacultySubmissions
                          selectedDiscipline={selectedDiscipline as unknown as 'Nursing' | 'Pharmacy' | 'Public Health' | 'Speech-Language Pathology' | 'Health Science' | 'Pharmaceutical Sciences'}
                          collectionName="lectureNotesBouve"
                          submitButtonText="Submit a lecture redesign"
                          modalTitle="Submit a Lecture Redesign"
                          oldLabel="Old Approach"
                          newLabel="Reimagined Lecture"
                        />
                      </div>
                      {/* Examples list */}
                      <div className="space-y-5">
                        <div className="h-px bg-gray-200" />
                        <h4 className="text-sm font-semibold tracking-tight text-[#e85c4a]">Examples <span className="text-gray-400 font-normal">({selectedDiscipline})</span></h4>
                        {(() => {
                          const filtered = LECTURE_EXAMPLES.filter(ex => ex.discipline === selectedDiscipline);
                          return filtered.length > 0 ? (
                            <ul className="space-y-4">
                              {filtered.map(ex => {
                                const open = openExampleIds.has(ex.id);
                                return (
                                  <li key={ex.id} className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                                    <button
                                      type="button"
                                      onClick={() => toggleExample(ex.id)}
                                      aria-expanded={open}
                                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a]/60"
                                    >
                                      <span className="flex items-center gap-3">
                                        <span className="h-2 w-2 rounded-full bg-[#e85c4a] shadow shadow-[#e85c4a]/40" />
                                        <span className="font-medium text-[13px] md:text-sm text-[#32414a] tracking-tight">{ex.title}</span>
                                      </span>
                                      <svg className={`w-5 h-5 text-[#e85c4a] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                    </button>
                                    <div className={`transition-all duration-500 ease-out ${open ? 'max-h-[700px]' : 'max-h-0'} overflow-hidden`} aria-hidden={!open}>
                                      {open && (
                                        <div className="px-5 pb-5 pt-0 space-y-5">
                                          <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-red-600 mb-2 flex items-center gap-2">🔴 <span>Old Approach</span></p>
                                            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-[13px] leading-relaxed text-red-800">
                                              {ex.old}
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600 mb-2 flex items-center gap-2">🟢 <span>Reimagined Lecture</span></p>
                                            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-[13px] leading-relaxed text-green-800">
                                              {ex.redesigned}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <div className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-6 text-[13px] text-gray-500 italic text-center">No examples yet for {selectedDiscipline}.</div>
                          );
                        })()}
                        {/* Prompt Tip Box */}
                        <div className="rounded-xl border border-amber-200 bg-amber-50/80 shadow-sm px-5 py-4 flex gap-3 items-start" role="note" aria-label="Prompt Tip">
                          <div className="mt-0.5 text-amber-500" aria-hidden="true">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-4 12.83V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.17A7 7 0 0 0 12 2Z"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                          </div>
                          <p className="text-[13px] leading-relaxed text-amber-800">
                            <span className="font-semibold text-amber-700">Prompt Tip:</span> Ask AI to “generate lecture notes that include at least one common misconception and a conceptual question to challenge it.” Encourage AI to provide examples, analogies, or prompts that promote discussion—not memorization.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : idx === 2 ? (
                    <div className="space-y-8 pt-5">
                      <p className="text-sm md:text-[15px] leading-relaxed text-[#2d3830]">
                        AI can help you design realistic, discipline-aligned case studies that encourage students to apply theory to practice. Use this space to explore how AI might help generate prompts, role-play situations, or ethical dilemmas that deepen analysis and reflection — not just provide “right” answers.
                      </p>
                      <div className="h-px bg-gray-200" />
                      {/* Filter bar (shared discipline state) */}
                      <div className="px-2 py-2">
                        <div className="mb-3 text-center">
                          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#e85c4a] opacity-90">Filter by discipline</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {DISCIPLINES.map(d => {
                            const active = d === selectedDiscipline;
                            return (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setSelectedDiscipline(d)}
                                className={[
                                  'inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium tracking-tight border border-gray-300/70 backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a] focus-visible:ring-offset-1',
                                  active
                                    ? 'bg-[#e85c4a] text-white border-[#e85c4a] shadow-sm hover:shadow-md'
                                    : 'bg-white/70 text-[#374038] hover:bg-gray-50 hover:shadow-sm'
                                ].join(' ')}
                                aria-pressed={active}
                              >
                                <span className="flex items-center gap-1.5"><span aria-hidden className="opacity-80">{DISCIPLINE_ICONS[d]}</span><span className="whitespace-nowrap">{d}</span></span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {/* Faculty submission form for Case Studies */}
                      <div className="mt-2">
                        <SectionFacultySubmissions
                          selectedDiscipline={selectedDiscipline as unknown as 'Nursing' | 'Pharmacy' | 'Public Health' | 'Speech-Language Pathology' | 'Health Science' | 'Pharmaceutical Sciences'}
                          collectionName="caseStudiesBouve"
                          submitButtonText="Submit a case redesign"
                          modalTitle="Submit a Case Redesign"
                          oldLabel="Old Approach"
                          newLabel="Reimagined Case"
                        />
                      </div>
                      {/* Examples list */}
                      <div className="space-y-5">
                        <div className="h-px bg-gray-200" />
                        <h4 className="text-sm font-semibold tracking-tight text-[#e85c4a]">Examples <span className="text-gray-400 font-normal">({selectedDiscipline})</span></h4>
                        {(() => {
                          const filtered = CASE_EXAMPLES.filter(ex => ex.discipline === selectedDiscipline);
                          return filtered.length > 0 ? (
                            <ul className="space-y-4">
                              {filtered.map(ex => {
                                const open = openExampleIds.has(ex.id);
                                return (
                                  <li key={ex.id} className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                                    <button
                                      type="button"
                                      onClick={() => toggleExample(ex.id)}
                                      aria-expanded={open}
                                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a]/60"
                                    >
                                      <span className="flex items-center gap-3">
                                        <span className="h-2 w-2 rounded-full bg-[#e85c4a] shadow shadow-[#e85c4a]/40" />
                                        <span className="font-medium text-[13px] md:text-sm text-[#36423a] tracking-tight">{ex.title}</span>
                                      </span>
                                      <svg className={`w-5 h-5 text-[#e85c4a] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                    </button>
                                    <div className={`transition-all duration-500 ease-out ${open ? 'max-h-[900px]' : 'max-h-0'} overflow-hidden`} aria-hidden={!open}>
                                      {open && (
                                        <div className="px-5 pb-5 pt-0 space-y-5">
                                          <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-red-600 mb-2 flex items-center gap-2">🔴 <span>Old Approach</span></p>
                                            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-[13px] leading-relaxed text-red-800">
                                              {ex.old}
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600 mb-2 flex items-center gap-2">🟢 <span>Reimagined Case</span></p>
                                            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-[13px] leading-relaxed text-green-800">
                                              {ex.redesigned}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <div className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-6 text-[13px] text-gray-500 italic text-center">No examples yet for {selectedDiscipline}.</div>
                          );
                        })()}
                        {/* Prompt Tip Box */}
                        <div className="rounded-xl border border-amber-200 bg-amber-50/80 shadow-sm px-5 py-4 flex gap-3 items-start" role="note" aria-label="Prompt Tip">
                          <div className="mt-0.5 text-amber-500" aria-hidden="true">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-4 12.83V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.17A7 7 0 0 0 12 2Z"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                          </div>
                          <p className="text-[13px] leading-relaxed text-amber-800">
                            <span className="font-semibold text-amber-700">Prompt Tip:</span> Ask AI to “generate a short case scenario with realistic context, competing perspectives, and an ethical or analytical twist.” Encourage outputs that require students to explain reasoning, evaluate assumptions, or connect theory to practice.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : idx === 3 ? (
                    <div className="space-y-8 pt-5">
                      <div className="space-y-6 text-[14px] leading-relaxed text-[#2a3135]">
                        <h3 className="text-base md:text-lg font-semibold tracking-tight text-teal-700">Scaffold Student Work: Guiding Learning Step-by-Step</h3>
                        <div className="space-y-4">
                          <div>
                            <p><strong className="font-semibold">Scaffolding</strong> is a teaching strategy that breaks down complex tasks into manageable, structured steps. It allows students to build understanding gradually — gaining confidence and competence at each stage.</p>
                            <p className="mt-3">In healthcare education, scaffolding is essential for helping students move from knowing what to do, to understanding why and how to do it safely and effectively. By layering assignments, feedback, and reflection, faculty can help learners develop deeper reasoning and professional judgment.</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-teal-700">Why Scaffolding Matters in Health Sciences</h4>
                            <p>Healthcare education is high-stakes and context-driven. Students are often asked to make complex decisions based on incomplete or uncertain information — from managing patient care to interpreting public health data.</p>
                            <p className="mt-2">Scaffolding allows educators to design assignments that:</p>
                            <ul className="list-disc pl-5 space-y-1 text-[13px]">
                              <li>Encourage clinical reasoning without overwhelming students</li>
                              <li>Reinforce interprofessional communication</li>
                              <li>Integrate reflection and ethical decision-making</li>
                              <li>Promote confidence through iteration and feedback</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-teal-700">How AI Can Support Scaffolding</h4>
                            <p>When used thoughtfully, AI can serve as a structured practice partner — helping educators design tasks that emphasize reasoning over recall. It can:</p>
                            <ul className="list-disc pl-5 space-y-1 text-[13px]">
                              <li>Generate case variations to provide multiple learning opportunities</li>
                              <li>Offer prompts for reflection or formative feedback</li>
                              <li>Simulate partial or incomplete data to strengthen decision logic</li>
                            </ul>
                            <p className="mt-2">AI should never replace human judgment — it should extend faculty creativity by helping scaffold the path to mastery.</p>
                          </div>
                        </div>
                      </div>
                      <div className="h-px bg-gray-200" />
                      {/* Filter bar (shared discipline state) */}
                      <div className="px-2 py-2">
                        <div className="mb-3 text-center">
                          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#e85c4a] opacity-90">Filter by discipline</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {DISCIPLINES.map(d => {
                            const active = d === selectedDiscipline;
                            return (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setSelectedDiscipline(d)}
                                className={[
                                  'inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium tracking-tight border border-gray-300/70 backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a] focus-visible:ring-offset-1',
                                  active
                                    ? 'bg-[#e85c4a] text-white border-[#e85c4a] shadow-sm hover:shadow-md'
                                    : 'bg-white/70 text-[#374038] hover:bg-gray-50 hover:shadow-sm'
                                ].join(' ')}
                                aria-pressed={active}
                              >
                                <span className="flex items-center gap-1.5"><span aria-hidden className="opacity-80">{DISCIPLINE_ICONS[d]}</span><span className="whitespace-nowrap">{d}</span></span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {/* Faculty submission form for Scaffold Student Work */}
                      <div className="mt-2">
                        <SectionFacultySubmissions
                          selectedDiscipline={selectedDiscipline as unknown as 'Nursing' | 'Pharmacy' | 'Public Health' | 'Speech-Language Pathology' | 'Health Science' | 'Pharmaceutical Sciences'}
                          collectionName="scaffoldAssignmentsBouve"
                          submitButtonText="Submit a scaffolded assignment"
                          modalTitle="Submit a Scaffolded Assignment"
                          oldLabel="Old Assignment"
                          newLabel="Redesigned Scaffolded Assignment"
                        />
                      </div>
                      {/* Examples list */}
                      <div className="space-y-5">
                        <div className="h-px bg-gray-200" />
                        <h4 className="text-sm font-semibold tracking-tight text-[#e85c4a]">Examples <span className="text-gray-400 font-normal">({selectedDiscipline})</span></h4>
                        {(() => {
                          const filtered = SCAFFOLD_EXAMPLES.filter(ex => ex.discipline === selectedDiscipline);
                          return filtered.length > 0 ? (
                            <ul className="space-y-4">
                              {filtered.map(ex => {
                                const open = openExampleIds.has(ex.id);
                                return (
                                  <li key={ex.id} className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                                    <button
                                      type="button"
                                      onClick={() => toggleExample(ex.id)}
                                      aria-expanded={open}
                                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a]/60"
                                    >
                                      <span className="flex items-center gap-3">
                                        <span className="h-2 w-2 rounded-full bg-[#e85c4a] shadow shadow-[#e85c4a]/40" />
                                        <span className="font-medium text-[13px] md:text-sm text-[#36423a] tracking-tight">{ex.title}</span>
                                      </span>
                                      <svg className={`w-5 h-5 text-[#e85c4a] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                    </button>
                                    <div className={`transition-all duration-500 ease-out ${open ? 'max-h-[900px]' : 'max-h-0'} overflow-hidden`} aria-hidden={!open}>
                                      {open && (
                                        <div className="px-5 pb-5 pt-0 space-y-5">
                                          <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-red-600 mb-2 flex items-center gap-2">🔴 <span>Old Assignment</span></p>
                                            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-[13px] leading-relaxed text-red-800">
                                              {ex.old}
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600 mb-2 flex items-center gap-2">🟢 <span>Redesigned Scaffolded Assignment</span></p>
                                            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-[13px] leading-relaxed text-green-800">
                                              {ex.redesigned}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <div className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-6 text-[13px] text-gray-500 italic text-center">No examples yet for {selectedDiscipline}.</div>
                          );
                        })()}
                        <div className="h-px bg-gray-200" />
                        <div className="rounded-xl border border-amber-200 bg-amber-50/80 shadow-sm px-5 py-4 flex gap-3 items-start" role="note" aria-label="Prompt Tip">
                          <div className="mt-0.5 text-amber-500" aria-hidden="true">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-4 12.83V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.17A7 7 0 0 0 12 2Z"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                          </div>
                          <p className="text-[13px] leading-relaxed text-amber-800">
                            <span className="font-semibold text-amber-700">Prompt Tip:</span> These examples are starting points — not templates. The power of scaffolding lies in how you adapt and iterate each layer for your own teaching context. Try using AI to draft intermediate steps or formative reflection prompts that bridge your students from basic comprehension to clinical reasoning. The goal isn’t to make tasks easier — it’s to make learning visible as students move from guidance to independence.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : idx === 4 ? (
                    <div className="space-y-8 pt-5">
                      <p className="text-sm md:text-[15px] leading-relaxed text-[#313a40]">AI can make class time more engaging by helping you design activities that get students thinking, discussing, and applying what they’ve learned. Try using AI to create practice cases, role-play prompts, data sets, or simulations that turn passive lectures into active learning experiences.</p>
                      <div className="h-px bg-gray-200" />
                      {/* Filter bar (shared discipline state) */}
                      <div className="px-2 py-2">
                        <div className="mb-3 text-center">
                          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#e85c4a] opacity-90">Filter by discipline</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {DISCIPLINES.map(d => {
                            const active = d === selectedDiscipline;
                            return (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setSelectedDiscipline(d)}
                                className={[
                                  'inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium tracking-tight border border-gray-300/70 backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a] focus-visible:ring-offset-1',
                                  active
                                    ? 'bg-[#e85c4a] text-white border-[#e85c4a] shadow-sm hover:shadow-md'
                                    : 'bg-white/70 text-[#404944] hover:bg-gray-50 hover:shadow-sm'
                                ].join(' ')}
                                aria-pressed={active}
                              >
                                <span className="flex items-center gap-1.5"><span aria-hidden className="opacity-80">{DISCIPLINE_ICONS[d]}</span><span className="whitespace-nowrap">{d}</span></span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {/* Faculty submission form for In-Class Activities */}
                      <div className="mt-2">
                        <SectionFacultySubmissions
                          selectedDiscipline={selectedDiscipline as unknown as 'Nursing' | 'Pharmacy' | 'Public Health' | 'Speech-Language Pathology' | 'Health Science' | 'Pharmaceutical Sciences'}
                          collectionName="inClassActivitiesBouve"
                          submitButtonText="Submit an in-class activity"
                          modalTitle="Submit an In-Class Activity"
                          oldLabel="Old Activity"
                          newLabel="Redesigned Activity"
                        />
                      </div>
                      {/* Examples list */}
                      <div className="space-y-5">
                        <div className="h-px bg-gray-200" />
                        <h4 className="text-sm font-semibold tracking-tight text-[#e85c4a]">Examples <span className="text-gray-400 font-normal">({selectedDiscipline})</span></h4>
                        {(() => {
                          const filtered = IN_CLASS_EXAMPLES.filter(ex => ex.discipline === selectedDiscipline);
                          return filtered.length > 0 ? (
                            <ul className="space-y-4">
                              {filtered.map(ex => {
                                const open = openExampleIds.has(ex.id);
                                return (
                                  <li key={ex.id} className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                                    <button
                                      type="button"
                                      onClick={() => toggleExample(ex.id)}
                                      aria-expanded={open}
                                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a]/60"
                                    >
                                      <span className="flex items-center gap-3">
                                        <span className="h-2 w-2 rounded-full bg-[#e85c4a] shadow shadow-[#e85c4a]/40" />
                                        <span className="font-medium text-[13px] md:text-sm text-[#37423e] tracking-tight">{ex.title}</span>
                                      </span>
                                      <svg className={`w-5 h-5 text-[#e85c4a] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                    </button>
                                    <div className={`transition-all duration-500 ease-out ${open ? 'max-h-[850px]' : 'max-h-0'} overflow-hidden`} aria-hidden={!open}>
                                      {open && (
                                        <div className="px-5 pb-5 pt-0 space-y-5">
                                          <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-red-600 mb-2 flex items-center gap-2">🔴 <span>Old Activity</span></p>
                                            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-[13px] leading-relaxed text-red-800">
                                              {ex.old}
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600 mb-2 flex items-center gap-2">🟢 <span>Redesigned Activity</span></p>
                                            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-[13px] leading-relaxed text-green-800">
                                              {ex.redesigned}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <div className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-6 text-[13px] text-gray-500 italic text-center">No examples yet for {selectedDiscipline}.</div>
                          );
                        })()}
                        <div className="h-px bg-gray-200" />
                        <div className="rounded-xl border border-amber-200 bg-amber-50/80 shadow-sm px-5 py-4 flex gap-3 items-start" role="note" aria-label="Prompt Tip">
                          <div className="mt-0.5 text-amber-500" aria-hidden="true">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-4 12.83V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.17A7 7 0 0 0 12 2Z"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                          </div>
                          <p className="text-[13px] leading-relaxed text-amber-800">
                            <span className="font-semibold text-amber-700">Prompt Tip:</span> AI doesn’t replace participation — it multiplies possibilities. Try using it to create varied scenarios, unexpected data, or fresh case twists that make students think on their feet and collaborate more deeply.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : idx === 5 ? (
                    <div className="space-y-8 pt-5">
                      <p className="text-sm md:text-[15px] leading-relaxed text-[#253139]">
                        AI can support meaningful feedback and grading by helping you design clear rubrics, provide formative comments, and model reflective dialogue. It can also simulate peer review or generate sample responses for calibration. Use this section to explore ways AI can make feedback more consistent, transparent, and focused on growth — without losing your own voice as an instructor.
                      </p>
                      <div className="h-px bg-gray-200" />
                      {/* Filter bar (shared discipline state) */}
                      <div className="px-2 py-2">
                        <div className="mb-3 text-center">
                          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#e85c4a] opacity-90">Filter by discipline</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {DISCIPLINES.map(d => {
                            const active = d === selectedDiscipline;
                            return (
                              <button
                                key={d}
                                type="button"
                                onClick={() => setSelectedDiscipline(d)}
                                className={[
                                  'inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium tracking-tight border border-gray-300/70 backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a] focus-visible:ring-offset-1',
                                  active
                                    ? 'bg-[#e85c4a] text-white border-[#e85c4a] shadow-sm hover:shadow-md'
                                    : 'bg-white/70 text-[#3a413f] hover:bg-gray-50 hover:shadow-sm'
                                ].join(' ')}
                                aria-pressed={active}
                              >
                                <span className="flex items-center gap-1.5"><span aria-hidden className="opacity-80">{DISCIPLINE_ICONS[d]}</span><span className="whitespace-nowrap">{d}</span></span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {/* Faculty submission form for Feedback & Rubrics */}
                      <div className="mt-2">
                        <SectionFacultySubmissions
                          selectedDiscipline={selectedDiscipline as unknown as 'Nursing' | 'Pharmacy' | 'Public Health' | 'Speech-Language Pathology' | 'Health Science' | 'Pharmaceutical Sciences'}
                          collectionName="feedbackRubricsBouve"
                          submitButtonText="Submit a feedback/rubric"
                          modalTitle="Submit Feedback/Rubric"
                          oldLabel="Old Activity"
                          newLabel="AI-Enhanced Approach"
                        />
                      </div>
                      {/* Examples list */}
                      <div className="space-y-5">
                        <div className="h-px bg-gray-200" />
                        <h4 className="text-sm font-semibold tracking-tight text-[#e85c4a]">Examples <span className="text-gray-400 font-normal">({selectedDiscipline})</span></h4>
                        {(() => {
                          const filtered = FEEDBACK_EXAMPLES.filter(ex => ex.discipline === selectedDiscipline);
                          return filtered.length > 0 ? (
                            <ul className="space-y-4">
                              {filtered.map(ex => {
                                const open = openExampleIds.has(ex.id);
                                return (
                                  <li key={ex.id} className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                                    <button
                                      type="button"
                                      onClick={() => toggleExample(ex.id)}
                                      aria-expanded={open}
                                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a]/60"
                                    >
                                      <span className="flex items-center gap-3">
                                        <span className="h-2 w-2 rounded-full bg-[#e85c4a] shadow shadow-[#e85c4a]/40" />
                                        <span className="font-medium text-[13px] md:text-sm text-[#343f3c] tracking-tight">{ex.title}</span>
                                      </span>
                                      <svg className={`w-5 h-5 text-[#e85c4a] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                    </button>
                                    <div className={`transition-all duration-500 ease-out ${open ? 'max-h-[1300px]' : 'max-h-0'} overflow-hidden`} aria-hidden={!open}>
                                      {open && (
                                        <div className="px-5 pb-5 pt-0 space-y-5">
                                          <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-red-600 mb-2 flex items-center gap-2">🔴 <span>Old Activity</span></p>
                                            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-[13px] leading-relaxed text-red-800">
                                              {ex.old}
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600 mb-2 flex items-center gap-2">🟢 <span>AI-Enhanced Approach</span></p>
                                            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-[13px] leading-relaxed text-green-800">
                                              {ex.redesigned}
                                            </div>
                                          </div>
                                          <div className="space-y-3">
                                            {ex.note}
                                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-[13px] leading-relaxed text-gray-700">
                                              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Example AI Output</p>
                                              {ex.output}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <div className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-6 text-[13px] text-gray-500 italic text-center">No examples yet for {selectedDiscipline}.</div>
                          );
                        })()}
                        <div className="h-px bg-gray-200" />
                        <div className="rounded-xl border border-amber-200 bg-amber-50/80 shadow-sm px-5 py-4 flex gap-3 items-start" role="note" aria-label="Prompt Tip">
                          <div className="mt-0.5 text-amber-500" aria-hidden="true">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-4 12.83V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.17A7 7 0 0 0 12 2Z"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                          </div>
                          <p className="text-[13px] leading-relaxed text-amber-800"><span className="font-semibold text-amber-700">Prompt Tip:</span> Use AI to save time — not judgment. Try it for drafting rubrics, generating formative comments, or identifying recurring writing issues. Always review and adjust feedback so it reflects your expertise, context, and students’ needs.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-gray-300/70 bg-gray-50 px-4 py-6 text-[13px] text-gray-500 italic text-center">
                      Planned content area for “{label}” – examples, prompt patterns, cautions, and adaptation tips will appear here soon.
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
