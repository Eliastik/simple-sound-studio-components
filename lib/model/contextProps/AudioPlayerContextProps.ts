export default interface AudioPlayerContextProps {
    playing: boolean,
    playAudioBuffer: () => void,
    pauseAudioBuffer: () => void,
    loopAudioBuffer: () => void,
    setTimePlayer: (percent: number) => void,
    isCompatibilityModeEnabled: boolean,
    stopAudioBuffer: () => void,
    currentTimeDisplay: string,
    maxTimeDisplay: string,
    percent: number,
    looping: boolean,
    loopingAll: boolean,
    currentTime: number,
    maxTime: number,
    playAudioBufferDirect: () => void,
    loopAllAudioBuffer: () => void
};
