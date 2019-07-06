// Generates pseudo-MIDI messages from the computer's keyboard.

function initKeyboardInput() {

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
      ',': 60, 'l': 61,
      '.': 62, ';': 63,
      '/': 64,
    };

    const keyCommands = {
      '[': 106, // trackPrev
      ']': 107, // trackNext
    }

    function getKeyNote(key) {
      return keyNotes[key];
    }

    function getKeyCommand(key) {
      return keyCommands[key];
    }

    function handleKeyboardEvent(e) {
      const keyUp = e.type === 'keyup';
      const note = getKeyNote(e.key);
      if (note) {
        // send a "pad" or "keyboard" event (note)
        emit({
          channel: note < 48 ? 10 : 1,
          command: keyUp ? 8 : 9,
          note,
          velocity: keyUp ? 0 : 64,
        });
      } else {
        // send a "command" event (e.g. prev/next controllers)
        emit({
          command: 11,
          note: getKeyCommand(e.key),
          velocity: keyUp ? 0 : 64,
        });
      }
    }

    window.addEventListener('keydown', e => !e.repeat && handleKeyboardEvent(e));
    window.addEventListener('keyup', handleKeyboardEvent);
  }

  return {
    onKeyEvents: listenToKeyboardMessages,
  };

}
