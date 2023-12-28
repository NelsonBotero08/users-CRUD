import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateUsersModal from "../components/CreateUsersModal";
import useCrud from "../hooks/useCrud";
import UserCard from "../components/UserCard";

const HomeUsers = () => {
  const [infoUpdate, setInfoUpdate] = useState();
  const [showCreateMessage, setShowCreateMessage] = useState(false);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const url = "https://users-crud-backend-dev-dxxb.1.us-1.fl0.io";
  const [users, getUser, createUser, getIdUser, deleteUser, updateUser] =
    useCrud(url);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getUser("/users");
  }, []);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    navigate(`/users/${userId.id}`);
  };

  return (
    <div>
      <header className="header">
        <h1 className="header__title">Usuarios</h1>
        <button className="header__btn" onClick={openModal}>
          <i className="bx bx-plus header__img"></i>Crear Usuarios
        </button>
        {isModalOpen && (
          <CreateUsersModal
            openModal={openModal}
            createUser={createUser}
            infoUpdate={infoUpdate}
            setInfoUpdate={setInfoUpdate}
            updateUser={updateUser}
            setShowCreateMessage={setShowCreateMessage}
            setError={setError}
            setShowUpdateMessage={setShowUpdateMessage}
          />
        )}
      </header>
      <div className="usercard">
        {users?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            openModal={openModal}
            deleteUser={deleteUser}
            setInfoUpdate={setInfoUpdate}
            handleUserClick={handleUserClick}
          />
        ))}
      </div>
      {error ? (
        <div className="success-message--errorcreate">
          <p className="success-message__p--errorcreate">Usuario no creado</p>
        </div>
      ) : showUpdateMessage ? (
        <div className="success-message--create">
          <p className="success-message__p--create">
            Usuario Actualizado con éxito
          </p>
        </div>
      ) : (
        showCreateMessage && (
          <div className="success-message--create">
            <p className="success-message__p--create">
              Usuario creado con éxito
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default HomeUsers;
