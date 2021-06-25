import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Confirm from '../../components/Confirm';
import ModalAddUser from '../../components/ModalAddUser';
import PageTitle from '../../components/PageTitle';
import { remove } from '../../redux/slices/users';
import { RootState, useAppDispatch } from '../../redux/store';

const Dashboard = function (): React.ReactElement {
  const dispatch = useAppDispatch();
  const users = useSelector(({ users }: RootState) => users.items);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>();

  const openModalAddUser = useCallback(() => setShowModal(true), []);

  const closeModalAddUser = useCallback(() => setShowModal(false), []);

  const askForDeleteUser = useCallback((slug: string) => {
    setDeleteId(slug);
  }, []);

  const cancelDeleteUser = useCallback(() => {
    setDeleteId(undefined);
  }, []);

  const confirmDeleteUser = useCallback(() => {
    dispatch(remove(deleteId || ''));
    cancelDeleteUser();
  }, [deleteId]);

  const usersIdsList = Object.keys(users);

  return (
    <div>
      <PageTitle title="Chat users list" />
      <h1>Chat users list</h1>

      {usersIdsList.length < 1 ? (
        <p>No users added</p>
      ) : (
        <ul>
          {usersIdsList.map((id) => (
            <li key={id}>
              <Link to={`/chat/${id}`}>{users[id].name}</Link>
              <input type="button" value="Delete" onClick={() => askForDeleteUser(id)} />
            </li>
          ))}
        </ul>
      )}

      <input type="button" value="Create New User" onClick={openModalAddUser} />
      <ModalAddUser isOpen={showModal} onRequestClose={closeModalAddUser} />
      <Confirm
        isOpen={!!deleteId}
        title="Delete user"
        text={deleteId ? `Do you want to delete ${users[deleteId].name}?` : ''}
        onRequestCancel={cancelDeleteUser}
        onRequestConfirm={confirmDeleteUser}
      />
    </div>
  );
};

export default Dashboard;
