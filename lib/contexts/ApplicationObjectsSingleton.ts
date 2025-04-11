import { AudioEditor, BufferPlayer, VoiceRecorder, EventEmitter, ConfigService, SoundStudioFactory } from "@eliastik/simple-sound-studio-lib";
import FilterService from "../services/interfaces/FilterServiceInterface";
import SoundStudioApplicationFactory from "../utils/SoundStudioApplicationFactory";

/**
 * @deprecated
 */
export default class ApplicationObjectsSingleton {

    private constructor() { }

    static initializeApplicationObjects(configService?: ConfigService, buffersToFetch?: string[], filterService?: FilterService) {
        console.warn("[DEPRECATED] ApplicationObjectsSingleton is deprecated and will be removed soon. Please use SoundStudioComponentsFactory and its initializeApplication method instead.");

        SoundStudioApplicationFactory.initializeApplication(configService, buffersToFetch, filterService);
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
        return SoundStudioFactory.getEventEmitterInstance() as EventEmitter;
    }

    static getConfigServiceInstance(): ConfigService | undefined {
        return SoundStudioFactory.getConfigServiceInstance();
    }

    static getFilterServiceInstance(): FilterService | undefined {
        return SoundStudioApplicationFactory.getFilterServiceInstance();
    }
}
