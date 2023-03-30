import React from 'react';
import styles from './Counter.module.scss';
import { arrowBtn } from '../constants';

export default function Counter(props) {
  const { duration, setDuration, min, max, ...rest } = props;
  const incrTimeout = React.useRef(null);
  const decrTimeout = React.useRef(null);

  function incr(rate, oldDuration) {
    let newDuration = oldDuration + rate;
    if (newDuration <= max) {
      incrTimeout.current = setTimeout(() => {
        setDuration(newDuration);
        incr(newRate(rate), newDuration);
      }, 450)
    } 
  };

  function decr(rate, oldDuration) {
    let newDuration = oldDuration - rate;
    if (newDuration >= min) {
      decrTimeout.current = setTimeout(() => {
        setDuration(newDuration);
        decr(newRate(rate), newDuration);
      }, 450)
    }
  };

  return (
    <div className={styles.root} {...rest}>
    <div className={styles.main}>
      <span className={styles.btnWrap}>
        <img 
          className={styles.increase}
          src={arrowBtn}
          onMouseDown={() => {
            duration + 1 <= max && setDuration(duration + 1);
            incr(1, duration);
          }}
          onMouseUp={() => clearTimeout(incrTimeout.current)}
          onMouseLeave={() => clearTimeout(incrTimeout.current)}
        />
      </span>
      <input 
        className={styles.display} 
        type='number' 
        value={duration}
        onChange={(x) => {setDuration(x)}}
      />
      <span className={styles.btnWrap}>
        <img 
          className={styles.decrease}
          src={arrowBtn}
          onMouseDown={() => {
            duration - 1 >= min && setDuration(duration - 1);
            decr(1, duration);
          }}
          onMouseUp={() => clearTimeout(decrTimeout.current)}
          onMouseLeave={() => clearTimeout(decrTimeout.current)}
        />
      </span> 
    </div>
    <p className={styles.minutes}>Minutes</p>
    </div>
  )
}