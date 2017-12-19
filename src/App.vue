<template>
  <div id="app">

    <Recipe 
      v-for="e in recipes" 
      :key="e.id"
      :index="e.id"
      :pcontent="e.content"
      :pediting="e.content.length === 0"
      @update="updateRecipe"
      @remove="removeRecipe"
    ></Recipe>

    <button @click="newRecipe">
      Add Recipe
    </button>

  </div>
</template>

<!-- Interestingly, functions can be passed down as props just like
     in React, as an alternative to event handling.

      :updateRecipe="updateRecipe"
      :removeRecipe="removeRecipe"
-->

<script>
import Recipe from './components/Recipe'

export default {
  name: 'app',
  components: { Recipe },
  data () {
    return {
      nextId: 1,
      recipes: [{
        id: 0,
        content: 'Pinnekjøtt med rotmos\n\n2 kg pinnekjøtt\n1.25 kg kålrot\n2 stk gulrot\n1 stk potet\n1 dl kremfløte\n3 ss smør\n2 ts salt\n0.5 ts pepper'
      }]
    }
  },
  methods: {
    newRecipe () {
      this.recipes.push({
        id: this.nextId++,
        content: ''
      })
    },
    updateRecipe (index, content) {
      this.recipes = this.recipes.map((e) => {
        if (e.id === index) {
          return {
            id: index,
            content: content
          }
        } else {
          return e
        }
      })
    },
    removeRecipe (index) {
      this.recipes = this.recipes.filter(
        (e) => e.id !== index
      )
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

#app > div {
  background-color: hsl(59, 57%, 87%);
  padding: 0 1em 0 1em;
  margin: 1em;
  border-radius: 0.3em;
  cursor: pointer;
}

#app > button {
  background-color: white;
  height: 6em;
  padding: 1em;
  margin: 1em;
  border: 0.2em dotted hsl(0, 0%, 90%);
  border-radius: 0.3em;
  font-size: 1em;
  cursor: pointer;
}

#app > button::-moz-focus-inner {
    border: 0;
}
</style>
