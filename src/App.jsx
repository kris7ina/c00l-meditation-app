import React, { useState, useEffect } from 'react';
import styles from './App.module.scss';
import BackgroundImg from './components/BackgroundImg';
import Counter from './components/Counter';
import Dropdown from './components/Dropdown';
import Slider from './components/Slider';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { 
  rainImg,
  forestImg,
  parkImg,
  wavesImg,
  streamImg,
  nightImg,
  rainAudio,
  forestAudio,
  parkAudio,
  streamAudio,
  wavesAudio,
  nightAudio,
  playBtn,
  pauseBtn,
  resetBtn,
  loudVolumeIcon,
  quietVolumeIcon,
  noVolumeIcon,
} from './constants';

export default function App() {

  const audioRef = React.useRef();

  const [sound, setSound] = useState({
    url: rainAudio,
    background: rainImg,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputTime, setInputTime] = useState(120);
  const [timing, setTiming] = useState(120);
  const [currentPosition, setCurrentPosition] = useState(0);

  function timeSelect(x) {
    setInputTime(x.duration);
    setTiming(x.duration);
  };

  function seekCurrentPosition(timeDist) {
    setCurrentPosition(timeDist / (timing / 60) / 600);
  };

  function selectSound(soundName) {
    setSound((sound) => {
      switch (soundName) {
        case 'rain':
          return { ...sound, 
            url: rainAudio, 
            background: rainImg };
        case 'forest':
          return { ...sound, 
            url: forestAudio, 
            background: forestImg };
        case 'park':
          return { ...sound, 
            url: parkAudio, 
            background: parkImg };
        case 'stream':
          return { ...sound, 
            url: streamAudio, 
            background: streamImg };
        case 'waves':
          return { ...sound, 
            url: wavesAudio, 
            background: wavesImg };
        case 'night':
          return { ...sound, 
            url: nightAudio, 
            background: nightImg };
        default:
          return sound;
      }
    })
  };

  const activeSound = sound.url
    .replace('/audio/', '')
    .replace('.mp3', '');

  const timerMin = document.getElementById('timer-min');
  const timerSec = document.getElementById('timer-sec');

  function startTimer() {
		const minutesInMs = inputTime * 1000;
		const countDownTime = new Date().getTime() + minutesInMs;

		window.timeInterval = setInterval(() => {
			const nowDate = new Date().getTime();
			const timeDistance = countDownTime - nowDate;

			const min = Math.floor((timeDistance % (1000 * 60 * 60)) / (1000 * 60));
			const sec = Math.floor((timeDistance % (1000 * 60)) / 1000);

      const displayMinutes = ('0' + min).slice(-2);
      const displaySeconds = ('0' + sec).slice(-2);

			if (timeDistance < 0) {
				clearInterval(window.timeInterval);
        reset();
			} else {
        setInputTime(timeDistance / 1000)
				timerMin.innerHTML = `${displayMinutes}`;
        timerSec.innerHTML = `${displaySeconds}`;
        seekCurrentPosition(timeDistance);
			}
		}, 450);
	};

  function playPause() {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.removeAttribute('autoplay');
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.setAttribute('autoplay', 'true');
    }
  };

  const [volume, setVolume] = useState({
    currentVol: 1,
    volumeIcon: loudVolumeIcon,
  });

  function changeVolume(e) {
    setVolume({
      ...volume,
      currentVol: parseFloat(e.target.value),
      volumeIcon: 
        e.target.value < 0.01 
        ? noVolumeIcon
        : e.target.value < 0.5
        ? quietVolumeIcon
        : loudVolumeIcon
    })
  };

  function handleMute() {
    if (volume.currentVol > 0) {
      setVolume({
        ...volume,
        currentVol: 0,
        volumeIcon: noVolumeIcon,
      })
    } else {
      setVolume({
        ...volume,
        currentVol: 1,
        volumeIcon: loudVolumeIcon,
      })
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume.currentVol;
    }
  }, [volume.currentVol, audioRef]);

  useEffect(() => {
		if (isPlaying) {
			startTimer();
		} else {
			clearInterval(window.timeInterval);
		}
	}, [isPlaying]);

  function reset() {
    setIsPlaying(false);
    setCurrentPosition(0);
    setInputTime(120);
    setTiming(120);
    timerMin.innerHTML = '00';
    timerSec.innerHTML = '00';
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.removeAttribute('autoplay');
  };

  const [fade, setFade] = useState({
    opacity: 0.9,
    centerOpacity: 0.9,
    transition: '',
  });

  const fadeTransition = {
    opacity: fade.opacity,
    transition: fade.transition,
  };
  const partialFadeTransition = {
    opacity: fade.centerOpacity,
    transition: fade.transition,
  };

  function onmousemove() {
    setFade({
      ...fade,
      opacity: 0.9,
      centerOpacity: 0.9,
      transition: 'opacity 1s ease-out',
    });
    setTimeout(() => {
      if (isPlaying) {
        setFade({
          ...fade,
          opacity: 0,
          centerOpacity: 0.7,
          transition: 'opacity 13s ease-out',
        })
      }
    }, 3000)
  };

  const [counterHovered, setCounterHovered] = useState(false);
  const [selectHovered, setSelectHovered] = useState(false);

  function handleCounterHover() {
    setCounterHovered(!counterHovered);
  };
  function handleSelectHover() {
    setSelectHovered(!selectHovered);
  };

  return (
    <div className={styles.app} onMouseMove={onmousemove}>
    <div className={styles.overlay}></div>
    <BackgroundImg currentImg={sound.background} />

      <main className={styles.main}>
        <div className={styles.options}>
          <Counter 
            setDuration={(min) => {
              timeSelect({ duration: min * 60 })
            }}
            duration={Math.round(inputTime / 60)}
            min={1}
            max={60}
            style={!counterHovered ? fadeTransition : null}
            onMouseEnter={handleCounterHover}
            onMouseLeave={handleCounterHover}
          />
          <Dropdown 
            activeOption={activeSound}
            changeOption={(soundName) => {
              selectSound(soundName)
            }}
            style={!selectHovered ? fadeTransition : null}
            onMouseEnter={handleSelectHover}
            onMouseLeave={handleSelectHover}
          />
        </div>

        <div className={styles.middle}>
          <div className={styles.audioSeek} style={partialFadeTransition}>
            <CircularProgressbar
              value={currentPosition}
              strokeWidth={3}
              styles={buildStyles({
                pathColor: 'rgba(44, 207, 112, 0.9)',
                trailColor: 'rgba(255, 255, 255, 0.8)',
              })}
            />
            <div
              className={!isPlaying 
                ? `${styles.playPauseBtn} ${styles.pauseMode}`
                : `${styles.playPauseBtn} ${styles.playMode}`
              }
              alt='Play'
              onClick={playPause}
            >
            <img className={styles.pauseIcon} src={pauseBtn} alt='' />
            <img className={styles.playIcon} src={playBtn} alt='' />
            <audio loop 
              ref={audioRef} 
              src={sound.url}>
            </audio>
            </div>
          </div>

          <div className={styles.timerBox} style={partialFadeTransition}>
            <img 
              src={resetBtn}
              className={styles.resetBtn}
              alt='Reset'
              onClick={reset}
            />
            <div className={styles.timer}>
              <span id='timer-min'>
                00</span>
              <span>:</span>
              <span id='timer-sec'>
                00</span>
            </div>
          </div>
        </div>

        <div className={styles.volume} style={fadeTransition}>
          <img 
            className={styles.volumeIcon}
            src={volume.volumeIcon}
            onClick={handleMute}
            alt='Volume'
          />
          <div className={styles.slider}>
            <Slider 
              value={volume.currentVol}
              onChange={changeVolume}
            />
          </div>
        </div>

      </main>
      <footer style={fadeTransition}>
        <p className={styles.copyright}>Designed & developed by Kristina Rulina © 2023</p>
          <div>
            <a href='https://github.com/kris7ina/c00l-meditation-app' target='_blank'>
              <img className={styles.icon} src='/icons/iconmonstr-github-1.svg' />
            </a>
            <a href='https://www.behance.net/frenchdogblues' target='_blank'>
              <img className={styles.icon} src='/icons/iconmonstr-behance-4.svg' />
            </a>
            <a href='mailto:kristinarulina@gmail.com'>
              <img className={styles.icon} src='/icons/iconmonstr-email-10.svg' />
            </a>
          </div>
      </footer>
    </div>
  )
}
