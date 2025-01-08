import { writable } from 'svelte/store';

function createMusicStore() {
    // Get initial value from localStorage, defaulting to true if not set
    const defaultValue = true;
    const stored = typeof localStorage !== 'undefined' 
        ? localStorage.getItem('musicEnabled')
        : null;
    
    const initialValue = stored === null ? defaultValue : stored === 'true';
    
    // Create the store
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

export const isMusicEnabled = createMusicStore();
export const volumeLevel = createVolumeStore();