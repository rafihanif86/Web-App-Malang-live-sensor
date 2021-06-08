import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import { Table, Container } from 'reactstrap';
import Row from './row'

export default function TabelDb() {
    const [todoList, setTodoList] = useState();

    useEffect(() => {
      const todoRef = firebase.database().ref('Log');
      todoRef.on('value', (snapshot) => {
        //   console.log(snapshot.val());
        const todos = snapshot.val();
        const todoList = [];
        for (let id in todos) {
          todoList.push({ id, ...todos[id] });
        }
        setTodoList(todoList);
      });
    }, []);

  return (
    <div>
        <Container>
        <Table>
            <thead>
                <tr>
                <th>Key</th>
                <th>Time</th>
                <th>Humidity</th>
                <th>Temp</th>
                <th>Long, Lat</th>
                <th>User</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {todoList ? todoList.map((todo, index) => <Row todo={todo} key={index} />) : ''}
            </tbody>
            </Table>
        </Container>
    </div>
  );
}
