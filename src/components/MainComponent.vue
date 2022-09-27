<template>
  <div class="MainComponent">
      <div class="noteSelector">
        <h3 class="noteSelector__title">
          Current note
        </h3>
        <div class="noteSelector__container">
          <div
            v-for="note in notes"
            v-bind:key="note"
            v-on:click="selectNote(note)"
            :class="selectedNote === note ? 'noteSelector__containerNote noteSelector__containerNote--selected' : 'noteSelector__containerNote'"
          >
            {{ note }}
          </div>
        </div>
      </div>
      <div class="moveSelector">
        <h3 class="moveSelector__title">
          Energy
        </h3>
        <div class="moveSelector__container">
          <div
            v-for="move in moves"
            v-bind:key="move"
            v-on:click="selectMove(move)"
            :class="selectedMove === move ? 'moveSelector__containerMove moveSelector__containerMove--selected' : 'moveSelector__containerMove'"
          >
            {{ move }}
          </div>
        </div>
      </div>

      <div class="results">
        <h3 class="results__title">
          Next note
        </h3>

        <div class="results__container">
          <div
            v-for="result in results"
            v-bind:key="result"
            class="results__containerResult"
          >
            {{ result }}
          </div>
        </div>

      </div>
  </div>
</template>

<script>
export default {
  name: 'MainComponent',
  data () {
    return {
      notes: ['Abm', 'E', 'A', 'B'],
      moves: ['=', '+', '++', '+++', '-', '--', '---', '!='],
      selectedNote: null,
      selectedMove: null,
      mappings: {
        Abm: {
          '=': ['Abm', 'E'],
          '+': ['B', 'Ebm'],
          '++': ['Bm'],
          '+++': ['Bbm', 'Am'],
          '-': ['Dbm'],
          '--': ['Fm'],
          '---': ['F#m', 'Gm'],
          '!=': ['Ab']
        }
      }
    }
  },
  methods: {
    selectNote: function (note) {
      this.selectedNote = note
    },
    selectMove: function (move) {
      this.selectedMove = move
    }
  },
  computed: {
    results () {
      if (!this.selectedNote || !this.selectedMove) {
        return []
      }

      return this.mappings[this.selectedNote][this.selectedMove] || []
    }
  }
}
</script>

<style scoped lang="scss">

.noteSelector {

  &__title {

  }

  &__container {
    display: flex;
    margin: 10px 0;

    &Note {
      cursor: pointer;
      width: 40px;
      margin: 0 5px 0 5px;
      display: inline;
      border: 1px solid black;
      text-align: center;

      &--selected {
        background: red;
      }
    }
  }

}

.moveSelector {

  &__title {

  }

  &__container {
    display: flex;

    &Move {
      width: 40px;
      margin: 0 5px 0 5px;
      display: inline;
      border: 1px solid black;
      text-align: center;

      &--selected {
        background: red;
      }
    }
  }
}

.results {
  &__title {

  }

  &__container {
    display: flex;

    &Result {
      width: 40px;
      margin: 0 5px 0 5px;
      display: inline;
      border: 1px solid black;
      text-align: center;
    }
  }
}
</style>
