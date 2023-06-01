import { Typography } from '@mui/material';


export const TodoEmpty = () => {
  return (
    <>
      <Typography variant='h5'>
        La lista è vuota.
      </Typography>
      <Typography >
        Puoi aggiungerne una usando il  campo sottostante.
      </Typography>
        
    </>
  )
}

export default TodoEmpty;
