import _ from "lodash";
import { FilterSettings } from "@eliastik/simple-sound-studio-lib";
import SettingFormFileInput from "../../model/settingForm/SettingFormFileInput";

const FileInputField = ({
    currentSettings, setting, filterId, onChange, secondColumnStyle
}: {
    currentSettings: FilterSettings | null | undefined,
    setting: SettingFormFileInput,
    filterId: string,
    onChange: (value: FilterSettings) => void,
    secondColumnStyle?: string
}) => {
    return (
        <input
            type="file"
            className={`file-input file-input-bordered w-full max-w-xs ${secondColumnStyle ? secondColumnStyle : "md:w-3/6"}`}
            id={`${filterId}_${setting.settingId}`}
            accept={setting.accept || "*/*"}
            onChange={(e) => {
                const file = e.target.files![0];
                const newSettings: FilterSettings | null | undefined = _.cloneDeep(currentSettings);

                if(newSettings) {
                    newSettings[setting.settingId] = file;
                    onChange(newSettings);
                }
            }}/>
    );
};

export default FileInputField;
