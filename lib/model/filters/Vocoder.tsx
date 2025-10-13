import { Constants } from "@eliastik/simple-sound-studio-lib";
import Filter from "../Filter";
import { SettingFormTypeEnum } from "../settingForm/SettingFormTypeEnum";

export const Vocoder: Filter = {
    filterId: Constants.FILTERS_NAMES.VOCODER,
    filterName: "filters.vocoder.name",
    filterIcon: <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 640 512" fill="currentColor" stroke="currentColor"><path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z" /></svg>,
    hasSettings: true,
    info: "filters.vocoder.info",
    settingsModalTitle: "filters.vocoder.settings.title",
    defaultApplyInRealTime: true,
    settingsForm: [
        {
            settingId: "labelInfo",
            settingTitle: "filters.vocoder.settings.label",
            settingType: SettingFormTypeEnum.SimpleLabel
        },
        {
            settingId: "modulatorGainValue",
            settingTitle: "filters.vocoder.settings.modulatorGainValue",
            settingType: SettingFormTypeEnum.Range,
            minValue: 0,
            maxValue: 4,
            step: 0.1,
            displayCurrentValue: true
        },
        {
            settingId: "carrierSampleGainValue",
            settingTitle: "filters.vocoder.settings.carrierSampleGainValue",
            settingType: SettingFormTypeEnum.Range,
            minValue: 0,
            maxValue: 2,
            step: 0.01,
            displayCurrentValue: true
        },
        {
            settingId: "oscillatorGainValue",
            settingTitle: "filters.vocoder.settings.oscillatorGainValue",
            settingType: SettingFormTypeEnum.Range,
            minValue: 0,
            maxValue: 2,
            step: 0.01,
            displayCurrentValue: true
        },
        {
            settingId: "noiseGainValue",
            settingTitle: "filters.vocoder.settings.noiseGainValue",
            settingType: SettingFormTypeEnum.Range,
            minValue: 0,
            maxValue: 2,
            step: 0.01,
            displayCurrentValue: true
        },
        {
            settingId: "oscillatorDetuneValue",
            settingTitle: "filters.vocoder.settings.oscillatorDetuneValue",
            settingType: SettingFormTypeEnum.Range,
            minValue: -1200,
            maxValue: 1200,
            step: 1,
            displayCurrentValue: true,
            minValueLabel: "filters.vocoder.settings.oscillatorDetuneMinValue",
            maxValueLabel: "filters.vocoder.settings.oscillatorDetuneMaxValue",
        }
    ]
};
