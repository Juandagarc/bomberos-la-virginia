export function Hero() {
  return (
    <header className="hero" id="top" data-screen-label="01 Hero">
      <div className="hero__photo"></div>
      <div className="hero__heat" aria-hidden="true"></div>
      <div className="hero__beams"></div>
      <div className="hero__fire" aria-hidden="true"></div>
      <div className="hero__smoke" aria-hidden="true">
        <span className="smoke"></span>
        <span className="smoke"></span>
        <span className="smoke"></span>
        <span className="smoke"></span>
      </div>
      <div className="hero__embers" aria-hidden="true"></div>
      <div className="hero__sparks" aria-hidden="true"></div>

      <div className="hero__corner">
        <span className="stamp">
          <span className="v">●</span> CBV · EST. 1963
        </span>
        <span className="stamp">VALOR · ABNEGACIÓN · DISCIPLINA</span>
        <span className="stamp">RÍO RISARALDA · NIVEL NORMAL</span>
      </div>

      <div className="hero__inner">
        <div>
          <div className="hero__eyebrow">
            <span className="bar"></span>
            Cuerpo de Bomberos Voluntarios · Risaralda · Colombia
          </div>
          <h1 className="hero__title">
            <span className="row">
              <span>Cuando el</span>
            </span>
            <span className="row">
              <span>
                <em className="ital">pueblo</em> <span className="ardelo">arde,</span>
              </span>
            </span>
            <span className="row">
              <span>nosotros corremos.</span>
            </span>
          </h1>
          <p className="hero__lede">
            Somos un cuerpo de voluntarios <em>sin sueldo, sin descanso</em>. Sesenta y tres años
            cargando mangueras por las calles de La Virginia, Risaralda — con{' '}
            <em>valor, abnegación y disciplina</em>, porque alguien tiene que hacerlo y aquí lo
            hacemos nosotros.
          </p>
          <div className="hero__ctas">
            <a className="btn-primary" href="#unete">
              Quiero ser voluntario
              <span className="arrow">→</span>
            </a>
            <a className="btn-ghost" href="#cronica">
              Conoce la unidad
            </a>
          </div>
        </div>

        <aside className="hero__right">
          <div className="live-card" aria-label="Datos en vivo">
            <div className="live-card__head">
              <span className="now">
                <span className="dot"></span>En vivo · 2026
              </span>
              <span>CBV / Panel</span>
            </div>
            <div className="live-card__big">
              <span data-live-count="347">0</span>
              <span className="delta">+1 hoy</span>
            </div>
            <div className="live-card__lab">Emergencias atendidas</div>

            <div className="live-card__row">
              <div className="mini">
                <div className="v">
                  <span data-count="28">0</span>
                  <span className="r" style={{ fontSize: 14, marginLeft: 4 }}>
                    /28
                  </span>
                </div>
                <div className="l">Voluntarios activos</div>
              </div>
              <div className="mini">
                <div className="v">
                  <span data-count="4" data-pad="2">
                    00
                  </span>
                </div>
                <div className="l">Unidades operativas</div>
              </div>
            </div>

            <div className="live-card__last">
              Última actividad <b data-last-incident>hace 27 min</b>
              <br />
              <span style={{ color: 'var(--rojo)' }}>▲</span> Incendio vegetación · Vía Pereira
            </div>
          </div>
        </aside>
      </div>

      <div className="hero__scroll">
        Desliza
        <div className="line"></div>
      </div>
    </header>
  );
}
