<template>
  <NavContainer />

  <section class="home">
    <h1 class="home__heading">
      {{ noteStore.notes[noteStore.activeNoteIndex].name }}
    </h1>
    <NoteList />
  </section>
</template>

<script setup>
import { useNoteStore } from '@/stores/notes'
import NavContainer from '@/components/Nav/Container'
import NoteList from '@/components/NoteList'

const noteStore = useNoteStore()
</script>

<style lang="scss" scoped>
.home {
  flex-grow: 1;
  margin-top: 1.75rem;
  margin-left: 2.6rem;

  &__heading {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }
}
</style>
