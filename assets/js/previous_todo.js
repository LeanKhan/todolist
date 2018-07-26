var todoList = {
  todos: [],
  addTodo: function(todoText,todoDescription) {
    this.todos.push({
      todoText: todoText,
      todoDescription: todoDescription,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Get number of completed todos.
    this.todos.forEach(function(todo){
      if(todo.completed === true){
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo){
      //Case 1: If everything is true, make everything false.
      if(completedTodos === totalTodos){
        todo.completed = false;
        //Case 2: Otherwise (if everything is NOT true) make everything true.
      }else{
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    var addTodoDescriptionInput = document.getElementById('todo-description');
    todoList.addTodo(addTodoTextInput.value,addTodoDescriptionInput.value);
    addTodoTextInput.value = '';
    addTodoDescriptionInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  // toggleCompleted: function() {
  //   var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
  //   todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
  //   toggleCompletedPositionInput.value = '';
  //   view.displayTodos();
  // },
  toggleCompleted: function(position){
  todoList.toggleCompleted(position);
    
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  newChangeTodo: function(position,todoText){
    todoList.changeTodo(position,todoText);
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    //To reference the object in a forEach function: array.forEach(callback-function, this);
    //'this' refers to the object that the forEach function is located.
    //While 'callback-function' is the callback function you run on every element of the array.
    
    todoList.todos.forEach(function(todo,position){
    var todoDiv = document.createElement('div');
    var todoTextDiv = document.createElement('div');
    var todoFunctionDiv = document.createElement('div');
    var todoText = document.createElement('h4');
    var todoDescription = document.createElement('p');
    var todoTime = document.createElement('small');
    var todoTextWithCompletion = '';
    var toggleButton = this.createToggleCompletedButton();
    var deleteButton = this.createDeleteButton();
    var time = new Date();
    todoTime.innerText = time.toLocaleTimeString();
        deleteButton.id = position;
        toggleButton.id = position;

      if (todo.completed === true) {
        todoTextWithCompletion =  "<del>" + todo.todoText + "</del>";
        todoDescription.textContent = todo.todoDescription;
        toggleButton.innerHTML= "<i class='fas fa-check-circle' id='checked'></i>";
        todoDiv.style.backgroundColor = "#e2e2e2";
      } else {
        todoTextWithCompletion = todo.todoText;
        todoDescription.textContent = todo.todoDescription;
        toggleButton.innerHTML = "<i class='fas fa-check-circle' id='unchecked'></i>"        
      }
      
      
      todoText.innerHTML = todoTextWithCompletion;
      todoText.className = "todoTextInDiv";
      todoDiv.id = position;
      todoText.id = position;
      todoTextDiv.id = position;
      todoDescription.id = position;
      todoDiv.className = "list-group-item flex-column align-items-start";
      todoTextDiv.className = "d-flex justify-content-between";
      todoFunctionDiv.id = position;
      todoFunctionDiv.className = 'function-div collapse';
      todosUl.appendChild(todoDiv);
      
      
      todoTextDiv.appendChild(toggleButton);
      todoTextDiv.appendChild(todoText);
      todoTextDiv.appendChild(deleteButton);
      todoDiv.appendChild(todoTextDiv);
      todoFunctionDiv.appendChild(todoDescription);
      todoFunctionDiv.appendChild(todoTime);
      todoDiv.appendChild(todoFunctionDiv);
      
    },this);
  },
  createDeleteButton: function(){
  var deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.className = 'deleteButton btn btn-default';
    return deleteButton;
  },
  setUpEventListeners: function() {
  var todoUl = document.querySelector('ul');
  todoUl.addEventListener('click',function(event){
  var elementClicked = event.target;
      if (elementClicked.className === 'deleteButton btn btn-default'){
        //Run handlers.deleteTodo
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      } else if (elementClicked.className === "todoTextInDiv") {
        var listItem = document.getElementById(elementClicked.id);
        elementClicked.setAttribute("contentEditable",true);
        elementClicked.addEventListener("keyup",function(event){
          event.preventDefault();
          if (event.keyCode === 13){
          handlers.newChangeTodo(elementClicked.id,elementClicked.textContent);
          }
        })
      } else if (elementClicked.className === "toggleButton btn btn-default"){
                 todoList.toggleCompleted(elementClicked.id);
                  view.displayTodos();
      } else if (elementClicked.parentNode.className === "toggleButton btn btn-default"){
                
                 todoList.toggleCompleted(elementClicked.parentNode.id);
                  view.displayTodos();
      }
    });
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    addTodoTextInput.addEventListener('keyup',function(event){
      event.preventDefault();
      if(event.keyCode === 13){
        view.collapseTodoInputCard();
        handlers.addTodo();
      }
//       addTodoTextInput.addEventListener('click',function(){
        
//       });
    });
    var addTodoDescriptionInput = document.getElementById('todo-description');
    addTodoDescriptionInput.addEventListener('keyup',function(event){
      event.preventDefault();
      if(event.keyCode === 13){
        view.collapseTodoInputCard();
        handlers.addTodo();
      }
    });
    addTodoTextInput.addEventListener('click',function(){
        var todoDescriptionInput = document.getElementById('todo-description');
        var todoInputButtonArray = document.getElementById('todo-button-array');
        if(todoDescriptionInput.className === 'collapse'){
          todoDescriptionInput.className = 'collapse.show';
          todoInputButtonArray.className = 'collapse.show';
        }
    });
    todoUl.addEventListener('mouseover',function(event){
    var todoFunctionDivs = document.getElementsByClassName('function-div');
    var elementHovered = event.target;
    var elementHoveredId = elementHovered.id;
      if(elementHoveredId >= 0){
      //console.log(todoFunctionDivs[elementHoveredId]);
        if(todoFunctionDivs[elementHoveredId].className === 'function-div collapse'){
          todoFunctionDivs[elementHoveredId].className = 'function-div collapse.show';
        }
        
      }
    });
    todoUl.addEventListener('mouseout',function(event){
    var todoFunctionDivs = document.getElementsByClassName('function-div');
    var elementHovered = event.target;
    var elementHoveredId = elementHovered.id;
      if(elementHoveredId >= 0){
        if(todoFunctionDivs[elementHoveredId].className === 'function-div collapse.show'){
          todoFunctionDivs[elementHoveredId].className = 'function-div collapse';
        }
        
      }
    })
  },
  createToggleCompletedButton: function() {
    var toggleCompletedButton = document.createElement('button');
    //toggleCompletedButton.innerHTML = '<i class="fas fa-circle"></i>';
    toggleCompletedButton.className = 'toggleButton btn btn-default';
    return toggleCompletedButton;
  },
  displayFooter: function(){
  var todoListCard = document.querySelector("div.card");
    var todoListFooter = document.createElement("div");
    var toggleAllButton = document.createElement("button");
    var todosInfo = document.createElement('small');
  if (todoList.todos.length == true){
    
    console.log("In footer");
    toggleAllButton.className = "btn btn-info";
    todoListFooter.className = "card-footer d-flex justify-content-between";
    toggleAllButton.innerText = "ToggleAll";
    if(todoList.length === 1){
    todosInfo.innerText = todoList.todos.length + " todo";
       } else {
       todosInfo.innerText = todoList.todos.length + " todos"
       };
    
    todoListFooter.appendChild(todosInfo);
    todoListCard.appendChild(todoListFooter);
    todoListFooter.appendChild(toggleAllButton);
  }
},
  collapseTodoInputCard: function(){
     var todoDescriptionInput = document.getElementById('todo-description');
     var todoInputButtonArray = document.getElementById('todo-button-array');
    
    todoDescriptionInput.className = 'collapse';
    todoInputButtonArray.className = 'collapse';
  },
  
  
};
view.displayFooter();
view.setUpEventListeners();

var buttonCollapse = document.querySelector('button.btn-primary');
var collapseItem = document.getElementById('collapseExample');

buttonCollapse.addEventListener('click',function(){
  if(collapseItem.className === 'collapse.show'){
  collapseItem.className = 'collapse';
}else{
  collapseItem.className = 'collapse.show';
}
     });

