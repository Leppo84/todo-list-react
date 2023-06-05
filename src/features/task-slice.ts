// ducks pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@mui/icons-material";
import isEqual from "lodash.isequal";
import { useState } from "react";

export interface Task {
  taskId: number;
  completed: boolean;
  content: string;
};

const storageData: string | null = localStorage.getItem("currentData");      
const jsonData: Task[] = JSON.parse(storageData!);

let counter = 1;

export const taskSlice = createSlice({
  name: 'taskManager',
  initialState: jsonData as Task[],  
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
      return jsonData
    },
    
    // addTask
    addedTask(state, action: PayloadAction<string>) {
      counter = 1
      if (state.length > 0) {
        counter = state[state.length -1].taskId +1;
      }
      const newTask: Task = {
        taskId: counter,
        completed: false,
        content: action.payload
      };
      state.push(newTask);
    },
      
    // modifyTask
    updatedTask(state, action: PayloadAction<{ taskId: number; newContent: string }>) {
      return state.map(task => {
        if (task.taskId === action.payload.taskId) {
          
        // const [content, setContent] = React.useState('');
        return {...task, content: action.payload.newContent};
        }
        return task;
      });
    },
    
    // deleteTask
    deletedTask(state, action: PayloadAction<number>) {
      return state = state.filter(task => task.taskId !== action.payload)
    },
    
    // toggle done/undone
    toggledStatusTask (state, action: PayloadAction<number>) {
      console.log(action.payload);
      return state.map(task => {
        let status: boolean = task.completed;
        status = !status
        if (task.taskId === action.payload) {
          return {...task, completed: status}
        }
        return task;
      })
    },

    // alert to save modifications
      
      // let flatState: string = JSON.stringify(state);
      // let jsonState: any = JSON.parse(state);
      // const objectsEqual = (o1: Task | Task[] | null, o2: Task | Task[] | null): boolean => {
      //   console.log("Dati nello storage: ", jsonData);
      //   console.log("Dati nello state: ",state);
      //   console.log("State stringhifato",flatState);
        
      //   if (o2 === null && o1 !== null) return false;
      //   if (Array.isArray(o1) && Array.isArray(o2) && o1.length === o2.length) {
      //     return o1.every((item, index) => objectsEqual(item, o2[index]));
      //   }
      //   return o1 === o2;    
      // }
      // objectsEqual(jsonData,state)?
      //   console.log("I Json sono uguali")
      // :
      //   console.log("I Json sono diversi");
      //  return state;
      // }
    }
});

export const { addedTask, savedTask,loadedTask, deletedTask, updatedTask, toggledStatusTask } = taskSlice.actions
export default taskSlice.reducer