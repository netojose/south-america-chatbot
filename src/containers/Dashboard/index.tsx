import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ModalAddUser from '../../components/ModalAddUser';
import { RootState } from '../../redux/store';

const Dashboard = function (): React.ReactElement {
  const users = useSelector(({ users }: RootState) => users.items);
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModalAddUser = useCallback(() => setShowModal(true), []);
  const closeModalAddUser = useCallback(() => setShowModal(false), []);
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {Object.keys(users).map((id) => (
          <li key={id}>
            <Link to={`/chat/${id}`}>{users[id].name}</Link>
          </li>
        ))}
      </ul>

      <button onClick={openModalAddUser}>Create New User</button>
      <ModalAddUser isOpen={showModal} onRequestClose={closeModalAddUser} />
    </div>
  );
};

export default Dashboard;
