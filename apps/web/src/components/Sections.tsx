// Remaining content sections: Cronica, Operaciones, Tripulacion, Instagram, Unete, Footer.
// Kept in one file to limit file fragmentation while staying readable.

type CrewMember = {
  num: string;
  year: string;
  photoClass: string;
  badge: string;
  silhouette: string;
  name: string;
  role: string;
  stat1: { v: string; l: string; red?: boolean };
  stat2: { v: string; l: string; red?: boolean };
  sign: string;
};

const CREW: CrewMember[] = [
  {
    num: '01',
    year: '2008',
    photoClass: 'ph-fire',
    badge: '★',
    silhouette: 'comte',
    name: 'Aníbal Cano',
    role: 'CTE · MOTOR-1',
    stat1: { v: '38', l: 'años', red: true },
    stat2: { v: '1,240', l: 'salidas' },
    sign: '“El más viejo del cuerpo.”',
  },
  {
    num: '02',
    year: '2014',
    photoClass: 'ph-helmet',
    badge: 'R',
    silhouette: 'subte',
    name: 'Camila Trejos',
    role: 'STE · RESCATE',
    stat1: { v: '12', l: 'años' },
    stat2: { v: '412', l: 'salidas', red: true },
    sign: '“Cuerdas y altura.”',
  },
  {
    num: '03',
    year: '2019',
    photoClass: 'ph-warm',
    badge: 'M',
    silhouette: 'médico',
    name: 'Diego Ospina',
    role: 'VOL · TAB-MEDIC',
    stat1: { v: '7', l: 'años' },
    stat2: { v: '298', l: 'asistencias', red: true },
    sign: '“De día estudia odonto.”',
  },
  {
    num: '04',
    year: '2021',
    photoClass: 'ph-river',
    badge: 'A',
    silhouette: 'acuático',
    name: 'Sara Marín',
    role: 'VOL · ACUÁTICO',
    stat1: { v: '5', l: 'años' },
    stat2: { v: '87', l: 'rescates', red: true },
    sign: '“Nadadora desde los seis.”',
  },
  {
    num: '05',
    year: '2016',
    photoClass: 'ph-truck',
    badge: 'D',
    silhouette: 'cond.',
    name: 'Edwin Castaño',
    role: 'CABO · CONDUCTOR',
    stat1: { v: '10', l: 'años' },
    stat2: { v: '560', l: 'despachos', red: true },
    sign: '“Maneja M-01 con los ojos cerrados.”',
  },
  {
    num: '06',
    year: '2023',
    photoClass: 'ph-night',
    badge: 'N',
    silhouette: 'nov.',
    name: 'Juan Bedoya',
    role: 'VOL · NUEVO',
    stat1: { v: '3', l: 'años' },
    stat2: { v: '64', l: 'salidas', red: true },
    sign: '“El benjamín. 19 años.”',
  },
  {
    num: '07',
    year: '2011',
    photoClass: 'ph-smoke',
    badge: 'F',
    silhouette: 'forest.',
    name: 'Mauricio Largo',
    role: 'CABO · FORESTAL',
    stat1: { v: '15', l: 'años' },
    stat2: { v: '621', l: 'salidas', red: true },
    sign: '“El que conoce cada vereda.”',
  },
];

type Post = {
  date: string;
  caption: { plain?: string; em?: string; tail?: string };
  meta: string[];
  photoClass: string;
  size?: 'lg' | 'w';
  video?: boolean;
};

