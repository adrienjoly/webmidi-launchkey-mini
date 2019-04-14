function initLaunchkeyState() {

  var state = {
    knobs: {}, // Map knob (integer, 21-28) -> level (integer, 0-127)
    keyNotes: {}, // Map of note (integer, 0-127) -> velocity (integer, 0-127)
    padNotes: {}, // Map of note (integer, 36-51) -> velocity (integer, 0-127)
    playTop: false,
    playBottom: false,
    scenePrev: false,
    sceneNext: false,
    trackPrev: false,
    trackNext: false,
  };

  var buttonNames = {
    104: 'scenePrev',
    105: 'sceneNext',
    106: 'trackPrev',
    107: 'trackNext',
    108: 'playTop',
    109: 'playBottom',
  };

  function mutateFromParsedMidiMessage(parsedMidiMessage) {
    var padChannel = 10;
    var prop = parsedMidiMessage.channel === padChannel ? 'padNotes' : 'keyNotes';
    switch(parsedMidiMessage.command) {
      case 9: // key down
        state[prop][parsedMidiMessage.note] = parsedMidiMessage.velocity;
        break;
      case 8: // key up
        delete state[prop][parsedMidiMessage.note];
        break;
      case 11: // other button
        if (parsedMidiMessage.note >= 104) {
          var buttonName = buttonNames[parsedMidiMessage.note];
          state[buttonName] = !!parsedMidiMessage.velocity;
        } else {
          state.knobs[parsedMidiMessage.note] = parsedMidiMessage.velocity;
        }
        break;
    }
    return state;
  }

  return {
    mutateFromParsedMidiMessage,
  };
}
