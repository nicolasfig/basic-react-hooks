import React, { useState } from "react";

const Todo = props => {
	const [todo, setTodo] = useState("");
	const [todoList, setTodoList] = useState([]);

	const todoChangeHandler = event => {
		event.preventDefault();
		setTodo(event.target.value);
	};

	const todoAddHandler = () => {
		setTodoList(todoList.concat(todo));
		setTodo("");
	};

	return (
		<React.Fragment>
			<ul>
				{todoList.map((todo, index) => (
					<li key={index}>{`${index} = ${todo}`}</li>
				))}
			</ul>
			<input
				type="text"
				placeholder="Todo"
				onChange={todoChangeHandler}
				value={todo}
			/>
			<button onClick={todoAddHandler}>Add</button>
		</React.Fragment>
	);
};

export default Todo;
