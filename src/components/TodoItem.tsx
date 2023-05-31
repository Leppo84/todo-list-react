import * as React from 'react';
import { Box, Button, Container, ListItem, Paper, Stack, TextField } from '@mui/material';
import { Task, addedTask, deletedTask, updatedTask } from '../features/task-slice';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch } from '../app/hooks';
import TodoEdit from './TodoEdit';

interface TodoItemProps {
  task: Task;
}

const TodoItem: React.FC<TodoItemProps> = ({ task }) => {
  
  const dispatch = useAppDispatch();

  const handleDeleteClick = (taskId: number) => {
    dispatch(deletedTask(taskId));
  };
  
  return (
    <ListItem>
      <Container>

        <Stack direction="row" spacing={2} alignItems='center' justifyContent="flex-start" mt={4}>
          {task.completed ? (
            <CheckCircleOutlineIcon color='success'/>
            ) : (
              <HighlightOffIcon color='action'/>
              )}
            <Paper elevation={3} sx={{py:1, px:3}}>
              {task.content}
            </Paper>
        </Stack>
      </Container>
      <Container>
        <Stack direction="row" spacing={2} alignItems='center' justifyContent="flex-end" mt={4}>
          <TodoEdit
            task={task}
            />
          <Button
            variant='contained'
            color='error'
            onClick={() => handleDeleteClick(task.taskId)}
            >
            Cancella
          </Button>
        </Stack>
      </Container>
    </ListItem>
  );
};

export default TodoItem;
