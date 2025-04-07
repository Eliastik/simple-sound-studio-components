import { useTranslation } from "react-i18next";
import SettingFormSimpleLink from "../../model/settingForm/SettingFormSimpleLink";

const SimpleLinkField = ({ setting, secondColumnStyle }: { setting: SettingFormSimpleLink, secondColumnStyle?: string }) => {
    const { t } = useTranslation();

    return (
        <p className={`font-light text-md flex flex-row gap-x-3 items-center ${secondColumnStyle ? secondColumnStyle : "md:w-3/6"}`}>
            {setting.startIcon && <span>{setting.startIcon}</span>}
            <span>
                <a href={setting.linkValue}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-info link-hover">
                    {t(setting.labelValue!)}
                </a>
            </span>
        </p>
    );
};

export default SimpleLinkField;
