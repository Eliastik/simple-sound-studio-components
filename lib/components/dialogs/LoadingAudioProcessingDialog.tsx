"use client";

import { useAudioEditor } from "../../contexts/AudioEditorContext";
import { useTranslation } from "react-i18next";

const LoadingAudioProcessingDialog = () => {
    const { t } = useTranslation();
    const { audioProcessing, audioTreatmentPercent, audioTreatmentEndTimeEstimated, stopAudioRendering, cancellingAudioRendering } = useAudioEditor();
    
    return (
        <>
            {audioProcessing && <input type="checkbox" id="loadingAudioProcessing" className="modal-toggle" defaultChecked={true} />}
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t("dialogs.processing.title")}</h3>
                    <p className="py-4 flex items-center"><span className="loading loading-spinner loading-lg mr-4 text-primary"></span> {t("dialogs.pleaseWait")}</p>
                    <p className="flex items-center justify-around pb-0 gap-x-2 w-full">
                        <progress className="progress progress-primary w-full" value={Math.round(audioTreatmentPercent)} max="100"></progress>
                        <span className="min-w-8 text-right">{Math.round(audioTreatmentPercent)}%</span>
                    </p>
                    <p className="py-4 flex items-center pb-0">
                        {t("dialogs.processing.remaining")}
                        &nbsp;
                        {audioTreatmentEndTimeEstimated <= 0 && (
                            <>{t("dialogs.processing.calculatingRemainingTime")}</>
                        )}
                        {audioTreatmentEndTimeEstimated > 0 && (
                            <>{("0" + Math.trunc(audioTreatmentEndTimeEstimated / 60)).slice(-2) + ":" + ("0" + Math.trunc(audioTreatmentEndTimeEstimated % 60)).slice(-2)}</>
                        )}
                    </p>
                    <div className="modal-action mt-2">
                        <form method="dialog">
                            {!cancellingAudioRendering && <button className="btn" onClick={() => stopAudioRendering()}>{t("cancel")}</button>}
                            {cancellingAudioRendering && <button className="btn btn-disabled"><span className="loading loading-dots loading-md"></span></button>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoadingAudioProcessingDialog;
