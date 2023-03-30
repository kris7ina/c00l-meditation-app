import React from 'react';
import styles from './Slider.module.scss';

export default function Slider(props) {
  const { value } = props;

  return (
    <div className={styles.range}>
      <div className={styles.sliderBg} style={{ width: `${value * 100}%` }}></div>
      <input 
        type='range' 
        min={0}
        max={1}
        step={0.02}
        {...props}
      />
    </div>
  )
}