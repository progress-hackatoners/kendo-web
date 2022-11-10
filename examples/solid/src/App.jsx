import logo from './assets/logo.svg';
import vite from './assets/vite.svg';
import styles from './App.module.css';

import { createSignal, createEffect } from "solid-js";

import '../../../src/index'
import '@progress/kendo-theme-default'

function App() {
  const [count,setCount] = createSignal(0);
  const [text, setText] = createSignal(`Count is: ${count()}`);
  const increment = () => setCount(count => count + 1)

  createEffect(() => setText(`Count is: ${count()}`));

  return (
    <div>
        <div>
          <img src={vite} class={styles.logo} alt="Vite logo" />
          <img src={logo} class={styles.logo} alt="Lit logo" />
        </div>
        <h1 class={styles.header}>Vite + Solid</h1>
        <button is="kendo-button" text={text()} icon="gear" onClick={increment}></button>
    </div>
  );
}

export default App;
