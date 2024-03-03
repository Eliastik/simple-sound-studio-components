"use client";

import { useAudioEditor } from "../../contexts/AudioEditorContext";
import { useTranslation } from "react-i18next";

const LoadingAudioProcessingDialog = () => {
    const { t } = useTranslation();
    const { audioProcessing, audioTreatmentPercent, audioTreatmentEndTimeEstimated } = useAudioEditor();
    
    return (
        <>
            {audioProcessing && <input type="checkbox" id="loadingAudioProcessing" className="modal-toggle" defaultChecked={true} />}
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t("dialogs.processing.title")}</h3>
                    <p className="py-4 flex items-center"><span className="loading loading-spinner loading-lg mr-4 text-primary"></span> {t("dialogs.pleaseWait")}</p>
                    <progress className="progress progress-primary w-full" value={Math.round(audioTreatmentPercent)} max="100"></progress>
                    <p className="py-4 flex items-center mb-0">
                        {t("dialogs.processing.remaining")}
                        &nbsp;
                        {audioTreatmentEndTimeEstimated <= 0 && (
                            <>{t("dialogs.processing.calculatingRemainingTime")}</>
                        )}
                        {audioTreatmentEndTimeEstimated > 0 && (
                            <>{("0" + Math.trunc(audioTreatmentEndTimeEstimated / 60)).slice(-2) + ":" + ("0" + Math.trunc(audioTreatmentEndTimeEstimated % 60)).slice(-2)}</>
                        )}
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoadingAudioProcessingDialog;
