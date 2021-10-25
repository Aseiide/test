new Vue ({
  el: "#app",
  data: {
    newItem: "",
    todos: []
  },
  watch: {
    todos: {
      handler: function() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
      deep: true
    }
  },
  mounted: function() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  },
  methods: {
    addItem: function() {
      const item = {
        title: this.newItem,
        isDone: false
      }
      this.todos.push(item)
      this.newItem = ""
    },
    deleteItem: function(index) {
      if (confirm("are you sure?")) {
        this.todos.splice(index, 1)
      }
    }
  }
})
Vue.component('todo-item', {
  data: function () {
    return {}
  },
  props: ['todo', 'index', 'deleteItem'],
  template: '#todo-item'
})
