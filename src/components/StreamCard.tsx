const StreamCard: React.FC<{ title: string; subjects: string[] }> = ({
  title,
  subjects,
}) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
    <ul className="mt-2 flex flex-wrap gap-1.5">
      {subjects.map((subject) => (
        <li
          key={subject}
          className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-xs text-slate-700 shadow-sm"
        >
          {subject}
        </li>
      ))}
    </ul>
  </div>
);

export default StreamCard;
