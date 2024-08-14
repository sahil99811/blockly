export const speakInstructions = (route) => {
    const instructions = route.instructions;
    if (instructions.length > 0) {
      const text = `Next turn: ${instructions[0].text}. In ${(instructions[0].distance / 1000).toFixed(2)} kilometers.`;
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };