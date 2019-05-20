import React, { useState, useEffect } from "react";


const Todo = props => {
	const url = "https://basic-hooks.firebaseio.com/todos.json";
	// state hooks
	const [todo, setTodo] = useState("");
	const [todoList, setTodoList] = useState([]);

	// effect hooks
	useEffect(() => {
		fetch(url)
			.then(response => {
                return response.json()
			})
			.then(data => {
                console.log(data);
                const todos = []
                for(let key in data){
                    todos.push({id: key, name: data[key].todo})
                }
                setTodoList(todos)
			})
			.catch(error => {
				console.log(error);
            });
            
            return () => {
                console.log('Cleanup')
            }
    }, []);


    /* const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY)
    }


    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousedown', mouseMoveHandler);
        }
    }, []); */

	const todoChangeHandler = event => {
		event.preventDefault();
		setTodo(event.target.value);
	};

	const todoAddHandler = () => {
		setTodoList([...todoList, todo]);
		fetch(url, {
			method: "POST",
			body: JSON.stringify({ todo: todo })
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
		setTodo("");
	};

	return (
		<React.Fragment>
			<ul>
				{todoList.map((todo) => (
					<li key={todo.id}>{todo.name}</li>
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
