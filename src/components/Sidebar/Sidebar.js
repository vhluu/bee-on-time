import React from 'react';
import './Sidebar.css';

function Sidebar(props) {
  const { children } = props;
  return (
    <div className="sidebar">{ children }</div>
  );
}

export default Sidebar;