import './style.css';
import React, { useState, useEffect } from "react";
import {Card} from '../../components/Card';


export function Home() {

  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  function addStudent() {

    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };

    setStudents(prevState => [...prevState, newStudent]);
  }


  useEffect(() => {

    async function fetchData() {
      const response = await fetch('https://api.github.com/users/isadelmatos');
      const data = await response.json();

      setUser({
        name: data.name,
        avatar: data.avatar_url
      });
    }

    fetchData().catch(error => console.log(error));

  }, []);


  return (
    <div className="container">

      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil"/>
        </div>
      </header>

      <form className='form' autoComplete='off'>
        <input type="text" placeholder="Digite o seu nome aqui" name="name" onChange={e => setStudentName(e.target.value)}/>
        <button type="button" onClick={addStudent}>Adicionar</button>
      </form>

      {students.map(student => <Card key={student.time} name={student.name} time={student.time}/>)}

    </div>
  );
}