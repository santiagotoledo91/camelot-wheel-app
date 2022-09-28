<template>
  <div class="MainComponent">
    <div class="noteSelector">
      <h3 class="noteSelector__title">
        Current note
      </h3>
      <div class="noteSelector__container">
        <div
          v-for="(note, key) in notes"
          v-bind:key="key"
          v-on:click="selectNote(key)"
          :class="selectedNote === key ? 'noteSelector__containerNote noteSelector__containerNote--selected' : 'noteSelector__containerNote'"
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
          v-for="(fn, move) in moves"
          v-bind:key="move"
          v-on:click="selectMove(move)"
          :class="selectedMove === move ? 'moveSelector__containerMove moveSelector__containerMove--selected' : 'moveSelector__containerMove'"
        >
          {{ movesLabels[move] }}
        </div>
      </div>
    </div>

    <div
      v-if="results.length > 0"
      class="results"
    >
      <h3 class="results__title">
        Next note
      </h3>

      <div class="results__container">
        <div
          v-for="key in results"
          v-bind:key="key"
          class="results__containerResult results__containerResult--selected"
        >
          {{ notes[key] }}
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
      selectedNote: null,
      selectedMove: null,
      notes: {
        '1-A': 'Abm',
        '2-A': 'Ebm',
        '3-A': 'Bbm',
        '4-A': 'Fm',
        '5-A': 'Cm',
        '6-A': 'Gm',
        '7-A': 'Dm',
        '8-A': 'Am',
        '9-A': 'Em',
        '10-A': 'Bm',
        '11-A': 'F#m',
        '12-A': 'Dbm',
        '1-B': 'B',
        '2-B': 'F#',
        '3-B': 'Db',
        '4-B': 'Ab',
        '5-B': 'Eb',
        '6-B': 'Bb',
        '7-B': 'F',
        '8-B': 'C',
        '9-B': 'G',
        '10-B': 'D',
        '11-B': 'A',
        '12-B': 'E'
      },
      movesLabels: {
        '+': '+',
        '++': '+ +',
        '+++': '+ + +',
        '-': '-',
        '--': '- -',
        '---': '- - -',
        '=': 'Same',
        '!=': 'Mood change'
      },
      moves: {
        '+': {
          A: (note) => {
            return [
              `${note.number}-${this.toggleLetter(note.letter)}`,
              `${this.addNumber(note.number, 1)}-${note.letter}`
            ]
          },
          B: (note) => {
            return [
              `${this.addNumber(note.number, 1)}-${note.letter}`
            ]
          }
        },
        '++': {
          A: (note) => {
            return []
          },
          B: (note) => {
            return []
          }
        },
        '+++': {
          A: (note) => {
            return []
          },
          B: (note) => {
            return []
          }
        },
        '=': {
          A: (note) => {
            return [
              `${note.number}-${note.letter}`,
              `${this.addNumber(note.number, 11)}-${this.toggleLetter(note.letter)}`
            ]
          },
          B: (note) => {
            return [
              `${note.number}-${note.letter}`,
              `${this.addNumber(note.number, 1)}-${this.toggleLetter(note.letter)}`
            ]
          }
        },
        '-': {
          A: (note) => {
            return []
          },
          B: (note) => {
            return []
          }
        },
        '--': {
          A: (note) => {
            return []
          },
          B: (note) => {
            return []
          }
        },
        '---': {
          A: (note) => {
            return []
          },
          B: (note) => {
            return []
          }
        },
        '!=': {
          A: (note) => {
            return [
              `${this.addNumber(note.number, 3)}-${this.toggleLetter(note.letter)}`
            ]
          },
          B: (note) => {
            return [
              `${this.addNumber(note.number, 9)}-${this.toggleLetter(note.letter)}`
            ]
          }
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
    },
    getNoteMetadata (note) {
      const parts = note.split('-')

      return {
        number: parts[0],
        letter: parts[1]
      }
    },
    addNumber (start, steps) {
      const position = parseInt(start) + steps
      return position <= 12 ? position : position - 12
    },
    toggleLetter (letter) {
      return letter === 'A' ? 'B' : 'A'
    }
  },
  computed: {
    results () {
      if (!this.selectedNote || !this.selectedMove) {
        return []
      }

      const noteMetadata = this.getNoteMetadata(this.selectedNote)

      return this.moves[this.selectedMove][noteMetadata.letter](this.getNoteMetadata(this.selectedNote))
    }
  }
}
</script>

<style scoped lang="scss">

.noteSelector, .moveSelector, .results {

  &__title {
    margin: 10px 0;
    color: white;
  }

  &__container {
    display: flex;
    margin: 10px 0;
    flex-wrap: wrap;
    justify-content: center;

    &Note, &Move, &Result {
      width: 50px;
      height: 50px;
      margin: 5px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.25);
      border-color: transparent;
      color: #FFFFFF;
      font-weight: 500;

      &--selected {
        background: rgba(255, 255, 255, 0.75);
        color: #2c3e50;
        font-weight: bold;
      }
    }

    &Move {
      width: 75px;
      height: 75px;
    }
  }
}
</style>
