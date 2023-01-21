<template>
  <form class="form" @submit.prevent="$emit('submit', nameInput.value)">
    <fieldset class="form__fieldset">
      <legend class="visually-hidden">
        {{ action }} заметку
      </legend>

      <label class="form__label">
        Введите название
        <input
          ref="nameInput"
          :value="name"
          type="text"
          name="name"
          class="input"
          @input="$emit('update:name', $event.target.value)"
        >
      </label>

      <input type="submit" :value="action" class="btn btn--secondary">
    </fieldset>
  </form>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['submit'])
defineProps({
  name: {
    type: String,
    required: false,
    default: '',
  },
  action: {
    type: String,
    required: true,
  },
})

const nameInput = ref(null)
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/form';

.btn {
  margin-top: 0.5rem;
}
</style>