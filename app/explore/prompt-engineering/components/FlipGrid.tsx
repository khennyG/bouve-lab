import FlipCard from "./FlipCard";

export default function FlipGrid() {
  const items = [
    {
      frontTitle: "Why it matters?",
      frontBody: "Because how you ask changes what you get.",
      backTitle: "Impact",
      backBody:
        "Specific roles, structure, and criteria improve relevance, accuracy, and classroom usefulness — with fewer retries.",
    },
    {
      frontTitle: "What AI understands?",
      frontBody: "Patterns, context, and constraints.",
      backTitle: "Signals",
      backBody:
        "It leverages your role, objective, input text, and output format to shape its response — vague prompts reduce signal.",
    },
    {
      frontTitle: "What you control?",
      frontBody: "Role, task, input, output structure, and tone.",
      backTitle: "Levers",
      backBody:
        "Set role/context, define the task precisely, paste key inputs, require sections/tables, and add ethical criteria.",
    },
    {
      frontTitle: "How to start?",
      frontBody: "Be specific, structured, and intentional.",
      backTitle: "Blueprint",
      backBody:
        "Use the 10‑section blueprint + a mandatory clarification step. Then iterate: draft → critique → revise.",
    },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((it) => (
        <FlipCard
          key={it.frontTitle}
          frontTitle={it.frontTitle}
          frontBody={it.frontBody}
          backTitle={it.backTitle}
          backBody={it.backBody}
        />
      ))}
    </div>
  );
}
