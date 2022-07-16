import {ToDoList} from './todo-list';
import './todo-list.css';

export default function ToDoView(){
  return (
    <div className="container">
      <div className="logo">
        <img src="images/logo.png" alt="logo-monsters-univesity" />
      </div>
      <div className="card-todo">
        <img
          className="card-image"
          src="images/prof-knight.webp"
          alt="prof-knight"
        />

        <div className="add-tasks">
          <div className="taskInformation">
            <label for="taskName">Tarefa</label>
            <input
              type="text"
              placeholder="Descreva o nome da tarefa"
              className="taskName"
            ></input>
          </div>
          <div className="taskInformation">
            <label for="taskConclution">Data de conclusão</label>
            <input
              type="date"
              className="taskDate"
              id="start"
              name="trip-start"
              min="2022-01-01"
              max="2023-12-31"
            ></input>
          </div>
          <input type="submit" value="Adicionar" className="btn-submit"/>
        </div>
      </div>
        <div className="show-tasks">
          <div className="task">
            <h2>Name</h2>

          </div>
        </div>
    </div>
  );

}
