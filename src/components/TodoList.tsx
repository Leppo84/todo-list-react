import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Task, addedTask, updatedTask } from '../features/task-slice';
import TodoItem from './TodoItem';

export const TodoList = () => {
  const theme = useTheme();

  const tasks = useAppSelector((state) => state.taskManager);
  const dispatch = useAppDispatch();

  const [editTaskId, setEditTaskId] = React.useState<number | null>(null);

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

const [content, setContent] = React.useState('');


  return (

        <Box bgcolor={'white'} borderRadius={5} py={3} px={6} mt={2} sx={{boxShadow:8}}>
          <Typography variant='h3'>Cose da fare:</Typography>
          <hr />
            {tasks.map((task) => (
              <TodoItem
                key={task.taskId}
                task={task}
              />
            ))}
          <br />
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
          </form> }
        </Box>
  )
}