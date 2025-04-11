let currentSound = null;

export const playSound = (src, volume = 0.8) => {
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }

  const audio = new Audio(src);
  audio.volume = volume;
  audio.play();
  currentSound = audio;
};
