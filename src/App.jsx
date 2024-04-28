import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setusers(data))
  }, []);
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)


    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUsers = [...users, data];
        setusers(newUsers)
        form.reset();

      })


  }

  return (
    <>

      <h1>Users management client</h1>
      <h3>total users is {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' />
        <br />
        <input type="email" name='email' />
        <br />
        <input type="submit" value={'add user'} />
        <br />
        <br />

      </form>


      {
        users.map(user => <li key={user.id}>{user.id}:
          {user.name} :
          {user.email}
        </li>)
      }

    </>
  )
}

export default App
