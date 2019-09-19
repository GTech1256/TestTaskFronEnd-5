<script>
  // ESC keydown handler on document.body
  function handleKeydown(evt) {
    if (evt.keyCode === 27) {
      basketPopupStore.set(false)
    }
  }

  let onCloseClick = () => {}

  export {
    onCloseClick
  }
</script>

<!-- ESC keydown handler -->
<svelte:body on:keydown={handleKeydown} />

<div class="popup {$$props.class}">
  <slot></slot>
  <button class="popup__close-button" type="button" on:click={onCloseClick}>Закрыть окно</button>
</div>


<style lang="scss">
.popup {
  display: flex;
  width: 75vw;
  max-width: 500px;
  height: 60vh;
  max-height: 400px;
  padding: 20px;

  flex-direction: column;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #ffffff;
  border: 1px solid #444444;
  border-radius: 10px;

  opacity: 0;
  pointer-events: none;

  transition: opacity 0.2s;
}

:global(.popup.popup_open) {
  opacity: 1;
  pointer-events: all;
}

.popup__content {
  height: 100%;
  overflow-y: auto;
}

.popup__close-button {
  width: 50px;
  height: 50px;
  margin: auto;
  margin-bottom: 0;

  position: absolute;
  top: 0;
  right: 0;

  transform: translate(50%, -50%);

  font-size: 0;

  border-radius: 50%;
  background-color: #ffffff;

  cursor: pointer;

  &::before,
  &::after {
    display: block;
    width: 2px;

    position: absolute;
    top: 10px;
    left: 50%;
    bottom: 10px;

    transform: translateX(-50%) rotate(45deg);

    background-color: rgb(54, 54, 54);
    content: ""
  }

  &::after {
    transform: translateX(-50%) rotate(-45deg);
  }

  &:hover {
    background-color: rgb(255, 169, 169);
  }

  &:active {
    background-color: rgb(250, 79, 79);
  }
}
</style>
