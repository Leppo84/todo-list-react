import * as React from 'react';
import { Button, Chip, Container, Paper, Stack } from '@mui/material';
import { Task, deletedTask, toggledStatusTask } from '../features/task-slice';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch } from '../app/hooks';
import TodoEdit from './TodoEdit';
import { green, grey, red } from '@mui/material/colors';

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from '@dnd-kit/sortable';

interface TodoItemProps {
  task: Task;
  id: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, id }) => {

  const { 
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition 
  } = useSortable({ id: id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const dispatch = useAppDispatch();

  const handleDeleteClick = (taskId: number) => {
    dispatch(deletedTask(taskId));
  };
  
  const toggleStatus = (targetTask: number) => {
    dispatch(toggledStatusTask(targetTask));
  }

  return (
    <Container>
        <Stack ref={setNodeRef} direction="row" spacing={2} alignItems='center' justifyContent="space-between" mt={1} useFlexGap
        style={style}>
          <Stack direction="row" spacing={2} alignItems='center' justifyContent="space-between" mt={1} p={1}
          onClick={() => toggleStatus(task.taskId)}
            >
        {task.completed ? (
          <>
            <Chip label="Done!" sx={{boxShadow:1}} variant='outlined'></Chip>
            <CheckCircleOutlineIcon color='success'/> 
            <Paper elevation={1} sx={{py:1, px:3, bgcolor:green[50], color:grey[600]}}
              ref={setNodeRef} {...attributes} {...listeners}
            >
              {task.content}
            </Paper>
          </>
            ) : (
              <>
          
            <Chip label="To do" sx={{boxShadow:3}}></Chip>      
            <HighlightOffIcon color='error'/>
            <Paper elevation={1} sx={{py:1, px:3, bgcolor:red[50]}}
              ref={setNodeRef} {...attributes} {...listeners}
            >
              {task.content}
            </Paper>
            </>
        )}
          </Stack>
          <Stack direction="row" spacing={2} alignItems='center' justifyContent="space-between" mt={1}>
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
        </Stack>
      </Container>
  );
};

export default TodoItem;
