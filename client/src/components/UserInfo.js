import React from 'react';

const UserInfo = ({user, deleteUser, history, toggleEdit}) => {
    if (!user) return null;
    return (
        <div className="single-user">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        User Information
                    </h5>
                    <hr/>
                    <p>
                        <i className="fas fa-address-book"></i> First Name: {user.firstName}
                    </p>
                    <p>
                        <i className="fas fa-address-book"></i> Last Name: {user.lastName}
                    </p>
                    <p>
                        <i className="fas fa-envelope"></i> Email: {user.email}
                    </p>
                    <button className="btn btn-secondary" onClick={ () => { toggleEdit() } }>Edit</button>
                    <div className="float-right">
                        <button className="btn btn-danger ml-3" onClick={ () => { deleteUser(user._id, history) } }>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;