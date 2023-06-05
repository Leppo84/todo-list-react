import * as React from 'react';
import {useMemo, useCallback} from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Box, Button, Chip, List, TextField, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Task, loadedTask, addedTask, savedTask, updatedTask } from '../features/task-slice';
import TodoItem from './TodoItem';
import TodoEmpty from './TodoEmpty';
import isEqual from 'lodash.isequal';


export const TodoList = () => {
  const theme = useTheme();
  
  const tasks: Task[] = useAppSelector((state) => state.taskManager);
  
  const dispatch = useAppDispatch();

  // HANDLER FOR A NEW NOTE
  
  const [editTaskId, setEditTaskId] = React.useState<number | null>(null);
  const [content, setContent] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleFormSubmit(e);
  };
  
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTaskId !== null) {
      dispatch(updatedTask({ taskId: editTaskId, newContent: content }));
      setEditTaskId(null);
    } else {
      dispatch(addedTask(content));
    }
    setContent("");
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  
  // SAVE TODO LIST ON LOCAL STORAGE

  const saveTask = (() => {
    dispatch(savedTask());
    console.log('Pigiato u buttun');
    dispatch(loadedTask());
  }); 
  
  // catch for local storage date

  const storageData: string | null = localStorage.getItem("currentData");      
  const jsonData: Task[] = JSON.parse(storageData!);
  
  // trigger for save alert on button

  const saveSync: boolean = useMemo(() =>  isEqual(tasks, jsonData), [tasks, jsonData]); 
  
  // LOAD PREVIOUS SAVED TODO LIST

  const loadTask = (() => {
    dispatch(loadedTask());
    console.log("Pigiato l'altro  buttun");
  }); 

  // DRAG & DROP FEATURE

  

  
  return (
    <Box bgcolor={'white'} borderRadius={5} py={3} px={6} mt={2} sx={{boxShadow:8}}>
          <Typography variant='h3'>Cose da fare:</Typography>
          <hr />
          <List>
            {tasks.length > 0 ? (
              tasks.map((task: Task) => (
                <TodoItem
                key={task.taskId}
                task={task}
                />
                )))
            :
            (
              <TodoEmpty/>
            )}
          </List>
          <hr />
          <br />
            {editTaskId !== null ? null : 
          <form onSubmit={handleSubmit}>
            <TextField hiddenLabel
              variant="filled"
              id="filled-hidden-label-small"
              defaultValue="Small"
              size="small"
              type="text"
              placeholder="Inserisci una nota"
              value={content}
              onChange={handleContentChange}
              />
            <Button variant='contained'sx={{mx:2}} id="active" type="submit">
              Aggiungi nuova nota
            </Button>
            <Chip label='Carica i dati precedentemente salvati' sx={{mx:2}} color='primary'

             onClick={loadTask}
           />
            {saveSync ? (
            <Chip label='Dati salvati' sx={{mx:2}}
              onClick={saveTask}
            />
            ) : (
              <Chip label='Salva i dati in locale!' sx={{mx:2}} color='secondary'
              onClick={saveTask}
            />
            )}
          </form> }
        </Box>
  )
}