// Play tones and sounds when notes are triggered from a keyboard or MIDI input.

// exports:
let playParsedMidiMessage;

(function(){

  const synth = initSynth();

  const NOTES = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];

  const padMapping = {
    36: () => playSound('kick'),
    37: () => playSound('drysnare'),
    38: () => playSound('closedhihat'),
    39: () => playSound('openhihat'),
  };

  const commandMapping = {
    107: () => synth.switchPatch(),
  };

  const activeNotes = {};

  function stopNote({ note, channel }) {
    const oscillator = activeNotes[note] || {};
    if (oscillator.stop) {
      activeNotes[note].stop();
      delete activeNotes[note];
    }
  }

  function playNote({ note, channel, velocity }) {
    console.log('playNote', { note, channel, velocity });
    if (channel === 10) {
      padMapping[note]({ velocity });
    } else {
      // white and black keys
      stopNote({ note, channel });
      const octave = Math.floor(note / 12);
      const noteIdx = note % 12;
      activeNotes[note] = synth.playNote({ note: NOTES[noteIdx], octave, velocity });
    }
  }

  playParsedMidiMessage = function ({ command, note, channel, velocity }) {
    const commandKey = command === 11;
    const keyUp = command === 8;
    if (commandKey) {
      commandMapping[note]();
    } else if (keyUp) {
      stopNote({ note, channel });
    } else {
      playNote({ note, channel, velocity });
    }
  };
  
})();
