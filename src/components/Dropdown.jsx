import React from 'react';
import styles from './Dropdown.module.scss';

export default function Dropdown(props) {
  const { activeOption, changeOption, ...rest } = props;
  
  const soundNames = ['rain', 'forest', 'park', 'stream', 'waves', 'night'];

  return (
    <li className={styles.drop} {...rest}>
      {activeOption}
      <ul>
        {soundNames.map((option) => {
          option = option.toLowerCase();
          return (
            <li key={option + 1}
            className={
              activeOption === option.toLowerCase() ? styles.activeOption : undefined
            }
            onClick={() => changeOption(option)}
            >
              {option}
            </li>
          )
        })}
      </ul>
    </li>
  )
}