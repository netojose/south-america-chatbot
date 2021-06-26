import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Confirm from '../../components/Confirm';
import Button from '../../components/Form/Button';
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
      {usersIdsList.length < 1 ? (
        <p>No users added</p>
      ) : (
        <ul>
          {usersIdsList.map((id) => (
            <li key={id} className="flex justify-start text-royalblue-300 hover:text-white hover:bg-royalblue-500 rounded-md px-2 py-2 my-2">
              <Link to={`/chat/${id}`} className="flex-grow font-medium px-2 flex items-center">
                {users[id].name}
              </Link>
              <Button type="button" label="Delete" variant="danger" onClick={() => askForDeleteUser(id)} />
            </li>
          ))}
        </ul>
      )}

      <Button type="button" label="Create new user" onClick={openModalAddUser} />
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
