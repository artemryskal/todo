<template>
  <section class="edit">
    <h1 class="edit__heading">
      Редактирование "{{ item.name }}"
    </h1>

    <form class="edit__form form" @submit.prevent="editItem">
      <label class="form__label">
        Введите название
        <input ref="name" type="text" :value="item.name" placeholder="Например, Помыть посуду" class="input">
      </label>

      <label class="form__label">
        Введите описание
        <input ref="description" type="text" :value="item.description" placeholder="Например, Взять моющее средство и помыть" class="input">
      </label>

      <label class="form__label form__label--row">
        Отметить как завершенное?
        <input ref="checkbox" type="checkbox" :checked="item.isChecked" class="checkbox">
      </label>

      <input type="submit" value="Изменить" class="edit__submit btn btn--primary">
    </form>

    <button class="btn btn--secondary" @click.prevent="isActiveConfirmation = true">
      Отменить изменения
    </button>
  </section>

  <teleport to="body">
    <ModalConfirmation
      v-if="isActiveConfirmation"
      heading="Вы действительно хотите отменить изменения?"
      @allow="router.push({ path: '/' })"
      @decline="isActiveConfirmation = false"
    />
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import ModalConfirmation from '@/components/ModalConfirmation';
import { useNoteStore } from '@/stores/notes'

const { params } = useRoute()
const router = useRouter()

const isActiveConfirmation = ref(false)

const name = ref(null)
const description = ref(null)
const checkbox = ref(null)

const noteStore = useNoteStore()
const item = noteStore.notes[noteStore.activeNoteIndex].todos[params.itemId]

const editItem = (e) => {
  noteStore.editItem(params.itemId, {
    name: name.value.value,
    description: description.value.value,
    isChecked: checkbox.value.checked
  })

  router.push({ path: '/' })
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/form';

.edit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  &__heading {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  &__submit {
    margin-bottom: 0.5rem;
  }
}
</style>