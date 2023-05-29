import * as React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { Task } from '../features/task-slice';

interface ListItemProps {
  task: Task;
  editTaskId: number | null;
  content: string;
  handleContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleEditClick: (taskId: number) => void;
  handleDeleteClick: (taskId: number) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  task,
  editTaskId,
  content,
  handleContentChange,
  handleFormSubmit,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <Stack className="line" key={task.taskId}>
      {editTaskId === task.taskId ? (
        <form onSubmit={handleFormSubmit}>
          <TextField id="outlined-basic"
            type="text"
            placeholder="Modifica il task"
            value={content}
            onChange={handleContentChange}
          />
          <Button variant='contained' type="submit">Salva</Button>
        </form>
      ) : (
        <div className="X">
          <h5 className="todo">{task.content}</h5>
          <Button variant='outlined' onClick={() => handleEditClick(task.taskId)}>Modifica</Button>
        </div>
      )}
      <Button variant='contained' color='error' onClick={() => handleDeleteClick(task.taskId)}>Cancella</Button>
    </Stack>
  );
};

export default ListItem;
