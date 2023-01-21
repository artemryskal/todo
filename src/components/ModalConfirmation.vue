<template>
  <div class="confirmation">
    <ModalContainer
      :heading="heading"
      @close-modal="$emit('decline')"
    >
      <div class="confirmation__grid">
        <button class="confirmation__btn confirmation__btn--accept btn" @click="$emit('allow')">
          Да
        </button>
        <button class="confirmation__btn confirmation__btn--decline btn" @click="$emit('decline')">
          Нет
        </button>
      </div>
    </ModalContainer>
  </div>
</template>

<script setup>
import ModalContainer from '@/components/ModalContainer'

defineProps({
  heading: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss">
.confirmation {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }

  &__btn {
    color: #fff;
  }

  &__btn--accept {
    background-color: #22c55e;
  }

  &__btn--decline {
    background-color: #dc2626;
  }
}
</style>
