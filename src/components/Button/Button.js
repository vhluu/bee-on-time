import React from 'react';
import './Button.css';

function Button(props) {
  const { btnType, clicked, children } = props;

  /* Executes click handler on space or enter key press */
  function handleKeyDown(e) {
    const SPACEBAR_KEY = 0 || 32;
    const ENTER_KEY = 13;
    
    if (clicked && (e.keyCode == SPACEBAR_KEY || e.keyCode == ENTER_KEY)) {
      e.preventDefault();
      e.stopPropagation();
      clicked();
    }
  }

  let icon;
  switch(btnType) {
    case 'close':
      icon = <svg viewBox="0 0 52.88 52.88" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -244.12)"><circle transform="matrix(.94032 .0079 0 .94264 1.7 15.203)" cx="26.591" cy="270.67" r="26.326" fill="#cacaff" stroke="#828cec" strokeWidth="3" /><rect transform="rotate(45)" x="204.05" y="156.73" width="11.925" height="31.768" ry="5.673" fill="#828cec" /><rect transform="rotate(45)" x="194.13" y="166.66" width="31.768" height="11.925" ry="5.963" fill="#828cec" /><rect transform="rotate(45)" x="206.83" y="159.38" width="6.368" height="26.477" ry="3.089" fill="#fffeff" /><rect transform="rotate(45)" x="196.77" y="169.43" width="26.477" height="6.368" ry="3.184" fill="#fffeff" /></g></svg>;
      break;
    case 'add':
      icon = <svg viewBox="0 0 52.88 52.88" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -244.12)"><circle transform="matrix(.94032 .0079 0 .94264 1.7 15.203)" cx="26.591" cy="270.67" r="26.326" fill="#cacaff" stroke="#828cec" strokeWidth="3" /><rect x="20.478" y="254.68" width="11.925" height="31.768" ry="5.673" fill="#828cec" /><rect x="10.556" y="264.6" width="31.768" height="11.925" ry="5.963" fill="#828cec" /><rect x="23.256" y="257.32" width="6.368" height="26.477" ry="3.089" fill="#fffeff" /><rect x="13.202" y="267.38" width="26.477" height="6.368" ry="3.184" fill="#fffeff" /></g></svg>;
      break;
    case 'edit':
      icon = <svg viewBox="0 0 15.858 13.99" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -279.61)"><g fill="#828cec"><rect transform="rotate(-40)" x="-183.51" y="221.59" width="10.683" height="6.615" ry="0"/><rect transform="rotate(-40)" x="-174.05" y="221.59" width="3.969" height="6.615" ry="1.323"/><path d="M0 293.604l1.88-5.886 4.242 5.056z"/></g><path d="M1.024 292.73l1.374-4.692 3.485 4.152z" fill="#fffbdf"/><path d="M.77 293.104c-.08-.095.604-2.213.72-2.23.116-.015 1.638 1.798 1.602 1.91-.036.11-2.241.416-2.321.32z" fill="#828cec"/><rect transform="rotate(-40)" x="-172.73" y="222.19" width="2.117" height="5.421" ry=".851" fill="#eccbff"/><rect transform="rotate(-40)" x="-181.39" y="222.19" width="7.039" height="5.421" ry="0" fill="#ffffb5"/><rect transform="rotate(-40)" x="-172.73" y="222.19" width=".9" height="5.421" ry="0" fill="#eccbff"/><rect transform="scale(1 -1) rotate(40)" x="-174.05" y="-227.61" width="1.023" height="5.421" ry="0" fill="#def0f6"/><g fill="#fffbdf"><path d="M4.026 287.855l-.48 1.582-1.161-1.384z"/><path d="M5.186 289.235l-.48 1.582-1.161-1.384zM6.346 290.625l-.48 1.582-1.161-1.384z"/></g><g fill="#ffffb5"><path d="M4.008 289.083l.48-1.581 1.161 1.384z"/><path d="M5.128 290.433l.48-1.581 1.161 1.384zM2.821 287.68l1.06-.89.581.693-1.64.197zM6.79 290.25l.58.693-1.06.89.48-1.583z"/></g></g></svg>;
      break;
    case 'delete':
      icon = <svg viewBox="0 0 26.206 26.206" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(45 304.113 -144.83)"><rect x="204.05" y="156.73" width="11.925" height="31.768" ry="5.673" fill="#828cec" /><rect x="194.13" y="166.66" width="31.768" height="11.925" ry="5.963" fill="#828cec" /><rect x="206.83" y="159.38" width="6.368" height="26.477" ry="3.089" fill="#cacaff" /><rect x="196.77" y="169.43" width="26.477" height="6.368" ry="3.184" fill="#cacaff" /></g></svg>;
      break;
  }

  return (
    <div className={`btn ${btnType} ${!icon ? 'btn-default' : 'btn-icon' }`} onClick={clicked} onKeyDown={handleKeyDown} role="button" tabIndex="0">
      { children }{ icon }
    </div>
  );
}

export default Button;
