import React from 'react';
import { useAppDispatch, useAppSelector}  from './app/hooks'
import { addedTask } from './features/task-slice'
import './App.css';
import './css/style-temp.css'


const deleteRow = () => {
  return (
    console.log('pressed delete')
    )
  }
  
  function App() {
    
    const taskText = useAppSelector((state) => state.taskManager[1].content)
    
    const dispatch = useAppDispatch();
    
    function AddTask () {
      dispatch(addedTask());
      // return (
      // console.log('Task Added'))
    }

    return (
      <div className="App">
      <header className="">
          <div className="container">
              {/* <img className="bg-black" src="assets/Logo FL bianco.webp" alt="LOGO"/> */}
              <span className="logotype">To Do list</span>
          </div> 
      </header>
      <main>
          <section className="board actionbar">
              <input type="text" placeholder="Inserisci una nuova nota"/>
              <button id="active"
              onClick={() => AddTask()}
              >Aggiungi</button>
          </section>
          <section className="board tasks">
              <div> 
                {/* <div className="arrow"></div> */}
                <h3>Cose da fare:</h3>
                <div className="line" key="">
                    <div className="X">
                      <h5 className="todo">{taskText}</h5>
                    </div>
                    <button onClick={deleteRow}> X </button>
                </div>
              </div>
          </section>
      </main>
    </div>
  );
}

export default App;
