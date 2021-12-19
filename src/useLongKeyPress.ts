import { useState, useEffect } from 'react';
import useKeyPress from './useKeyPress';

export default function useLongKeyPress(key: string, ms: number, targetComponentID: string) {
  const pressed = useKeyPress(key, targetComponentID);
  const [longPressed, setLongPressed] = useState(false);
  useEffect(() => {
    if (pressed && ms > 0) {
      const timeout = setTimeout(() => pressed && setLongPressed(true), ms);
      return () => clearTimeout(timeout);
    }
    if (!pressed) {
      setLongPressed(false);
      return;
    }
    return;
  }, [pressed]);
  return ms > 0 ? longPressed : pressed;
}
