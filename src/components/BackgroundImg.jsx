import React from 'react';
import styles from '/src/App.module.scss';

export default function BackgroundImg({ currentImg }) {
  function getClassName(imgUrl) {
    let className = styles.bg + ' ';
    if (currentImg === imgUrl) {
      className += styles.activeBg;
    }
    return className;
  };

  return (
    <>
      <div
        className={ getClassName('/pics/rain.png') }
        style={{ backgroundImage: `url('/pics/rain.png')` }}
      />
      <div
        className={ getClassName('/pics/forest.png') }
        style={{ backgroundImage: `url('/pics/forest.png')` }}
      />
      <div
        className={ getClassName('/pics/park.png') }
        style={{ backgroundImage: `url('/pics/park.png')` }}
      />
      <div
        className={ getClassName('/pics/stream.png') }
        style={{ backgroundImage: `url('/pics/stream.png')` }}
      />
      <div
        className={ getClassName('/pics/waves.png') }
        style={{ backgroundImage: `url('/pics/waves.png')` }}
      />
      <div
        className={ getClassName('/pics/night.png') }
        style={{ backgroundImage: `url('/pics/night.png')` }}
      />
    </>
  )
}