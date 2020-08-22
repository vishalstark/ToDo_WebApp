import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase';


function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  //when the app loads, we need to listen to the database and fetch new todos as they are added or removed

  useEffect(() => {
    //this code here... fires when the app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    }) 
  }, []);

  const addTodo = (event) => {
    //This will fire off when we click button
    event.preventDefault(); //It will stop refresh 
    // console.log('👾','Here I am ')

    db.collection('todos').add({
      todo : input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input]);
    setInput('');
  }
  return (
    <div className="App">
      <h1> Hello World 🚀! </h1>
      <form>
        

        <FormControl>
          <InputLabel>✍ Write a ToDO</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>

        <Button disabled={!input} type='submit' onClick={addTodo} variant="contained" color="primary">
        Add toDo
          </Button>
        {/* <button type='submit' onClick={addTodo}>  </button> */}
      </form>
      
      

      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
