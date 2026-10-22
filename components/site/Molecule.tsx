/** Flat geometric network diagram — white circles and thin connectors. */
export default function Molecule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1">
        <line x1="160" y1="60" x2="72" y2="150" />
        <line x1="160" y1="60" x2="248" y2="150" />
        <line x1="72" y1="150" x2="248" y2="150" />
        <line x1="72" y1="150" x2="120" y2="258" />
        <line x1="248" y1="150" x2="200" y2="258" />
        <line x1="120" y1="258" x2="200" y2="258" />
        <line x1="160" y1="60" x2="160" y2="150" />
        <line x1="160" y1="150" x2="120" y2="258" />
        <line x1="160" y1="150" x2="200" y2="258" />
        <line x1="36" y1="60" x2="72" y2="150" />
        <line x1="284" y1="60" x2="248" y2="150" />
      </g>
      <g fill="#012624" stroke="#ffffff" strokeWidth="1.25">
        <circle cx="160" cy="60" r="18" />
        <circle cx="72" cy="150" r="12" />
        <circle cx="248" cy="150" r="12" />
        <circle cx="120" cy="258" r="9" />
        <circle cx="200" cy="258" r="9" />
      </g>
      <g fill="#ffffff">
        <circle cx="160" cy="150" r="5" />
        <circle cx="36" cy="60" r="3.5" fillOpacity="0.7" />
        <circle cx="284" cy="60" r="3.5" fillOpacity="0.7" />
      </g>
      <circle cx="160" cy="60" r="6" fill="#fde9ff" />
    </svg>
  );
}
