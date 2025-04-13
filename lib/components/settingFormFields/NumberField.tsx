import _ from "lodash";
import { FilterSettings } from "@eliastik/simple-sound-studio-lib";
import SettingFormNumberField from "../../model/settingForm/SettingFormNumberField";

const NumberField = ({
    currentSettings, setting, filterId, onChange, secondColumnStyle
}: {
    currentSettings: FilterSettings | null | undefined,
    setting: SettingFormNumberField,
    filterId: string,
    onChange: (value: FilterSettings) => void,
    secondColumnStyle?: string
}) => {
    return (
        <input type="number" className={`input input-bordered ${secondColumnStyle ? secondColumnStyle : "md:w-3/6"}`} id={`${filterId}-${setting.settingId}`}
            value={currentSettings ? currentSettings[setting.settingId] as string : ""}
            step={setting.step ? 0.1 : setting.step}
            min={setting.minValue}
            max={setting.maxValue}
            onChange={(e) => {
                const newSettings: FilterSettings | null | undefined = _.cloneDeep(currentSettings);

                if(newSettings) {
                    newSettings[setting.settingId] = e.target.value;
                    onChange(newSettings);
                }
            }}></input>
    );
};

export default NumberField;
