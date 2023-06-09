// ducks pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@mui/icons-material";

export interface Task {
  taskId: number;
  completed: boolean;
  content: string;
};

const emptyList: Task[] = [];

const storageData: string | null = localStorage.getItem("currentData");      
const jsonData: Task[] = JSON.parse(storageData!);

let counter: number = Date.now();

export const taskSlice = createSlice({
  name: 'taskManager',
  initialState: jsonData ? (jsonData as Task[]) : (emptyList as Task[]),  
  reducers: {

    // SaveTasks into local storage
    savedTask(state) {
      if (state) {
        let currentData = JSON.stringify(state);
        localStorage.setItem("currentData", (currentData));
      }
      else {
        let currentData = "[]";
        localStorage.setItem("currentData", (currentData));
      }
    },
    
    // loadTasks from local storage
    loadedTask(state) {
      const storageData: string | null = localStorage.getItem("currentData");      
      const jsonData: Task[] = JSON.parse(storageData!);
      return jsonData
    },
    
    // addTask
    addedTask(state, action: PayloadAction<string>) {
      if ( !action.payload ) {
        return state
      }
      if (!state || state.length < 1) {
        state  = [];
        counter = Date.now();
          const newTask: Task = {
          taskId: counter,
          completed: false,
          content: action.payload
        };
      state.push(newTask);
      return state
      }
      else {
        counter = Date.now();
        const newTask: Task = {
          taskId: counter,
          completed: false,
          content: action.payload
        };
      state.push(newTask);
      return state
      }
    },
      
    // modifyTask
    updatedTask(state, action: PayloadAction<{ taskId: number; newContent: string }>) {
      if ( !action.payload.newContent ) {
        return state
      }
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
      return state.map(task => {
        let status: boolean = task.completed;
        status = !status
        if (task.taskId === action.payload) {
          return {...task, completed: status}
        }
        return task;
      })
    },

    reorderTask (state, action: PayloadAction<Task[]>) {
      return action.payload
    }

  }
});

export const { addedTask, savedTask,loadedTask, deletedTask, updatedTask, toggledStatusTask, reorderTask} = taskSlice.actions
export default taskSlice.reducer