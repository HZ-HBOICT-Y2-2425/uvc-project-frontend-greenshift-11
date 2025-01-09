import { writable } from 'svelte/store';

// Music enabled store
function createMusicStore() {
    const defaultValue = true;
    const stored = typeof localStorage !== 'undefined' 
        ? localStorage.getItem('musicEnabled')
        : null;
    
    const initialValue = stored === null ? defaultValue : stored === 'true';
    
    const { subscribe, set, update } = writable(initialValue);

    return {
        subscribe,
        set: (value) => {
            console.log('Setting music enabled:', value);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('musicEnabled', value);
            }
            set(value);
        },
        update: (fn) => {
            update(value => {
                const newValue = fn(value);
                console.log('Updating music enabled:', newValue);
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('musicEnabled', newValue);
                }
                return newValue;
            });
        }
    };
}

// Volume store
function createVolumeStore() {
    const defaultValue = 100;
    const stored = typeof localStorage !== 'undefined'
        ? localStorage.getItem('volume')
        : null;
    
    const initialValue = stored === null ? defaultValue : parseInt(stored);
    
    const { subscribe, set } = writable(initialValue);

    return {
        subscribe,
        set: (value) => {
            console.log('Setting volume:', value);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('volume', value);
            }
            set(value);
        }
    };
}

// Track store (with added functionality to stop previous track)
function createTrackStore() {
    const storedTrack = typeof localStorage !== 'undefined' 
        ? localStorage.getItem('selectedTrack')
        : null;

    const initialTrack = storedTrack || ''; // Default to empty if no track stored

    const { subscribe, set } = writable(initialTrack);

    let currentAudio = null; // Track the currently playing audio element.

    // This function will stop the current audio (if any) and play the new track.
    function playTrack(track) {
        if (currentAudio) {
            currentAudio.pause(); // Stop the previous track
            currentAudio.currentTime = 0; // Reset the playback position to the beginning
        }

        currentAudio = new Audio(track); // Create a new audio element
        currentAudio.play(); // Play the new track
    }

    return {
        subscribe,
        set: (track) => {
            console.log('Setting selected track:', track);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('selectedTrack', track);
            }
            set(track); // Update the store with the selected track
            playTrack(track); // Play the selected track immediately, stopping the previous one.
        }
    };
}

export const isMusicEnabled = createMusicStore();
export const volumeLevel = createVolumeStore();
export const selectedTrack = createTrackStore(); // Exporting the track store
