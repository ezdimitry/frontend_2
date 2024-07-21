<template>
  <div id="app">
    <header>
      <h1>Медведев Дмитрий</h1>
      <p>Буратино посадили в тюрьму. Зхлопнулась за ним дверь камеры. И прокурор, снимая шляпу, сказал: Наконец-то я посадил дерево!</p>
    </header>
    <div class="content-container">
      <div class="form-container">
        <form @submit.prevent="addTodo">
          <input v-model="newAuthor" placeholder="Автор" required />
          <input v-model="newTag" placeholder="Тэг" required />
          <textarea v-model="newPost" placeholder="Пост" required></textarea>
          <Button>Добавить</Button>
        </form>
      </div>
      <div class="todos-container">
        <div class="sort-controls">
          <Button @click="sortBy('author')">Сортировка по автору</Button>
          <Button @click="sortBy('tag')">Сортировка по тегу</Button>
          <Button @click="sortBy('none')">Без сортировки</Button>
        </div>
        <todo-table :todos="sortedTodos" @deleteTodo="showConfirmDialog"></todo-table>
        <p v-if="todos.length === 0">Нет записей для отображения</p>
      </div>
    </div>
    <confirmation-dialog 
      :isVisible="isDialogVisible" 
      message="Вы уверены, что хотите удалить запись?" 
      @confirm="handleConfirmDelete" 
      @cancel="handleCancelDelete">
    </confirmation-dialog>
  </div>
</template>

<script>
import TodoTable from './components/TodoTable.vue';
import Button from './components/UI/Button.vue';
import ConfirmationDialog from './components/UI/ConfirmationDialog.vue';

export default {
  components: {
    TodoTable,
    Button,
    ConfirmationDialog
  },
  data() {
    return {
      newAuthor: '',
      newTag: '',
      newPost: '',
      todos: [],
      sortOrder: 'none',
      isDialogVisible: false,
      deleteIndex: null
    };
  },
  methods: {
    addTodo() {
      this.todos.push({
        author: this.newAuthor,
        tag: this.newTag,
        post: this.newPost
      });
      this.newAuthor = '';
      this.newTag = '';
      this.newPost = '';
    },
    showConfirmDialog(index) {
      this.deleteIndex = index;
      this.isDialogVisible = true;
    },
    handleConfirmDelete() {
      if (this.deleteIndex !== null) {
        this.deleteTodo(this.deleteIndex);
        this.deleteIndex = null;
      }
      this.isDialogVisible = false;
    },
    handleCancelDelete() {
      this.deleteIndex = null;
      this.isDialogVisible = false;
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    sortBy(order) {
      this.sortOrder = order;
    }
  },
  computed: {
    sortedTodos() {
      if (this.sortOrder === 'author') {
        return [...this.todos].sort((a, b) => a.author.localeCompare(b.author));
      } else if (this.sortOrder === 'tag') {
        return [...this.todos].sort((a, b) => a.tag.split(',').length - b.tag.split(',').length);
      } else {
        return this.todos;
      }
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background-color: #2c3e50;
  margin-top: 60px;
  min-height: 100vh;
}
header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #42b983;
  padding: 20px;
  color: white;
  z-index: 1000;
}
header h1 {
  margin: 0;
}
header p {
  margin: 10px 0 0;
  font-size: 16px;
}
.content-container {
  display: flex;
  margin-top: 100px;
  padding: 20px;
}
.form-container {
  flex: 1;
  max-width: 300px;
  padding: 20px;
}
.todos-container {
  flex: 2;
  padding: 20px;
  max-width: 700px;
}
.sort-controls {
  margin-bottom: 20px;
}
form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
form input, form textarea {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
}
form textarea {
  height: 100px;
}
</style>