const POSTS: Post[] = [
  {
    date: '21 MAY · 21:47',
    caption: {
      em: '“Madrugada larga.”',
      tail: ' Incendio de vegetación en la Vía a Pereira controlado por nuestras unidades. Gracias a la comunidad por reportar a tiempo. ♥',
    },
    meta: ['♥ 1.2K', '💬 84', '↗ 23'],
    photoClass: 'ph-fire',
    size: 'lg',
    video: true,
  },
  {
    date: '18 MAY',
    caption: {
      plain:
        'Capacitación de primeros auxilios en la I.E. La Virginia. 60 estudiantes aprendieron RCP.',
    },
    meta: ['♥ 487', '💬 21'],
    photoClass: 'ph-team',
  },
  {
    date: '15 MAY',
    caption: {
      plain: 'Rescate de gato en árbol — la Sra. Esperanza nos invitó a tinto. ',
      em: 'Misión cumplida.',
    },
    meta: ['♥ 891', '💬 142'],
    photoClass: 'ph-rescue',
  },
  {
    date: '12 MAY',
    caption: {
      em: 'Día Internacional del Bombero.',
      tail: ' Gracias a quienes nos paran en la calle a darnos la mano. Esto se hace por ustedes.',
    },
    meta: ['♥ 2.1K', '💬 287', '↗ 156'],
    photoClass: 'ph-day',
    size: 'w',
  },
  {
    date: '08 MAY',
    caption: { plain: 'Simulacro de rescate fluvial · río Risaralda. Junto con Defensa Civil.' },
    meta: ['♥ 654', '💬 31'],
    photoClass: 'ph-river',
    video: true,
  },
  {
    date: '04 MAY',
    caption: {
      plain: 'M-01 lista. Mantenimiento mensual completado. Bomba a punto, mangueras revisadas.',
    },
    meta: ['♥ 412', '💬 18'],
    photoClass: 'ph-truck',
  },
  {
    date: '28 ABR',
    caption: {
      plain: 'Día abierto en la estación. Más de 200 niños conocieron de cerca el equipo. ',
      em: 'Los próximos voluntarios.',
    },
    meta: ['♥ 1.4K', '💬 89'],
    photoClass: 'ph-warm',
  },
  {
    date: '22 ABR',
    caption: {
      plain: 'Manejo de enjambre — reubicado en zona segura. No matamos abejas, las salvamos.',
    },
    meta: ['♥ 798', '💬 47'],
    photoClass: 'ph-bee',
  },
];

const OPS = [
  {
    code: 'OP · 01',
    tag: 'EMR-110',
    title: 'Incendios estructurales y forestales',
    desc: 'Control y extinción de fuegos en vivienda, comercio y zonas verdes — incluyendo el bosque seco tropical del corregimiento de La Palma.',
    list: ['Equipo SCBA · 12 unidades', 'Mangueras 38 / 65 / 100 mm', 'Bomba M-01 · 1000 GPM'],
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 4c4 8 12 12 12 22a12 12 0 1 1-24 0c0-6 4-10 6-14 1 4 4 6 6 8-2-6 0-10 0-16Z" />
        <path d="M19 30c1 4 4 6 5 6 1 0 4-2 5-6" />
      </svg>
    ),
  },
  {
    code: 'OP · 02',
    tag: 'RES-220',
    title: 'Rescate técnico y vehicular',
    desc: 'Extracción en accidentes de tránsito en la Vía Pereira, rescate en alturas, espacios confinados y maquinaria atrapada.',
    list: ['Quijadas hidráulicas Holmatro', 'Equipo de cuerdas NFPA-G', 'Camilla de canasta'],
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="24" cy="14" r="6" />
        <path d="M24 20v10" />
        <path d="M14 30h20l-4 14H18Z" />
        <path d="M8 8c4 4 4 12 0 16" />
        <path d="M40 8c-4 4-4 12 0 16" />
      </svg>
    ),
  },
  {
    code: 'OP · 03',
    tag: 'MED-330',
    title: 'Atención prehospitalaria',
    desc: 'Primeros auxilios, soporte vital básico, traslado a centros asistenciales. Convenio con E.S.E. Hospital San Pedro y San Pablo.',
    list: ['Ambulancia A-02 · TAB', 'Desfibrilador DEA', 'Botiquín avanzado'],
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 24h8l4-10 6 20 4-10h18" />
        <circle cx="40" cy="14" r="3" />
      </svg>
    ),
  },
  {
    code: 'OP · 04',
    tag: 'FLU-440',
    title: 'Emergencias en el río Risaralda',
    desc: 'Búsqueda y rescate acuático en el río que cruza el pueblo. Equipo entrenado en NFPA 1670, con apoyo de Defensa Civil.',
    list: ['Bote inflable · 6 personas', 'Trajes secos · 8 unidades', 'Equipo flotación NIVEL III'],
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 18c4-3 8-3 12 0s8 3 12 0 8-3 12 0 4 3 4 3" />
        <path d="M4 28c4-3 8-3 12 0s8 3 12 0 8-3 12 0 4 3 4 3" />
        <path d="M4 38c4-3 8-3 12 0s8 3 12 0 8-3 12 0 4 3 4 3" />
      </svg>
    ),
  },
];

