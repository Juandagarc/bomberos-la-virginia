type StatItem = {
  count: number;
  dur: number;
  fmt?: 'thousands';
  red?: boolean;
  barRest: string;
  label: string;
  small: string;
};

const STATS: StatItem[] = [
  {
    count: 347,
    dur: 1800,
    fmt: 'thousands',
    red: true,
    barRest: '20%',
    label: 'Emergencias atendidas',
    small: '2026 · acumulado',
  },
  {
    count: 63,
    dur: 1600,
    barRest: '0%',
    label: 'Años al servicio del pueblo',
    small: 'fundado · 4 oct 1963',
  },
  {
    count: 28,
    dur: 1400,
    barRest: '30%',
    label: 'Voluntarios certificados',
    small: '28 activos · 12 en cursos',
  },
  {
    count: 142,
    dur: 2000,
    barRest: '60%',
    label: 'Vidas asistidas en 2026',
    small: 'incluye primeros auxilios',
  },
];

export function Stats() {
  return (
    <section className="stats" data-screen-label="02 Cifras">
      <div className="stats__head reveal">
        <h2 className="stats__title">
          Las <span className="ital">cifras</span>
          <br />
          de un <span className="r">turno</span> sin fin.
        </h2>
        <div className="stats__meta">
          DATOS LIVE · ENE–MAY 2026
          <br />
          Fuente: <b>Bitácora CBV</b>
        </div>
      </div>
      <div className="stats__grid reveal-stagger">
        {STATS.map((s, i) => (
          <div
            key={i}
            className="stat"
            style={{ ['--bar-rest' as string]: s.barRest } as React.CSSProperties}
          >
            <div className={`stat__n${s.red ? ' red' : ''}`}>
              <span data-count={s.count} data-dur={s.dur} {...(s.fmt ? { 'data-fmt': s.fmt } : {})}>
                0
              </span>
            </div>
            <div className="stat__lab">
              {s.label} <small>{s.small}</small>
            </div>
            <div className="stat__bar"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
