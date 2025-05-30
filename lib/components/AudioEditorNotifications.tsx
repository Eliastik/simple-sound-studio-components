"use client";

import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/shallow";
import { useAudioEditor } from "../contexts/AudioEditorContext";
import { useAudioPlayer } from "../contexts/AudioPlayerContext";

const AudioEditorNotifications = () => {
    const { t } = useTranslation();

    const [
        isCompatibilityModeAutoEnabled,
        hasProblemRenderingAudio,
        downloadingAudio,
        cancelledInitialAudioRendering
    ] = useAudioEditor(useShallow(state => [state.isCompatibilityModeAutoEnabled, state.hasProblemRenderingAudio, state.downloadingAudio, state.cancelledInitialAudioRendering]));
    
    const isCompatibilityModeEnabled = useAudioPlayer(state => state.isCompatibilityModeEnabled);

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
                {cancelledInitialAudioRendering && <div className="alert alert-info text-center w-auto opacity-90 flex flex-col gap-y-1 pointer-events-none">
                    <span className="whitespace-normal">{t("notifications.cancelledInitialAudioRendering")}</span>
                </div>}
            </div>
        </>
    );
};

export default AudioEditorNotifications;
