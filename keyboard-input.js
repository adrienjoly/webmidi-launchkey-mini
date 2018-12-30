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

function listenToKeyboardMessages(handler) {

  function emit(message) {
    setTimeout(handler.bind(null, message), 0);
  }

  const keyNotes = {
    // pads
    q: 36,
    w: 37,
    e: 38,
    r: 39,
    t: 44,
    y: 45,
    u: 46,
    i: 47,
    // white keys + black keys
    z: 48, s: 49,
    x: 50, d: 51,
    c: 52,
    v: 53, g: 54,
    b: 55, h: 56,
    n: 57, j: 58,
    m: 59,
  }

  function getKeyNote(key) {
    return keyNotes[key];
  }

  function handleKeyboardEvent(e) {
    const keyUp = e.type === 'keyup';
    const note = getKeyNote(e.key);
    if (note) {
      if (keyUp) {
        stopKeyTone(e.key);
      } else {
        playKeyTone(e.key);
      }
      emit({
        channel: note < 48 ? 10 : 1,
        command: keyUp ? 8 : 9,
        note,
        velocity: keyUp ? 0 : 64,
      });
    } else if (keyUp && e.key === ',') {
      switchPatch();
    }
  }

  window.addEventListener('keydown', handleKeyboardEvent);
  window.addEventListener('keyup', handleKeyboardEvent);
    
}
