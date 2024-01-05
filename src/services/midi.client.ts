export default class MidiController {
  public note: { note: number; velocity: number } = { note: -1, velocity: -1 };

  constructor() {
    this.initMIDI();
    this.note;
  }

  initMIDI() {
    navigator
      .requestMIDIAccess()
      .then((midiAccess) => {
        this.setupMIDIListeners(midiAccess);
      })
      .catch((error) => {
        console.error("MIDI access denied or not supported:", error);
      });
  }

  setupMIDIListeners(midiAccess: MIDIAccess) {
    const inputDevice = midiAccess.inputs.values().next().value;
  
    if (inputDevice) {
      inputDevice.onmidimessage = (message: MIDIMessageEvent) => this.handleMIDIMessage(message);
  
      midiAccess.onstatechange = (event: Event) => {
        const midiConnectionEvent = event as MIDIConnectionEvent;
  
        if (midiConnectionEvent.port.type === "input") {
          if (midiConnectionEvent.port.state === "connected") {
            console.log(
              "MIDI input device connected:",
              midiConnectionEvent.port.name
            );
          } else if (midiConnectionEvent.port.state === "disconnected") {
            console.log(
              "MIDI input device disconnected:",
              midiConnectionEvent.port.name
            );
          }
        }
      };
  
      console.log("MIDI initialized");
    } else {
      console.error("No MIDI input devices available.");
    }
  }

  handleMIDIMessage(message: MIDIMessageEvent) {
    const [command, note, velocity] = message.data;

    if (command === 144) {
      this.note = { note, velocity }
    } else if (command === 128) {
      this.note = { note: -1 , velocity: -1 }
    }
  }

  getNote() {
    return this.note
  }
}
