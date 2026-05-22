export function StatusBar() {
  return (
    <div className="statusbar" role="contentinfo" data-screen-label="00 Status">
      <div className="live">
        <span className="dot"></span>En servicio · La Virginia / Risaralda
      </div>
      <div className="center" data-channel>
        CH 01 · OPER
      </div>
      <div className="right">
        <span className="clock" data-clock>
          <b>00:00:00</b>
        </span>
        <span className="ch">📞 311 354 82 81</span>
      </div>
    </div>
  );
}
