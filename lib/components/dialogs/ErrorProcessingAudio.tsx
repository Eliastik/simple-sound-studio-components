"use client";

import { useTranslation } from "react-i18next";
import { useAudioEditor } from "../../contexts/AudioEditorContext";

const ErrorProcessingAudio = () => {
    const { t } = useTranslation();
    
    const errorProcessingAudio = useAudioEditor(state => state.errorProcessingAudio);
    const closeErrorProcessingAudio = useAudioEditor(state => state.closeErrorProcessingAudio);

    return (
        <>
            {errorProcessingAudio && <input type="checkbox" id="errorProcessingAudioDialog" className="modal-toggle" defaultChecked={true} />}
            <dialog className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t("dialogs.errorProcessingAudio.title")}</h3>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => closeErrorProcessingAudio()}>✕</button>
                    </form>
                    <div className="flex flex-col">
                        <div className="mt-3">
                            <p className="py-4 flex items-center gap-x-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 stroke-red-500 shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="shrink">{t("dialogs.errorProcessingAudio.info")}</span>
                            </p>
                        </div>
                    </div>
                    <div className="modal-action mt-0">
                        <form method="dialog">
                            <button className="btn" onClick={() => closeErrorProcessingAudio()}>{t("ok")}</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ErrorProcessingAudio;
