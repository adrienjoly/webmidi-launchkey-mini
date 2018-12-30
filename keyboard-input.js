const keyMapping = {
  // pads
  q: () => playSound('kick'),
  w: () => playSound('drysnare'),
  e: () => playSound('closedhihat'),
  r: () => playSound('openhihat'),
  // notes
  z: () => playNote('C'), s: () => playNote('C#'),
  x: () => playNote('D'), d: () => playNote('D#'),
  c: () => playNote('E'),
  v: () => playNote('F'), g: () => playNote('F#'),
  b: () => playNote('G'), h: () => playNote('G#'),
  n: () => playNote('A'), j: () => playNote('A#'),
  m: () => playNote('B')
}; // and use ',' to switch patches (sine / square / triangle...)

const pressedKeys = {};

function stopKeyTone(key) {
  const oscillator = pressedKeys[key] || {};
  if (oscillator.stop) pressedKeys[key].stop();
  delete pressedKeys[key];
}

function playKeyTone(key) {
  stopKeyTone(key);
  if (keyMapping[key]) {
    pressedKeys[key] = keyMapping[key]();
  }
}

window.addEventListener('keydown', function onkeydown(e){
  playKeyTone(e.key);
});

window.addEventListener('keyup', function onkeyup(e){
  if (e.key === ',') {
    switchPatch();
  } else {
    stopKeyTone(e.key);
  }
});
