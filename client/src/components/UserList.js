import React from 'react';
import UserCard from './UserCard';

const UsersList = ({users}) => (
    <>
        <h5>Number of users: {users.length}</h5>
        <div className="card-wrapper">
            {users.map(user => <UserCard user={user} key={user._id} />)}
        </div>
    </>
)

export default UsersList;
