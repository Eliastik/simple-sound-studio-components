import { useTranslation } from "react-i18next";
import { SettingFormType } from "../../model/settingForm/SettingFormType";

const SettingTitle = ({ setting, filterId, firstColumnStyle }: { setting: SettingFormType, filterId?: string, firstColumnStyle?: string }) => {
    const { t } = useTranslation();

    return (
        <div className={firstColumnStyle ? firstColumnStyle : "md:w-3/6"}>
            <label htmlFor={`${filterId}_${setting.settingId}`}>{t(setting.settingTitle)}</label>
        </div>
    );
};

export default SettingTitle;
