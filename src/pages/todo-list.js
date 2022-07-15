// import React from "react";
import {firebase} from "../firebase/firebase";

export default function TodoList() {
  // vou usar em todas as funções
  let taskId = false;

  // adicionar tarefa
  function addToDoList(data) {
    const taskData = {
      data: data,
      completionDate: firebase.database.ServerValue.now(),
      status: false,
    };

    // se a tarefa não foi criada
    if (!taskId) {
      taskId = firebase.database().ref().child("tasks").push().key;
    }

    // fazer atualização
    let updateTask = {};
    updateTask["/tasks" + taskId] = taskData;
    updateTask["/completionDate" + taskId] = taskData;

    // pegar a referência do banco de dados
    let taskRef = firebase.database().ref();

    //
    taskRef
      .update(updateTask)
      .then(function () {
        return { success: true, message: "Task was created successeful" };
      })
      .catch(function (error) {
        return { success: false, message: `Failed: ${error.message}` };
      });
  }
}
