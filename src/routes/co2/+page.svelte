<!-- <script>
  import Navbar from './Navbar.svelte'
	import Sidebar from './Sidebar.svelte'
  import "../../app.css";
  window.onload = function () {
    const dataPoint = appliances.array.forEach(element => {
      {label: appliance.name, y: appliance.usage},
    });
    // @ts-ignore
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        colorSet: "transformers",
        title: {
            text: "Usage of your appliances"
        },
        subtitles: [{
            text: "diagram of the summed data"
        }],
        data: [{
            type: "pie",
            indexLabel: "{label} ({y})",
            dataPoints: dataPoint
        }]
    })
    chart.render();
  }
</script> -->

<script>
	export let open = false;
</script>

<aside class="absolute w-64 bg-green h-[76.99vh] p-3" class:open>
	<nav class="p-0 text-xl">
		<h1>Appliances</h1>
		<h2>All appliances</h2>
		<p><a class="block" href="#about">Appliance1</a></p>
		<p><a class="block" href="#contact">Appliance2</a></p>
		<h2>Rooms</h2>
		<p><a class="block" href="#about">Room1</a></p>
		<p><a class="block" href="#about">Room2</a></p>
		<h2><a class="block" href="#about">Add an appliance</a></h2>
		<h2><a class="block" href="#about">Add a room</a></h2>
		<h2><a class="block" href="#about">Log single activity</a></h2>
		<h2><a class="block" href="#about">Change defaults</a></h2>
	</nav>
</aside>

<style>
	/* Styling the side navigation bar */
	aside {
		/* left: -100%; */
    margin-left: 0;
		transition: left 0.3s ease-in-out;
		background-color: rgba(60, 113, 39, 0.65); /* Setting the color with opacity */
		width: 16rem; /* Fixed width for the sidebar */
	}

	.open {
		left: 0;
	}

	/* Header and links styling */
	h1 {
		font-size: 1.25rem; /* Large font for the title */
		color: white; /* Contrast text color */
	}

	h2 {
		font-size: 1rem; /* Medium font size for section headings */
		color: white;
	}

	p {
		font-size: 0.875rem; /* Smaller font for links */
		margin-left: 3px;
	}

	a {
		color: white; /* Contrast link color */
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline; /* Add an underline effect on hover */
	}

	/* Adding box-shadow for better aesthetics */
	aside {
		box-shadow: 4px 0 10px rgba(0, 0, 0, 0.3);
	}
</style>
