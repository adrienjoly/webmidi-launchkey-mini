// Generic MIDI message reader

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
        input.onmidimessage = emit.bind(null);
      }
    }, function onMIDIFailure() {
      emit({
        error: 'Could not access your MIDI devices.'
      });
    });
}
