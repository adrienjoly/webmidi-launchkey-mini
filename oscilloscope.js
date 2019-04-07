// Renders an oscilloscope from a GainNode, using the Scope dependency.

function initOscilloscope({ Scope, audioContext, canvas }){

  const scope = new Scope.ScopeSampler(audioContext);
  const input = scope.getInput();

  function connect(gainNode) {
    gainNode.connect(input);
    const scopeVis = new Scope.ScopeRenderer(canvas);
    // Create a draw batch targeting 10fps
    //    with a single draw instruction in the batch (1 per displayed scope)
    const drawBatch = new Scope.ScopeDrawBatch();
    drawBatch.add(() => scopeVis.draw(scope.sample()));
    drawBatch.start();
  }

  function disconnect(gainNode) {
    // TODO: drawBatch.stop() ?
    gainNode.disconnect(input);
  }

  return {
    connect,
    disconnect,
  };
}
