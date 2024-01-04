export default interface Patch {
  _id: string;
  file: string;
  song: string;
  synth: string;
  genre: string;
  producer: string;
  description: string;
  isSaved?: false;
}
