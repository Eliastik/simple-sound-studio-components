import _ from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FilterSettings } from "@eliastik/simple-sound-studio-lib";
import SettingFormRange from "../../model/settingForm/SettingFormRange";
import utilFunctions from "../../utils/Functions";

const RangeInputField = ({
    currentSettings, setting, filterId, onChange, secondColumnStyle
}: {
    currentSettings: FilterSettings | null | undefined,
    setting: SettingFormRange,
    filterId: string,
    onChange: (value: FilterSettings) => void,
    secondColumnStyle?: string
}) => {
    const { t } = useTranslation();

    const valueLabel = useMemo(() => {
        if(currentSettings) {
            return String(utilFunctions.formatValueDisplay(currentSettings[setting.settingId], setting));
        }

        return "";
    }, [currentSettings, setting, t]);

    return (
        <div className={`flex flex-col ${secondColumnStyle ? secondColumnStyle : "md:w-3/6"}`}>
            <input type="range" className="range range-accent" id={`${filterId}-${setting.settingId}`}
                value={currentSettings ? currentSettings[setting.settingId] as string : ""}
                step={setting.step ? setting.step : 0.1}
                min={setting.minValue}
                max={setting.maxValue}
                onChange={(e) => {
                    const newSettings: FilterSettings | null | undefined = _.cloneDeep(currentSettings);

                    if(newSettings) {
                        newSettings[setting.settingId] = e.target.value;
                        onChange(newSettings);
                    }
                }}></input>
            <div className="flex justify-between items-center flex-wrap font-light mt-3 mb-3">
                {setting.displayCurrentValue && currentSettings && (
                    <>
                        <span>{setting.minValueLabel && t(setting.minValueLabel)}</span>
                        {!setting.displayUnit && <span className="text-center">× {valueLabel}</span>}
                        {setting.displayUnit && <span className="text-center">{valueLabel}{setting.displayUnit}</span>}
                        <span>{setting.maxValueLabel && t(setting.maxValueLabel)}</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default RangeInputField;
