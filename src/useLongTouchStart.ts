import { useState, useEffect } from 'react'
import useTouchStart from './useTouchStart'

export default function useLongKeyPress(ms: number, targetComponentID: string) {
	const pressed = useTouchStart(targetComponentID)
	const [longPressed, setLongPressed] = useState(false)
	useEffect(() => {
		if (pressed && ms > 0) {
			const timeout = setTimeout(() => pressed && setLongPressed(true), ms)
			return () => clearTimeout(timeout)
		}
		if (!pressed) {
            setLongPressed(false)
        }
        return
	}, [pressed, ms])
	return ms > 0 ? longPressed : pressed
}
