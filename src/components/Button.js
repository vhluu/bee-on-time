import React from 'react';

function Button(props) {
  const { btnType, clicked, children } = props;
  return (
    <div className={`btn ${btnType}`} onClick={clicked} role="button" tabIndex="0">
      { children }
      { btnType == 'close' && 
        <svg enableBackground="new" viewBox="0 0 52.88 52.88" xmlns="http://www.w3.org/2000/svg"><defs><filter id="b" colorInterpolationFilters="sRGB"><feBlend in2="BackgroundImage" mode="luminosity" /></filter></defs><g transform="translate(0 -244.12)"> <circle transform="matrix(.94032 .0079 0 .94264 1.7 15.203)" cx="26.591" cy="270.67" r="26.326" fill="#cacaff" filter="url(#b)" stroke="#828cec" strokeWidth="3" /><rect transform="rotate(45)" x="204.05" y="156.73" width="11.925" height="31.768" ry="5.673" fill="#828cec" /><rect transform="rotate(45)" x="194.13" y="166.66" width="31.768" height="11.925" ry="5.963" fill="#828cec" /><rect transform="rotate(45)" x="206.83" y="159.38" width="6.368" height="26.477" ry="3.089" fill="#fffeff" /><rect transform="rotate(45)" x="196.77" y="169.43" width="26.477" height="6.368" ry="3.184" fill="#fffeff" /></g></svg>
      }
      { btnType == 'add' &&
        <svg enableBackground="new" viewBox="0 0 52.88 52.88" xmlns="http://www.w3.org/2000/svg"><defs><filter id="a" colorInterpolationFilters="sRGB"><feBlend in2="BackgroundImage" mode="luminosity" /></filter></defs><g transform="translate(0 -244.12)"><circle transform="matrix(.94032 .0079 0 .94264 1.7 15.203)" cx="26.591" cy="270.67" r="26.326" fill="#cacaff" filter="url(#a)" stroke="#828cec" strokeWidth="3" /><rect x="20.478" y="254.68" width="11.925" height="31.768" ry="5.673" fill="#828cec" /><rect x="10.556" y="264.6" width="31.768" height="11.925" ry="5.963" fill="#828cec" /><rect x="23.256" y="257.32" width="6.368" height="26.477" ry="3.089" fill="#fffeff" /><rect x="13.202" y="267.38" width="26.477" height="6.368" ry="3.184" fill="#fffeff" /></g></svg>
      }
    </div>
  );
}

export default Button;
