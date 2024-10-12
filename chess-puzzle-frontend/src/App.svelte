<script>
	import { onMount } from 'svelte';
  
	let puzzle = null;
	let loading = true;
  
	async function fetchPuzzle() {
	  loading = true;
	  try {
		const res = await fetch('http://localhost:3000/puzzle');
		puzzle = await res.json();
	  } catch (error) {
		console.error('Failed to load puzzle:', error);
	  }
	  loading = false;
	}
  
	onMount(fetchPuzzle);
  </script>
  
  <main>
	{#if loading}
	  <p>Loading...</p>
	{:else if puzzle}
	  <h2>{puzzle.game.id}</h2>
	  <p><strong>FEN:</strong> {puzzle.game.fen}</p>
	  <button on:click={fetchPuzzle}>Get New Puzzle</button>
	{:else}
	  <p>Failed to load puzzle</p>
	{/if}
  </main>
  
  <style>
	main {
	  text-align: center;
	  margin: 2rem;
	}
  </style>
  