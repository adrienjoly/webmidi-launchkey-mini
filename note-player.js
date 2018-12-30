// Play tones and sounds when notes are triggered from a keyboard or MIDI input.

// exports:
let playParsedMidiMessage;

(function(){

  const synth = initSynth();

  const keyMapping = {
    // pads
    36: () => playSound('kick'),
    37: () => playSound('drysnare'),
    38: () => playSound('closedhihat'),
    39: () => playSound('openhihat'),
    // white and black keys
    48: () => synth.playNote('C'), 49: () => synth.playNote('C#'),
    50: () => synth.playNote('D'), 51: () => synth.playNote('D#'),
    52: () => synth.playNote('E'),
    53: () => synth.playNote('F'), 54: () => synth.playNote('F#'),
    55: () => synth.playNote('G'), 56: () => synth.playNote('G#'),
    57: () => synth.playNote('A'), 58: () => synth.playNote('A#'),
    59: () => synth.playNote('B'),
    // other commands
    107: () => synth.switchPatch(),
  };

  const pressedNotes = {};

  function stopNote(note) {
    const oscillator = pressedNotes[note] || {};
    if (oscillator.stop) pressedNotes[note].stop();
    delete pressedNotes[note];
  }

  function playNote(note) {
    console.log('playNote', note, keyMapping[note]);
    stopNote(note);
    if (keyMapping[note]) {
      pressedNotes[note] = keyMapping[note]();
    }
  }

  playParsedMidiMessage = function (parsedMidiMessage) {
    const keyUp = parsedMidiMessage.command === 8;
    if (keyUp) {
      stopNote(parsedMidiMessage.note);
    } else {
      playNote(parsedMidiMessage.note);
    }
  };
  
})();
