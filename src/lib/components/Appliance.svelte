<script>
  import { getContext, onMount } from 'svelte';
  import {appliances} from '../stores/selectedAppliancesStore.js';
  import { get } from 'svelte/store';
  export let applianceUrl;

  let appliance = [];
  let loading = true;
  let error = null;

  const apiUrl = `${getContext('apiReference').mainUrl}${applianceUrl}`;

  onMount(async () => {
    try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			appliance = await response.json();
		} catch (err) {
			// @ts-ignore
			error = err.message;
		} finally {
			loading = false;
		}
  })
  console.log(appliances)
</script>