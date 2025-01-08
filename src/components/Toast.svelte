<script>
    import { fly } from 'svelte/transition';
    import { notifications } from '$lib/stores/notificationStore';
    
    export let notification;

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    const colors = {
        success: 'bg-green-100 border-green-500 text-green-700',
        error: 'bg-red-100 border-red-500 text-red-700',
        warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
        info: 'bg-blue-100 border-blue-500 text-blue-700'
    };
</script>

<div
    transition:fly={{ x: 100, duration: 300 }}
    class="max-w-sm w-full mb-4 rounded-lg shadow-lg border-l-4 {colors[notification.type]}"
>
    <div class="p-4 flex items-center">
        <span class="mr-2 text-xl">{icons[notification.type]}</span>
        <p class="flex-grow">{notification.message}</p>
        <button
            class="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            on:click={() => notifications.remove(notification.id)}
        >
            x
        </button>
    </div>
</div>