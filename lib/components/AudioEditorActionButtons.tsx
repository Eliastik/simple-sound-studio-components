"use client";

import { useAudioEditor } from "../contexts/AudioEditorContext";
import { useTranslation } from "react-i18next";
import "../globals.css";

const AudioEditorActionButtons = () => {
    const { validateSettings, resetAllFiltersState } = useAudioEditor();
    const { t } = useTranslation();

    return (
        <>
            <button className="btn btn-accent opacity-80" onClick={() => validateSettings()}>{t("audioEditorMain.validateSettings")}</button>
            <button className="btn btn-error opacity-80" onClick={() => resetAllFiltersState()}>{t("audioEditorMain.resetSettings")}</button>
        </>
    );
};

export default AudioEditorActionButtons;
