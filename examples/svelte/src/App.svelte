<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from './assets/vite.svg'

  import Counter from './lib/Counter.svelte'
</script>

<main>
  <div>
    <img src={viteLogo} class="logo" alt="Vite Logo" />
    <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
  </div>

  <h1>Vite + Svelte</h1>

  <div>
    <Counter />
  </div>
</main>