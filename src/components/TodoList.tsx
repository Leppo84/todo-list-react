import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addedTask, deletedTask, updatedTask } from '../features/task-slice';
import ListItem from './ListItem'
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';

export const TodoList = () => {

  const [content, setContent] = React.useState('');
  const [editTaskId, setEditTaskId] = React.useState<number | null>(null);

  const tasks = useAppSelector((state) => state.taskManager);
  const dispatch = useAppDispatch();

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
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

  const handleEditClick = (taskId: number) => {
    setEditTaskId(taskId);
    const selectedTask = tasks.find((task) => task.taskId === taskId);
    if (selectedTask) {
      setContent(selectedTask.content);
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleFormSubmit(e);
  };  

  const handleDeleteClick = (taskId: number) => {
    dispatch(deletedTask(taskId));
  };
    return (
      <Box sx={{backgroundcolor: grey}}>
        <Container fixed>
          <Stack>
            <h3>Cose da fare:</h3>
            {tasks.map((task) => (
              <ListItem
                key={task.taskId}
                task={task}
                editTaskId={editTaskId}
                content={content}
                handleContentChange={handleContentChange}
                handleFormSubmit={handleSubmit}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            ))}
          </Stack>
            {editTaskId !== null ? null : 
          <form onSubmit={handleSubmit}>
            <TextField id="outlined-basic"
              type="text"
              placeholder="Inserisci una nota"
              value={content}
              onChange={handleContentChange}
            />
            <Button variant='contained' id="active" type="submit">
              Aggiungi nuova nota
            </Button>
          </form> }
        </Container >
      </Box>
    )
}