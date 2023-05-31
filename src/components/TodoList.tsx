import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Box, Button, Chip, Divider, List, ListItem, TextField, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { loadedTask, addedTask, savedTask, updatedTask, Task } from '../features/task-slice';
import TodoItem from './TodoItem';

export const TodoList = () => {
  const theme = useTheme();
  
  const tasks: Task[] = useAppSelector((state) => state.taskManager);
  console.log("sono i tasks",tasks);
  
  const dispatch = useAppDispatch();
  
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

  const saveTask = (() => {
    dispatch(savedTask());
    console.log('Pigiato u buttun');    
  }); 

  const loadTask = (() => {
    dispatch(loadedTask());
    console.log("Pigiato l'altro  buttun");
  }); 


  return (

        <Box bgcolor={'white'} borderRadius={5} py={3} px={6} mt={2} sx={{boxShadow:8}}>
          <Typography variant='h3'>Cose da fare:</Typography>
          <hr />
          <List>
            {tasks.map((task) => (
              <TodoItem
                key={task.taskId}
                task={task}
              />
            ))}
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
            <Chip label='Salva i dati in locale' sx={{mx:2}}
              onClick={saveTask}
            />
             <Chip label='Carica i dati precedentemente salvati' sx={{mx:2}}

              onClick={loadTask}
            />

          </form> }
        </Box>
  )
}