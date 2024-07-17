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
          <button type="submit">Добавить</button>
        </form>
      </div>
      <div class="todos-container">
        <todo-table :todos="todos" @deleteTodo="deleteTodo"></todo-table>
      </div>
    </div>
  </div>
</template>

<script>
import TodoTable from './components/TodoTable.vue';

export default {
  components: {
    TodoTable
  },
  data() {
    return {
      newAuthor: '',
      newTag: '',
      newPost: '',
      todos: []
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
    deleteTodo(index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
form button {
  padding: 10px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
form button:hover {
  background-color: #369b74;
}
</style>