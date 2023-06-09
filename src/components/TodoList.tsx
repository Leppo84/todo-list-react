import * as React from 'react';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Box, Button, Chip, Divider, TextField, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Task, loadedTask, addedTask, savedTask, updatedTask, reorderTask } from '../features/task-slice';
import TodoItem from './TodoItem';
import TodoEmpty from './TodoEmpty';
import isEqual from 'lodash.isequal';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

export const TodoList = () => {
  const theme = useTheme();
  
  const tasks: Task[] = useAppSelector((state) => state.taskManager);
  
  const dispatch = useAppDispatch();

  // HANDLER FOR A NEW NOTE
  
  const [editTaskId, setEditTaskId] = React.useState<number | null>(null);
  const [content, setContent] = React.useState("");
  
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
  
  // SAVE TODO LIST ON LOCAL STORAGE

  const saveTask = (() => {
    dispatch(savedTask());
    dispatch(loadedTask());
  }); 
  
  // catch for local storage date

  const storageData: string | null = localStorage.getItem("currentData");      
  let jsonData: Task[] = JSON.parse(storageData!);
  
  // trigger for save alert on button

  const saveSync: boolean = useMemo(() =>  isEqual(tasks, jsonData), [tasks, jsonData]); 
  
  // LOAD PREVIOUS SAVED TODO LIST

  const loadTask = (() => {
    dispatch(loadedTask());
  }); 
    
    // DRAG & DROP FEATURE

    const itemIds = useMemo(() => tasks.map((task) => task.taskId), [tasks]);

    function handleDragEnd(event: any) {
      console.log("evento chiamato");
      const { active, over } = event;
      console.log(event);
      if (over && active.id !== over.id) {
        const activeIndex = itemIds.indexOf(active.id);
        const overIndex = itemIds.indexOf(over.id);
        console.log(
          arrayMove(tasks, activeIndex, overIndex)
        );
        let newOrder = arrayMove(tasks, activeIndex, overIndex);
        dispatch(reorderTask(newOrder))
        }
    };
   
  return (
    <Box bgcolor={'white'} borderRadius={5} py={3} px={0} mt={2} sx={{boxShadow:8}}>
      <Typography variant='h4'>Cose da fare:</Typography>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        // modifiers={[restrictToVerticalAxis]}
        modifiers={[restrictToWindowEdges]}
      >
        <SortableContext
          // items = {data.map((task) => task.taskId)}
          items = {itemIds}
          strategy={verticalListSortingStrategy}
          // strategy={rectSwappingStrategy}
        >
          <Divider/>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <>
            <TodoItem
              key={task.taskId}
              task={task}
              id={task.taskId}
              />
              <Divider/>
            </>
          ))):(
            <TodoEmpty/>
          )}
        </SortableContext>
      </DndContext>
        {editTaskId !== null ? null : 
      <form onSubmit={handleSubmit}>
        <TextField hiddenLabel
          variant="filled"
          id="filled-hidden-label-small"
          defaultValue="Small"
          size="small"
          type="text"
          placeholder="Inserisci una nota"
          value={content}
          onChange={handleContentChange}
          />
        <Button variant='contained'sx={{mx:2}} type="submit">
          Aggiungi nuova nota
        </Button>
        <Chip label='Carica i dati precedentemente salvati' sx={{mx:2}} color='primary'

          onClick={loadTask}
        />
        {saveSync ? (
        <Chip label='Dati salvati' sx={{mx:2}}
          onClick={saveTask}
        />
        ) : (
          <Chip label='Salva i dati in locale!' sx={{mx:2}} color='secondary'
          onClick={saveTask}
        />
        )}
      </form> }
    </Box>
  );

}