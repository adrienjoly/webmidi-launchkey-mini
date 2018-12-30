// Play sounds made with sfxr

// exports:
let playSound; // function
const sounds = {
  // the following sounds were generated from http://sfxr.me/#xxx
  note: '57uBnWaZnX5epkVRTRaKisqumxSookAZAcRFh3i3o7wm3JihoMFMH6E9MobUXRBPKTWCpUGBBaFre7xWzyn6uNWDGqg7gu5vUzuaP5E9eNMWiD97wag55V6XZ', 
  kick: '111117LEZmtz2FicvrRJo7kHyFWCJUwQRPcF6KnwugJNUG1K4RLC9ykcRZ3Kpmz9SZLkm2QFfbUXBeUVUJM6A64RW3KqiFACpgMTCCfShw6ULRmNJxC5Gzhu',
  hisnare: '7BMHBGKuAPaGvBx3ZmAMuDhzbB2WoFLXeZtD5z3Mmua4AjCyyiwkK3P3ThNpvKivDcSRSwcArme3n1F55tXFjPhmG4tWU4S5CvdD8rnWuKJBg5qPTkBHKLtHV',
  drysnare: '7BMHBGHtQBNHMkrpKTFy7cNBjZbgFpyZUvbv8X8fogVzVC9t8rHtuLK1vyDgC9JRZkPicMw6bWZs5a4xDexdVuD8DgT9gZr7kSaw2D2XfLiUG824x65Fj7XXm',
  closedhihat: '7BMHBGDUkor33zEmej7ksLPmQHehCsDu3PLjaC5Pc6BBNwpvsrALSo6kmPuPmbr3EooLJnZ1CeKTSrBESJmPKJcZuBWY7qPcGaij8cHDpJxXvtMqQZjjcCx4n',
  openhihat: '7BMHBGCKUHWg6FXnLvD3feX5FqDihbrYi56j7QDqJifRW85f7xH49eo94EwBUEAC3jbTMee5rMHva53ES76LqcVNfNXUJFQixERhcZpVPqYKY2sorYHtaPDxz',
};

(function(){
  
  const cachedSounds = {}; // lazy-loaded
  
  function cacheSound(soundId) {
    return cachedSounds[soundId] = new SoundEffect(sounds[soundId]).generate().getAudio();
  }
  
  playSound = function (soundId) {
    return (cachedSounds[soundId] || cacheSound(soundId)).play();
  }

})();
