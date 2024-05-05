import { AudioEditor, BufferPlayer, VoiceRecorder, EventEmitter, ConfigService, SoundStudioFactory } from "@eliastik/simple-sound-studio-lib";
import FilterService from "../services/FilterService";
import GenericFilterService from "../services/GenericFilterService";

export default class ApplicationObjectsSingleton {

    private static filterService: FilterService | undefined = undefined;

    private constructor() {}

    static initializeApplicationObjects(configService?: ConfigService, buffersToFetch?: string[], filterService?: FilterService) {
        SoundStudioFactory.createAudioEditor(configService, buffersToFetch);
        SoundStudioFactory.createVoiceRecorder();
        ApplicationObjectsSingleton.filterService = filterService || new GenericFilterService();
    }

    static getAudioEditorInstance(): AudioEditor | null {
        return SoundStudioFactory.getAudioEditorInstance();
    }

    static getAudioPlayerInstance(): BufferPlayer | null {
        return SoundStudioFactory.getAudioPlayerInstance();
    }

    static getAudioRecorderInstance(): VoiceRecorder | null {
        return SoundStudioFactory.getAudioRecorderInstance();
    }

    static getEventEmitterInstance(): EventEmitter | null {
        return SoundStudioFactory.getEventEmitterInstance();
    }

    static getConfigServiceInstance(): ConfigService | undefined {
        return SoundStudioFactory.getConfigServiceInstance();
    }

    static getFilterServiceInstance(): FilterService | undefined {
        return ApplicationObjectsSingleton.filterService;
    }
}
