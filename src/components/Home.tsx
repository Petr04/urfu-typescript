import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../styles.css';

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>('');

  interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }

  useEffect(() => {
    axios.get('https://reqres.in/api/users')
      .then(response => setUsers(response.data.data))
      .catch(error => console.log(error));
  }, []);

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      <Header search={search} setSearch={setSearch} showSearch={true} showAuthButtons={true} />
      <main>
        <div className="user-cards">
          {filteredUsers.map(user => (
            <Link to={`/user/${user.id}`} key={user.id}>
              <div className="user-card">
                <img src={user.avatar} alt={user.first_name} />
                <div>{user.first_name} {user.last_name}</div>
                <div>{user.email}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
