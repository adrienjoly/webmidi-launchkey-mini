// Generic MIDI message reader

let setPadColor;

function listenToMidiMessages(handler) {

  function emit(message) {
    setTimeout(handler.bind(null, message), 0);
  }

  if (!navigator.requestMIDIAccess) {
    emit({
      error: 'Could not access your MIDI devices.'
    });
    return;
  }

  navigator.requestMIDIAccess()
    .then(function onMIDISuccess(midiAccess) {
      // attach message handler to all MIDI inputs
      for (var input of midiAccess.inputs.values()) {
        console.log('listen', input)
        input.onmidimessage = emit.bind(null);
        break; // skip the second MIDI input because it's noisy when InControl is active
      }
      var output;
      for (var entry of midiAccess.outputs) {
        output = entry[1];
      }
      console.log('output', output);
      setPadColor = function(green = 3, red = 4) {
        console.log('setPadColor', output);
        output.open().then(function(){
          console.log('open', output);
          output.send([0x90, 0x0C, 0x7F]); // prepare: activate InControl
          // output.send([0x9F, 36, 15]);
          setTimeout(() => {
            console.log('send');
            // output.send([145, i, 1]);
            // output.send([159, i, 1]);
            // output.send([191, i, 1]);
            /*
            for (var i = 0; i < 127; i++) {
              output.send([0x9F, i, i]);
            }
            */
            //output.send([0x9F, 96, 15]);
          }, 1000);
        });
        /*
        //output.send([0x90, 0x0C, 0x7F]); // prepare: activate InControl
          //for(var i = 36; i < 52; i++){
          //console.log('setPadColor', i);
          // lightOutput.send([159, i, 3]);
          // (green << 4) + red
          //output.send([159, 36, 2]);  //omitting the timestamp means send immediately.
          //output.send([191, 104, 3]);  //omitting the timestamp means send immediately.
          //output.send([191, 112, 1]);  //omitting the timestamp means send immediately.
          var i = 0;
          //setInterval(() => {
            console.log(i);
            output.send([0x9F, 0x24, 0x01]);  //omitting the timestamp means send immediately.
            //output.send([145, 40, i]);  //omitting the timestamp means send immediately.
            i++;
          //}, 1000);
          //lightOutput.send([159, 1, 3], window.performance.now() + 4000.0);
        //}
        */
      };
    }, function onMIDIFailure() {
      emit({
        error: 'Could not access your MIDI devices.'
      });
    });
}
