const app = new Vue({
  el: "#app",
  data: {
    inputAdd: "", 
    todos: [], 
  },
  created: function() {
    const todosJsonObj = localStorage.getItem("todosKey"); 
    const todosData = JSON.parse(todosJsonObj); 
    for (let i = 0; i < todosData.length; i++) {
      todosData[i].isEditMode = false; 
    }
    this.todos = todosData; 
  },
  methods: {
    addItem() {
      if (this.inputAdd == "") {
        return true; 
      }
      const todo = {
        item: this.inputAdd, 
        isCheck: false, 
        isEditMode: false, 
      };
      this.todos.push(todo); 
      this.inputLocalStrage(); 
      this.inputAdd = ""; 
    },
    deleteItem(index) {
      this.todos.splice(index, 1); 
      this.inputLocalStrage(); 
    },
    editItem(index, state) {
      if (this.todos[index].isEditMode) {
        this.todos[index].isEditMode = false; 
        if (state == "cancel") {
          this.inputLocalStrage(); 
          return true; 
        }
        let afterText = document.getElementById("editTextArea" + index).value; 
        if (afterText) {
          this.todos[index].item = afterText; 
        }
      } else {
        this.todos[index].isEditMode = true;
      }
      this.inputLocalStrage(); 
    },
    saveCheckState(index) {
      if (this.todos[index].isCheck) {
        this.todos[index].isCheck = false; 
      } else {
        this.todos[index].isCheck = true; 
      }
      this.inputLocalStrage(); 
    },
    inputLocalStrage() {
      const obj = JSON.stringify(this.todos);
      localStorage.setItem("todosKey", obj); 
    },
  },
});
