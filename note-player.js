// Play tones and sounds when notes are triggered from a keyboard or MIDI input.

function initNotePlayer({ audioContext, synth, soundGenerator }){

  const NOTES = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];

  const padMapping = {
    36: () => soundGenerator.playSound('kick'),
    37: () => soundGenerator.playSound('drysnare'),
    38: () => soundGenerator.playSound('closedhihat'),
    39: () => soundGenerator.playSound('openhihat'),
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
      const { oscillator, gainNode } = synth.playNote({ note: NOTES[noteIdx], octave, velocity });
      activeNotes[note] = oscillator;

      //////////////////////
      // 1. Create a scope and connect it to the source
      const scope = new Scope.ScopeSampler(audioContext);
      gainNode.connect(scope.getInput());

      // 2. Create a canvas renderer for the scope
      const canvas = document.querySelector('#osc1');
      const scopeVis = new Scope.ScopeRenderer(canvas);

      // 3. Create a draw batch targeting 10fps
      //    with a single draw instruction in the batch (1 per displayed scope)
      const drawBatch = new Scope.ScopeDrawBatch();
      drawBatch.add(() => scopeVis.draw(scope.sample()));

      // 5. Start the render
      drawBatch.start();
      //////////////////////////////////////////

    }
  }

  function playParsedMidiMessage({ command, note, channel, velocity }) {
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

  return {
    playParsedMidiMessage
  };
  
}
