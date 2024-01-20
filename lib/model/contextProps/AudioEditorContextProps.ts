import { FilterState, FilterSettings } from "@eliastik/simple-sound-studio-lib";
import Filter from "../Filter";

export default interface AudioEditorContextProps {
    loadAudioPrincipalBuffer: (buffer: File) => void;
    audioEditorReady: boolean,
    loadingPrincipalBuffer: boolean,
    audioProcessing: boolean
    toggleFilter: (filterId: string) => void,
    filterDefinitions: Filter[],
    filterState: FilterState,
    validateSettings: () => void,
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
    downloadAudio: () => void,
    downloadingAudio: boolean,
    resetAllFiltersState: () => void,
    pauseAudioEditor: () => void,
    errorProcessingAudio: boolean,
    closeErrorProcessingAudio: () => void,
    actualSampleRate: number,
    defaultDeviceSampleRate: number,
    audioWorkletAvailable: boolean,
    decodingAudioBuffer: boolean
};
