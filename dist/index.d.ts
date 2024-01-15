/// <reference types="@types/react" />
import { FC, ReactNode } from 'react';
import { FilterState, FilterSettings, FilterSettingValue, SelectFormValue, ConfigService, AudioEditor, BufferPlayer, VoiceRecorder, EventEmitter } from '@eliastik/simple-sound-studio-lib';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface AudioEditorContextProps {
    loadAudioPrincipalBuffer: (buffer: File) => void;
    audioEditorReady: boolean;
    loadingPrincipalBuffer: boolean;
    audioProcessing: boolean;
    toggleFilter: (filterId: string) => void;
    filterState: FilterState;
    validateSettings: () => void;
    exitAudioEditor: () => void;
    filtersSettings: Map<string, FilterSettings>;
    changeFilterSettings: (filterId: string, settings: FilterSettings) => void;
    resetFilterSettings: (filterId: string) => void;
    downloadingInitialData: boolean;
    downloadingBufferData: boolean;
    errorLoadingPrincipalBuffer: boolean;
    closeErrorLoadingPrincipalBuffer: () => void;
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
}

declare const useAudioEditor: () => AudioEditorContextProps;
interface AudioEditorProviderProps {
    children: ReactNode;
}
declare const AudioEditorProvider: FC<AudioEditorProviderProps>;

declare const AudioEditorActionButtons: () => react_jsx_runtime.JSX.Element;

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

declare const FilterButton: ({ enabled, filter }: {
    enabled: boolean;
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

declare class ApplicationObjectsSingleton {
    private static audioEditor;
    private static audioPlayer;
    private static audioRecorder;
    private static eventEmitter;
    private static applicationConfigService;
    private static ready;
    private constructor();
    private static initialize;
    static initializeApplicationObjects(configService?: ConfigService, buffersToFetch?: string[]): void;
    static checkInstance(): void;
    static getAudioEditorInstance(): AudioEditor | null;
    static getAudioPlayerInstance(): BufferPlayer | null;
    static getAudioRecorderInstance(): VoiceRecorder | null;
    static getEventEmitterInstance(): EventEmitter | null;
    static getConfigServiceInstance(): ConfigService | undefined;
}

interface DaisyUIModal extends HTMLElement {
    showModal: () => void;
}

declare const DecodingAudioFileDialog: () => react_jsx_runtime.JSX.Element;

export { ApplicationObjectsSingleton, AudioEditorActionButtons, type AudioEditorContextProps, AudioEditorProvider, type DaisyUIModal, DecodingAudioFileDialog, DownloadingBufferDialog, ErrorDownloadingBufferDialog, ErrorProcessingAudio, FilterButton, FilterButtonList, FilterInfoDialog, FilterSettingsDialog, FilterSettingsForm, LoadingAudioProcessingDialog, useAudioEditor };
