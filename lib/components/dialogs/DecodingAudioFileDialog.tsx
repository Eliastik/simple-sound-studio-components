import { useTranslation } from "react-i18next";
import { useAudioEditor } from "../../contexts/AudioEditorContext";

const DecodingAudioFileDialog = () => {
    const { t } = useTranslation();
    const decodingAudioBuffer = useAudioEditor(state => state.decodingAudioBuffer);
    
    return (
        <>
            {decodingAudioBuffer && <input type="checkbox" id="decodingAudioFileModal" className="modal-toggle" defaultChecked={true} />}
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t("dialogs.decodingAudioFile.title")}</h3>
                    <p className="py-4 flex items-center"><span className="loading loading-spinner loading-lg mr-4 text-primary"></span> {t("dialogs.pleaseWait")}</p>
                </div>
            </div>
        </>
    );
};

export default DecodingAudioFileDialog;
