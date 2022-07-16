import React, { useState, useEffect } from "react";
import ToDoList from "./todo-list";
import "./todo-list.css";

export default function ToDoView() {
  // aqui estou fazendo um submite da tarefa, quando for clicar no botao de adicionar
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  function handleTaskSubmit(event) {
    event.preventDefault();
    // setTaskName(event.targe.value);
    console.log(taskName, taskDate);
    ToDoList.addTask(taskName, taskDate);
    // setTaskDate(event.targe.value);
  }

  // o useEffect vai renderizar minha tarefa dentro da div show tasks
  useEffect(() => {
    ToDoList.showTasks()
      // pegando o setTasks do useState para mostrar a promessa
      .then((tasks) => setTasks(tasks));
  }, []);

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

        <form className="add-tasks" onSubmit={handleTaskSubmit}>
          <div className="taskInformation">
            <label for="taskName">Tarefa</label>
            <input
              type="text"
              placeholder="Descreva o nome da tarefa"
              className="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
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
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
            ></input>
          </div>
          <input
            type="submit"
            value="Adicionar"
            className="btn-submit"
            onSubmit={handleTaskSubmit}
          />
        </form>
      </div>
      {/* imprimir cada tarefa que foi adicionada */}
      {Object.keys(tasks).map((task, id) => (
        <div className="show-tasks">
          <div className="task" key={id}>
            <input type="checkbox" value={tasks[task].completed} />
            <h2>
              {tasks[task].title}
            </h2>
            <h3>{tasks[task].completionDate}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
