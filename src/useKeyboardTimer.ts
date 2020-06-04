import { useEffect, useState, useRef } from 'react';
import useLongKeyPress from './useLongKeyPress';
import useKeyPress from './useKeyPress';

/**
 *  @typedef NONE: Nothing is happening. This only happens when the timer is reset and/or when the hook is called for the first time
 *  @typedef INSPECTION: We are currently in inspection state
 *  @typedef SPACE_PRESSED_TIMING: The spacebar has been pressed, but is not yet valid for beginning.
 *  @typedef SPACE_PRESSED_VALID: The spacebar has been pressed and is valid to begin the time
 *  @typedef STARTED: The timer is running. The time will be available in the `time` variable.
 *  @typedef STOPPED: Timer has been stopped. The final time is available in the `time` variable. Note that users can start a new solve immediately
 *  @typedef PAUSED: A timer can be paused by calling the `pause()` function. When paused, times cannot begin. This may be useful when you want to open a modal, and dont want the timer running in the background. You can unpause by calling the `unpause()` function, which reverts back to `NONE` state.
 */
type TimerState =
  | 'NONE'
  | 'INSPECTION'
  | 'INSPECTION_PENALTY'
  | 'SPACE_PRESSED_TIMING'
  | 'SPACE_PRESSED_VALID'
  | 'SPACE_PRESSED_INSPECTION'
  | 'STARTED'
  | 'STOPPED'
  | 'PAUSED';

/**
 * The useKeyboardTimer hook handles timing a solve.
 * @returns an instance of KeyboardReturn containing the time, the current state `TimerState` and isRunning `boolean`
 * @param settings Instance of Timer Settings for the user
 *
 */
export default function useKeyboardTimer(settings: Timer.TimerSettings) {
  {
  }
  const timeToHold = (timeToRelease: Timer.timeToRelease) => {
    switch (timeToRelease) {
      case 'stackmat':
        return 300;
      case 'none':
        return 0;
      default:
        return 300;
    }
  };
  const getTimerUpdate = (timerUpdate: Timer.timerUpdate) => {
    if (typeof timerUpdate === 'number') return timerUpdate;
    switch (timerUpdate) {
      case 'centiseconds':
        return 10;
      case 'milliseconds':
        return 1;
      case 'seconds':
        return 1000;
      case 'deciseconds':
        return 100;
      default:
        return 1000;
    }
  };
  const [time, setTime] = useState<null | number>(null);
  const startRef = useRef(-1);
  const plusTwo = useRef(false);
  const dnf = useRef(false);
  const [isTiming, setIsTiming] = useState(false);
  const [state, setState] = useState<TimerState>('NONE');
  const intervalRef = useRef<null | NodeJS.Timeout>(null);
  const [inspectionTime, setInspectionTime] = useState(16);
  const inspectionTimeRef = useRef<number>(inspectionTime);
  inspectionTimeRef.current = inspectionTime;
  const spacebarPressed = useKeyPress(' ');
  const spacebarLongPressed = useLongKeyPress(
    ' ',
    timeToHold(settings.timeToRelease)
  );
  const msUpdate = getTimerUpdate(settings.timerUpdate);
  useEffect(() => {
    const inspection = settings.inspection === 'always';
    switch (state) {
      case 'NONE':
        if (spacebarPressed && inspection) {
          setState('SPACE_PRESSED_INSPECTION');
        } else if (spacebarPressed) {
          setState('SPACE_PRESSED_TIMING');
        } else if (spacebarLongPressed) {
          setState('SPACE_PRESSED_VALID');
        }
        break;
      case 'SPACE_PRESSED_INSPECTION':
        !spacebarPressed && startInspection();
        break;
      case 'INSPECTION':
        if (spacebarPressed) {
          setState('SPACE_PRESSED_TIMING');
        }
        break;
      case 'STOPPED':
        if (!spacebarPressed) setState('NONE');
        break;
      case 'SPACE_PRESSED_TIMING':
        if (spacebarLongPressed) setState('SPACE_PRESSED_VALID');
        if (!spacebarPressed) setState('INSPECTION');
        break;
      case 'SPACE_PRESSED_VALID':
        console.log(spacebarPressed);
        if (!spacebarPressed && !dnf.current) {
          startTimer();
        } else if (!spacebarPressed) {
          setState('NONE');
        }
        break;
      case 'STARTED':
        if (spacebarPressed) {
          stopTimer();
        }
        break;
    }
  }, [state, spacebarLongPressed, spacebarPressed, dnf.current]);

  function stopTimer() {
    let time = Date.now() - startRef.current;
    if (plusTwo.current) time += 2000;
    else if (dnf.current) time = -1;
    setState('STOPPED');
    setIsTiming(false);
    setTime(time);
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function startTimer() {
    setIsTiming(true);
    setState('STARTED');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    startRef.current = Date.now();
    setTime(0);
    if (settings.timerUpdate !== 'none') {
      const interval = setInterval(() => tickTimer(), msUpdate);
      intervalRef.current = interval;
    }
  }

  function tickTimer() {
    setTime(Date.now() - startRef.current);
  }

  function startInspection() {
    setState('INSPECTION');
    setInspectionTime(15);
    const interval = setInterval(() => tickInspection(), 1000);
    intervalRef.current = interval;
  }
  function tickInspection() {
    if (inspectionTimeRef.current > -2) {
      if (inspectionTimeRef.current <= 0 && plusTwo.current !== true)
        plusTwo.current = true;
      setInspectionTime(inspectionTimeRef.current - 1);
    } else {
      setTime(-1);
      setState('STOPPED');
      dnf.current = true;
      setInspectionTime(-1);
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    }
  }

  const pause = () => setState('PAUSED');
  const unpause = () => setState('NONE');

  return {
    time,
    isTiming,
    state,
    inspectionTime,
    pause,
    unpause,
    dnf: dnf.current,
    plusTwo: dnf.current,
  };
}
