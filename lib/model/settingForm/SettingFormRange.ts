import { FilterSettingValue } from "@eliastik/simple-sound-studio-lib";
import SettingForm from "./SettingForm";
import { SettingFormTypeEnum } from "./SettingFormTypeEnum";

export default interface SettingFormRange extends SettingForm {
    settingType: SettingFormTypeEnum.Range
    minValue?: number,
    maxValue?: number,
    minValueLabel?: string,
    maxValueLabel?: string
    displayCurrentValue?: boolean,
    displayValueAsPercent?: boolean,
    step?: number,
    valueFormatterDisplay?: (filterSettingsValue: FilterSettingValue) => FilterSettingValue
};
