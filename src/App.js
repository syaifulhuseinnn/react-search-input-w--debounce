import React, { useEffect, useState, useCallback } from 'react';
import './style.css';
import debounce from 'lodash/debounce';

export default function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (query) {
      console.warn('EFFECT RUNNING!');
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filteredUsers);
    }
  }, [query]);

  // Delay search by 600ms
  const delayedSearch = useCallback(
    debounce((q) => setQuery(q), 600),
    []
  );

  const handleSearch = (query) => {
    delayedSearch(query);
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <section>
        <input
          type="text"
          placeholder="Search user..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </section>
      <section>
        <table>
          <th>No.</th>
          <th>Name</th>
          {query
            ? filteredUsers.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                </tr>
              ))
            : users.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                </tr>
              ))}
        </table>
      </section>
    </div>
  );
}
