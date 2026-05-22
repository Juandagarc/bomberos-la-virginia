export function Curtain() {
  return (
    <div className="curtain" aria-hidden="true">
      <div className="curtain__mark">
        <span className="row">
          <span>BOMBEROS</span>
        </span>
        <span className="row">
          <span>
            LA <span className="r">VIRGINIA</span>
          </span>
        </span>
        <span className="row">
          <span
            style={{
              fontFamily: 'var(--f-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '0.4em',
              letterSpacing: 0,
              color: 'var(--marfil)',
              opacity: 0.7,
            }}
          >
            Valor, Abnegación y Disciplina · Est. 1963
          </span>
        </span>
      </div>
      <div className="curtain__meta">
        <span className="blink">●</span> CARGANDO TURNO · COMPROBANDO UNIDADES · CH 01
      </div>
      <div className="curtain__bar"></div>
    </div>
  );
}
