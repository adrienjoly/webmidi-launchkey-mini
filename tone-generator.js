var keyToPitch = { "z":"C3", "s":"C#3", "x":"D3", "d":"D#3", "c":"E3", "v":"F3", "g":"F#3", "b":"G3", "h":"G#3", "n":"A3", "j":"A#3", "m":"B3", ",":"C4" }

var synth = new Tone.PolySynth(6, Tone.Synth, {
  "oscillator" : {
    "type": "sawtooth",
    "partials" : [0, 2, 3, 4],
  }
}).toMaster();

window.addEventListener('keydown', function onkeydown(e){
  Tone.context.resume().then(() => {
    synth.triggerAttack(keyToPitch[e.key], Tone.context.currentTime)
  });
});

window.addEventListener('keyup', function onkeyup(e){
  Tone.context.resume().then(() => {
    synth.triggerRelease(keyToPitch[e.key])
  });
});
