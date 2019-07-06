// Polyphonic Synth Tone generator based on WebAudio
// (very) inspired by https://devdocs.io/dom/web_audio_api/simple_synth

function initSynth({ audioContext, onPatchChange }){

  const NOTES = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];

  function makePulseWaveform ({ dutyCycle }) {
    // from https://mitxela.com/projects/swotgb/about
    const real = new Float32Array(512);
    const imag = new Float32Array(512); // defaults to zeros
    for (var n = 1; n < 512; n++) {
      real[n] = 2 * Math.sin(Math.PI * n * dutyCycle) / (Math.PI * n)
    }
    return audioContext.createPeriodicWave(real, imag);
  }
  
  var patches = [
    {
      name: 'pulse (12.5%)',
      type: 'custom',
      apply: osc => osc.setPeriodicWave(makePulseWaveform({ dutyCycle: 0.125 }))
    },
    {
      name: 'pulse (25%)',
      type: 'custom',
      apply: osc => osc.setPeriodicWave(makePulseWaveform({ dutyCycle: 0.25 }))
    },
    {
      name: 'pulse (50%)',
      type: 'square'
    },
    {
      name: 'pulse (75%)',
      type: 'custom',
      apply: osc => osc.setPeriodicWave(makePulseWaveform({ dutyCycle: 0.75 }))
    },
    {
      name: 'triangle',
      type: 'triangle'
    },
    { type: 'sine' },
    { type: 'sawtooth' },
  ];
  
  var currentPatch = 0;

  function switchPatch(incr = 1) {
    currentPatch = (patches.length + currentPatch + incr) % patches.length;
    console.log(currentPatch);
    onPatchChange && onPatchChange(patches[currentPatch]);
  }

  onPatchChange && onPatchChange(patches[currentPatch]);
  
  function playTone({ freq, velocity }, patch = patches[currentPatch]) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    // TODO: disconnect when we stop playing that note
    // masterGainNode.gain.value = 1.0;
    gainNode.gain.value = velocity / 127;
    oscillator.connect(gainNode);
    if (patch.apply) {
      patch.apply(oscillator);
    } else {
      oscillator.type = patch.type;
    }
    oscillator.frequency.value = freq;
    oscillator.start();
    return {
      oscillator,
      gainNode,
    };
  }

  function playNote({ note, octave, velocity }, patch) {
    console.log('synth.playNote', { note, octave, velocity });
    const freq = 440 * Math.pow(Math.pow(2, 1 / 12), ((octave - 4) * 12) + NOTES.indexOf(note));
    return playTone({ freq, velocity }, patch);
  }

  return {
    playTone,
    playNote,
    switchPatch,
  };
}
