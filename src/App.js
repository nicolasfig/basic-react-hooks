import React, {useState} from "react";
import Auth from "./components/Auth";
import Todo from "./components/Todo";
import Header from "./components/Header";

const App = props => {
  
  const [page, setPage] = useState('auth');

  const switchPage = pageName => {
    setPage(pageName);
  }

  return (
		<div className="App">
			<Header onLoadTodos={switchPage.bind(this, 'todos')} onLoadAuth={switchPage.bind(this, 'auth')} />
			<hr />
      {page === 'auth' ? <Auth /> : <Todo />}
		</div>
	);
};

export default App;
