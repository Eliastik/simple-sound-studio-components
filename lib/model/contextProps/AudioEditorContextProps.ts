import { FilterState, FilterSettings, SaveBufferOptions } from "@eliastik/simple-sound-studio-lib";
import Filter from "../Filter";

export default interface AudioEditorContextProps {
    loadAudioPrincipalBuffer: (file: File | null, audioBuffer?: AudioBuffer) => Promise<void>,
    loadAudioFileList: (fileList: FileList | null) => Promise<void>
    audioEditorReady: boolean,
    loadingPrincipalBuffer: boolean,
    audioProcessing: boolean
    toggleFilter: (filterId: string) => void,
    filterDefinitions: Filter[],
    filterState: FilterState,
    validateSettings: () => Promise<boolean>,
    exitAudioEditor: () => void,
    filtersSettings: Map<string, FilterSettings>,
    changeFilterSettings: (filterId: string, settings: FilterSettings) => void,
    resetFilterSettings: (filterId: string) => void,
    downloadingInitialData: boolean,
    downloadingBufferData: boolean,
    errorLoadingAudioFile: boolean,
    closeErrorLoadingAudioFile: () => void,
    errorDownloadingBufferData: boolean,
    closeErrorDownloadingBufferData: () => void,
    downloadAudio: (options?: SaveBufferOptions) => Promise<void>,
    downloadingAudio: boolean,
    resetAllFiltersState: () => void,
    pauseAudioEditor: () => void,
    errorProcessingAudio: boolean,
    closeErrorProcessingAudio: () => void,
    actualSampleRate: number,
    defaultDeviceSampleRate: number,
    audioWorkletAvailable: boolean,
    decodingAudioBuffer: boolean,
    isCompatibilityModeAutoEnabled: boolean,
    hasProblemRenderingAudio: boolean,
    audioTreatmentPercent: number,
    audioTreatmentEndTimeEstimated: number,
    stopAudioRendering: () => void,
    cancelledInitialAudioRendering: boolean,
    cancellingAudioRendering: boolean,
    loadPreviousAudio: () => Promise<void>,
    loadNextAudio: () => Promise<void>,
    audioFilesCount: number
};
