import { useEffect, useState } from "react";
import "./App.css";
import useCrud from "./hooks/useCrud";
import CreateUsersModal from "./components/CreateUsersModal";
import UserCard from "./components/UserCard";

function App() {
  const [infoUpdate, setInfoUpdate] = useState();
  const [showCreateMessage, setShowCreateMessage] = useState(false);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const url = "http://localhost:8080";
  const [users, getUser, createUser, deleteUser, updateUser] = useCrud(url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getUser("/users");
  }, []);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="app">
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
}

export default App;
