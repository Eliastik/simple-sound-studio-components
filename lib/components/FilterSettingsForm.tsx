import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { FilterSettings } from "@eliastik/simple-sound-studio-lib";
import { useAudioEditor } from "../contexts/AudioEditorContext";
import { useTranslation } from "react-i18next";
import { SettingFormType } from "../model/settingForm/SettingFormType";
import { SettingFormTypeEnum } from "../model/settingForm/SettingFormTypeEnum";
import SimpleLabelField from "./settingFormFields/SimpleLabelField";
import DynamicLabelField from "./settingFormFields/DynamicLabelField";
import SimpleLinkField from "./settingFormFields/SimpleLInkField";
import DynamicLinkField from "./settingFormFields/DynamicLinkField";
import NumberField from "./settingFormFields/NumberField";
import FileInputField from "./settingFormFields/FileInputField";
import RangeInputField from "./settingFormFields/RangeInputField";
import SelectInputField from "./settingFormFields/SelectInputField";
import SettingTitle from "./settingFormFields/SettingTitle";
import { useAudioPlayer } from "../contexts/AudioPlayerContext";

const FilterSettingsForm = ({
    filterId,
    settingsModalTitle,
    settingsForm,
    firstColumnStyle,
    secondColumnStyle
}: { filterId: string, settingsModalTitle?: string, settingsForm?: SettingFormType[], firstColumnStyle?: string, secondColumnStyle?: string }) => {

    const { filtersSettings, changeFilterSettings, resetFilterSettings } = useAudioEditor();
    const { isCompatibilityModeEnabled } = useAudioPlayer();
    const [currentSettings, setCurrentSettings] = useState<FilterSettings | null | undefined>(null);
    const [autoApplyIfChanged, setAutoApplyIfChanged] = useState(false);
    const { t } = useTranslation();

    const filterSettings = filtersSettings && filtersSettings.get(filterId);

    useEffect(() => {
        setCurrentSettings(_.cloneDeep(filterSettings));
    }, [filterId, filterSettings]);

    const onSettingChanged = useCallback((newSettings: FilterSettings | null | undefined) => {
        const timer = setTimeout(() => {
            if (newSettings) {
                setCurrentSettings(newSettings);
                
                if (autoApplyIfChanged && isCompatibilityModeEnabled) {
                    changeFilterSettings(filterId, newSettings);
                }
            }
        }, 10);
    
        return () => clearTimeout(timer);
    }, [autoApplyIfChanged, isCompatibilityModeEnabled]);

    return (
        <>
            <div className="modal-box">
                {settingsModalTitle && <h3 className="font-bold text-lg">{t(settingsModalTitle)}</h3>}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className="flex flex-col">
                    {settingsForm && settingsForm.map((setting => {
                        if(setting.displayCondition && currentSettings && !setting.displayCondition(currentSettings)) {
                            return;
                        }

                        return (
                            <div className={`mt-3 ${setting.cssClass || ""}`} key={setting.settingId}>
                                <div className="font-normal text-base flex flex-col md:flex-row gap-3 md:items-center justify-between">
                                    {setting.settingType && setting.settingType !== SettingFormTypeEnum.SimpleLabel && 
                                        <SettingTitle setting={setting} filterId={filterId} firstColumnStyle={firstColumnStyle}></SettingTitle>
                                    }
                                    {setting.settingType === SettingFormTypeEnum.SimpleLabel &&
                                        <SimpleLabelField setting={setting}></SimpleLabelField>
                                    }
                                    {setting.settingType === SettingFormTypeEnum.DynamicLabel &&
                                        <DynamicLabelField setting={setting} currentSettings={currentSettings} secondColumnStyle={secondColumnStyle}></DynamicLabelField>
                                    }
                                    {setting.settingType === SettingFormTypeEnum.SimpleLink &&
                                        <SimpleLinkField setting={setting} secondColumnStyle={secondColumnStyle}></SimpleLinkField>
                                    }
                                    {setting.settingType === SettingFormTypeEnum.DynamicLink &&
                                        <DynamicLinkField setting={setting} currentSettings={currentSettings} secondColumnStyle={secondColumnStyle}></DynamicLinkField>
                                    }
                                    {setting.settingType === SettingFormTypeEnum.NumberField && (
                                        <NumberField setting={setting}
                                            currentSettings={currentSettings}
                                            secondColumnStyle={secondColumnStyle}
                                            filterId={filterId}
                                            onChange={onSettingChanged}>
                                        </NumberField>
                                    )}
                                    {setting.settingType === SettingFormTypeEnum.InputFile && (
                                        <FileInputField setting={setting}
                                            currentSettings={currentSettings}
                                            secondColumnStyle={secondColumnStyle}
                                            filterId={filterId}
                                            onChange={onSettingChanged}>
                                        </FileInputField>
                                    )}
                                    {setting.settingType === SettingFormTypeEnum.Range && (
                                        <RangeInputField setting={setting}
                                            currentSettings={currentSettings}
                                            secondColumnStyle={secondColumnStyle}
                                            filterId={filterId}
                                            onChange={onSettingChanged}>
                                        </RangeInputField>
                                    )}
                                    {setting.settingType === SettingFormTypeEnum.SelectField && (
                                        <SelectInputField setting={setting}
                                            currentSettings={currentSettings}
                                            secondColumnStyle={secondColumnStyle}
                                            filterId={filterId}
                                            onChange={onSettingChanged}>
                                        </SelectInputField>
                                    )}
                                </div>
                            </div>
                        );
                    }))}
                </div>
                {isCompatibilityModeEnabled && (
                    <div className="flex w-full items-center justify-end mt-3">
                        <input type="checkbox" className="checkbox checkbox-sm" id="autoApplyIfChanged" checked={autoApplyIfChanged} onChange={e => setAutoApplyIfChanged(e.target.checked)}></input>
                        <label htmlFor="autoApplyIfChanged" className="ml-2">{t("autoApply")}</label>
                    </div>
                )}
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-secondary mr-2" onClick={() => {
                            if (currentSettings) {
                                changeFilterSettings(filterId, currentSettings);
                            }
                        }}>{t("validate")}</button>
                        <button className="btn btn-neutral mr-2" onClick={e => {
                            if (currentSettings) {
                                changeFilterSettings(filterId, currentSettings);
                            }

                            e.preventDefault();
                        }}>{t("apply")}</button>
                        <button className="btn btn-error" onClick={e => {
                            resetFilterSettings(filterId);
                            e.preventDefault();
                        }}>{t("reset")}</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FilterSettingsForm;
