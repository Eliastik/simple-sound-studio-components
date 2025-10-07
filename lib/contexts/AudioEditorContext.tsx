"use client";

import { createContext, ReactNode, FC } from "react";
import { create } from "zustand/react";
import { AudioEditor, BufferPlayer, EventEmitter, EventType } from "@eliastik/simple-sound-studio-lib";
import AudioEditorContextProps from "../model/contextProps/AudioEditorContextProps";
import FilterService from "../services/interfaces/FilterServiceInterface";
import SoundStudioApplicationFactory from "../utils/SoundStudioApplicationFactory";

const getAudioEditor = (): AudioEditor | null => SoundStudioApplicationFactory.getAudioEditorInstance();

const getAudioPlayer = (): BufferPlayer | null => SoundStudioApplicationFactory.getAudioPlayerInstance();

const getFilterService = (): FilterService | undefined => SoundStudioApplicationFactory.getFilterServiceInstance();

const getEventEmitter = (): EventEmitter | null => SoundStudioApplicationFactory.getEventEmitterInstance();

export const useAudioEditor = create<AudioEditorContextProps>((set, get) => {
    const updateStateFromEditor = () => {
        const audioEditor = getAudioEditor();

        if (audioEditor) {
            set({
                downloadingInitialData: audioEditor.downloadingInitialData,
                filterState: audioEditor.getFiltersState(),
                filtersSettings: audioEditor.getFiltersSettings(),
                actualSampleRate: audioEditor.currentSampleRate,
                defaultDeviceSampleRate: audioEditor.defaultDeviceSampleRate,
                audioWorkletAvailable: audioEditor.isAudioWorkletAvailable(),
                filterDefinitions: getFilterService()?.getAllFilters() || [],
            });
        }
    };

    const initializeStore = () => {
        if(get().isInitialized) {
            return;
        }

        const emitter = getEventEmitter();

        if (emitter) {
            emitter.on(EventType.LOADING_BUFFERS, () => set({ downloadingInitialData: true }));
            emitter.on(EventType.LOADING_BUFFERS_ERROR, () => set({ downloadingInitialData: false }));
            emitter.on(EventType.FETCHING_BUFFERS, () => set({ downloadingBufferData: true }));
            emitter.on(EventType.DECODING_AUDIO_FILE, () => set({ decodingAudioBuffer: true }));
            emitter.on(EventType.DECODED_AUDIO_FILE, () => set({ decodingAudioBuffer: false }));
            emitter.on(EventType.ERROR_DECODING_AUDIO_FILE, () => set({ errorLoadingAudioFile: true }));
    
            emitter.on(EventType.UPDATE_AUDIO_TREATMENT_PERCENT, (percent) => set({ audioTreatmentPercent: percent as number }));
            emitter.on(EventType.UPDATE_REMAINING_TIME_ESTIMATED, (timeRemaining) => set({ audioTreatmentEndTimeEstimated: timeRemaining as number }));
    
            emitter.on(EventType.LOADED_AUDIO_FILE_FROM_LIST, () => set({ currentFileList: getAudioEditor()?.getCurrentFileList() }));
    
            emitter.on(EventType.LOADED_BUFFERS, () => {
                updateStateFromEditor();
                set({ downloadingBufferData: false, downloadingInitialData: false });
            });

            emitter.on(EventType.FINISHED_FETCHING_BUFFERS, () => {
                updateStateFromEditor();
                set({ downloadingBufferData: false, downloadingInitialData: false });
            });
    
            emitter.on(EventType.FETCHING_BUFFERS_ERROR, () => set({ downloadingBufferData: false, errorDownloadingBufferData: true }));
    
            emitter.on(EventType.RECORDER_STOPPED, (buffer) => get().loadAudioPrincipalBuffer(null, buffer as AudioBuffer));
    
            emitter.on(EventType.SAMPLE_RATE_CHANGED, (currentSampleRate) => set({ actualSampleRate: currentSampleRate as number }));
    
            emitter.on(EventType.COMPATIBILITY_MODE_AUTO_ENABLED, () => {
                set({ isCompatibilityModeAutoEnabled: true });
                setTimeout(() => set({ isCompatibilityModeAutoEnabled: false }), 10000);
            });
    
            emitter.on(EventType.RENDERING_AUDIO_PROBLEM_DETECTED, () => {
                set({ hasProblemRenderingAudio: true });
                setTimeout(() => set({ hasProblemRenderingAudio: false }), 10000);
            });
    
            emitter.on(EventType.CANCELLED_AND_LOADED_INITIAL_AUDIO, () => {
                set({ cancelledInitialAudioRendering: true });
                setTimeout(() => set({ cancelledInitialAudioRendering: false }), 20000);
            });
    
            emitter.on(EventType.STARTED_RENDERING_AUDIO, () => {
                set({ errorProcessingAudio: false, cancellingAudioRendering: false, audioProcessing: true });
            });
    
            emitter.on(EventType.AUDIO_RENDERING_FINISHED, () => set({ audioProcessing: false }));
    
            emitter.on(EventType.AUDIO_RENDERING_EXCEPTION_THROWN, (e) => {
                console.error(e);
                set({ audioProcessing: false, errorProcessingAudio: true });
            });
    
            emitter.on(EventType.CANCELLING_AUDIO_PROCESSING, () => set({ cancellingAudioRendering: true }));
    
            emitter.on(EventType.FALLBACK_WORKLET_TO_SCRIPT_PROCESSOR, () => set({ audioWorkletAvailable: false }));
            emitter.on(EventType.WORKLET_SUCCESSFULLY_LOADED, () => set({ audioWorkletAvailable: true }));
    
            updateStateFromEditor();
    
            getFilterService()?.onFilterUpdated((filters) => set({ filterDefinitions: filters }));

            set({ isInitialized: true });
        } else {
            console.error("Event Emitter is not available!");
        }
    };

    const processAudio = async () => {
        const audioEditor = getAudioEditor();

        if (audioEditor) {
            return audioEditor.renderAudio();
        }

        return false;
    };

    return {
        isInitialized: false,
        loadingPrincipalBuffer: false,
        errorLoadingAudioFile: false,
        audioEditorReady: false,
        audioProcessing: false,
        errorProcessingAudio: false,
        filterDefinitions: [],
        filterState: {},
        filtersSettings: new Map(),
        downloadingInitialData: true,
        downloadingBufferData: false,
        errorDownloadingBufferData: false,
        downloadingAudio: false,
        actualSampleRate: 0,
        defaultDeviceSampleRate: 0,
        audioWorkletAvailable: false,
        decodingAudioBuffer: false,
        isCompatibilityModeAutoEnabled: false,
        hasProblemRenderingAudio: false,
        audioTreatmentPercent: 0,
        audioTreatmentEndTimeEstimated: 0,
        cancelledInitialAudioRendering: false,
        cancellingAudioRendering: false,
        audioFilesCount: 0,
        currentFileList: new Map(),
        
        loadAudioPrincipalBuffer: async (file, audioBuffer) => {
            set({ loadingPrincipalBuffer: true });

            try {
                const audioEditor = getAudioEditor();

                if (!audioEditor) {
                    throw new Error("No audio editor!");
                }

                if (file) {
                    await audioEditor.loadBufferFromFile(file);
                } else if (audioBuffer) {
                    audioEditor.loadBuffer(audioBuffer);
                } else {
                    throw new Error("No audio file or audio buffer!");
                }

                set({ loadingPrincipalBuffer: false, audioEditorReady: true });

                await processAudio();
            } catch (e) {
                console.error(e);
                set({ loadingPrincipalBuffer: false, errorLoadingAudioFile: true });
            }
        },
        loadAudioFileList: async (fileList) => {
            set({ loadingPrincipalBuffer: true });

            try {
                const audioEditor = getAudioEditor();

                if (!audioEditor) {
                    throw new Error("No audio editor!");
                }

                if (fileList) {
                    await audioEditor.loadFileList(fileList);
                    set({ audioFilesCount: audioEditor.totalFileList });
                } else {
                    throw new Error("No audio file or audio buffer!");
                }

                set({ loadingPrincipalBuffer: false, audioEditorReady: true });

                await processAudio();
            } catch (e) {
                console.error(e);
                set({ loadingPrincipalBuffer: false, errorLoadingAudioFile: true });
            }
        },
        toggleFilter: (filterId) => {
            getAudioEditor()?.toggleFilter(filterId);
            set({ filterState: getAudioEditor()?.getFiltersState() });
        },
        validateSettings: async () => await processAudio(),
        exitAudioEditor: () => {
            getAudioEditor()?.exit();
            set({ audioEditorReady: false });
        },
        changeFilterSettings: async (filterId, settings) => {
            await getAudioEditor()?.changeFilterSettings(filterId, settings);
            set({ filtersSettings: getAudioEditor()?.getFiltersSettings() });
        },
        resetFilterSettings: async (filterId) => {
            await getAudioEditor()?.resetFilterSettings(filterId);
            set({ filtersSettings: getAudioEditor()?.getFiltersSettings() });
        },
        resetAllFiltersState: () => {
            getAudioEditor()?.resetAllFiltersState();
            set({ filterState: getAudioEditor()?.getFiltersState() });
        },
        closeErrorLoadingAudioFile: () => set({ errorLoadingAudioFile: false }),
        closeErrorDownloadingBufferData: () => set({ errorDownloadingBufferData: false }),
        closeErrorProcessingAudio: () => set({ errorProcessingAudio: false }),
        downloadAudio: async (options) => {
            set({ downloadingAudio: true });
            await getAudioEditor()?.saveBuffer(options);
            set({ downloadingAudio: false });
        },
        pauseAudioEditor: () => getAudioPlayer()?.pause(),
        stopAudioRendering: () => getAudioEditor()?.cancelAudioRendering(),
        loadPreviousAudio: async () => { await getAudioEditor()?.loadPreviousAudio() },
        loadNextAudio: async () => { await getAudioEditor()?.loadNextAudio() },
        loadAudioFromFileListIndex: async (index) => {
            await getAudioEditor()?.loadBufferFromFileListIndex(index);
            await getAudioEditor()?.renderAudio();
        },
        initializeStore
    };
});

const AudioEditorContext = createContext<AudioEditorContextProps | undefined>(undefined);

interface AudioEditorProviderProps {
    children: ReactNode;
}

/**
 * @deprecated Will be removed in a future release. It is not needed anymore.
 */
export const AudioEditorProvider: FC<AudioEditorProviderProps> = ({ children }) => {
    const audioEditorStore = useAudioEditor();

    console.warn("AudioEditorProvider is deprecated and will be removed in a future release. It is not needed anymore.");
  
    return (
        <AudioEditorContext.Provider value={audioEditorStore}>
            {children}
        </AudioEditorContext.Provider>
    );
};
