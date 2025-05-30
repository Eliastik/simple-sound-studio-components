import { RecorderSettings } from "@eliastik/simple-sound-studio-lib";

export default interface AudiRecorderContextProps {
    isInitialized: boolean,
    audioRecorderReady: boolean,
    audioRecorderHasError: boolean,
    initRecorder: () => void,
    audioRecorderAuthorizationPending: boolean,
    closeAudioRecorderError: () => void,
    audioRecording: boolean,
    recordAudio: () => void,
    pauseRecorderAudio: () => void,
    stopRecordAudio: () => void,
    recorderDisplayTime: string,
    exitAudioRecorder: () => void,
    recorderTime: number,
    recorderSettings: RecorderSettings,
    changeInput: (deviceId: string, groupId: string | undefined) => void,
    toggleAudioFeedback: (enable: boolean) => void,
    toggleEchoCancellation: (enable: boolean) => void,
    toggleNoiseReduction: (enable: boolean) => void,
    toggleAutoGainControl: (enable: boolean) => void,
    recorderUnavailable: boolean,
    audioRecorderDeviceNotFound: boolean,
    closeAudioRecorderDeviceNotFound: () => void,
    audioRecorderHasUnknownError: boolean,
    closeAudioRecorderUnknownError: () => void,
    initializeStore: () => void
};
