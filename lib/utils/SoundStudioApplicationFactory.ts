import { AudioEditor, BufferPlayer, VoiceRecorder, EventEmitter, ConfigService, SoundStudioFactory } from "@eliastik/simple-sound-studio-lib";
import { audioEditorComponentsContainer } from "../inversify.config";
import { TYPES } from "../inversify.types";
import FilterServiceInterface from "../services/interfaces/FilterServiceInterface";
import GenericFilterService from "../services/GenericFilterService";
import { useAudioPlayer } from "../contexts/AudioPlayerContext";

export default class SoundStudioApplicationFactory {

    private static ready = false;

    private static audioEditor: AudioEditor | null = null;
    private static audioPlayer: BufferPlayer | null = null;
    private static configService: ConfigService | null = null;
    private static eventEmitter: EventEmitter | null = null;
    private static voiceRecorder: VoiceRecorder | null = null;

    private constructor() {}

    static initializeApplication(configService?: ConfigService, buffersToFetch?: string[], filterService?: FilterServiceInterface) {
        if(!SoundStudioApplicationFactory.ready) {
            if (filterService) {
                audioEditorComponentsContainer.bind<FilterServiceInterface>(TYPES.FilterService).toDynamicValue(() => filterService);
            } else {
                audioEditorComponentsContainer.bind<FilterServiceInterface>(TYPES.FilterService).to(GenericFilterService);
                console.warn("No FilterService provided. Using default generic implementation.");
            }
    
            const { audioEditor, audioPlayer, finalConfigService, eventEmitter, voiceRecorder } = SoundStudioFactory.createNewInstance({
                configService, buffersToFetch
            });

            SoundStudioApplicationFactory.audioEditor = audioEditor;
            SoundStudioApplicationFactory.audioPlayer = audioPlayer;
            SoundStudioApplicationFactory.configService = finalConfigService;
            SoundStudioApplicationFactory.eventEmitter = eventEmitter;
            SoundStudioApplicationFactory.voiceRecorder = voiceRecorder;
    
            SoundStudioApplicationFactory.ready = true;

            // Initialize stores
            useAudioPlayer.getState().initializeStore();
        }
    }

    static getAudioEditorInstance(): AudioEditor | null {
        return SoundStudioApplicationFactory.audioEditor;
    }

    static getAudioPlayerInstance(): BufferPlayer | null {
        return SoundStudioApplicationFactory.audioPlayer;
    }

    static getAudioRecorderInstance(): VoiceRecorder | null {
        return SoundStudioApplicationFactory.voiceRecorder;
    }

    static getEventEmitterInstance(): EventEmitter | null {
        return SoundStudioApplicationFactory.eventEmitter;
    }

    static getConfigServiceInstance(): ConfigService | undefined {
        return SoundStudioApplicationFactory.configService!;
    }

    static getFilterServiceInstance(): FilterServiceInterface | undefined {
        return audioEditorComponentsContainer.get<FilterServiceInterface>(TYPES.FilterService);
    }
}
