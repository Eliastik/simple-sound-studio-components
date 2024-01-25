/// <reference types="@types/react" />
import { FC, ReactNode } from 'react';
import { FilterSettings, FilterSettingValue, SelectFormValue, FilterState, ConfigService, AudioEditor, BufferPlayer, VoiceRecorder, EventEmitter } from '@eliastik/simple-sound-studio-lib';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare enum SettingFormTypeEnum {
    TextField = 0,
    NumberField = 1,
    SelectField = 2,
    SimpleLabel = 3,
    DynamicLabel = 4,
    SimpleLink = 5,
    DynamicLink = 6,
    Range = 7,
    InputFile = 8
}

interface SettingForm {
    settingId: string;
    settingTitle: string;
    settingType: SettingFormTypeEnum;
    defaultValue?: string;
    cssClass?: string;
    startIcon?: JSX.Element;
    displayCondition?: (filterSettings: FilterSettings) => boolean;
}

interface SettingFormDynamicLabel extends SettingForm {
    settingType: SettingFormTypeEnum.DynamicLabel;
    labelValue?: string;
}

interface SettingFormDynamicLink extends SettingForm {
    settingType: SettingFormTypeEnum.DynamicLink;
    labelValue?: string;
    linkValue?: string;
}

interface SettingFormFileInput extends SettingForm {
    settingType: SettingFormTypeEnum.InputFile;
    accept?: string;
}

interface SettingFormNumberField extends SettingForm {
    settingType: SettingFormTypeEnum.NumberField;
    minValue?: number;
    maxValue?: number;
    step?: number;
}

interface SettingFormRange extends SettingForm {
    settingType: SettingFormTypeEnum.Range;
    minValue?: number;
    maxValue?: number;
    minValueLabel?: string;
    maxValueLabel?: string;
    displayCurrentValue?: boolean;
    displayUnit?: string;
    step?: number;
    valueFormatterDisplay?: (filterSettingsValue: FilterSettingValue) => FilterSettingValue;
}

interface SettingFormSelectField extends SettingForm {
    settingType: SettingFormTypeEnum.SelectField;
    selectValues?: SelectFormValue[];
}

interface SettingFormSimpleLabel extends SettingForm {
    settingType: SettingFormTypeEnum.SimpleLabel;
    labelValue?: string;
}

interface SettingFormSimpleLink extends SettingForm {
    settingType: SettingFormTypeEnum.SimpleLink;
    labelValue?: string;
    linkValue?: string;
}

interface SettingFormTextField extends SettingForm {
    settingType: SettingFormTypeEnum.TextField;
}

type SettingFormType = (SettingFormDynamicLabel | SettingFormDynamicLink | SettingFormNumberField | SettingFormRange | SettingFormSelectField | SettingFormSimpleLabel | SettingFormSimpleLink | SettingFormTextField | SettingFormFileInput);

interface Filter {
    filterId: string;
    filterName: string;
    filterIcon: JSX.Element;
    hasSettings: boolean;
    info: string;
    settingsForm?: SettingFormType[];
    settingsModalTitle?: string;
    firstColumnStyle?: string;
    secondColumStyle?: string;
    disabledCondition?: (filterSettings: FilterSettings) => string | null;
}

interface AudioEditorContextProps {
    loadAudioPrincipalBuffer: (buffer: File) => void;
    audioEditorReady: boolean;
    loadingPrincipalBuffer: boolean;
    audioProcessing: boolean;
    toggleFilter: (filterId: string) => void;
    filterDefinitions: Filter[];
    filterState: FilterState;
    validateSettings: () => void;
    exitAudioEditor: () => void;
    filtersSettings: Map<string, FilterSettings>;
    changeFilterSettings: (filterId: string, settings: FilterSettings) => void;
    resetFilterSettings: (filterId: string) => void;
    downloadingInitialData: boolean;
    downloadingBufferData: boolean;
    errorLoadingAudioFile: boolean;
    closeErrorLoadingAudioFile: () => void;
    errorDownloadingBufferData: boolean;
    closeErrorDownloadingBufferData: () => void;
    downloadAudio: () => void;
    downloadingAudio: boolean;
    resetAllFiltersState: () => void;
    pauseAudioEditor: () => void;
    errorProcessingAudio: boolean;
    closeErrorProcessingAudio: () => void;
    actualSampleRate: number;
    defaultDeviceSampleRate: number;
    audioWorkletAvailable: boolean;
    decodingAudioBuffer: boolean;
    isCompatibilityModeAutoEnabled: boolean;
    hasProblemRenderingAudio: boolean;
}

declare const useAudioEditor: () => AudioEditorContextProps;
interface AudioEditorProviderProps {
    children: ReactNode;
}
declare const AudioEditorProvider: FC<AudioEditorProviderProps>;

interface AudioPlayerContextProps {
    playing: boolean;
    playAudioBuffer: () => void;
    pauseAudioBuffer: () => void;
    loopAudioBuffer: () => void;
    setTimePlayer: (percent: number) => void;
    isCompatibilityModeEnabled: boolean;
    stopAudioBuffer: () => void;
    currentTimeDisplay: string;
    maxTimeDisplay: string;
    percent: number;
    looping: boolean;
    currentTime: number;
    maxTime: number;
}

