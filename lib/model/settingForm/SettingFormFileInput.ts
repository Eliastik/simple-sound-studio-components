import SettingForm from "./SettingForm";
import { SettingFormTypeEnum } from "./SettingFormTypeEnum";

export default interface SettingFormFileInput extends SettingForm {
    settingType: SettingFormTypeEnum.InputFile,
    accept?: string
};
