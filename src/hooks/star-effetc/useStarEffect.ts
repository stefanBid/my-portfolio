import { ref, onMounted, type StyleValue } from 'vue';

export function useStarEffect(numStars?: number) {
	const DEFAULT_STARS = 50;
	const stars = ref<Array<Record<string, string>>>([]);
	const starsContainerStyle: StyleValue = {
		position: 'absolute',
		top: '0',
		left: '0',
		zIndex: '10',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		borderRadius: '8px',
		pointerEvents: 'none',
	};

	// Generate stars with random styles
	const generateStars = () => {
		const newNumStars = numStars || DEFAULT_STARS;
		stars.value = Array.from({ length: newNumStars }, () => {
			const width = `${Math.random() * 3 + 1}px`;
			const height = width;
			const top = `${Math.random() * 100}%`;
			const left = `${Math.random() * 100}%`;
			const duration = `${Math.random() * 3 + 2}s`; // Durata casuale per l'animazione

			// Oggetto di stile completo con animazione
			return {
				width,
				height,
				top,
				left,
				position: 'absolute',
				'background-color': 'rgba(255, 255, 255, 0.9)',
				'border-radius': '50%',
				'box-shadow': '0px 0px 10px rgba(255, 255, 255, 0.5)',
				opacity: '0.9',
				animation: `star-pulse ${duration} infinite ease-in-out`,
			};
		});
	};

	// Use onMounted to generate stars
	onMounted(() => {
		generateStars();
	});

	return { stars, starsContainerStyle };
}
