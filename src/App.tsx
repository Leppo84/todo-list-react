import './App.css';
// import './css/style-temp.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';

function App() {

  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <Header></Header>
      <TodoList></TodoList>
    </div>
  );
}

export default App;
