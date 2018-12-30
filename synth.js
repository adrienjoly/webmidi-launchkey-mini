// Polyphonic Synth Tone generator based on WebAudio
// (very) inspired by https://devdocs.io/dom/web_audio_api/simple_synth

function initSynth(){
  
  const noteFreq = {
    'C' : 32.703195662574829,
    'C#': 34.647828872109012,
    'D' : 36.708095989675945,
    'D#': 38.890872965260113,
    'E' : 41.203444614108741,
    'F' : 43.653528929125485,
    'F#': 46.249302838954299,
    'G' : 48.999429497718661,
    'G#': 51.913087197493142,
    'A' : 55.000000000000000,
    'A#': 58.270470189761239,
    'B' : 61.735412657015513,
  };
  
  const audioContext = new (window.AudioContext || window.webkitAudioContext);
  let masterGainNode = audioContext.createGain();
  masterGainNode.connect(audioContext.destination);
  masterGainNode.gain.value = 1.0;
  
  function makeCustomWaveform() {
    const sineTerms = new Float32Array([0, 0, 1, 0, 1]);
    const cosineTerms = new Float32Array(sineTerms.length);
    return audioContext.createPeriodicWave(cosineTerms, sineTerms);
  }
  
  var patches = [
    { type: 'sine' },
    { type: 'square' },
    { type: 'sawtooth' },
    { type: 'triangle' },
    { type: 'custom', apply: osc => osc.setPeriodicWave(makeCustomWaveform()) },
  ];
  
  var currentPatch = 2;

  function switchPatch() {
    // console.log('switchPatch', ...arguments);
    currentPatch = (currentPatch + 1) % patches.length;
  }
  
  function playTone(freq, patch = patches[currentPatch]) {
    // console.log('playTone', ...arguments);
    const osc = audioContext.createOscillator();
    osc.connect(masterGainNode);
    if (patch.apply) {
      patch.apply(osc);
    } else {
      osc.type = patch.type;
    }
    osc.frequency.value = freq;
    osc.start();
    return osc;
  }

  function playNote(note, patch = patches[currentPatch]) {
    // console.log('playNote', ...arguments);
    return playTone(noteFreq[note] * 3);
  }

  return {
    playTone,
    playNote,
    switchPatch,
  };
}
