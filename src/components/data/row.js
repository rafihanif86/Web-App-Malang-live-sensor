import React from 'react';
import firebase from '../../config/firebase';

export default function Row({ todo }) {
  const deleteTodo = () => {
    const todoRef = firebase.database().ref('Log').child(todo.id);
    todoRef.remove();
  };
  // const completeTodo = () => {
  //   const todoRef = firebase.database().ref('Log').child(todo.id);
  //   todoRef.update({
  //     complete: !todo.complete,
  //   });
  // };
  return (
    <tr>
        <td>{todo.id}</td>
        <td>{todo.time}</td>
        <td>{todo.humidity}</td>
        <td>{todo.temperature}</td>
        <td>{todo.longitude}, {todo.latitude}</td>
        <td>{todo.user}</td>
        <td>
            <button onClick={deleteTodo}>Delete</button>
        </td>
        
    </tr>
  );
}
