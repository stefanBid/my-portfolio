import { ref, onMounted } from 'vue';

export function useStarEffect(numStars?: number) {
	const DEFAULT_STARS = 50;
	const stars = ref<Array<Record<string, string>>>([]);

	// Funzione per aggiungere dinamicamente i keyframes nel DOM
	const addKeyframes = () => {
		const styleSheet = document.styleSheets[0];
		const keyframes = `
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.9; }
        50% { transform: scale(1.5); opacity: 0.4; }
        100% { transform: scale(1); opacity: 0.9; }
      }
    `;

		// Usa solo insertRule, poiché addRule è deprecato
		styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
	};

	// Funzione per generare le stelle con gli stili
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
				animation: `pulse ${duration} infinite ease-in-out`,
			};
		});
	};

	// Usa onMounted per eseguire le funzioni al montaggio del DOM
	onMounted(() => {
		addKeyframes(); // Aggiunge i keyframes al montaggio
		generateStars(); // Genera le stelle al montaggio
	});

	return { stars };
}
