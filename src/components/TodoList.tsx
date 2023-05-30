import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Box, Button, Container, TextField } from '@mui/material';
import { useTheme } from '@emotion/react';
import { addedTask, updatedTask } from '../features/task-slice';
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
      <Box bgcolor={'lightgrey'} height={'100vh'}>
        <Container fixed>
          <Box bgcolor={'white'} borderRadius={5} mt={5} p={3}>
            <h3>Cose da fare:</h3>
            {tasks.map((task) => (
              <TodoItem
                key={task.taskId}
                task={task}
                editTaskId={editTaskId}
              />
            ))}
            {editTaskId !== null ? null : 
          <form onSubmit={handleSubmit}>
            <TextField hiddenLabel
              id="filled-hidden-label-small"
              defaultValue="Small"
              variant="filled"
              size="small"
              type="text"
              placeholder="Inserisci una nota"
              value={content}
              onChange={handleContentChange}
              />
            <Button variant='contained' id="active" type="submit">
              Aggiungi nuova nota
            </Button>
          </form> }
          </Box>
        </Container>
      </Box>
    )
}