import { Button, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useAppDispatch } from '../app/hooks';
import { updatedTask, addedTask, Task } from '../features/task-slice';

interface TodoEditProps {
  task: Task;
  setEditTaskId: any;
}

const TodoEdit: React.FC<TodoEditProps> = ({ task, setEditTaskId }) => {

  const dispatch = useAppDispatch();
  const [content, setContent] = React.useState(task.content);

  const handleSaveClick = () => {
    if (task.taskId != null) {
      dispatch(updatedTask({ taskId: task.taskId, newContent: content}));
    } else {
      dispatch(addedTask(content));
    }
    setContent("");
    setEditTaskId(null);
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
        <TextField 
          sx={{ flexGrow:1 }}
          label="Modifica"
          id="filled-hidden-label-small"
          defaultValue="Small"
          variant="filled"
          size="small"
          type="text"
          placeholder="Modifica il task"
          value={content}
          onChange={handleContentChange}
        />
        <Button variant='contained' onClick={handleSaveClick}>Salva</Button>
    </>
  )
}

export default TodoEdit