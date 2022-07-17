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

  // editar o título da tarefa
  function editTaskTitle(task, event) {
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
  // editar a data da tarefa
    function editTaskDate(task, event) {
      console.log(task);
      console.log(event);

      event.preventDefault();
      ToDoList.updateTask(
        task.title,
        event.target.value, // vai editar a data
        task.completed,
        task.id
      )
    }

  // essa função vou reaproveitar para quando adicionar, editar ou deletar uma tarefa, a página será atualizada
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
      <h1>Lista de tarefas</h1>
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
              value={taskDate}
              required
              min="01-01-2022"
              max="31-12-2050"
              onChange={(e) => setTaskDate(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Adicionar"
            className="btn-submit"
            onSubmit={handleTaskSubmit}
          />
        </form>
      </div>
      {/* imprimir cada tarefa que foi adicionada, lembrando que map só é utilizada para array */}
      {tasks.map((task, id) => {
        console.log(task);
        return (
          <div className="show-tasks">
            <div className="task" key={id}>
              <input
                type="checkbox"
                className="checkbox"
                checked={task.completed}
                onChange={(e) => handleCheckboxSubmit(task, e)}
              />
              {/* editar o tilulo da tarefa */}
              <input
                className="editTask"
                type="text"
                value={task.title}
                onChange={(e) => editTaskTitle(task, e)}
              />
              {/* editar a data da tarefa */}
              <input
                type="date"
                className="editTask"
                value={task.completionDate}
                onChange={(e) => editTaskDate(task, e)}
                // onBlur tira o foco do campo date, ou seja, eu escolho a data de edicao e clico fora que ele salva no banco de dados a nova data
                onBlur={refreshTasks}
              />
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
