<script>
    import { notifications } from '$lib/stores/notificationStore';
    import Toast from './Toast.svelte';
</script>

<div class="fixed top-4 right-4 z-50 flex flex-col items-end">
    {#each $notifications as notification (notification.id)}
        <Toast {notification} />
    {/each}
</div>