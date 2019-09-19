// eslint-disable-next-line import/no-extraneous-dependencies
import 'es6-shim';
import App from './App.svelte';

const app = new App({
  // eslint-disable-next-line no-undef
  target: document.body,
});

export default app;
