"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAudioEditor } from "../../contexts/AudioEditorContext";

const DownloadingBufferDialog = () => {
    const { t } = useTranslation();
    const { downloadingBufferData } = useAudioEditor();
        
    const downloadingBufferDataCheckbox = useMemo(() => {
        if (downloadingBufferData) {
            return <input type="checkbox" id="downloadingBufferData" className="modal-toggle" defaultChecked={true} />;
        } else {
            return <></>
        }
    }, [downloadingBufferData]);
    
    return (
        <>
            {downloadingBufferDataCheckbox}
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t("dialogs.bufferDownloading.title")}</h3>
                    <p className="py-4 flex items-center"><span className="loading loading-spinner loading-lg mr-4 text-primary"></span> {t("dialogs.pleaseWait")}</p>
                </div>
            </div>
        </>
    );
};

export default DownloadingBufferDialog;
