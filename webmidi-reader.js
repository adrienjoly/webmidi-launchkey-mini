// Generic MIDI message reader

function initWebMidiReader() {

  // Turns a generic MIDI message into { timeStamp, channel, command, note, velocity }
  function parseMidiMessage(midiMessage) {
    var data = midiMessage.data
    var channel = (data[0] & 0xf) + 1;
    var command = data[0] >> 4;
    // cf _parseChannelEvent() from https://github.com/djipco/webmidi/blob/master/src/webmidi.js
    return {
      timeStamp: midiMessage.timeStamp,
      channel,
      command,
      note: data[1],
      velocity: data[2]
    };
  }

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

  return {
    parseMidiMessage,
    onMidiMessage: listenToMidiMessages,
  };

}
