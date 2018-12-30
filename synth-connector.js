// (very) inspired by https://devdocs.io/dom/web_audio_api/simple_synth

let noteFreq = [];
noteFreq["C"] = 32.703195662574829;
noteFreq["C#"] = 34.647828872109012;
noteFreq["D"] = 36.708095989675945;
noteFreq["D#"] = 38.890872965260113;
noteFreq["E"] = 41.203444614108741;
noteFreq["F"] = 43.653528929125485;
noteFreq["F#"] = 46.249302838954299;
noteFreq["G"] = 48.999429497718661;
noteFreq["G#"] = 51.913087197493142;
noteFreq["A"] = 55.000000000000000;
noteFreq["A#"] = 58.270470189761239;
noteFreq["B"] = 61.735412657015513;

let audioContext = new (window.AudioContext || window.webkitAudioContext);
let masterGainNode = audioContext.createGain();
masterGainNode.connect(audioContext.destination);
masterGainNode.gain.value = 1.0;

// custom waveform
sineTerms = new Float32Array([0, 0, 1, 0, 1]);
cosineTerms = new Float32Array(sineTerms.length);
customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);

var patches = [
  { type: 'sine' },
  { type: 'square' },
  { type: 'sawtooth' },
  { type: 'triangle' },
  { type: 'custom', apply: osc => osc.setPeriodicWave(customWaveform) },
];

var currentPatch = 2;

function playTone(freq, patch = patches[currentPatch]) {
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

let keyMapping = {
  z: "C", s: "C#",
  x: "D", d: "D#",
  c: "E",
  v: "F", g: "F#",
  b: "G", h: "G#",
  n: "A", j: "A#",
  m: "B"
}; // and use ',' to switch patches (sine / square / triangle...)

var pressedKeys = {};

function stopKeyTone(key) {
  pressedKeys[key] && pressedKeys[key].stop();
  delete pressedKeys[key];
}

window.addEventListener('keydown', function onkeydown(e){
  var note = keyMapping[e.key];
  if (note && !pressedKeys[e.key]) {
    pressedKeys[e.key] = playTone(noteFreq[note] * 3);
  } else {
    stopKeyTone(e.key);
  }
});

window.addEventListener('keyup', function onkeyup(e){
  if (e.key === ',') {
    currentPatch = (currentPatch + 1) % patches.length;
  } else {
    stopKeyTone(e.key);
  }
});
