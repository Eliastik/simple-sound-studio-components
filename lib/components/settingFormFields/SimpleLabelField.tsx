import { useTranslation } from "react-i18next";
import SettingFormSimpleLabel from "../../model/settingForm/SettingFormSimpleLabel";

const SimpleLabelField = ({ setting }: { setting: SettingFormSimpleLabel }) => {
    const { t } = useTranslation();

    return (
        <p className="font-light text-base flex flex-row gap-x-3 items-center">
            {setting.startIcon && <span>{setting.startIcon}</span>}
            <span>{t(setting.settingTitle ? setting.settingTitle : setting.labelValue!)}</span>
        </p>
    );
};

export default SimpleLabelField;
