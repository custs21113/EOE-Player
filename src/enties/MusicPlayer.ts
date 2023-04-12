export enum PlayMode {
  SEQUENCE = 'sequence',
  SHUFFLE = 'shuffle',
  SINGLE = 'single',
  LOOP = 'loop',
}
export interface Song {

}
export default class MusicPlayer {
  playlist: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  playMode: PlayMode;
  player: any;
  constructor(player: any) {
    this.playlist = [];
    this.currentSongIndex = 0;
    this.isPlaying = false;
    this.playMode = PlayMode.SEQUENCE;
    this.player = player;
  }

  addSong(song: Song) {
    this.playlist.push(song);
  }

  play() {
    if (this.playlist.length === 0) {
      return;
    }
    this.isPlaying = true;
    const currentSong = this.playlist[this.currentSongIndex];
  }

  pause() {
    this.isPlaying = false;
  }

  next() {
    if (this.playlist.length === 0) {
      return;
    }

    this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
    this.play();
  }
  
  prev() {
    if (this.playlist.length === 0) {
      return;
    }

    this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
    this.play();
  }

  switchPlayMode(mode) {
    this.playMode = mode;
  }

  switchNext() {
    switch(this.playMode) {
      case PlayMode.SEQUENCE: {
        this.next();
        break;
      }
      case PlayMode.SHUFFLE: {
        this.currentSongIndex = Math.floor(Math.random() * this.playlist.length);
        this.play();
        break;
      }
      case PlayMode.SINGLE: {
        this.play();
        break;
      }
      case PlayMode.LOOP: {
        this.next();
        break;
      }
      default: {
        break;
      }
    }
  }
}