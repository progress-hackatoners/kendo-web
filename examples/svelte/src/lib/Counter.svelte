<script>
  import '@progress/kendo-theme-default';
  import '../../../../src/index';

  let count = 0
  
  const increment = () => {
    count += 1
  }

  const iconClick = (ev) => {
    alert(ev.detail.icon);
  }
</script>

<button is="kendo-button" text="Count is: {count}" icon="gear" on:click={increment} on:iconClick={iconClick}></button>
