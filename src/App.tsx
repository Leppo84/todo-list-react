import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Box, Container } from '@mui/material';
import Footer from './components/Footer';

function App() {

  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <Box bgcolor={'lightgrey'} minHeight={'92vh'}>
        <Header/>
        <Container maxWidth="lg">
          <TodoList/>
        </Container>
      </Box>
      <Footer/>
    </div>
  );
}

export default App;
