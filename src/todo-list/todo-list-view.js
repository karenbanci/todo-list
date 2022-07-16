// import {addTask, showTasks, updateTask, removeTask} from './todo-list/todo-list';


export default function ToDoView(){
  return (
    <div className="container">
      <div className="logo">
        <img src="../public/images/logo.webp" alt="logo-monsters-univesity" />
      </div>
      <div className="card-todo">
        <img src="../public/images/prof-knight.webp" alt="prof-knight" />
        <div className="tasks" >
          <input type="text" className="nameTask"></input>
          <input type="date" id="start" name="trip-start"
       value="2018-07-22"
       min="2018-01-01" max="2018-12-31"></input>
          <submit type="submit" className="btn-submit-task">Adicionar</submit>
        </div>
      </div>
    </div>
  );

}
