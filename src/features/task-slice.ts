// ducks pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Task } from "@mui/icons-material";

export interface Task {
  taskId: number;
  completed: boolean;
  content: string;
};

let counter= 2

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
      content: "Prova a mettere una nuova nota",
    },] as Task[],  
  reducers: {
    // SaveTasks into local storage
    savedTask(state) {
      const currentData = JSON.stringify(state);
      localStorage.setItem("currentData", (currentData));
    },

    // loadTasks from local storage
    loadedTask(state) {
      const storageData: string | null = localStorage.getItem("currentData");      
      const jsonData: Task[] = JSON.parse(storageData!);
      console.log("da storage",storageData);        
      console.log("parsato",jsonData);
      // state.push(newTask);
      return jsonData
    },


    // addTask
    addedTask(state, actions: PayloadAction<string>) {
      const newTask: Task = {
        taskId: counter,
        completed: false,
        content: actions.payload
      };
      counter++;
      state.push(newTask);

      // const newItems = JSON.stringify(newTask)
      // localStorage.setItem("myItems",newItems);

    },
    
    // modifyTask
    updatedTask(state, action: PayloadAction<{ taskId: number; newContent: string }>) {
      return state.map(task => {
        console.log('pippo qui');
        if (task.taskId === action.payload.taskId) {
          
          return {...task, content: action.payload.newContent};
        }
        return task;
      });
    },
    
    // deleteTask
    deletedTask(state, action: PayloadAction<number>) {
      return state = state.filter(task => task.taskId !== action.payload)
        }
      }
});

export const { addedTask, savedTask,loadedTask, deletedTask, updatedTask } = taskSlice.actions
export default taskSlice.reducer

