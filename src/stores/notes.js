import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useNoteStore = defineStore('notes', {
  state: () => ({
    activeNoteIndex: 0,
    notes: useStorage('notes',
      [
        {
          id: 1,
          name: 'Домашние дела',
          todos: [
            {
              name: 'Помыть посуду',
              isChecked: false,
              description: 'Lorem ipsum',
            },
            {
              name: 'Погладить кошечку=)',
              isChecked: true,
              description: 'Lorem ipsum',
            },
          ],
        },
        {
          id: 2,
          name: 'Работа',
          todos: [
            {
              name: 'Написать код',
              isChecked: false,
              description: 'Lorem ipsum',
            },
            {
              name: 'Погладить кошечку=)',
              isChecked: true,
              description: 'Lorem ipsum',
            },
            {
              name: 'Изучить Express',
              isChecked: false,
              description: 'Lorem ipsum',
            },
          ],
        },
      ],
    )
  }),

  actions: {
    addNewNote (name) {
      // To create a note we need to find the max id
      const id = Math.max(...this.notes.map((o) => o.id))

      this.notes.push({
        id,
        name,
        todos: []
      })
    },

    deleteNote (index) {
      this.notes.splice(index, 1)
    },

    removeItem (index) {
      this.notes[this.activeNoteIndex].todos.splice(index, 1)
    },

    createItem (name, description) {
      this.notes[this.activeNoteIndex].todos.push({
        name,
        description,
        isChecked: false
      })
    },

    editItem (index, newItem) {
      this.notes[this.activeNoteIndex].todos.splice(
        index,
        1,
        newItem
      )
    }
  }
})
