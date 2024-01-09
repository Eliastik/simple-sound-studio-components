import { SelectFormValue } from "@eliastik/simple-sound-studio-lib";
import SettingForm from "./SettingForm";
import { SettingFormTypeEnum } from "./SettingFormTypeEnum";

export default interface SettingFormSelectField extends SettingForm {
    settingType: SettingFormTypeEnum.SelectField,
    selectValues?: SelectFormValue[]
};
