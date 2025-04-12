"use client";

import { createContext, useContext, useState, ReactNode, FC, useEffect, useCallback } from "react";
import { AudioEditor, BufferPlayer, EventEmitter, EventType, FilterSettings, FilterState, SaveBufferOptions } from "@eliastik/simple-sound-studio-lib";
import AudioEditorContextProps from "../model/contextProps/AudioEditorContextProps";
import Filter from "../model/Filter";
import FilterService from "../services/interfaces/FilterServiceInterface";
import SoundStudioApplicationFactory from "../utils/SoundStudioApplicationFactory";

const AudioEditorContext = createContext<AudioEditorContextProps | undefined>(undefined);

export const useAudioEditor = (): AudioEditorContextProps => {
    const context = useContext(AudioEditorContext);
    if (!context) {
        throw new Error("useAudioEditor must be used inside an AudioEditorProvider");
    }
    return context;
};

interface AudioEditorProviderProps {
    children: ReactNode;
}

const getAudioEditor = (): AudioEditor => {
    return SoundStudioApplicationFactory.getAudioEditorInstance()!;
};

const getAudioPlayer = (): BufferPlayer => {
    return SoundStudioApplicationFactory.getAudioPlayerInstance()!;
};

const getFilterService = (): FilterService | undefined => {
    return SoundStudioApplicationFactory.getFilterServiceInstance();
};

const getEventEmitter = (): EventEmitter => {
    return SoundStudioApplicationFactory.getEventEmitterInstance()!;
};

let isReady = false;

