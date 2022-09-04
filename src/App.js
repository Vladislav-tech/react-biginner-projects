import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import { useState } from 'react';
import { useEffect } from 'react';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [invites, setInvites] = useState([]);
  const [success, setSuccess] = useState(false)

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id));
    } else {
      setInvites(prev => [...prev, id])
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(data => setUsers(data.data))
      .catch(err => alert('Произошла ошибка' + err))
      .finally(() => setIsLoading(false));
  }, []);

  const onClickSendSuccess = () => {
    setSuccess(true);
  }

  return (
    <div className="App">
      {
        success ? <Success count={invites.length}/> :
          (
            <Users
              items={users}
              isLoading={isLoading}
              invites={invites}
              onClickInvite={onClickInvite}
              onClickSendSuccess={onClickSendSuccess}
            />)
      }

    </div>
  );
}

export default App;
