import logo from './assets/logo.svg';
import vite from './assets/vite.svg';
import styles from './App.module.css';

import { createSignal, createEffect, onMount } from "solid-js";

import '../../../src/index'
import '@progress/kendo-theme-default'

function App() {
  const [count,setCount] = createSignal(0);
  const [text, setText] = createSignal(`Count is: ${count()}`);
  const [buttonSize, setButtonSize] = createSignal('small');
  let ddl;
  
  const sizes = [
    { text: 'Small', value: 'small'},
    { text: 'Medium', value: 'medium'},
    { text: 'Large', value: 'large'}
  ];
  const increment = () => setCount(count => count + 1)

  createEffect(() => setText(`Count is: ${count()}`));

  onMount(() => {
    ddl.dataSource = sizes;
  });

  return (
    <div style="width: 400px; margin: 0 auto;">
        <div>
          <img src={vite} class={styles.logo} alt="Vite logo" />
          <img src={logo} class={styles.logo} alt="Lit logo" />
        </div>
        <h1 class={styles.header}>Vite + Solid</h1>
        <span>Button is {buttonSize}</span>
        <button is="kendo-button" text={text()} icon="gear" onClick={increment} size={buttonSize()}></button>
        <input ref={ddl} is="kendo-dropdown-list" value={buttonSize()} onChange={(ev) => {setButtonSize(ev.target.value)}} />
    </div>
  );
}

export default App;