export function Cronica() {
  return (
    <section className="cronica" id="cronica" data-screen-label="03 Historia">
      <div className="cronica__inner">
        <div className="cronica__editorial reveal">
          <div className="section__mark">
            <span className="bar"></span>
            <span className="n">01 / 05</span> Crónica · Historia
          </div>
          <h2 className="cronica__title">
            Una <span className="ital">familia</span>
            <br />
            al servicio
            <br />
            del <span className="r">río.</span>
          </h2>
          <div className="cronica__body">
            <p>
              <span className="dropcap">L</span>a Virginia se levanta donde el Cauca abraza al
              Risaralda. Aquí, en este pueblo de cinco barrios y un puerto histórico, un grupo de
              hombres se reunió en <em>octubre de 1963</em> para fundar lo que hoy es la institución
              más querida del municipio.
            </p>
            <p>
              Cargaban baldes. Después una bomba manual. Después un Chevrolet del 58 que rugía por
              la Carrera 7. Ese mismo camión todavía descansa en la estación, restaurado, como
              recordatorio de que aquí el oficio se hereda.
            </p>
            <p>
              Hoy somos veintiocho voluntarios — médicos, estudiantes, paneleros, conductores,
              profesoras, mecánicos. Gente del pueblo cuidando al pueblo. Sin sueldo. Sin descanso.{' '}
              <em>Porque alguien tiene que hacerlo.</em>
            </p>
          </div>
          <blockquote className="cronica__quote">
            “El día que aquí no haya bomberos, este pueblo deja de ser La Virginia.”
            <cite>— Sgto. Aníbal Cano · 38 años de servicio</cite>
          </blockquote>
        </div>

        <div className="cronica__visual">
          <div className="polaroid-stack">
            <div className="polaroid polaroid--1" data-rot="-6">
              <div className="polaroid__tape"></div>
              <div className="polaroid__photo ph-station">
                <div className="img-frame">Estación · 1972</div>
              </div>
              <div className="polaroid__caption">
                La primera estación, esquina Cra. 6<small>Archivo CBV · 1972</small>
              </div>
            </div>
            <div className="polaroid polaroid--2" data-rot="5">
              <div className="polaroid__tape"></div>
              <div className="polaroid__photo ph-helmet">
                <div className="img-frame">Casco · MSA Cairns 1010</div>
              </div>
              <div className="polaroid__caption">
                Casco del Cabo Rendón, 1989<small>Donado por la familia</small>
              </div>
            </div>
            <div className="polaroid polaroid--3" data-rot="-3">
              <div className="polaroid__tape"></div>
              <div className="polaroid__photo ph-truck">
                <div className="img-frame">M-01 · 2018</div>
              </div>
              <div className="polaroid__caption">
                Máquina M-01, día del estreno<small>23 marzo 2018</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Operaciones() {
  return (
    <section className="ops" id="ops" data-screen-label="04 Operaciones">
      <div className="ops__head reveal">
        <div>
          <div className="section__mark">
            <span className="bar"></span>
            <span className="n">02 / 05</span> Operaciones · 04 líneas
          </div>
          <h2 className="ops__title">
            Lo que <span className="ital">hacemos</span>
            <br />
            por el <span className="r">pueblo.</span>
          </h2>
        </div>
        <div
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--tinta-3)',
            textAlign: 'right',
          }}
        >
          Activo 24/7
          <br />
          <span style={{ color: 'var(--marfil)' }}>Promedio respuesta · 4 min 12s</span>
        </div>
      </div>

      <div className="ops__grid reveal-stagger">
        {OPS.map((op) => (
          <article key={op.code} className="op-card">
            <div className="op-card__head">
              <span className="code">{op.code}</span>
              <span>{op.tag}</span>
            </div>
            <div>
              <div className="op-card__icon">{op.icon}</div>
              <h3 className="op-card__title">{op.title}</h3>
              <p className="op-card__desc">{op.desc}</p>
            </div>
            <div className="op-card__list">
              {op.list.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Tripulacion() {
  return (
    <section className="tripulacion" id="tripulacion" data-screen-label="05 Tripulacion">
      <div className="tripulacion__head">
        <div className="reveal">
          <div className="section__mark">
            <span className="bar"></span>
            <span className="n">03 / 05</span> Tripulación · 28 activos
          </div>
          <h2 className="tripulacion__title">
            Los <span className="ital">cromos</span>
            <br />
            de la <span className="r">estación.</span>
          </h2>
        </div>
        <p className="tripulacion__lede reveal">
          Conoce a la <em>tripulación</em> — vecinos del pueblo que entrenan los sábados, duermen
          con el teléfono al lado, y corren cuando suena la sirena. Cada uno con su código de radio
          y su especialidad.
        </p>
      </div>

      <div className="crew__grid reveal-stagger">
        {CREW.map((m) => (
          <article key={m.num} className="cromo">
            <div className="cromo__head">
              <span className="num">{m.num}</span>
              <span>{m.year}</span>
            </div>
            <div className={`cromo__photo ${m.photoClass}`}>
              <div className="cromo__badge">{m.badge}</div>
              <div className="silhouette">{m.silhouette}</div>
            </div>
            <h3 className="cromo__name">{m.name}</h3>
            <div className="cromo__role">{m.role}</div>
            <div className="cromo__stats">
              <div className="cromo__stat">
                <div className="v">
                  {m.stat1.red ? <span className="r">{m.stat1.v}</span> : m.stat1.v}
                </div>
                <div className="l">{m.stat1.l}</div>
              </div>
              <div className="cromo__stat">
                <div className="v">
                  {m.stat2.red ? <span className="r">{m.stat2.v}</span> : m.stat2.v}
                </div>
                <div className="l">{m.stat2.l}</div>
              </div>
            </div>
            <div className="cromo__sign">{m.sign}</div>
          </article>
        ))}
        <a href="#" className="crew__more">
          <div>
            <div className="lab">Tripulación completa</div>
            <div className="big">
              +<span className="r">21</span>
            </div>
          </div>
          <span>Conoce a todos →</span>
        </a>
      </div>
    </section>
  );
}

export function Instagram() {
  return (
    <section className="ig" id="ig" data-screen-label="06 Instagram">
      <div className="ig__head reveal">
        <div>
          <div className="section__mark">
            <span className="bar"></span>
            <span className="n">04 / 05</span> Bitácora · Instagram
          </div>
          <h2 className="ig__title">
            El <span className="ital">cuaderno</span>
            <br />
            del <span className="r">turno.</span>
          </h2>
        </div>
        <div className="ig__handle">
          <a
            href="https://www.instagram.com/cuerpodebomberoslavirginia/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @cuerpodebomberoslavirginia
          </a>
          <small>14.2K seguidores · 847 publicaciones</small>
        </div>
      </div>

      <div className="ig__grid reveal-stagger">
        {POSTS.map((p, i) => (
          <article
            key={i}
            className={`post${p.size === 'lg' ? ' post--lg' : ''}${p.size === 'w' ? ' post--w' : ''} ${p.photoClass}`}
          >
            {p.video ? <div className="post__type">▶</div> : null}
            <div className="post__inner">
              <span className="post__date">{p.date}</span>
              <div>
                <p className="post__caption">
                  {p.caption.em && !p.caption.plain ? <em>{p.caption.em}</em> : null}
                  {p.caption.plain ? p.caption.plain : null}
                  {p.caption.em && p.caption.plain ? <em>{p.caption.em}</em> : null}
                  {p.caption.tail ? p.caption.tail : null}
                </p>
                <div className="post__meta">
                  {p.meta.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Unete() {
  return (
    <section className="unete" id="unete" data-screen-label="07 Unete">
      <div className="unete__inner">
        <div>
          <div className="unete__mark">
            <span className="dot"></span>Reclutamiento abierto · Junio 2026
          </div>
          <h2 className="unete__title">
            ¿Te ves <span className="ital">corriendo</span>
            <br />
            con <span className="stroke">nosotros?</span>
          </h2>
          <p className="unete__lede">
            Reclutamos voluntarios <em>todo el año</em>. No necesitas experiencia, sí compromiso.
            Capacitación gratuita, equipo proporcionado, hermandad incluida. Tres meses de
            inducción, después tú decides hasta dónde quieres llegar.
          </p>
          <div className="unete__ctas">
            <a className="btn-light" href="#" data-magnet>
              Postúlate ahora
              <span style={{ fontSize: 18 }}>→</span>
            </a>
            <a className="btn-outline" href="#">
              Conoce el proceso
            </a>
          </div>
        </div>

        <div className="requisitos">
          <h4>Lo que pedimos</h4>
          <ul>
            <li>
              <span className="n">01</span>
              <div>
                Ser mayor de 18 años<small>Documento de identidad colombiano</small>
              </div>
            </li>
            <li>
              <span className="n">02</span>
              <div>
                Vivir en La Virginia o alrededores<small>Risaralda · radio de 15 km</small>
              </div>
            </li>
            <li>
              <span className="n">03</span>
              <div>
                Disponibilidad sábados<small>Entrenamiento de 8 am a 12 m</small>
              </div>
            </li>
            <li>
              <span className="n">04</span>
              <div>
                Aptitud física básica<small>Examen médico de ingreso</small>
              </div>
            </li>
            <li>
              <span className="n">05</span>
              <div>
                Ganas de servir<small>Lo demás se aprende</small>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const DISPATCH_ITEMS = [
  { tm: '22:14', code: '10-4', txt: 'M-01 en ruta · Vía Pereira K3' },
  { tm: '21:47', code: '10-70', txt: 'Incendio vegetación · CBV en sitio' },
  { tm: '18:02', code: '10-91', txt: 'Animal en árbol · resuelto' },
  { tm: '14:30', code: '10-19', txt: 'Capacitación I.E. La Virginia' },
  { tm: '11:15', code: '10-52', txt: 'APH · Cra. 7 con Cl. 9' },
  { tm: '08:45', code: '10-12', txt: 'Inspección hidrante · z. industrial' },
];

export function Footer() {
  const doubled = [...DISPATCH_ITEMS, ...DISPATCH_ITEMS.slice(0, 4)];
  const pillStyle: React.CSSProperties = {
    fontFamily: 'var(--f-mono)',
    fontSize: 11,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--marfil)',
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.15)',
    padding: '8px 12px',
    borderRadius: 999,
  };

  return (
    <footer className="footer" data-screen-label="08 Contacto">
      <div className="footer__inner">
        <div className="dispatch">
          <div className="dispatch__head">
            <span className="live-d"></span>
            Despacho · radio CB
          </div>
          <div className="dispatch__feed">
            <div className="dispatch__track">
              {doubled.map((d, i) => (
                <span key={i} className="dispatch__item">
                  <span className="tm">{d.tm}</span>
                  <span className="code">{d.code}</span>
                  {d.txt}
                  <span className="sep">▲</span>
                </span>
              ))}
            </div>
          </div>
          <div className="dispatch__ch">CH 01 · 156.800 MHz</div>
        </div>

        <div className="footer__top" style={{ marginTop: 64 }}>
          <div className="footer__brand">
            <div className="word">
              BOMBEROS <span className="r">LA VIRGINIA</span>
              <br />
              <span className="ital" style={{ fontSize: '0.42em', letterSpacing: 0 }}>
                Voluntarios · Risaralda
              </span>
            </div>
            <p>
              Cuerpo de Bomberos Voluntarios de La Virginia · Fundado el 4 de octubre de 1963 ·{' '}
              <em>Valor, Abnegación y Disciplina.</em> Sin ánimo de lucro.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href="https://www.instagram.com/cuerpodebomberoslavirginia/"
                target="_blank"
                rel="noopener noreferrer"
                style={pillStyle}
              >
                @cuerpodebomberoslavirginia →
              </a>
              <a href="#" style={pillStyle}>
                Facebook →
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h5>Estación</h5>
            <ul>
              <li>
                <a href="#">
                  Cra. 6 · Cl. 9-32<small>La Virginia · Risaralda</small>
                </a>
              </li>
              <li>
                <a href="tel:+576987654321">
                  +57 6 987 65 43<small>Línea fija</small>
                </a>
              </li>
              <li>
                <a href="tel:+573113548281" style={{ color: 'var(--rojo)' }}>
                  📞 311 354 82 81<small>Emergencia 24/7</small>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>Comunidad</h5>
            <ul>
              <li>
                <a href="#">Capacitaciones</a>
              </li>
              <li>
                <a href="#">Prevención del fuego</a>
              </li>
              <li>
                <a href="#">Día abierto</a>
              </li>
              <li>
                <a href="#">Visitas escolares</a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>Apoya</h5>
            <ul>
              <li>
                <a href="#unete">Sé voluntario</a>
              </li>
              <li>
                <a href="#" style={{ color: 'var(--rojo)' }}>
                  Dona ahora →
                </a>
              </li>
              <li>
                <a href="#">Donación recurrente</a>
              </li>
              <li>
                <a href="#">Transparencia · 2025</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mega-mark">
          LA <span className="r">VIRGINIA</span>
        </div>

        <div className="footer__bottom">
          <span>© 1963–2026 · CBV La Virginia</span>
          <span className="center">
            Hecho con <span className="heart">♥</span> en La Virginia, Risaralda · Colombia
          </span>
          <span>
            Diseño · <a href="#">en casa</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
