<template>
  <div class="add">
    <ModalContainer
      :heading="heading"
      @close-modal="$emit('close-modal')"
    >
      <form class="form" @submit.prevent="addItem">
        <label v-for="(item, i) in labels" :key="i" class="form__label">
          {{ item.label }}
          <input
            :type="item.type"
            :name="item.name"
            :placeholder="item.placeholder"
            class="input"
          >
        </label>

        <input type="submit" value="Добавить" class="btn btn--secondary">
      </form>
    </ModalContainer>
  </div>
</template>

<script setup>
import ModalContainer from '@/components/ModalContainer';

defineProps({
  heading: {
    type: String,
    required: true,
  },
  labels: {
    type: Array,
    required: true,
  }
})

const emits = defineEmits(['close-modal', 'add-item'])

const addItem = (e) => {
  emits('add-item', new FormData(e.target))
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/form';
</style>