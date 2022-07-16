// import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useEffect } from "react";
import ToDoList from "./todo-list";
import "./todo-list.css";

export default function ToDoView() {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  function handleTaskSubmit(event) {
    event.preventDefault();
    console.log(taskName, taskDate);
    ToDoList.addTask(taskName, taskDate).then((res) => {
      // atualizar a pagina apos clicar na caixa check
      refreshTasks();
    });
  }

  function editTask(task, event) {
    event.preventDefault();
    ToDoList.updateTask(
      event.target.value, // vai editar o title
      task.completionDate,
      task.completed,
      task.id)
      .then((res) => {
        refreshTasks();
      })
  }

  function refreshTasks() {
    ToDoList.showTasks()
      // pegando o setTasks do useState para mostrar a promessa
      .then((tasks) => setTasks(tasks));
  }

  // atualizar o banco de dados na conclusão da tarefa
  function handleCheckboxSubmit(task, event) {
    event.preventDefault();
    console.log(task);
    console.log(event);
    ToDoList.updateTask(
      task.title,
      task.completionDate,
      event.target.checked,
      task.id
    ).then((res) => {
      // atualizar a pagina apos clicar na caixa check
      refreshTasks();
      console.log(task);
    });
  }

  // o useEffect vai renderizar minha tarefa dentro da div show tasks
  useEffect(() => {
    refreshTasks();
  }, []);

  // deletar a tarefa
  function deleteTask(task, event) {
    event.preventDefault();
    ToDoList.removeTask(task.id).then((res) => {
      refreshTasks();
    });
  }

  return (
    <div className="container">
      <div className="card-todo">
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
              min="01-01-2022"
              max="31-12-2023"
              onChange={(e) => setTaskDate(e.target.value)}
              value={taskDate}
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
      {/* imprimir cada tarefa que foi adicionada, lembrando que map só é utilizada para array, nesse caso tem que utilizar o Object para trabalhar junto com o map */}
      {tasks.map((task, id) => {
        console.log(task);
        return (
          <div className="show-tasks">
            <div className="task" key={id}>

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => handleCheckboxSubmit(task, e)}
                />
                <input type="text" value={task.title} onChange={(e) => editTask(task, e)}/>

              <h3>{task.completionDate}</h3>
              <button
                className="btn-delete"
                onClick={(e) => deleteTask(task, e)}
              >
                X
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
