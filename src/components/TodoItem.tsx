import * as React from 'react';
import { Button, Chip, Container, Paper, Stack, useTheme } from '@mui/material';
import { Task, deletedTask, toggledStatusTask } from '../features/task-slice';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch } from '../app/hooks';
import TodoEdit from './TodoEdit';
import { green, grey, red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from '@dnd-kit/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface TodoItemProps {
  task: Task;
  id: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, id }) => {

  // STYLE SETTINGS

  // ... to do ;) 

  // TOGGLE SHOW MORE / SHOW LESS
  
  const [showMore, setShowMore] = React.useState(false)

  // SORTABLE SETTINGS

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
  
  // REDUX ACTIONS

  const dispatch = useAppDispatch();

  const handleDeleteClick = (taskId: number) => {
    dispatch(deletedTask(taskId));
  };
  
  const toggleStatus = (targetTask: number) => {
    dispatch(toggledStatusTask(targetTask));
  }

return (
    <Container>

        <Stack direction={{xs:"column", md:"row"}} spacing={2} alignItems='center' justifyContent="space-between" mt={1} useFlexGap
        style={style}>
          <Stack direction="row" spacing={2} alignItems='center' justifyContent="space-between" mt={1} p={1}
          onClick={() => toggleStatus(task.taskId)}
          >
            <Paper elevation={task.completed ? 3 : 1}  sx={{py:1, px:3, bgcolor:task.completed ? green[50] : red[50], color:grey[600]}}
              // ref={setNodeRef} {...attributes} {...listeners}
            >
              {showMore ? task.content : `${task.content.substring(0,100)}...`}
              <Button onClick={() => setShowMore(!showMore)}>{showMore ? "show less" : "Show more"}</Button>
            </Paper>
            {task.completed ? (
              <CheckCircleOutlineIcon color={task.completed ? ("success"):("error")}/> 
              ) : (
                <HighlightOffIcon color='error'/>
                )}
                <Chip label={task.completed ? ("Done!") : ("To do")} sx={{boxShadow:1}} variant={task.completed ? ("outlined") : ("filled")}/>
          </Stack>
          <Stack direction="row" spacing={2} alignItems='center' justifyContent="space-between" mt={1}>
            <TodoEdit
              task={task}
              />
            <Button
              variant='contained'
              color='error'
              startIcon={<DeleteIcon/>}
              fullWidth
              sx={{display: {xs:"block",sm:"none"}}}
              onClick={() => handleDeleteClick(task.taskId)}
              >
            </Button>
            <Button
              variant='contained'
              color='error'
              sx={{display: {xs:"none",sm:"block"}}}
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
