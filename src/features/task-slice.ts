// ducks pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../app/hooks";

interface Task {
  taskId: number;
  completed: boolean;
  content: string;
};


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
    // getTask
    listedTask(state) {
      return state
    },
    // addTask
    addedTask(state) {
      let counter = state.length
      const newId = counter;
      const ifcompleted = false;
      const addingContent = "Nuovo Todo"
      const newTask: Task = {
        taskId: newId,
        completed: ifcompleted,
        content: addingContent
      }
      state = [...state, newTask];
      return state
    },
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

export const { addedTask, listedTask } = taskSlice.actions
export default taskSlice.reducer

