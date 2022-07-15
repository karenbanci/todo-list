// import React from "react";
import {database} from "../firebase/myFirebase";
import {ref, push, child, update, get} from "firebase/database"

const ToDoList = {

  // adicionar tarefa
  addTask: function (title, completionDate) {
    const taskData = {
      title: title,
      completionDate: completionDate,
      completed: false,
    }
    // aqui estou gerando o ID da tarefa
      const taskId = push(child(ref(database), 'tasks')).key;

    // criando uma tarefa
    let updateTask = {};
    updateTask["/tasks/" + taskId] = taskData;

    // fazer atualização no banco de dados do firebase
    return update(ref(database), updateTask)
      .then(function () {
        console.log('success');
        return { success: true, message: "Task was created with success" };
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
        return { success: false, message: `Failed: ${error.message}` };
      });
  },

  showTasks: function () {
    get(
      child(ref(database), "tasks/")).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("nao disponível");
        }
      })
    .catch((error) => {
      console.error(error);
    });
  }

  // function  removeTask() {
  //   if(!taskId){
  //     return { success: false, message: "Invalid task" };
  //   }
  //   // vai pegar a referência do nó
  //   let taskRef = database.child('/tasks' + taskId);

  //   taskRef.remove()
  //     .then(function () {
  //       return { success: true, message: "Task was removed with success" };
  //     })
  //     .catch(function (error) {
  //       return { success: false, message: `Remove failed: ${error.message}` };
  //     });

  // }

  // atualizar caso eu queira editar a tarefa
  // function updateTask(data, completionDate) {
  //   if (!taskId) {
  //     return { success: false, message: "Invalid task" };
  //   }

  //   let taskRef = database.child("/tasks" + taskId);

  //   let updateTask = {};
  //   updateTask["/tasks"] = data;
  //   updateTask["/completionDate"] = completionDate;

  //   taskRef.update(updateTask)
  //     .then(function () {
  //       return { success: true, message: "Updated with success" };
  //     })
  //     .catch(function (error) {
  //       return {
  //         success: false,
  //         message: `Failed: ${error.message}`,
  //       };
  //     });
  // }


  // taskDataBase.new = addTask;
  // taskDataBase.remove = removeTask;
  // taskDataBase.update = updateTask;


}

export default ToDoList
