var keyToPitch = { "z":"C3", "s":"C#3", "x":"D3", "d":"D#3", "c":"E3", "v":"F3", "g":"F#3", "b":"G3", "h":"G#3", "n":"A3", "j":"A#3", "m":"B3", ",":"C4" }

var synth = new Tone.PolySynth(6, Tone.Synth, {
  "oscillator" : {
    "type": "sawtooth",
    "partials" : [0, 2, 3, 4],
  }
}).toMaster();

window.addEventListener('keydown', this.onkeydown)
window.addEventListener('keyup', this.onkeyup)

function onkeydown(e){
  Tone.context.resume().then(() => {
    synth.triggerAttack(keyToPitch[e.key], Tone.context.currentTime)
  });
}

function onkeyup(e){
  Tone.context.resume().then(() => {
    synth.triggerRelease(keyToPitch[e.key])
  });
}

// TODO: play sounds from sfxr

/*
<script src="https://chr15m.github.io/jsfxr/riffwave.js"></script> <!-- imports RIFFWAVE -->
<script src="https://chr15m.github.io/jsfxr/sfxr.js"></script> <!-- imports SoundEffect -->
var s = new SoundEffect("5EoyNVSymuxD8s7HP1ixqdaCn5uVGEgwQ3kJBR7bSoApFQzm7E4zZPW2EcXm3jmNdTtTPeDuvwjY8z4exqaXz3NGBHRKBx3igYfBBMRBxDALhBSvzkF6VE2Pv").generate();
s.getAudio().play();
*/
