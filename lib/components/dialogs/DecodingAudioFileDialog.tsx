import { useTranslation } from "react-i18next";
import { useAudioEditor } from "../../contexts/AudioEditorContext";
import { useEffect, useRef } from "react";

const DecodingAudioFileDialog = () => {
    const { t } = useTranslation();
    const decodingAudioBuffer = useAudioEditor(state => state.decodingAudioBuffer);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if(!dialog) return;

        if(decodingAudioBuffer && !dialog.open) {
            dialog.showModal();
        } else if(!decodingAudioBuffer && dialog.open) {
            dialog.close();
        }
    }, [decodingAudioBuffer]);
    
    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{t("dialogs.decodingAudioFile.title")}</h3>
                <p className="py-4 flex items-center"><span className="loading loading-spinner loading-lg mr-4 text-primary"></span> {t("dialogs.pleaseWait")}</p>
            </div>
        </dialog>
    );
};

export default DecodingAudioFileDialog;
