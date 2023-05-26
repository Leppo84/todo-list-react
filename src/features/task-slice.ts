// ducks pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  taskId: number;
  completed: boolean;
  content: string;
};

const newId = 2;
const ifcompleted = false;
const addingContent = "Nuovo Todo"

const newTask: Task = {
  taskId: newId,
  completed: ifcompleted,
  content: addingContent
}

export const taskSlice = createSlice({
  name: 'taskManager',
  initialState: [
    {
      taskId: 0,
      completed: true,
      content: "Carica i dati",
    },  {
      taskId: 1,
      completed: false,
      content: "Chiama il dottore",
    },
  ],
  reducers: {
    // addTask
    addedTask(state) {
      state = [...state, newTask]
    },
    // getTask
    // listedTask(state) {
    //   return state
    // },
    // modifyTask
    // updatedTask(state) {
    //   return state
    // },
    // deleteTask
    // deletedTask(state) {
    //   return state
    // },

  }
});
// console.log("userAdded");

export const { addedTask } = taskSlice.actions
export default taskSlice.reducer

