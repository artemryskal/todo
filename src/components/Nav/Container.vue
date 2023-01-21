<template>
  <nav class="nav">
    <ul class="nav__list">
      <li
        v-for="(note, i) in noteStore.notes"
        :key="note.id"
        :class="['nav__item', { active: noteStore.activeNoteIndex === i }]"
      >
        <button class="nav__btn btn" @click="noteStore.activeNoteIndex = i">
          {{ note.name }}
        </button>
        <!-- Edit note -->
        <button
          class="nav__btn btn"
          @click="isActiveEdit = true; activeItemIndex = i"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_117_2)">
              <path d="M1.4734 16.5266H2.55389L13.4325 5.64802L12.352 4.56753L1.4734 15.4461V16.5266ZM16.5512 4.59209L13.4079 1.44884L14.4393 0.417462C14.7176 0.139154 15.0614 0 15.4707 0C15.8799 0 16.2237 0.139154 16.502 0.417462L17.5825 1.49795C17.8608 1.77626 18 2.12005 18 2.52933C18 2.93861 17.8608 3.2824 17.5825 3.56071L16.5512 4.59209ZM15.5198 5.62346L3.14325 18H0V14.8568L12.3765 2.48022L15.5198 5.62346ZM12.8922 5.10778L12.352 4.56753L13.4325 5.64802L12.8922 5.10778Z" />
            </g>
            <defs>
              <clipPath id="clip0_117_2">
                <rect width="18" height="18"/>
              </clipPath>
            </defs>
          </svg>
        </button>
        <!-- Delete note -->
        <button
          class="nav__btn btn"
          @click="isActiveDelete = true; activeItemIndex = i"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.61055 18C3.20039 18 2.85176 17.8542 2.56465 17.5625C2.27754 17.2708 2.13398 16.9167 2.13398 16.5V2.25H1.125V0.75H5.75156V0H12.2484V0.75H16.875V2.25H15.866V16.5C15.866 16.9 15.7184 17.25 15.423 17.55C15.1277 17.85 14.7832 18 14.3895 18H3.61055ZM14.3895 2.25H3.61055V16.5H14.3895V2.25ZM6.21914 14.35H7.6957V4.375H6.21914V14.35ZM10.3043 14.35H11.7809V4.375H10.3043V14.35Z" fill="black"/>
          </svg>
        </button>
      </li>

      <li class="nav__item">
        <button class="nav__btn nav__btn--action btn" @click="isActiveAdd = true">
          Добавить
        </button>
      </li>
    </ul>
  </nav>

  <teleport to="body">
    <ModalContainer
      v-if="isActiveAdd"
      heading="Добавить заметку"
      @close-modal="isActiveAdd = false"
    >
      <NavEdit
        action="Добавить"
        @submit="addNote"
      />
    </ModalContainer>
    <ModalConfirmation
      v-if="isActiveDelete"
      heading="Вы действительно хотите удалить заметку?"
      @allow="isActiveDelete = false; noteStore.notes.splice(activeItemIndex, 1)"
      @decline="isActiveDelete = false"
    />
    <ModalContainer
      v-if="isActiveEdit"
      heading="Изменить заметку"
      @close-modal="isActiveEdit = false"
    >
      <NavEdit
        action="Изменить"
        v-model:name="noteStore.notes[activeItemIndex].name"
        @submit="isActiveEdit = false"
      />
    </ModalContainer>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useNoteStore } from '@/stores/notes'
import ModalContainer from '@/components/ModalContainer'
import ModalConfirmation from '@/components/ModalConfirmation'
import NavEdit from '@/components/Nav/Edit'

const noteStore = useNoteStore()

const activeItemIndex = ref(0)

const isActiveAdd = ref(false)
const isActiveDelete = ref(false)
const isActiveEdit = ref(false)

const addNote = (name) => {
  if (!name.length) return

  isActiveAdd.value = false
  noteStore.addNewNote(name)
}
</script>

<style lang="scss" scoped>
.nav {
  padding: 5.4rem 4.2rem;
  border-right: 1px solid #D8D8D8;

  &__item {
    display: flex;
    width: 100%;
    min-width: 280px;
    background-color: var(--btn-bg);
    font-size: 1.2rem;
    border-radius: 8px;
    border: 1px solid #000;
    margin-bottom: 1rem;

    &:last-of-type {
      background: none;
      border: 0;
    }
  }

  &__item.active {
    background-color: var(--primary);
    color: var(--text-secondary);

    * { fill: var(--text-secondary) }
  }

  &__btn {
    justify-content: flex-start;
    padding: 1rem 1.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 1rem;

    &:first-of-type {
      flex-grow: 1;
    }

    &:nth-of-type(2),
    &:last-of-type {
      margin-right: 0;
    }

    &:nth-of-type(2) {
      padding-right: 0;
    }
  }

  &__btn--action {
    justify-content: center;
    background-color: var(--secondary);
    color: var(--text-secondary);
    border-radius: 8px;
    border: 1px solid #000;
  }
}
</style>