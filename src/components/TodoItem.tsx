import * as React from 'react';
import { Button, ListItem, Stack, TextField } from '@mui/material';
import { Task, addedTask, deletedTask, updatedTask } from '../features/task-slice';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch } from '../app/hooks';
import { cyan } from '@mui/material/colors';

interface TodoItemProps {
  task: Task;
  editTaskId: number | null;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task
}) => {

  const dispatch = useAppDispatch();

  const [content, setContent] = React.useState('');
  const [editTaskId, setEditTaskId] = React.useState<number | null>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTaskId !== null) {
      dispatch(updatedTask({ taskId: editTaskId, newContent: content }));
      setEditTaskId(null);
    } else {
      dispatch(addedTask(task.content));
    }
    setContent("");
  };

  const handleEditClick = (taskId: number) => {
    setEditTaskId(taskId);
    const selectedTask = taskId;
    if (selectedTask) {
      setContent(task.content);
    }
  };
  
  const handleDeleteClick = (taskId: number) => {
    dispatch(deletedTask(taskId));
  };
  
  return (
    <Stack direction="row" spacing={1} alignItems='center' mt={4}>
      {task.completed ?
        <CheckCircleOutlineIcon color='success'/> : <HighlightOffIcon color='action'/>}
        <ListItem>{task.content}</ListItem>

      {editTaskId === task.taskId ? (

  
        <ListItem>
          <form onSubmit={handleFormSubmit}>
            <TextField hiddenLabel
              id="filled-hidden-label-small"
              defaultValue="Small"
              variant="filled"
              size="small"
              type="text"
              placeholder="Modifica il task"
              value={content}
              onChange={handleContentChange}
            />
            <Button variant='contained' type="submit">Salva</Button>
          </form>
        </ListItem>
      ) : (
        <>
          <Button variant='outlined' color='secondary' onClick={() => handleEditClick(task.taskId)}>Modifica</Button>
          <Button variant='contained' color='error' onClick={() => handleDeleteClick(task.taskId)}>Cancella</Button>
        </>
      )}
    </Stack>
  );
};

export default TodoItem;
