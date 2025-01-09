import { writable } from 'svelte/store';

function createNotificationStore() {
    const { subscribe, update } = writable([]);

    return {
        subscribe,
        add: (message, type = 'info', duration = 5000) => {
            const id = Math.random().toString(36).slice(2);
            const notification = { id, message, type, duration };
            
            update(notifications => [...notifications, notification]);

            if (duration) {
                setTimeout(() => {
                    update(notifications => 
                        notifications.filter(n => n.id !== id)
                    );
                }, duration);
            }
        },
        remove: (id) => {
            update(notifications => 
                notifications.filter(n => n.id !== id)
            );
        }
    };
}

export const notifications = createNotificationStore();