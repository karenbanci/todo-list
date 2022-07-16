import {database} from "../firebase/myFirebase";
import {ref, push, child, update, get, remove} from "firebase/database"

const ToDoList = {
  // adicionar tarefa
  addTask: function (title, completionDate) {
    const taskData = {
      title: title,
      completionDate: completionDate,
      completed: false,
    };
    // aqui estou gerando o ID da tarefa
    const taskId = push(child(ref(database), "tasks")).key;

    // criando uma tarefa
    let updateTask = {};
    updateTask["/tasks/" + taskId] = taskData;

    // fazer atualização no banco de dados do firebase
    return update(ref(database), updateTask)
      .then(function () {
        console.log("success");
        return { success: true, message: "Task was created with success" };
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
        return { success: false, message: `Failed: ${error.message}` };
      });
  },

  // aqui vou mostrar todas as tarefas que foram adicionadas
  showTasks: function () {
    // fazer uma solicitação GET no banco de dados que obtém o resultado mais atualizado
    get(child(ref(database), "tasks/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("nao disponível");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

  updateTask: function (title, completionDate, completed, id) {
    const taskData = {
      title: title,
      completionDate: completionDate,
      completed: completed,
    };

    const updateTask = {};
    updateTask["/tasks/" + id] = taskData;
    updateTask["/completionDate/" + id] = taskData;

    return update(ref(database), updateTask)
      .then(function () {
        console.log("success");
        return { success: true, message: "Task was updated with success" };
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
        return { success: false, message: `Failed: ${error.message}` };
      });
  },

  removeTask: function (id) {
    remove(ref(database, "tasks/" + id))
      .then(function () {
        console.log('removed success');
        return { success: true, message: "Task was removed with success" };
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
        return { success: false, message: `Failed: ${error.message}` };
      });
  },

}

export default ToDoList
