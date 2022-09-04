import React, { useState } from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({ 
  items, 
  isLoading,
  onClickInvite,
  invites,
  onClickSendSuccess,

}) => {
  const [searchValue, setSearchValue] = useState('');

  const onChangeInput = (value) => {
    setSearchValue(value);
  };

  const filteredItems = () => {
    return items.filter((item => {
      if (item.email.toLowerCase().includes(searchValue.toLowerCase())) {
        return item;
      } else if ((item['first_name'].toLowerCase() + ' ' + item['last_name'].toLowerCase()).includes(searchValue.toLowerCase())) {
        return item;
      }
    }));
  }

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input onChange={(evt) => onChangeInput(evt.target.value)} type="text" placeholder="Найти пользователя..." value={searchValue} />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {filteredItems().map((item, index) => (
            <User
              key={index}
              email={item.email}
              firstName={item['first_name']}
              lastName={item['last_name']}
              avatar={item.avatar}
              isInvited={invites.includes(item.id)}
              id={item.id}
              onClickInvite={onClickInvite}
            />
          ))}
        </ul>
      )}
      {invites.length > 0 ? <button onClick={onClickSendSuccess} className="send-invite-btn">Отправить приглашение</button> : null}
    </>
  );
};
