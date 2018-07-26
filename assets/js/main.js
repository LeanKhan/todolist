//TodoList v1.

//TodoList Object
var newBranch = "New Branch Made";//New

var todoList = {
	todos: [], //Array of todos, containing objects
	//Method to add new Todo
	addTodo: function(todoText) {
		var timeStamp = new Date();
		this.todos.push({
			todoText: todoText,
			completed: false,
			timeStamp: timeStamp.toLocaleTimeString(),
		});
		view.displayTodos();
	},
	//Method to delete Todos
	deleteTodo: function(position){
		this.todos.splice(position,1);
		view.displayTodos();
	},
	//Method to edit todo
	changeTodo: function(position,newValue){
		var timeStamp = new Date();
		this.todos[position].todoText = newValue;
		this.todos[position].timeStamp = timeStamp.toLocaleTimeString();
		view.displayTodos();
	},
	//Method to change todo completed status
	changeCompleted: function(position){
		this.todos[position].completed = !this.todos[position].completed;
		view.displayTodos();
	}
};

//View Object

var view = {
	//Method to display Todos
	displayTodos: function(){
		var todos = todoList.todos;

		//Selecting the main List element
		var todosUl = document.querySelector('ul');
		todosUl.innerHTML = '';

		for (var i = 0; i < todos.length; i++) {
			//Create Todo Item Element
			var todoItem = document.createElement('div');
			//Give todoItem div a unique Id
			todoItem.setAttribute("id",i.toString());
			todoItem.setAttribute("class","todo-item d-flex justify-content-between");
			//Create other child elements
			var todoItemText = document.createElement('div');
			todoItemText.setAttribute("class","todo-item-text mr-3");
			var todoText = document.createElement('h4');
			var timeStamp = document.createElement('h5');

			//Attaching Todo content to Elements
			todoText.innerText = todoList.todos[i].todoText;
			timeStamp.innerText = "Edited" + todoList.todos[i].timeStamp;	

				if(todos[i].completed == true){
					todoText.setAttribute("class","todo-text-completed");
					timeStamp.setAttribute("class","todo-text-completed");
				}
			//Append Check button to TodoItem Div
			todoItem.appendChild(this.createCompletedButton());
			//Append todoText and timeStamp elements to parent div
			todoItemText.appendChild(todoText);
			todoItemText.appendChild(timeStamp);
			//Append todoItemText Div to parent Div (todoItem)
			todoItem.appendChild(todoItemText);
			//Append Delete button to todoItem Div
			todoItem.appendChild(this.createDeleteTodoButton());

			//Append todoItem Div to Parent Ul Element
			todosUl.appendChild(todoItem);
		}
	},
	//This returns the Check button toggle Completed todos
	createCompletedButton: function(){
		var completedButton = document.createElement('button');
		completedButton.setAttribute("class","todo-completed mr-3");
		return completedButton;
	},
	//This returns the button for deleting todos;
	createDeleteTodoButton: function(){
		var deleteTodoButton = document.createElement('button');
		deleteTodoButton.setAttribute("class","delete-todo");
		return deleteTodoButton;
	}
};
//Object used to interact with HTML elements
var handlers = {
	addTodo: function(){
		//Grab Input Field
		var todoTextInput = document.getElementById('todotext-input');
		todoList.addTodo(todoTextInput.value);
		todoTextInput.value = '';
		view.displayTodos();
	},
	//Method that facilitates event listeners
	setUpEventListeners: function(){
		//Initializing HTML elements to operate on

		var todosUl = document.querySelector('ul');
		var todoTextInput = document.getElementById("todotext-input");
		var addTodoButton = document.getElementById("addtodo-button");

		//Event Listener for todoTextInput Field
		todoTextInput.addEventListener("keyup",function(event){
			event.preventDefault();
			if(event.keyCode === 13){
				if(todoTextInput.value == ''){
					alert("Please add a Todo!");
				}
				else{
				// console.log(event);
				handlers.addTodo();
				}
			}
		});//Event Listener for the AddTodoButton
		addTodoButton.addEventListener("click",function(){
			if(todoTextInput.value == ''){
				alert("Please add a Todo!");
			}else{
				handlers.addTodo()
			}
		});
		   //Event Listener for the entire todo list.
		   todosUl.addEventListener("click",function(event){
		   	var target = event.target;
		   		// console.log(event);
		   		//Event Delegation
		   		if(target.className === "delete-todo"){
		   			var popUp = confirm("Are you sure you want to delete this todo?");
		   			if(popUp == true){todoList.deleteTodo(parseInt(target.parentElement.id));}
		   		}else if(target.className == "todo-completed mr-3"){
		   			todoList.changeCompleted(parseInt(target.parentElement.id));
		   		}
		   });
	}
};
//Object used to handle Events
handlers.setUpEventListeners();