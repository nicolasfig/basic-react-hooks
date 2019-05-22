import React, {useEffect, useReducer, useRef } from "react";
import axios from "axios";

const Todo = props => {
	const url = "https://basic-hooks.firebaseio.com/todos";
	// state hooks
	//const [todo, setTodo] = useState("");
	//const [todoList, setTodoList] = useState([]);

	const todoListReducer = (state, action) => {
		switch (action.type) {
			case "ADD":
				return state.concat(action.payload);
			case "SET":
				return action.payload;
			case "DELETE":
				return state.filter(todo => todo.id !== action.payload);
			default:
				return state;
		}
	};

	const [todoList, dispatch] = useReducer(todoListReducer, []);
	const todoInputRef = useRef();

	// effect hooks get
	useEffect(() => {
		axios
			.get(`${url}.json`)
			.then(response => {
				console.log(response.data);
				const todoData = response.data;
				const todos = [];
				for (const key in todoData) {
					todos.push({ id: key, name: todoData[key].name });
				}
				dispatch({ type: "SET", payload: todos });
			})
			.catch(error => {
				console.log(error);
			});
		return () => {
			console.log("Cleanup");
		};
	}, []);

	/* const todoChangeHandler = event => {
		event.preventDefault();
		setTodo(event.target.value);
	}; */

	const todoAddHandler = () => {

		const todo = todoInputRef.current.value;

		axios
			.post(`${url}.json`, { name: todo })
			.then(response => {
				const todoItem = { id: response.data.name, name: todo };
				dispatch({ type: "ADD", payload: todoItem });
			})
			.catch(error => {
				console.log(error);
			});
		//setTodo("");
	};

	const deleteHandler = todoId => {
		axios
			.delete(`${url}/${todoId}.json`)
			.then(response => {
				dispatch({ type: "DELETE", payload: todoId });
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<React.Fragment>
			<ul>
				{todoList.map(todo => (
					<li
						key={todo.id}
						onClick={deleteHandler.bind(this, todo.id)}
					>
						{todo.name}
					</li>
				))}
			</ul>
			<input
				type="text"
				placeholder="Todo"
				ref={todoInputRef}
			/>
			<button onClick={todoAddHandler}>Add</button>
		</React.Fragment>
	);
};

export default Todo;
