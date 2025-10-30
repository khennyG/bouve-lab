export default function StepsRow() {
  const steps = [
    {
      title: "1️⃣ Define Context",
      body: "What do you want the AI to do? Add constraints like time, audience, and risk.",
      color: "bg-rose-50 border-rose-200",
    },
    {
      title: "2️⃣ Set the Role",
      body: "Who should the AI act as (e.g., clinical educator, assessment specialist)?",
      color: "bg-indigo-50 border-indigo-200",
    },
    {
      title: "3️⃣ Specify the Format",
      body: "Sections, bullets, table, word count. Clear structure → consistent results.",
      color: "bg-emerald-50 border-emerald-200",
    },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {steps.map((s) => (
        <div
          key={s.title}
          className={`rounded-xl border p-4 transition transform hover:scale-[1.02] hover:shadow ${s.color}`}
        >
          <div className="font-semibold text-gray-900">{s.title}</div>
          <div className="text-sm text-gray-800 mt-1">{s.body}</div>
        </div>
      ))}
    </div>
  );
}
