import { Button, TextField } from '@mui/material';
import * as React from 'react';
import { useAppDispatch } from '../app/hooks';
import { updatedTask, addedTask, Task } from '../features/task-slice';

interface TodoEditProps {
  task: Task;
}

const TodoEdit: React.FC<TodoEditProps> = ({ task }) => {

  const dispatch = useAppDispatch();

  const [content, setContent] = React.useState('');

  const [editTaskId, setEditTaskId] = React.useState<number | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.taskId != null) {
      dispatch(updatedTask({ taskId: task.taskId, newContent: content }));
    } else {
      dispatch(addedTask(content));
    }
    setContent("");
    setEditTaskId(null);
  };
  
  const handleEditClick = (taskId: number) => {
    setEditTaskId(taskId);
    setContent(task.content);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      {editTaskId === task.taskId ? (
        <form onSubmit={handleFormSubmit}>
          <TextField 
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="Small"
            variant="filled"
            size="small"
            type="text"
            placeholder="Modifica il task"
            value={content}
            onChange={handleContentChange}
          />
          <Button variant='contained' sx={{mx:2}} type="submit">Salva</Button>
        </form>
      ) : (
        <Button 
        variant='outlined'
        color='secondary'
        sx={{':hover': {bgcolor: 'darkblue', color:'white'}}} onClick={() => handleEditClick(task.taskId)}
        >
        Modifica
        </Button>
      )}
    </>
  )
}

export default TodoEdit