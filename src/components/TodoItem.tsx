import * as React from 'react'
import {
  Box,
  Button,
  Chip,
  Container,
  Grow,
  IconButton,
  Paper,
  Stack,
} from '@mui/material'
import { Task, deletedTask, toggledStatusTask } from '../features/task-slice'
import { useAppDispatch } from '../app/hooks'
import TodoEdit from './TodoEdit'
import { green, grey, red } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'

import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

import { Icon } from '@iconify/react'

interface TodoItemProps {
  task: Task
}

const TodoItem: React.FC<TodoItemProps> = ({ task }) => {
  // STYLE SETTINGS

  let contentLenght: number = task.content.length

  const [showMenu, setShowMenu] = React.useState(false)

  // SORTABLE SETTINGS

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.taskId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Menu a scomparsa

  const hiddenMenu = (
    <Box>
      <>
        <IconButton color="secondary" onClick={() => toggleStatus(task.taskId)}>
          {task.completed ? (
            <Icon icon="fluent-mdl2:completed-solid" />
          ) : (
            <Icon icon="dashicons:no" />
          )}
        </IconButton>
        <IconButton
          color="error"
          onClick={() => handleDeleteClick(task.taskId)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton {...listeners}>
          <Icon icon="mdi:drag" />
        </IconButton>
      </>
    </Box>
  )

  // TOGGLE SHOW MORE / SHOW LESS

  const [showMore, setShowMore] = React.useState(false)

  // REDUX ACTIONS

  const dispatch = useAppDispatch()

  const [editTaskId, setEditTaskId] = React.useState<number | null>(null)

  // const [content, setContent] = React.useState('');

  const handleEditClick = (taskId: number) => {
    setEditTaskId(taskId)
    setShowMenu(false)
  }

  const handleDeleteClick = (taskId: number) => {
    dispatch(deletedTask(taskId))
  }

  const toggleStatus = (targetTask: number) => {
    dispatch(toggledStatusTask(targetTask))
  }

  return (
    <Container>
      <Stack
        direction={'row'}
        justifyContent="start"
        alignItems={'center'}
        m={0.5}
        spacing={{ xs: 0.5, sm: 1, md: 2 }}
        ref={setNodeRef}
        {...attributes}
        style={style}
      >
        {editTaskId === task.taskId ? (
          <TodoEdit task={task} setEditTaskId={setEditTaskId} />
        ) : (
          <>
            <IconButton
              size="large"
              sx={{
                display: { sm: 'block', xs: 'none' },
                cursor: 'pointer',
              }}
              {...listeners}
            >
              <Icon icon="mdi:drag" />
            </IconButton>
            <Chip
              label={task.completed ? 'Done' : 'To do'}
              sx={{
                boxShadow: task.completed ? 0 : 4,
                display: { xs: 'none', sm: 'inherit' },
              }}
              variant={task.completed ? 'outlined' : 'filled'}
              onClick={() => toggleStatus(task.taskId)}
            />
            <Paper
              elevation={task.completed ? 1 : 3}
              sx={{
                py: 1,
                px: 2,
                bgcolor: task.completed ? green[50] : red[50],
                color: task.completed ? grey[500] : grey[900],
                textAlign: 'start',
                flexGrow: 2,
              }}
              onClick={() => handleEditClick(task.taskId)}
            >
              {showMore || contentLenght < 70
                ? task.content
                : `${task.content.substring(0, 70)}...`}
              {contentLenght >= 70 ? (
                <Button
                  color={'info'}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMore(!showMore)
                  }}
                >
                  {showMore ? 'show less' : 'Show more'}
                </Button>
              ) : (
                ''
              )}
            </Paper>
            <IconButton
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                  md: 'none',
                },
                // cursor: 'pointer',
              }}
              onClick={() => handleEditClick(task.taskId)}
            >
              <Icon icon="iconamoon:edit-fill" />
            </IconButton>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                ':hover': {
                  bgcolor: 'darkblue',
                  color: 'white',
                },
                display: {
                  xs: 'none',
                  sm: 'none',
                  md: 'block',
                },
                flexShrink: 0,
                cursor: 'pointer',
              }}
              onClick={() => handleEditClick(task.taskId)}
            >
              Modifica
            </Button>
          </>
        )}
        <IconButton
          color="error"
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
              md: 'none',
              cursor: 'pointer',
            },
          }}
          onClick={() => handleDeleteClick(task.taskId)}
        >
          <DeleteIcon />
        </IconButton>
        <Button
          variant="contained"
          color="error"
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            flexShrink: 0,
            cursor: 'pointer',
          }}
          onClick={() => handleDeleteClick(task.taskId)}
        >
          Cancella
        </Button>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            flexWrap: 'nowrap',
            flexShrink: 0,
          }}
        >
          <Grow
            unmountOnExit
            in={showMenu}
            style={{ transformOrigin: '0 0 0' }}
            {...(showMenu ? { timeout: 1000 } : {})}
          >
            {hiddenMenu}
          </Grow>
          <IconButton
            sx={{ cursor: 'pointer' }}
            color="secondary"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? (
              <Icon icon="ep:arrow-up" rotate={1} />
            ) : (
              <Icon icon="material-symbols:settings" />
            )}
          </IconButton>
        </Box>
      </Stack>
    </Container>
  )
}

export default TodoItem
