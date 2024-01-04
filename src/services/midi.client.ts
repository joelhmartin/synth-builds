

export default class MidiController {
  constructor() {
    this.initMIDI();
  }

  initMIDI() {
    navigator.requestMIDIAccess()
      .then((midiAccess) => {
        this.setupMIDIListeners(midiAccess);
      })
      .catch((error) => {
        console.error('MIDI access denied or not supported:', error);
      });
  }

  setupMIDIListeners(midiAccess: MIDIAccess) {
    const inputDevice = midiAccess.inputs.values().next().value;

    if (inputDevice) {
      inputDevice.onmidimessage = this.handleMIDIMessage;

      midiAccess.onstatechange = (event: Event) => {
        const midiConnectionEvent = event as MIDIConnectionEvent;

        if (midiConnectionEvent.port.type === 'input') {
          if (midiConnectionEvent.port.state === 'connected') {
            console.log('MIDI input device connected:', midiConnectionEvent.port.name);
          } else if (midiConnectionEvent.port.state === 'disconnected') {
            console.log('MIDI input device disconnected:', midiConnectionEvent.port.name);
          }
        }
      };

      console.log('MIDI initialized');
    } else {
      console.error('No MIDI input devices available.');
    }
  }

  handleMIDIMessage(message: MIDIMessageEvent) {
    const [command, note, velocity] = message.data;

    // Example: Log note on/off events
    if (command === 144) {
      console.log('Note On:', note, 'Velocity:', velocity);
    } else if (command === 128) {
      console.log('Note Off:', note, 'Velocity:', velocity);
    }
  }
}
