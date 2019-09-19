<script>
  import Index from './views//Index.svelte';
</script>
<main class="main">
  <Index />
</main>

<style>

.main {
  display: block;
  max-width: 1280px;
  /* height: 100%; */
  margin: 0 auto;
  padding: 20px;

  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 50px 10px rgba(0, 0, 0, 0.3);
}

/* GLOBAL STYLES */

:global(html) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  color: #444444;
  background: linear-gradient(to right, #ffa688, #ff8a63, #ffa688) ;
}

:global(img) {
  max-width: 100%;
  height: auto;
}


:global(a) {
  color: inherit;

  text-decoration: none;
}

:global(*),
:global(*::before),
:global(*::after) {
  box-sizing: inherit;
}

/**
*  Service Classes
*/

:global(.visually-hidden) {
  position: absolute;

  width: 1px;
  height: 1px;
  margin: -1px;

  clip: rect(0 0 0 0);
}

</style>
