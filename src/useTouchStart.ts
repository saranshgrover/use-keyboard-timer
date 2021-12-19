import { useState, useEffect } from 'react'

export default function useTouchStart(targetComponentID: string) {
	// State for keeping track of whether key is pressed
	const [touched, setTouched] = useState(false)

	function startHandler() {
		setTouched(true)
	}

	function endHandler() {
		setTouched(false)
	}

	// Add event listeners
	useEffect(() => {
		const targetComponent = document.getElementById(targetComponentID)!
		targetComponent.addEventListener('touchstart', startHandler)
		targetComponent.addEventListener('touchend', endHandler)
		// Remove event listeners on cleanup
		return () => {
			targetComponent.removeEventListener('touchstart', startHandler)
			targetComponent.removeEventListener('touchend', endHandler)
		}
	}, []) // Empty array ensures that effect is only run on mount and unmount

	return touched
}
