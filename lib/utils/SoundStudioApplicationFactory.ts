import { AudioEditor, BufferPlayer, VoiceRecorder, EventEmitter, ConfigService, SoundStudioFactory } from "@eliastik/simple-sound-studio-lib";
import { audioEditorComponentsContainer } from "../inversify.config";
import { TYPES } from "../inversify.types";
import GenericFilterService from "../services/GenericFilterService";
import FilterServiceInterface from "../services/interfaces/FilterServiceInterface";

export default class SoundStudioApplicationFactory {

    private static ready = false;

    private constructor() {}

    static initializeApplication(configService?: ConfigService, buffersToFetch?: string[], filterService?: FilterServiceInterface) {
        if (!SoundStudioApplicationFactory.ready) {
            if (filterService) {
                audioEditorComponentsContainer.bind<FilterServiceInterface>(TYPES.FilterService).toDynamicValue(() => filterService);
            } else {
                audioEditorComponentsContainer.bind<FilterServiceInterface>(TYPES.FilterService).to(GenericFilterService);
                console.warn("No FilterService provided. Using default generic implementation.");
            }

            SoundStudioFactory.createAudioEditor(configService, buffersToFetch);
            SoundStudioFactory.createVoiceRecorder();
    
            SoundStudioApplicationFactory.ready = true;
        }
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

    static getFilterServiceInstance(): FilterServiceInterface | undefined {
        return audioEditorComponentsContainer.get<FilterServiceInterface>(TYPES.FilterService);
    }
}
