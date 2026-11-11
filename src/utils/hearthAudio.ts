// Web Audio API procedural wood-fire hearth ambience (no external audio files needed)

class HearthAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private crackleInterval: number | null = null;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (this.isPlaying) return;
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 1.5);
    this.masterGain.connect(this.ctx.destination);

    // 1. Low warm hearth rumble (pink noise through lowpass)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.12;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Filter to warm bass frequencies of wood burning
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, this.ctx.currentTime);

    this.noiseNode.connect(filter);
    filter.connect(this.masterGain);
    this.noiseNode.start();

    // 2. Intermittent wood snap & crackle sounds
    this.crackleInterval = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying || !this.masterGain) return;
      if (Math.random() > 0.4) {
        this.playPop();
      }
    }, 280);

    this.isPlaying = true;
  }

  private playPop() {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const freq = 400 + Math.random() * 900;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08 + Math.random() * 0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
    setTimeout(() => {
      if (this.noiseNode) {
        try {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
        } catch (e) {}
        this.noiseNode = null;
      }
      if (this.crackleInterval) {
        clearInterval(this.crackleInterval);
        this.crackleInterval = null;
      }
      this.isPlaying = false;
    }, 850);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const hearthAudio = new HearthAudioEngine();
