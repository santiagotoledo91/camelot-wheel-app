<template>
  <div class="MainComponent">
    <div class="noteSelector">
      <h3 class="noteSelector__title">
        Harmonic mix
      </h3>
      <div class="noteSelector__container">
        <div v-for="(label, note) in notes" v-bind:key="note" v-on:click="selectedNote = note"
             :class="getClassForNote(note)">
          <div class="noteSelector__noteName">{{ label }}</div>
          <div v-if="nextNotes[note] !== undefined" class="noteSelector__noteEffect">
            <img v-for="(iconSrc, key) in effects[nextNotes[note]].icons" v-bind:key="key" class="noteSelector__noteEffectIcon" :src="iconSrc" alt=""/>
          </div>
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
      notes: {
        '11-B': 'A',
        '8-A': 'Am',
        '4-B': 'Ab',
        '1-A': 'Abm',

        '1-B': 'B',
        '10-A': 'Bm',
        '6-B': 'Bb',
        '3-A': 'Bbm',

        '8-B': 'C',
        '5-A': 'Cm',

        '10-B': 'D',
        '7-A': 'Dm',
        '3-B': 'Db',
        '12-A': 'Dbm',

        '12-B': 'E',
        '9-A': 'Em',
        '5-B': 'Eb',
        '2-A': 'Ebm',

        '7-B': 'F',
        '4-A': 'Fm',
        '2-B': 'F#',
        '11-A': 'F#m',

        '9-B': 'G',
        '6-A': 'Gm'
      },
      effects: {
        '-': {
          class: 'smallDropEffect',
          label: 'Small drop',
          icons: ['/img/down-icon.svg'],
          calculators: {
            A: (note) => {
              return [
                `${this.addNumber(note.number, 11)}-${note.letter}`
              ]
            },
            B: (note) => {
              return [
                `${note.number}-${this.toggleLetter(note.letter)}`,
                `${this.addNumber(note.number, 11)}-${note.letter}`
              ]
            }
          }
        },
        '--': {
          class: 'mediumDropEffect',
          label: 'Medium drop',
          icons: ['/img/down-icon.svg', '/img/down-icon.svg'],
          calculators: {
            A: (note) => {
              return [
                `${this.addNumber(note.number, 3)}-${note.letter}`
              ]
            },
            B: (note) => {
              return [
                `${this.addNumber(note.number, 3)}-${note.letter}`
              ]
            }
          }
        },
        '---': {
          class: 'bigDropEffect',
          label: 'Big drop',
          icons: ['/img/down-icon.svg', '/img/down-icon.svg', '/img/down-icon.svg'],
          calculators: {
            A: (note) => {
              return [
                `${this.addNumber(note.number, 10)}-${note.letter}`,
                `${this.addNumber(note.number, 5)}-${note.letter}`
              ]
            },
            B: (note) => {
              return [
                `${this.addNumber(note.number, 10)}-${note.letter}`,
                `${this.addNumber(note.number, 5)}-${note.letter}`
              ]
            }
          }
        },
        '+': {
          class: 'smallIncreaseEffect',
          label: 'Small increase',
          icons: ['/img/up-icon.svg'],
          calculators: {
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
          }
        },
        '++': {
          class: 'mediumIncreaseEffect',
          label: 'Medium increase',
          icons: ['/img/up-icon.svg', '/img/up-icon.svg'],
          calculators: {
            A: (note) => {
              return [
                `${this.addNumber(note.number, 9)}-${note.letter}`
              ]
            },
            B: (note) => {
              return [
                `${this.addNumber(note.number, 9)}-${note.letter}`
              ]
            }
          }
        },
        '+++': {
          class: 'bigIncreaseEffect',
          label: 'Big increase',
          icons: ['/img/up-icon.svg', '/img/up-icon.svg', '/img/up-icon.svg'],
          calculators: {
            A: (note) => {
              return [
                `${this.addNumber(note.number, 2)}-${note.letter}`,
                `${this.addNumber(note.number, 7)}-${note.letter}`
              ]
            },
            B: (note) => {
              return [
                `${this.addNumber(note.number, 2)}-${note.letter}`,
                `${this.addNumber(note.number, 7)}-${note.letter}`
              ]
            }
          }
        },
        '=': {
          class: 'sameEffect',
          label: 'Same',
          icons: [],
          calculators: {
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
          }
        },
        '!=': {
          class: 'moodChangeEffect',
          label: 'Mood change',
          icons: [],
          calculators: {
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
    }
  },
  methods: {
    getClassForNote (note) {
      if (this.selectedNote === null) {
        return 'noteSelector__note'
      }

      if (this.selectedNote === note) {
        return 'noteSelector__note noteSelector__note--selected'
      }

      const effect = this.nextNotes[note]
      if (effect !== undefined) {
        return `noteSelector__note noteSelector__note--${this.effects[effect].class}`
      }

      return 'noteSelector__note noteSelector__note--notSelected'
    },
    calculateNextNotes (noteMetadata) {
      const nextNotes = {}

      Object.keys(this.effects).forEach((effect) => {
        const notes = this.effects[effect].calculators[noteMetadata.letter](noteMetadata)

        for (const note of notes) {
          nextNotes[note] = effect
        }
      })

      return nextNotes
    },
    getNoteMetadata (note) {
      const parts = note.split('-')

      return {
        number: parts[0],
        letter: parts[1]
      }
    },
    addNumber (start, number) {
      const position = parseInt(start) + number
      return position <= 12 ? position : position - 12
    },
    toggleLetter (letter) {
      return letter === 'A' ? 'B' : 'A'
    }
  },
  computed: {
    nextNotes () {
      if (!this.selectedNote) {
        return []
      }

      return this.calculateNextNotes(this.getNoteMetadata(this.selectedNote))
    }
  }
}
</script>

<style scoped lang="scss">
.MainComponent {

  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .noteSelector {
    width: 100%;
    display: flex;
    flex-direction: column;

    &__title {
      margin: 10px 0;
      color: white;
    }

    &__container {
      display: flex;
      margin: 10px 0;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    &__note {
      width: calc(25% - 10px);
      margin: 4px;
      aspect-ratio: 1/1;
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.2);
      border-color: transparent;
      color: #FFFFFF;

      @media (orientation: landscape) {
        width: calc(12.5% - 10px);
      }

      &--selected {
        background: rgba(255, 255, 255, 1);
        color: #2f2f2f;
      }

      &--notSelected {
        background: rgba(255, 255, 255, 0.05);
      }

      &--smallDropEffect,
      &--mediumDropEffect,
      &--bigDropEffect {
        background: rgba(255, 255, 255, 0.6);

        & .noteSelector__noteEffect {
          bottom: 5px;
        }
      }

      &--smallIncreaseEffect,
      &--mediumIncreaseEffect,
      &--bigIncreaseEffect {
        background: rgba(255, 255, 255, 0.6);

        & .noteSelector__noteEffect {
          top: 5px;
        }
      }

      &--sameEffect {
        background: rgba(255, 255, 255, 0.6);
      }

      &--moodChangeEffect {
        background-color: #383838;
      }
    }

    &__noteName {
      font-size: 14px;
      font-weight: bold;
    }

    &__noteEffect {
      width: 100%;
      display: flex;
      position: absolute;
      justify-content: space-around;
    }

    &__noteEffectIcon {
      width: 10px;
      margin: 0 5px;
    }
  }
}
</style>