export const AudioEditorProvider: FC<AudioEditorProviderProps> = ({ children }) => {
    // State: true when we are loading audio provided by the user
    const [loadingPrincipalBuffer, setLoadingPrincipalBuffer] = useState(false);
    // State: true when there is an error loading audio provided by the user
    const [errorLoadingAudioFile, setErrorLoadingAudioFile] = useState(false);
    // State: true if the audio edtior is ready to be used
    const [audioEditorReady, setAudioEditorReady] = useState(false);
    // State: true when an audio processing is in progress
    const [audioProcessing, setAudioProcessing] = useState(false);
    // State: true when there is an error processing audio
    const [errorProcessingAudio, setErrorProcessingAudio] = useState(false);
    // State: filter definitions
    const [filterDefinitions, setFilterDefinitions] = useState<Filter[]>([]);
    // State: object with enabled state for the filters
    const [filterState, setFilterState] = useState<FilterState>({});
    // State: object with all the settings of the filters
    const [filtersSettings, setFiltersSettings] = useState<Map<string, FilterSettings>>(new Map());
    // State: true if we are loading initial audio buffer from the network (when starting the application)
    const [downloadingInitialData, setDownloadingInitialData] = useState(true);
    // State: true if we are loading audio buffer from network (used for the reverb filter)
    const [downloadingBufferData, setDownloadingBufferData] = useState(false);
    // State: true if there are error loading buffer data
    const [errorDownloadingBufferData, setErrorDownloadingBufferData] = useState(false);
    // State: true if edited audio buffer of the is being downloaded
    const [downloadingAudio, setDownloadingAudio] = useState(false);
    // State: current real sample rate
    const [actualSampleRate, setActualSampleRate] = useState(0);
    // State: default device sample rate
    const [defaultDeviceSampleRate, setDefaultDeviceSampleRate] = useState(0);
    // State: true if AudioWorklet is currently available/compatible with the browser
    const [audioWorkletAvailable, setAudioWorkletAvailable] = useState(false);
    // State: true when we are decoding audio provided by the user (used in the reverb filter)
    const [decodingAudioBuffer, setDecodingAudioBuffer] = useState(false);
    // State: true if compatibility/direct was auto enabled
    const [isCompatibilityModeAutoEnabled, setCompatibilityModeAutoEnabled] = useState(false);
    // State: true if there is a problem rendering audio (same problem that auto enable compatibility mode)
    const [hasProblemRenderingAudio, setHasProblemRenderingAudio] = useState(false);
    // State: audio treatment percent
    const [audioTreatmentPercent, setAudioTreatmentPercent] = useState(0);
    // State: audio treatment end time estimation
    const [audioTreatmentEndTimeEstimated, setAudioTreatmenEndTimeEstimated] = useState(0);
    // State: if cancelled initial audio rendering
    const [cancelledInitialAudioRendering, setCancelledInitialAudioRendering] = useState(false);
    // State: if cancelling audio rendering
    const [cancellingAudioRendering, setCancellingAudioRendering] = useState(false);
    // State: number of audio files loaded
    const [audioFilesCount, setAudioFilesCount] = useState(0);
    // State: current list of audio file loaded
    const [currentFileList, setCurrentFileList] = useState<Map<string, boolean>>(new Map());

    const loadAudioPrincipalBuffer = useCallback(async (file: File | null, audioBuffer?: AudioBuffer) => {
        setLoadingPrincipalBuffer(true);

        try {
            if (file) {
                await getAudioEditor().loadBufferFromFile(file);
            } else if (audioBuffer) {
                getAudioEditor().loadBuffer(audioBuffer);
            } else {
                throw new Error("No audio file or audio buffer!");
            }

            setLoadingPrincipalBuffer(false);
            setAudioEditorReady(true);

            await processAudio();
        } catch (e) {
            console.error(e);
            setLoadingPrincipalBuffer(false);
            setErrorLoadingAudioFile(true);
        }
    }, []);

    const loadAudioFileList = useCallback(async (fileList: FileList | null) => {
        setLoadingPrincipalBuffer(true);

        try {
            if (fileList) {
                await getAudioEditor().loadFileList(fileList);
                setAudioFilesCount(getAudioEditor().totalFileList);
            } else {
                throw new Error("No audio file or audio buffer!");
            }

            setLoadingPrincipalBuffer(false);
            setAudioEditorReady(true);

            await processAudio();
        } catch (e) {
            console.error(e);
            setLoadingPrincipalBuffer(false);
            setErrorLoadingAudioFile(true);
        }
    }, []);

    useEffect(() => {
        if (isReady) {
            return;
        }

        getEventEmitter().on(EventType.LOADING_BUFFERS, () => setDownloadingInitialData(true));
        getEventEmitter().on(EventType.LOADING_BUFFERS_ERROR, () => setDownloadingInitialData(false));
        getEventEmitter().on(EventType.FETCHING_BUFFERS, () => setDownloadingBufferData(true));
        getEventEmitter().on(EventType.DECODING_AUDIO_FILE, () => setDecodingAudioBuffer(true));
        getEventEmitter().on(EventType.DECODED_AUDIO_FILE, () => setDecodingAudioBuffer(false));
        getEventEmitter().on(EventType.ERROR_DECODING_AUDIO_FILE, () => setErrorLoadingAudioFile(true));
        getEventEmitter().on(EventType.UPDATE_AUDIO_TREATMENT_PERCENT, (percent) => setAudioTreatmentPercent(percent as number));
        getEventEmitter().on(EventType.UPDATE_REMAINING_TIME_ESTIMATED, (timeRemaining) => setAudioTreatmenEndTimeEstimated(timeRemaining as number));
        getEventEmitter().on(EventType.LOADED_AUDIO_FILE_FROM_LIST, () => setCurrentFileList(getAudioEditor().getCurrentFileList()));

        getEventEmitter().on(EventType.LOADED_BUFFERS, () => {
            setDownloadingInitialData(false);
            setFiltersSettings(getAudioEditor().getFiltersSettings());
        });

        getEventEmitter().on(EventType.FINISHED_FETCHING_BUFFERS, () => {
            setDownloadingBufferData(false);
            setFiltersSettings(getAudioEditor().getFiltersSettings());
        });

        getEventEmitter().on(EventType.FETCHING_BUFFERS_ERROR, () => {
            setDownloadingBufferData(false);
            setErrorDownloadingBufferData(true);
        });

        getEventEmitter().on(EventType.RECORDER_STOPPED, (buffer) => {
            loadAudioPrincipalBuffer(null, buffer as AudioBuffer);
        });

        getEventEmitter().on(EventType.SAMPLE_RATE_CHANGED, (currentSampleRate) => {
            setActualSampleRate(currentSampleRate as number);
        });

        getEventEmitter().on(EventType.COMPATIBILITY_MODE_AUTO_ENABLED, () => {
            setCompatibilityModeAutoEnabled(true);

            setTimeout(() => {
                setCompatibilityModeAutoEnabled(false);
            }, 10000);
        });

        getEventEmitter().on(EventType.RENDERING_AUDIO_PROBLEM_DETECTED, () => {
            setHasProblemRenderingAudio(true);

            setTimeout(() => {
                setHasProblemRenderingAudio(false);
            }, 10000);
        });

        getEventEmitter().on(EventType.CANCELLED_AND_LOADED_INITIAL_AUDIO, () => {
            setCancelledInitialAudioRendering(true);

            setTimeout(() => {
                setCancelledInitialAudioRendering(false);
            }, 20000);
        });

        getEventEmitter().on(EventType.STARTED_RENDERING_AUDIO, () => {
            setErrorProcessingAudio(false);
            setCancellingAudioRendering(false);
            setAudioProcessing(true);
        });

        getEventEmitter().on(EventType.AUDIO_RENDERING_FINISHED, () => {
            setAudioProcessing(false);
        });

        getEventEmitter().on(EventType.AUDIO_RENDERING_EXCEPTION_THROWN, e => {
            console.error(e);
            setAudioProcessing(false);
            setErrorProcessingAudio(true);
        });

        getEventEmitter().on(EventType.CANCELLING_AUDIO_PROCESSING, () => setCancellingAudioRendering(true));

        getEventEmitter().on(EventType.FALLBACK_WORKLET_TO_SCRIPT_PROCESSOR, () => setAudioWorkletAvailable(false));

        getEventEmitter().on(EventType.WORKLET_SUCCESSFULLY_LOADED, () => setAudioWorkletAvailable(true));

        setDownloadingInitialData(getAudioEditor().downloadingInitialData);
        setFilterState(getAudioEditor().getFiltersState());
        setFiltersSettings(getAudioEditor().getFiltersSettings());
        setActualSampleRate(getAudioEditor().currentSampleRate);
        setDefaultDeviceSampleRate(getAudioEditor().defaultDeviceSampleRate);
        setAudioWorkletAvailable(getAudioEditor().isAudioWorkletAvailable());
        setFilterDefinitions(getFilterService()?.getAllFilters() || []);
        getFilterService()?.onFilterUpdated((filters: Filter[]) => setFilterDefinitions(filters));

        isReady = true;
    }, [loadAudioPrincipalBuffer]);

    const toggleFilter = (filterId: string) => {
        getAudioEditor().toggleFilter(filterId);
        setFilterState(getAudioEditor().getFiltersState());
    };

    const processAudio = async () => await getAudioEditor().renderAudio();

    const validateSettings = async () => await processAudio();

    const exitAudioEditor = () => {
        getAudioEditor().exit();
        setAudioEditorReady(false);
    };

    const changeFilterSettings = async (filterId: string, settings: FilterSettings) => {
        await getAudioEditor().changeFilterSettings(filterId, settings);
        setFiltersSettings(getAudioEditor().getFiltersSettings());
    };

    const resetFilterSettings = async (filterId: string) => {
        await getAudioEditor().resetFilterSettings(filterId);
        setFiltersSettings(getAudioEditor().getFiltersSettings());
    };

    const resetAllFiltersState = () => {
        getAudioEditor().resetAllFiltersState();
        setFilterState(getAudioEditor().getFiltersState());
    };

    const closeErrorLoadingAudioFile = () => setErrorLoadingAudioFile(false);
    const closeErrorDownloadingBufferData = () => setErrorDownloadingBufferData(false);
    const closeErrorProcessingAudio = () => setErrorProcessingAudio(false);

    const downloadAudio = async (options?: SaveBufferOptions) => {
        setDownloadingAudio(true);
        await getAudioEditor().saveBuffer(options);
        setDownloadingAudio(false);
    };

    const pauseAudioEditor = () => getAudioPlayer().pause();

    const stopAudioRendering = () => getAudioEditor().cancelAudioRendering();

    const loadPreviousAudio = () => getAudioEditor().loadPreviousAudio();

    const loadNextAudio = () => getAudioEditor().loadNextAudio();

    const loadAudioFromFileListIndex = async (index: number) => {
        await getAudioEditor().loadBufferFromFileListIndex(index);
        await getAudioEditor().renderAudio();
    };

    return (
        <AudioEditorContext.Provider value={{
            loadAudioPrincipalBuffer, audioEditorReady, loadingPrincipalBuffer, audioProcessing, toggleFilter, filterDefinitions, filterState, validateSettings,
            exitAudioEditor, filtersSettings, changeFilterSettings, resetFilterSettings, downloadingInitialData, downloadingBufferData, errorLoadingAudioFile,
            closeErrorLoadingAudioFile, errorDownloadingBufferData, closeErrorDownloadingBufferData, downloadAudio, downloadingAudio, resetAllFiltersState,
            pauseAudioEditor, errorProcessingAudio, closeErrorProcessingAudio, actualSampleRate, defaultDeviceSampleRate, audioWorkletAvailable, decodingAudioBuffer,
            isCompatibilityModeAutoEnabled, hasProblemRenderingAudio,
            audioTreatmentPercent, audioTreatmentEndTimeEstimated, stopAudioRendering, cancelledInitialAudioRendering, cancellingAudioRendering,
            loadAudioFileList, loadPreviousAudio, loadNextAudio, audioFilesCount, currentFileList, loadAudioFromFileListIndex
        }}>
            {children}
        </AudioEditorContext.Provider>
    );
};
