<template>
 <ul class="list">
   <li v-for="(item, i) in noteStore.notes[noteStore.activeNoteIndex].todos" :key="i" class="list__item">
     <button class="btn" @click="item.isChecked = !item.isChecked">
       <span class="visually-hidden">
         Изменить состояние действия
       </span>
       <img v-if="item.isChecked" src="@/assets/icons/checkbox-active.svg" alt="Выполнено">
       <img v-else src="@/assets/icons/checkbox.svg" alt="В процессе">
     </button>

     <p class="list__name">
       {{ item.name }}
     </p>
     
     <RouterLink :to="`/edit/${i}`" class="list__btn btn btn--primary">
       <span class="visually-hidden">
         Изменить действие
       </span>
       <img src="@/assets/icons/edit.svg" alt="Изменить действие">
     </RouterLink>
     <button class="list__btn btn btn--primary" @click="isActiveDelete = true; activeDeleteIndex = i">
       <span class="visually-hidden">
         Удалить действие
       </span>
       <img src="@/assets/icons/trash.svg" alt="Удалить действие">
     </button>
   </li>

   <li class="list__item list__item--action">
     <button class="list__btn list__btn--fill btn btn--secondary" @click="isActiveAdd = true">
       Добавить
     </button>
   </li>
 </ul>

  <teleport to="body">
    <ModalConfirmation
      v-if="isActiveDelete"
      heading="Вы действительно хотите удалить данное действие?"
      @allow="isActiveDelete = false; noteStore.removeItem(activeDeleteIndex)"
      @decline="isActiveDelete = false"
    />

    <ModalAdd
      v-if="isActiveAdd"
      heading="Введите данные для добавления элемента в заметку"
      :labels="addInputs"
      @close-modal="isActiveAdd = false"
      @add-item="isActiveAdd = false; addItem($event)"
    />
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useNoteStore } from '@/stores/notes'
import ModalConfirmation from '@/components/ModalConfirmation'
import ModalAdd from '@/components/ModalAdd'

const noteStore = useNoteStore()

const isActiveDelete = ref(false)
const isActiveAdd = ref(false)
const activeDeleteIndex = ref({})

const addInputs = [
  { label: 'Введите название', name: 'name', type: 'text', placeholder: 'Например, изучить React.js' },
  { label: 'Введите описание', name: 'description', type: 'text', placeholder: '' },
]

const addItem = (formData) => {
  noteStore.createItem(formData.get('name'), formData.get('description'))
}
</script>

<style lang="scss" scoped>
.btn {
  padding: 0;
}

.input {
  border: none;
  margin: 0;
  margin-left: 1.5rem;
  padding: 0;
  border-radius: 0;
}

.list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid #000;
    padding: 0.8rem 1rem;
    border-radius: 8px;

    &--action {
      padding: 0;
    }
  }

  &__name {
    margin-left: 0.5rem;
    flex-grow: 1;
  }

  &__btn {
    height: 100%;
    width: 30px;
    margin-right: 0.5rem;

    &:last-child {
      margin-right: 0;
    }

    &--fill {
      width: 100%;
      padding: 1rem;
    }
  }
}
</style>