import { AudioEditor, BufferPlayer, VoiceRecorder, EventEmitter, ConfigService } from "@eliastik/simple-sound-studio-lib";

export default class ApplicationObjectsSingleton {

    private static audioEditor: AudioEditor | null = null;
    private static audioPlayer: BufferPlayer | null = null;
    private static audioRecorder: VoiceRecorder | null = null;
    private static eventEmitter: EventEmitter | null = null;
    private static applicationConfigService: ConfigService | undefined = undefined;
    private static ready = false;

    private constructor() {}

    private static initialize(configService?: ConfigService, buffersToFetch?: string[]) {
        if (!ApplicationObjectsSingleton.ready) {
            const eventEmitter = new EventEmitter();

            const audioPlayer = new BufferPlayer(null, eventEmitter);
            const audioRecorder = new VoiceRecorder(null, eventEmitter, configService);

            ApplicationObjectsSingleton.audioEditor = new AudioEditor(null, audioPlayer, eventEmitter, configService, buffersToFetch || []);
            ApplicationObjectsSingleton.audioPlayer = audioPlayer;
            ApplicationObjectsSingleton.audioRecorder = audioRecorder;
            ApplicationObjectsSingleton.eventEmitter = eventEmitter;
            ApplicationObjectsSingleton.applicationConfigService = configService;

            ApplicationObjectsSingleton.ready = true;
        }
    }

    static initializeApplicationObjects(configService?: ConfigService, buffersToFetch?: string[]) {
        ApplicationObjectsSingleton.initialize(configService, buffersToFetch);
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
}
