"use client";

import { createContext, FC, ReactNode } from "react";
import { create } from "zustand/react";
import { BufferPlayer, EventEmitter, EventType } from "@eliastik/simple-sound-studio-lib";
import AudioPlayerContextProps from "../model/contextProps/AudioPlayerContextProps";
import SoundStudioApplicationFactory from "../utils/SoundStudioApplicationFactory";

const getAudioPlayer = (): BufferPlayer => SoundStudioApplicationFactory.getAudioPlayerInstance()!;
const getEventEmitter = (): EventEmitter => SoundStudioApplicationFactory.getEventEmitterInstance()!;

export const useAudioPlayer = create<AudioPlayerContextProps>((set) => {
    const updatePlayerState = () => {
        const player = getAudioPlayer();

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
    };
  
    const player = getAudioPlayer();
    const emitter = getEventEmitter();

    emitter.on(EventType.PLAYING_FINISHED, () => set({ playing: false }));
    emitter.on(EventType.PLAYING_UPDATE, () => updatePlayerState());

    emitter.on(EventType.PLAYING_STARTED, () => {
        set({ playing: false });
        updatePlayerState();
    });

    emitter.on(EventType.PLAYING_STOPPED, () => {
        set({ playing: false });
        updatePlayerState();
    });
  
    return {
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
            await player.start();
            set({ playing: true });
            updatePlayerState();
        },
        playAudioBufferDirect: async () => {
            await getAudioPlayer().playDirect();
            set({ playing: true });
            updatePlayerState();
        },
        pauseAudioBuffer: () => {
            player.pause();
            set({ playing: false });
            updatePlayerState();
        },
        stopAudioBuffer: () => {
            player.stop();
            set({ playing: false });
            updatePlayerState();
        },
        loopAudioBuffer: () => {
            player.toggleLoop();
            updatePlayerState();
        },
        loopAllAudioBuffer: () => {
            player.toggleLoopAll();
            updatePlayerState();
        },
        setVolume: (value: number) => {
            player.volume = value;
            updatePlayerState();
        },
        setTimePlayer: (value: number) => {
            player.setTime(value);
            updatePlayerState();
        },
        updatePlayerState
    };
});

const AudioPlayerContext = createContext<AudioPlayerContextProps | undefined>(undefined);

interface AudioPlayerProviderProps {
    children: ReactNode;
}

export const AudioPlayerProvider: FC<AudioPlayerProviderProps> = ({ children }) => {
    const audioPlayerState = useAudioPlayer();

    console.warn("AudioPlayerContext is deprecated and will be removed in a future release. It is not needed anymore.");
  
    return (
        <AudioPlayerContext.Provider value={audioPlayerState}>
            {children}
        </AudioPlayerContext.Provider>
    );
};
