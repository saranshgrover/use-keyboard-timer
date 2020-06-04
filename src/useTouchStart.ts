import { useState, useEffect } from 'react'

export default function useTouchStart() {
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
		window.addEventListener('touchstart', startHandler)
		window.addEventListener('touchend', endHandler)
		// Remove event listeners on cleanup
		return () => {
			window.removeEventListener('touchstart', startHandler)
			window.removeEventListener('touchend', endHandler)
		}
	}, []) // Empty array ensures that effect is only run on mount and unmount

	return touched
}
