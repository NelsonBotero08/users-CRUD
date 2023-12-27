import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import "../Styles/UserDetailId.css";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [, , , getUserById] = useCrud("http://localhost:8080");

  const { id } = useParams();

  useEffect(() => {
    getUserById("/users", id)
      .then((user) => {
        setUserDetails(user);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  if (error) {
    return <div>Error al cargar los detalles del usuario</div>;
  }

  if (!userDetails) {
    return <div>Cargando...</div>;
  }

  return (
    <article className="article__userDetail">
      <h2 className="title__detail">Detalles del Usuario</h2>
      <section className="section__detail">
        <div className="div__img">
          {userDetails.image_url ? (
            <img
              className="img__detail"
              src={userDetails.image_url}
              alt={userDetails.first_name}
            />
          ) : (
            <i className="bx bx-user"></i>
          )}
        </div>
        <p>ID: {userDetails.id}</p>
        <p>Nombre: {`${userDetails.first_name} ${userDetails.last_name}`}</p>
        <p>Email: {userDetails.email}</p>
        <p>Birthday: {userDetails.birthday}</p>
      </section>
    </article>
  );
};

export default UserDetails;
