"use client";

import { useTranslation } from "react-i18next";
import { useAudioEditor } from "../contexts/AudioEditorContext";
import { useAudioPlayer } from "../contexts/AudioPlayerContext";

const AudioEditorNotifications = () => {
    const { isCompatibilityModeAutoEnabled, hasProblemRenderingAudio, downloadingAudio } = useAudioEditor();
    const { isCompatibilityModeEnabled } = useAudioPlayer();
    const { t } = useTranslation();

    return (
        <>
            <div className="toast toast-top toast-center lg:w-1/4 md:w-2/4 w-3/4 pointer-events-none z-50">
                {isCompatibilityModeAutoEnabled && <div className="alert alert-info text-center w-auto opacity-90 flex flex-col gap-y-1 pointer-events-none">
                    <span className="whitespace-normal">{t("notifications.compatibilityModeAutoEnabled")}</span>
                </div>}
                {hasProblemRenderingAudio && <div className="alert alert-info text-center w-auto opacity-90 flex flex-col gap-y-1 pointer-events-none">
                    <span className="whitespace-normal">{t("notifications.hasProblemRenderingAudio")}</span>
                </div>}
                {downloadingAudio && <div className="alert alert-info text-center w-auto opacity-90 flex flex-col gap-y-1 pointer-events-none">
                    <span className="whitespace-normal">{t("audioPlayer.preparingAudioDownload")}</span>
                    {isCompatibilityModeEnabled && <span className="whitespace-normal">{t("audioPlayer.preparingAudioDownloadWithCompatibility")}</span>}
                </div>}
            </div>
        </>
    );
};

export default AudioEditorNotifications;
