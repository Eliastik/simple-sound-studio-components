import { AudioEditor, BufferPlayer, VoiceRecorder, EventEmitter, ConfigService } from "@eliastik/simple-sound-studio-lib";
import FilterService from "../services/FilterService";
import GenericFilterService from "../services/GenericFilterService";

export default class ApplicationObjectsSingleton {

    private static audioEditor: AudioEditor | null = null;
    private static audioPlayer: BufferPlayer | null = null;
    private static audioRecorder: VoiceRecorder | null = null;
    private static eventEmitter: EventEmitter | null = null;
    private static applicationConfigService: ConfigService | undefined = undefined;
    private static filterService: FilterService | undefined = undefined;
    private static ready = false;

    private constructor() {}

    private static initialize(configService?: ConfigService, buffersToFetch?: string[], filterService?: FilterService) {
        if (!ApplicationObjectsSingleton.ready) {
            const eventEmitter = new EventEmitter();

            const audioPlayer = new BufferPlayer(null, eventEmitter);
            const audioRecorder = new VoiceRecorder(null, eventEmitter, configService);

            ApplicationObjectsSingleton.audioEditor = new AudioEditor(null, audioPlayer, eventEmitter, configService, buffersToFetch || []);
            ApplicationObjectsSingleton.audioPlayer = audioPlayer;
            ApplicationObjectsSingleton.audioRecorder = audioRecorder;
            ApplicationObjectsSingleton.eventEmitter = eventEmitter;
            ApplicationObjectsSingleton.applicationConfigService = configService;
            ApplicationObjectsSingleton.filterService = filterService || new GenericFilterService();

            ApplicationObjectsSingleton.ready = true;
        }
    }

    static initializeApplicationObjects(configService?: ConfigService, buffersToFetch?: string[], filterService?: FilterService) {
        ApplicationObjectsSingleton.initialize(configService, buffersToFetch, filterService);
    }

    static checkInstance() {
        if (!ApplicationObjectsSingleton.ready) {
            throw new Error("Initialize application objects first by calling ApplicationObjectsSingleton.initializeApplicationObjects");
        }
    }

    static getAudioEditorInstance(): AudioEditor | null {
        ApplicationObjectsSingleton.checkInstance();
        return ApplicationObjectsSingleton.audioEditor;
    }

    static getAudioPlayerInstance(): BufferPlayer | null {
        ApplicationObjectsSingleton.checkInstance();
        return ApplicationObjectsSingleton.audioPlayer;
    }

    static getAudioRecorderInstance(): VoiceRecorder | null {
        ApplicationObjectsSingleton.checkInstance();
        return ApplicationObjectsSingleton.audioRecorder;
    }

    static getEventEmitterInstance(): EventEmitter | null {
        ApplicationObjectsSingleton.checkInstance();
        return ApplicationObjectsSingleton.eventEmitter;
    }

    static getConfigServiceInstance(): ConfigService | undefined {
        return ApplicationObjectsSingleton.applicationConfigService;
    }

    static getFilterServiceInstance(): FilterService | undefined {
        return ApplicationObjectsSingleton.filterService;
    }
}
