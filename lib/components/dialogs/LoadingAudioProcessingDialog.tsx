"use client";

import { useAudioEditor } from "../../contexts/AudioEditorContext";
import { useTranslation } from "react-i18next";

const LoadingAudioProcessingDialog = () => {
    const { t } = useTranslation();
    const { audioProcessing, audioTreatmentPercent } = useAudioEditor();
    
    return (
        <>
            {audioProcessing && <input type="checkbox" id="loadingAudioProcessing" className="modal-toggle" defaultChecked={true} />}
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t("dialogs.processing.title")}</h3>
                    <p className="py-4 flex items-center"><span className="loading loading-spinner loading-lg mr-4 text-primary"></span> {t("dialogs.pleaseWait")}</p>
                    <progress className="progress progress-primary w-full" value={audioTreatmentPercent} max="100"></progress>
                </div>
            </div>
        </>
    );
};

export default LoadingAudioProcessingDialog;
