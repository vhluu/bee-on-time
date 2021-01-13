import React from 'react';

function Content(props) {
  const { children } = props;
  return (
    <div className="content">{ children }</div>
  );
}

export default Content;