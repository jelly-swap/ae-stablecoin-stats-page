import React from 'react';

import './style.scss';

export function Card(props) {
  return <div className={`card ${props.className}`}>{props.children}</div>;
}
