"use client";

import { createContext, FC, ReactNode, useRef } from "react";
import { create } from "zustand/react";
import { BufferPlayer, EventEmitter, EventType } from "@eliastik/simple-sound-studio-lib";
import AudioPlayerContextProps from "../model/contextProps/AudioPlayerContextProps";
import SoundStudioApplicationFactory from "../utils/SoundStudioApplicationFactory";

const getAudioPlayer = (): BufferPlayer | null => SoundStudioApplicationFactory.getAudioPlayerInstance();
const getEventEmitter = (): EventEmitter | null => SoundStudioApplicationFactory.getEventEmitterInstance();

export const useAudioPlayer = create<AudioPlayerContextProps>((set, get) => {
    const updateStateFromPlayer = () => {
        const player = getAudioPlayer();

        if (player) {
            set({
                currentTime: player.currentTime,
                currentTimeDisplay: player.currentTimeDisplay,
                maxTime: player.duration,
                maxTimeDisplay: player.maxTimeDisplay,
                percent: player.percent,
                looping: player.loop,
                loopingAll: player.loopAll,
                isCompatibilityModeEnabled: player.compatibilityMode,
                audioVolume: player.volume,
            });
        }
    };
  
    const initializeStore = () => {
        if(get().isInitialized) {
            return;
        }
        
        const emitter = getEventEmitter();
    
        if (emitter) {
            emitter.on(EventType.PLAYING_FINISHED, () => set({ playing: false }));
            emitter.on(EventType.PLAYING_UPDATE, () => updateStateFromPlayer());
        
            emitter.on(EventType.PLAYING_STARTED, () => {
                set({ playing: false });
                updateStateFromPlayer();
            });
        
            emitter.on(EventType.PLAYING_STOPPED, () => {
                set({ playing: false });
                updateStateFromPlayer();
            });

            set({ isInitialized: true });
        } else {
            console.error("Event Emitter is not available!");
        }
    };
  
    return {
        isInitialized: false,
        playing: false,
        currentTime: 0,
        currentTimeDisplay: "00:00",
        maxTime: 0,
        maxTimeDisplay: "00:00",
        percent: 0.0,
        looping: false,
        loopingAll: false,
        isCompatibilityModeEnabled: false,
        audioVolume: 1,
  
        playAudioBuffer: async () => {
            await getAudioPlayer()!.start();
            set({ playing: true });
            updateStateFromPlayer();
        },
        playAudioBufferDirect: async () => {
            await getAudioPlayer()!.playDirect();
            set({ playing: true });
            updateStateFromPlayer();
        },
        pauseAudioBuffer: () => {
            getAudioPlayer()!.pause();
            set({ playing: false });
            updateStateFromPlayer();
        },
        stopAudioBuffer: () => {
            getAudioPlayer()!.stop();
            set({ playing: false });
            updateStateFromPlayer();
        },
        loopAudioBuffer: () => {
            getAudioPlayer()!.toggleLoop();
            updateStateFromPlayer();
        },
        loopAllAudioBuffer: () => {
            getAudioPlayer()!.toggleLoopAll();
            updateStateFromPlayer();
        },
        setVolume: (value: number) => {
            getAudioPlayer()!.volume = value;
            updateStateFromPlayer();
        },
        setTimePlayer: (value: number) => {
            getAudioPlayer()!.setTime(value);
            updateStateFromPlayer();
        },
        updatePlayerState: updateStateFromPlayer,
        initializeStore
    };
});

const AudioPlayerContext = createContext<AudioPlayerContextProps | undefined>(undefined);

interface AudioPlayerProviderProps {
    children: ReactNode;
}

/**
 * @deprecated Will be removed in a future release. It is not needed anymore.
 */
export const AudioPlayerProvider: FC<AudioPlayerProviderProps> = ({ children }) => {
    const audioPlayerStoreRef = useRef<AudioPlayerContextProps | null>(null);

    if (audioPlayerStoreRef.current === null) {
        audioPlayerStoreRef.current = useAudioPlayer();
    }

    console.warn("AudioPlayerContext is deprecated and will be removed in a future release. It is not needed anymore.");
  
    return (
        <AudioPlayerContext.Provider value={audioPlayerStoreRef.current}>
            {children}
        </AudioPlayerContext.Provider>
    );
};
