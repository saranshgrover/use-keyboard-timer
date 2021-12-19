import { useState, useEffect } from 'react'

export default function useKeyPress(targetKey: string, targetComponentID: string) {
	// State for keeping track of whether key is pressed
	const [keyPressed, setKeyPressed] = useState(false)

	// If pressed key is our target key then set to true
	function downHandler({ key }: { key: string }) {
		if (key === targetKey) {
			setKeyPressed(true)
		}
	}

	// If released key is our target key then set to false
	const upHandler = ({ key }: { key: string }) => {
		if (key === targetKey) {
			setKeyPressed(false)
		}
	}

	// Add event listeners
	useEffect(() => {
		const targetComponent = document.getElementById(targetComponentID)!
		targetComponent.addEventListener('keydown', downHandler)
		targetComponent.addEventListener('keyup', upHandler)
		// Remove event listeners on cleanup
		return () => {
			targetComponent.removeEventListener('keydown', downHandler)
			targetComponent.removeEventListener('keyup', upHandler)
		}
	}, []) // Empty array ensures that effect is only run on mount and unmount

	return keyPressed
}
