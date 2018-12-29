const halfKey = '<span class="nlk-half-key"></span>';

const renderKey = ({ note, className }) => `<input class="nlk-key ${className || ''}" value="${note || ''}" />`;

const renderNotes = ({ notes, values, className = '' }) => notes
  .map(note => renderKey({ note: values[note], className }))
  .join('\n');

const renderBlackNotes = ({ notes, values }) => notes
  .map(note => renderKey({ note: values[note], className: note ? 'nlk-black' : '' }))
  .join('\n');

const renderWhiteNotes = ({ notes, values }) => renderNotes({ notes, values, className: 'nlk-white' });

const renderHTML = state => ([
  '<h4>Pads</h4>',
  renderWhiteNotes({
    notes: [ 40, 41, 42, 43, 48, 49, 50, 51 ],
    values: state.padNotes
  }),
  renderWhiteNotes({
    notes: [ 36, 37, 38, 39, 44, 45, 46, 47 ],
    values: state.padNotes
  }),
  '<h4>Keys</h4>',
  halfKey + renderBlackNotes({
    notes: [ 49, 51, null, 54, 56, 58, null, 61, 63, null, 66, 68, 70 ],
    values: state.keyNotes
  }),
  renderWhiteNotes({
    notes: [ 48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72 ],
    values: state.keyNotes
  }),
]).join('<br/>\n');
