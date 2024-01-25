"use client";

import LoadingAudioProcessingDialog from "./dialogs/LoadingAudioProcessingDialog";
import DownloadingBufferDialog from "./dialogs/DownloadingBufferDialog";
import DecodingAudioFileDialog from "./dialogs/DecodingAudioFileDialog";
import ErrorLoadingAudioDialog from "./dialogs/ErrorLoadingAudioDialog";

const AudioEditorDialogs = () => {
    return (
        <>
            <LoadingAudioProcessingDialog></LoadingAudioProcessingDialog>
            <DownloadingBufferDialog></DownloadingBufferDialog>
            <DecodingAudioFileDialog></DecodingAudioFileDialog>
            <ErrorLoadingAudioDialog></ErrorLoadingAudioDialog>
        </>
    );
};

export default AudioEditorDialogs;
