import React from 'react';
import { Link } from "react-router-dom";

const UserCard = ({user}) => (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">
                <i className="fas fa-user"></i> {user.firstName}
            </h5>
            <Link className="float-right"to={ `/user/${user._id}` }>More</Link>
        </div>
    </div>
)

export default UserCard;