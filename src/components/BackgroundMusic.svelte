<script>
  import { onMount } from 'svelte';
  import { isMusicEnabled, volumeLevel } from '$lib/stores/musicStore.js';
  
  let audio;

  onMount(() => {
    if (audio) {
      // Set initial state
      audio.volume = $volumeLevel / 100;
      if ($isMusicEnabled) {
        audio.play().catch(err => {
          console.log('Auto-play prevented:', err);
          // If autoplay is prevented, update the store
          isMusicEnabled.set(false);
        });
      }
    }
  });

  // Reactive statements for handling changes
  $: if (audio && $isMusicEnabled) {
    audio.play().catch(err => {
      console.log('Play prevented:', err);
      isMusicEnabled.set(false);
    });
  }
  
  $: if (audio && !$isMusicEnabled) {
    audio.pause();
  }
  
  $: if (audio) {
    audio.volume = $volumeLevel / 100;
  }
</script>

<audio 
  bind:this={audio} 
  src="/bcmusic.mp3" 
  preload="auto" 
  loop
></audio>

<style>
  audio {
    display: none;
  }
</style>