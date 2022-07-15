import './App.css';
import ToDoList from './pages/todo-list';

function App() {
  // console.log(ToDoList);
  // console.log(ToDoList.addTask);

  console.log(ToDoList.addTask("karen", new Date()));
  console.log(ToDoList.showTasks());

  return (
    <div className="App">
      {/* <ToDoList/> */}
    </div>
  );
}

export default App;
