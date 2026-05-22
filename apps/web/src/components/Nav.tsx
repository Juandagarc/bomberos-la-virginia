export function Nav() {
  return (
    <nav className="nav" aria-label="Principal">
      <a className="nav__logo" href="#top">
        <div className="helmet">
          <img src="/cbv-logo.png" alt="Cuerpo de Bomberos Voluntarios La Virginia" />
        </div>
        <div className="word">
          BOMBEROS <span className="r">LV</span>
          <small>Cuerpo Voluntario · Risaralda</small>
        </div>
      </a>
      <div className="nav__links">
        <a href="#cronica" data-n="01">
          Historia
        </a>
        <a href="#ops" data-n="02">
          Operaciones
        </a>
        <a href="#tripulacion" data-n="03">
          Tripulación
        </a>
        <a href="#ig" data-n="04">
          Galería
        </a>
        <a href="#unete" data-n="05">
          Únete
        </a>
      </div>
      <div className="nav__cta">
        <a className="btn-123" href="tel:+573113548281" data-magnet>
          <span className="pulse"></span>311 354 82 81
        </a>
      </div>
    </nav>
  );
}
