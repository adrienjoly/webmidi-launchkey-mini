function initKeyboardRenderer() {

  const halfKey = '<span class="nlk-half-key"></span>';

  const renderKey = ({ note = '', className = '', hotkey = '' }) =>
    `<input class="nlk-key ${className}" value="${note}" placeholder="${hotkey}" />`;

  const renderNotes = ({ notes = [], values = {}, hotkeys = [], className = '' }) => notes
    .map((note, i) => renderKey({
      note: values[note],
      hotkey: hotkeys[i] || '',
      className: note ? className : ''
    }))
    .join('\n');

  const renderWhiteNotes = ({ ...props }) => renderNotes({ ...props, className: 'nlk-white' });

  const renderBlackNotes = ({ ...props }) => renderNotes({ ...props, className: 'nlk-black' });

  const renderBinKey = ({ ...props }) => renderKey({ ...props, className: 'nlk-white' });

  const renderHTML = state => ([
    /*
    '<h4>Knobs</h4>',
    halfKey + halfKey + halfKey + renderWhiteNotes({
      notes: [ 21, 22, 23, 24, 25, 26, 27, 28 ],
      values: state.knobs
    }),
    */
    '<h4>Pads</h4>',
    renderBinKey({ note: state.trackPrev ? '<' : '', hotkey: '[' }) + halfKey + renderWhiteNotes({
      notes: [ 40, 41, 42, 43, 48, 49, 50, 51 ],
      values: state.padNotes
    }) + halfKey + renderBinKey({ note: state.playTop ? '▶' : '' }) + halfKey + renderBinKey({ note: state.scenePrev ? '⬆' : '' }),
    renderBinKey({ note: state.trackNext ? '>' : '', hotkey: ']' }) + halfKey + renderWhiteNotes({
      notes: [ 36, 37, 38, 39, 44, 45, 46, 47 ],
      hotkeys: [ 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p' ],
      values: state.padNotes
    }) + halfKey + renderBinKey({ note: state.playBottom ? '▶' : '' }) + halfKey + renderBinKey({ note: state.sceneNext ? '⬇' : '' }),
    '<h4>Keys</h4>',
    halfKey + renderBlackNotes({
      notes: [ 49, 51, null, 54, 56, 58, null, 61, 63, null, 66, 68, 70 ],
      hotkeys: [ 's', 'd', null, 'g', 'h', 'j', null, 'l', ';' ],
      values: state.keyNotes
    }),
    renderWhiteNotes({
      notes: [ 48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72 ],
      hotkeys: [ 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/' ],
      values: state.keyNotes
    }),
  ]).join('<br/>\n');

  return {
    renderHTML,
  };

}
