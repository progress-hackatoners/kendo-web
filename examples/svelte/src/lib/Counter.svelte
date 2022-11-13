<script>
  import { onMount } from 'svelte';
  import '@progress/kendo-theme-default';
  import '../../../../src/index';

  let count = 0;
  let buttonSize = 'small';
  let ddl;
  
  const sizes = [
    { text: 'Small', value: 'small'},
    { text: 'Medium', value: 'medium'},
    { text: 'Large', value: 'large'}
  ];
  
  const increment = () => {
    count += 1
  }

  onMount(async () => {
		ddl.dataSource = sizes;
	});
</script>

<span>Button is {buttonSize}</span>
<button is="kendo-button" text="Count is: {count}" icon="gear" on:click={increment} size={buttonSize}></button>
<input  is="kendo-dropdown-list" value={buttonSize} bind:this={ddl} on:change={(ev) => { buttonSize = ev.target.value }} />