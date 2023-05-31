// ducks pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../app/hooks";

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
      content: "Chiama il dottore",
    },
  ] as Task[],
  reducers: {
    // getTask
    listedTask(state) {
    //   const newItems = JSON.stringify(newTask)
    //   localStorage.setItem("myItems",newItems);

      return state
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

    
      const newItems = JSON.stringify(newTask)
      localStorage.setItem("myItems",newItems);

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

export const { addedTask, listedTask, deletedTask, updatedTask } = taskSlice.actions
export default taskSlice.reducer

