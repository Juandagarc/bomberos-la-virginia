const ITEMS = [
  { text: 'Protegiendo La Virginia', italic: 'desde 1963' },
  { text: '24 / 7 · Sin descanso' },
  { text: 'Valor · Abnegación · ', italic: 'Disciplina' },
  { text: 'Por amor al pueblo' },
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee__item-wrap" style={{ display: 'contents' }}>
            <div className="marquee__item">
              {item.text}
              {item.italic ? <span className="ital">{item.italic}</span> : null}
            </div>
            <div className="marquee__sep"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
