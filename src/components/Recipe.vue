<template>
  <div v-if="editing"
    :id="recipeId">

    <textarea class="Recipe-edit"
      ref="editArea"
      v-model="content"
      :style="{ height: height + 'px' }"
    ></textarea>

    <br>

    <button class="Icon-button"
      @click="onSave">
      <i class="fa fa-save"></i>
    </button>

    <button class="Icon-button"
      @click="onCancel">
      <i class="fa fa-times"></i>
    </button>

    <button class="Icon-button Trash-button"
      @click="onDelete">
      <i class="fa fa-trash"></i>
    </button>

  </div>
  <div v-else 
    :id="recipeId"
    ref="recipeDiv"
    @click="onClick"
    :class="{ 'Recipe-empty': isEmpty }">

    <p>{{ content }}</p>

  </div>
</template>

<script>
export default {
  name: 'Recipe',
  props: ['index', 'pcontent', 'pediting'],
  data () {
    return {
      content: this.pcontent,
      editing: this.pediting,
      height: 256
    }
  },
  mounted () {
    this.focusArea()
  },
  updated () {
    this.focusArea()
  },
  computed: {
    recipeId () {
      return 'Recipe-' + this.index
    },
    isEmpty () {
      return this.content.length === 0
    }
  },
  methods: {
    toggleEdit () {
      this.editing = !this.editing
    },
    focusArea () {
      if (this.editing) {
        this.$refs.editArea.focus()
      }
    },
    onClick () {
      this.height = this.$refs.recipeDiv.clientHeight
      this.toggleEdit()
    },
    onSave () {
      this.$emit('update', this.index, this.content)
      this.toggleEdit()
    },
    onCancel () {
      if (this.pcontent.length === 0) {
        this.$emit('remove', this.index)
      } else {
        this.content = this.pcontent
        this.toggleEdit()
      }
    },
    onDelete () {
      this.$emit('remove', this.index)
    }
  }
}
</script>

<style scoped>
p {
  white-space: pre-line;
  line-height: 1.6em;
}

.Recipe-edit {
  font-family: serif;
  margin: 1em 0 0 0;
  padding: 0.4em;
  background-color: hsl(59, 20%, 90%);
  border: 0.1em solid hsl(59, 30%, 80%);
  border-radius: 0.2em;
  font-size: 1em;
  line-height: 1.6em;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  box-shadow: hsl(0, 0%, 10%) 0 0.05em 0.15em inset;
  cursor: auto;
}

.Recipe-empty {
  width: 10em;
  height: 16em;
}

.Icon-button {
  border: 0;
  background-color: transparent;
  color: gray;
  font-size: 1.2em;
  cursor: pointer;
  margin: 0.2em 0 0.4em 0;
}

.Icon-button:hover {
  color: black;
}

.Trash-button {
  float: right;
}
</style>
