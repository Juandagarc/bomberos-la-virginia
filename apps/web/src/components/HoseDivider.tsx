export function HoseDivider() {
  return (
    <div className="hose" aria-hidden="true">
      <svg viewBox="0 0 1600 60" preserveAspectRatio="none">
        <path d="M0 30 Q 100 10 200 30 T 400 30 T 600 30 T 800 30 T 1000 30 T 1200 30 T 1400 30 T 1600 30" />
        <circle className="nozzle" cx="1580" cy="30" r="8" />
        <rect className="nozzle" x="1568" y="22" width="16" height="16" rx="2" />
      </svg>
    </div>
  );
}
