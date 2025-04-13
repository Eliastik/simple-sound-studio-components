import _ from "lodash";
import { useTranslation } from "react-i18next";
import { FilterSettings, SelectFormValue } from "@eliastik/simple-sound-studio-lib";
import SettingFormSelectField from "../../model/settingForm/SettingFormSelectField";

const SelectInputField = ({
    currentSettings, setting, filterId, onChange, secondColumnStyle
}: {
    currentSettings: FilterSettings | null | undefined,
    setting: SettingFormSelectField,
    filterId: string,
    onChange: (value: FilterSettings | null | undefined) => void,
    secondColumnStyle?: string
}) => {
    const { t } = useTranslation();

    return (
        <select className={`select select-bordered ${secondColumnStyle ? secondColumnStyle : "md:w-3/6"}`} id={`${filterId}-${setting.settingId}`}
            value={currentSettings ? (currentSettings[setting.settingId] && (currentSettings[setting.settingId] as SelectFormValue).value) as string : ""}
            onChange={(e) => {
                const newSettings: FilterSettings | null | undefined = _.cloneDeep(currentSettings);
                
                let additionalData = undefined;
                let settingName = "";

                if(setting.selectValues) {
                    const currentSettingValue = setting.selectValues.find(val => val.value === e.target.value);

                    if(currentSettingValue) {
                        additionalData = currentSettingValue.additionalData;
                        settingName = currentSettingValue.name;
                    }
                }

                if(newSettings) {
                    newSettings[setting.settingId] = {
                        name: settingName,
                        value: e.target.value,
                        additionalData
                    };
                }

                onChange(newSettings);
            }}>
            {
                setting.selectValues && setting.selectValues.map((option => {
                    return (
                        <option value={option.value} key={option.name}>
                            {t(option.name)}
                        </option>
                    );
                }))
            }
        </select>
    );
};

export default SelectInputField;
