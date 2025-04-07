import { useTranslation } from "react-i18next";
import { FilterSettings } from "@eliastik/simple-sound-studio-lib";
import SettingFormDynamicLink from "../../model/settingForm/SettingFormDynamicLink";
import utilFunctions from "../../utils/Functions";

const DynamicLinkField = ({
    currentSettings, setting, secondColumnStyle
}: {
    currentSettings: FilterSettings | null | undefined,
    setting: SettingFormDynamicLink,
    secondColumnStyle?: string
}) => {
    const { t } = useTranslation();

    return (
        <p className={`font-light text-md flex flex-row gap-x-3 items-center ${secondColumnStyle ? secondColumnStyle : "md:w-3/6"}`}>
            {setting.startIcon && <span>{setting.startIcon}</span>}
            <span>
                <a href={utilFunctions.getStringFromTemplate(currentSettings, setting.linkValue)}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-info link-hover">
                    {utilFunctions.getStringFromTemplate(currentSettings, t(setting.labelValue!))}
                </a>
            </span>
        </p>
    );
};

export default DynamicLinkField;
