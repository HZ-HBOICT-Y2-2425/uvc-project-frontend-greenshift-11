<!-- there is not much here but its a set up for working version. for now it works but is empty -->
<script>
  import { getContext, onMount } from 'svelte';
  import { appliances } from '$lib/stores/selectedAppliancesStore';
    import { get } from 'svelte/store';
  export let applianceUrl;

  let appliance = [];
  let loading = true;
  let error = null;

  const apiUrl = `${getContext('apiReference').mainUrl}${applianceUrl}`;

  onMount(async () => {
    
  })
</script>