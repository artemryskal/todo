<template>
  <section class="modal" @click="$emit('close-modal')">
    <div class="modal__content" @click.stop>
      <h3 class="modal__heading">
        {{ heading }}
      </h3>

      <slot></slot>
    </div>
  </section>
</template>

<script setup>
defineProps({
  heading: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 700px;
    max-width: 100%;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    transform: translate(-50%, -50%);
  }

  &__heading {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    line-height: 2rem;
  }
}
</style>