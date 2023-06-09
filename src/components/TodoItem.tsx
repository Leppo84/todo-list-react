import * as React from 'react';
import { Button, Chip, Container, IconButton, Paper, Stack, TextField, useTheme } from '@mui/material';
import { Task, deletedTask, toggledStatusTask } from '../features/task-slice';
import { useAppDispatch } from '../app/hooks';
import TodoEdit from './TodoEdit';
import { blue, green, grey, red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from '@dnd-kit/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { Icon, InlineIcon} from '@iconify/react';

interface TodoItemProps {
  task: Task;
  id: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, id }) => {

  // STYLE SETTINGS

  let contentLenght: number = task.content.length

  let whileEdit:boolean = false;

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
  
  const [editTaskId, setEditTaskId] = React.useState<number | null>(null);

  const [content, setContent] = React.useState('');

  const handleEditClick = (taskId: number) => {
    setEditTaskId(taskId);
    // setContent(task.content);
  };

  const handleDeleteClick = (taskId: number) => {
    dispatch(deletedTask(taskId));
  };
  
  const toggleStatus = (targetTask: number) => {
    dispatch(toggledStatusTask(targetTask));
  }

return (
    <Container>

        <Stack  direction={"row"} spacing={2} alignItems='center' justifyContent="space-between" mt={1}
        style={style}>
          <Stack useFlexGap direction="row" spacing={1.5} flexGrow={8} alignItems='center' justifyContent="space-between" pb={1}>
            <IconButton size="large"
              ref={setNodeRef} {...attributes} {...listeners}>
              <Icon icon="mdi:drag"/>
            </IconButton>
            {editTaskId === task.taskId ? (""):(
<>
            <Paper component={whileEdit ? TextField : Paper} elevation={task.completed ? 1 : 3} sx={{py:1, px:2, bgcolor:task.completed ? green[50] : red[50], color:task.completed ? grey[500] : grey[900], width: "75%", textAlign: "start"}} 
            >

              {showMore || contentLenght < 100 ? task.content : `${task.content.substring(0,70)}...`}
            {contentLenght > 70 ? (
              <Button color={"info"} onClick={() => setShowMore(!showMore)}>{showMore ? "show less" : "Show more"}</Button>
              ) : ( ""
              )}
            </Paper>
              <Chip label={task.completed ? ("Done!") : ("To do")} sx={{boxShadow: task.completed ? 0 : 4}} variant={task.completed ? ("outlined") : ("filled")}
              onClick={() => toggleStatus(task.taskId)}/>
              </>
            )}

          </Stack>
          <Stack direction="row" spacing={2} alignItems='center' justifyContent="space-between" mt={1}>
            {editTaskId === task.taskId ? (
              <TodoEdit task={task} setEditTaskId={setEditTaskId}/>
            ) : (
              <Button 
               variant='outlined' color='secondary' sx={{':hover': {bgcolor: 'darkblue', color:'white'}}}
               onClick={() => handleEditClick(task.taskId)}
              >
                Modifica
              </Button>
            )}
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
