"use client";

import { useTranslation } from "react-i18next";
import { useAudioEditor } from "../../contexts/AudioEditorContext";
import { useEffect, useRef } from "react";

const DownloadingBufferDialog = () => {
    const { t } = useTranslation();
    const downloadingBufferData = useAudioEditor(state => state.downloadingBufferData);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if(!dialog) return;

        if(downloadingBufferData && !dialog.open) {
            dialog.showModal();
        } else if(!downloadingBufferData && dialog.open) {
            dialog.close();
        }
    }, [downloadingBufferData]);
    
    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{t("dialogs.bufferDownloading.title")}</h3>
                <p className="py-4 flex items-center"><span className="loading loading-spinner loading-lg mr-4 text-primary"></span> {t("dialogs.pleaseWait")}</p>
            </div>
        </dialog>
    );
};

export default DownloadingBufferDialog;
