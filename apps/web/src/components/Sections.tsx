// Remaining content sections: Cronica, Operaciones, Tripulacion, Instagram, Unete, Footer.
// Kept in one file to limit file fragmentation while staying readable.

import igFeedRaw from '../data/ig-feed.json';

type IgPost = {
  id: string;
  date: string | null;
  caption: { plain?: string | null; em?: string | null; tail?: string | null };
  meta: string[];
  photoClass: string;
  img: string | null;
  href: string | null;
  size?: 'lg' | 'w' | null;
  video?: boolean | null;
};

const igFeed = igFeedRaw as {
  posts: IgPost[];
  lastSync: string | null;
  followerCount: string;
  postCount: string;
};

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

const CREW_ICONS = {
  comte: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 6l2.6 8H35l-6.8 5 2.6 8L24 22.6 17.2 27l2.6-8L13 14h8.4Z"/>
      <path d="M10 34h28"/>
      <path d="M14 40h20"/>
    </svg>
  ),
  subte: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="10" r="5"/>
      <path d="M24 15v12M16 22l8 5 8-5"/>
      <path d="M19 31l5 13M29 31l-5 13"/>
      <path d="M34 16c4 2 6 6 6 10"/>
      <path d="M14 16c-4 2-6 6-6 10"/>
    </svg>
  ),
  médico: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="20" y="8" width="8" height="32" rx="2"/>
      <rect x="8" y="20" width="32" height="8" rx="2"/>
    </svg>
  ),
  acuático: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18c4-5 8-5 12 0s8 5 12 0 8-5 12 0"/>
      <path d="M4 28c4-5 8-5 12 0s8 5 12 0 8-5 12 0"/>
      <path d="M4 38c4-5 8-5 12 0s8 5 12 0 8-5 12 0"/>
    </svg>
  ),
  'cond.': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="18"/>
      <circle cx="24" cy="24" r="5"/>
      <line x1="24" y1="6" x2="24" y2="19"/>
      <line x1="24" y1="29" x2="24" y2="42"/>
      <line x1="6" y1="24" x2="19" y2="24"/>
      <line x1="29" y1="24" x2="42" y2="24"/>
    </svg>
  ),
  'nov.': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 4c4 10 11 12 11 22a11 11 0 0 1-22 0c0-6 3-10 6-14 1 5 3 7 4 9C22 15 20 10 24 4Z"/>
    </svg>
  ),
  'forest.': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="24,5 14,22 34,22"/>
      <polygon points="24,14 10,36 38,36"/>
      <rect x="21" y="36" width="6" height="7" rx="1"/>
    </svg>
  ),
} as Record<string, React.ReactElement>;

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
              <div
                className="polaroid__photo"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg,transparent 55%,rgba(0,0,0,0.55) 100%), url(/ig/07-DCzA9z3xPxN.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="img-frame">Festival del Puerto · La Virginia</div>
              </div>
              <div className="polaroid__caption">
                CBV presente en las fiestas del municipio<small>Unidades de guardia</small>
              </div>
            </div>
            <div className="polaroid polaroid--2" data-rot="5">
              <div className="polaroid__tape"></div>
              <div
                className="polaroid__photo"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg,transparent 55%,rgba(0,0,0,0.55) 100%), url(/ig/03-DGnk878R6Pb.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                }}
              >
                <div className="img-frame">Gestión institucional · DNBC</div>
              </div>
              <div className="polaroid__caption">
                Comandancia ante la Dirección Nacional<small>Carnetización Nacional</small>
              </div>
            </div>
            <div className="polaroid polaroid--3" data-rot="-3">
              <div className="polaroid__tape"></div>
              <div
                className="polaroid__photo"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg,transparent 55%,rgba(0,0,0,0.55) 100%), url(/ig/08-DCPDHFipgdk.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="img-frame">CBV La Virginia · Est. 1963</div>
              </div>
              <div className="polaroid__caption">
                Cuerpo de Bomberos Voluntarios<small>Valor · Abnegación · Disciplina</small>
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
              <div className="silhouette">{CREW_ICONS[m.silhouette] ?? null}</div>
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
          <small>
            {igFeed.followerCount} seguidores · {igFeed.postCount} publicaciones
          </small>
        </div>
      </div>

      <div className="ig__grid reveal-stagger">
        {igFeed.posts.map((p, i) => (
          <article
            key={p.id ?? i}
            className={`post${p.size === 'lg' ? ' post--lg' : ''}${p.size === 'w' ? ' post--w' : ''} ${p.photoClass}`}
          >
            {p.img && (
              <img
                src={p.img}
                alt={p.caption.plain ?? p.caption.em ?? ''}
                loading="lazy"
                decoding="async"
              />
            )}
            {p.href && (
              <a
                className="post__link"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver en Instagram"
              />
            )}
            {p.video ? <div className="post__type">▶</div> : null}
            <div className="post__inner">
              {p.date && <span className="post__date">{p.date}</span>}
              <div>
                <p className="post__caption">
                  {p.caption.em && !p.caption.plain ? <em>{p.caption.em}</em> : null}
                  {p.caption.plain
                    ? p.caption.plain
                    : !p.caption.em && !p.caption.tail
                      ? '@cuerpodebomberoslavirginia'
                      : null}
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

        {/* CTA card — fills remaining grid cells and links to the full profile */}
        <a
          className="post post--w ph-rojo"
          href="https://www.instagram.com/cuerpodebomberoslavirginia/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="post__inner">
            <span className="post__date">Instagram</span>
            <div>
              <p className="post__caption">
                <em>Ver todo en Instagram →</em>
              </p>
              <p className="post__caption" style={{ marginTop: 6, opacity: 0.75 }}>
                {igFeed.followerCount} seguidores · {igFeed.postCount} publicaciones
              </p>
            </div>
          </div>
        </a>
        <div className="post ph-night">
          <div className="post__inner">
            <span className="post__date">Emergencias 24 / 7</span>
            <div>
              <p className="post__caption">
                <em>311 354 82 81</em>
              </p>
              <p className="post__caption" style={{ marginTop: 6, opacity: 0.75 }}>
                Capacitaciones · 304 488 44 32
              </p>
            </div>
          </div>
        </div>
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
  { tm: '07:20', code: '10-8', txt: 'A-02 disponible · base estación' },
  { tm: '05:58', code: '10-33', txt: 'Enjambre abejas · Barrio La Playa' },
  { tm: '03:15', code: '10-70', txt: 'Conato eléctrico · Cl. 12 · controlado' },
  { tm: '01:40', code: '10-4', txt: 'Relevo nocturno · M-01 en base' },
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
            </div>
          </div>

          <div className="footer__col">
            <h5>Estación</h5>
            <ul>
              <li>
                <span>
                  Cra. 6 · Cl. 9-32<small>La Virginia · Risaralda</small>
                </span>
              </li>
              <li>
                <a href="tel:+573044884432">
                  304 488 44 32<small>Capacitaciones</small>
                </a>
              </li>
              <li>
                <a href="tel:+573113548281" style={{ color: 'var(--rojo)' }}>
                  311 354 82 81<small>Emergencias 24 / 7</small>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>Comunidad</h5>
            <ul>
              <li>
                <a href="#unete">Hazte voluntario</a>
              </li>
              <li>
                <a href="#ops">Operaciones</a>
              </li>
              <li>
                <a href="#tripulacion">La tripulación</a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/cuerpodebomberoslavirginia/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
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
                <a
                  href="https://www.instagram.com/cuerpodebomberoslavirginia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--rojo)' }}
                >
                  Escríbenos →
                </a>
              </li>
              <li>
                <a href="tel:+573113548281">Emergencia · 311 354 82 81</a>
              </li>
              <li>
                <a href="tel:+573044884432">Capacitaciones · 304 488 44 32</a>
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
          <span>Hecho en La Virginia</span>
        </div>
      </div>
    </footer>
  );
}
