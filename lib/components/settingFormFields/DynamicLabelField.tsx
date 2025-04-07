import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FilterSettings } from "@eliastik/simple-sound-studio-lib";
import SettingFormDynamicLabel from "../../model/settingForm/SettingFormDynamicLabel";
import utilFunctions from "../../utils/Functions";

const DynamicLabelField = ({
    currentSettings, setting, secondColumnStyle
}: {
    currentSettings: FilterSettings | null | undefined,
    setting: SettingFormDynamicLabel,
    secondColumnStyle?: string
}) => {
    const { t } = useTranslation();

    const label = useMemo(() => {
        return utilFunctions.getStringFromTemplate(currentSettings, t(setting.labelValue!));
    }, [currentSettings, setting, t]);

    return (
        <p className={`font-light text-md flex flex-row gap-x-3 items-center ${secondColumnStyle ? secondColumnStyle : "md:w-3/6"}`}>
            {setting.startIcon && <span>{setting.startIcon}</span>}
            <span>{label}</span>
        </p>
    );
};

export default DynamicLabelField;