declare const useAudioPlayer: () => AudioPlayerContextProps;
interface AudioPlayerProviderProps {
    children: ReactNode;
}
declare const AudioPlayerProvider: FC<AudioPlayerProviderProps>;

declare const AudioEditorActionButtons: () => react_jsx_runtime.JSX.Element;

declare const FilterButton: ({ filter }: {
    filter: Filter;
}) => react_jsx_runtime.JSX.Element;

declare const FilterButtonList: () => react_jsx_runtime.JSX.Element;

declare const FilterSettingsForm: ({ filterId, settingsModalTitle, settingsForm, firstColumnStyle, secondColumnStyle }: {
    filterId: string;
    settingsModalTitle?: string | undefined;
    settingsForm?: SettingFormType[] | undefined;
    firstColumnStyle?: string | undefined;
    secondColumnStyle?: string | undefined;
}) => react_jsx_runtime.JSX.Element;

declare const DownloadingBufferDialog: () => react_jsx_runtime.JSX.Element;

declare const ErrorDownloadingBufferDialog: () => react_jsx_runtime.JSX.Element;

declare const ErrorProcessingAudio: () => react_jsx_runtime.JSX.Element;

declare const FilterInfoDialog: ({ filter }: {
    filter: Filter;
}) => react_jsx_runtime.JSX.Element;

declare const FilterSettingsDialog: ({ filter }: {
    filter: Filter;
}) => react_jsx_runtime.JSX.Element;

declare const LoadingAudioProcessingDialog: () => react_jsx_runtime.JSX.Element;

/**
 * Implements this interface to provide your filters to the UI
 */
interface FilterService {
    /**
     * Get all filters
     */
    getAllFilters(): Filter[];
    /**
     * Get filter with given ID/name
     * @param name The ID/name of the filter
     */
    getFilter(name: string): Filter | undefined;
    /**
     * Add new filters
     * @param filters The filters
     */
    addFilter(...filters: Filter[]): void;
    /**
     * Remove filter with given ID/name
     * @param name The ID/name of the filter
     */
    removeFilter(name: string): boolean;
    /**
     * Check if a filter exists with the given ID/name
     * @param name The ID/name of the filter
     */
    filterExists(name: string): boolean;
    /**
     * Update the properties of a filter
     * @param name The ID/name of the filter
     * @param updatedFilter The partial properties to update
     */
    updateFilter(name: string, updatedFilter: Partial<Filter>): boolean;
    getFilterNames(): string[];
    onFilterUpdated(callback: (filters: Filter[]) => void): void;
}

declare class ApplicationObjectsSingleton {
    private static audioEditor;
    private static audioPlayer;
    private static audioRecorder;
    private static eventEmitter;
    private static applicationConfigService;
    private static filterService;
    private static ready;
    private constructor();
    private static initialize;
    static initializeApplicationObjects(configService?: ConfigService, buffersToFetch?: string[], filterService?: FilterService): void;
    static checkInstance(): void;
    static getAudioEditorInstance(): AudioEditor | null;
    static getAudioPlayerInstance(): BufferPlayer | null;
    static getAudioRecorderInstance(): VoiceRecorder | null;
    static getEventEmitterInstance(): EventEmitter | null;
    static getConfigServiceInstance(): ConfigService | undefined;
    static getFilterServiceInstance(): FilterService | undefined;
}

interface DaisyUIModal extends HTMLElement {
    showModal: () => void;
}

declare const DecodingAudioFileDialog: () => react_jsx_runtime.JSX.Element;

declare const ErrorLoadingAudioDialog: () => react_jsx_runtime.JSX.Element;

/**
 * A generic FilterService with the default filters
 */
declare class GenericFilterService implements FilterService {
    private filterMap;
    private onFilterUpdatedCallback;
    constructor();
    getFilterNames(): string[];
    getAllFilters(): Filter[];
    getFilter(name: string): Filter | undefined;
    filterExists(name: string): boolean;
    addFilter(...filters: Filter[]): void;
    removeFilter(name: string): boolean;
    updateFilter(name: string, updatedFilter: Partial<Filter>): boolean;
    onFilterUpdated(callback: (filters: Filter[]) => void): void;
    private callCallback;
}

declare const AudioEditorDialogs: () => react_jsx_runtime.JSX.Element;

declare const AudioEditorNotifications: () => react_jsx_runtime.JSX.Element;

export { ApplicationObjectsSingleton, AudioEditorActionButtons, type AudioEditorContextProps, AudioEditorDialogs, AudioEditorNotifications, AudioEditorProvider, type AudioPlayerContextProps, AudioPlayerProvider, type DaisyUIModal, DecodingAudioFileDialog, DownloadingBufferDialog, ErrorDownloadingBufferDialog, ErrorLoadingAudioDialog, ErrorProcessingAudio, FilterButton, FilterButtonList, FilterInfoDialog, type FilterService, FilterSettingsDialog, FilterSettingsForm, GenericFilterService, LoadingAudioProcessingDialog, useAudioEditor, useAudioPlayer };
