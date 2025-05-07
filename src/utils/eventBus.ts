
/**
 * Simple event bus for component communication
 */
export const dispatchMusicToggleEvent = (playing: boolean) => {
  const event = new CustomEvent('musicToggled', { 
    detail: { playing } 
  });
  window.dispatchEvent(event);
};
