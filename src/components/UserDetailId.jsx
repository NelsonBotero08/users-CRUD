import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import "../Styles/UserDetailId.css";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [, , , getUserById] = useCrud(
    "https://users-crud-backend-dev-dxxb.1.us-1.fl0.io"
  );

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
      <Link className="home__detail" to="/">
        Home
      </Link>
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
        <p className="detail__p">ID: {userDetails.id}</p>
        <p className="detail__p">
          Nombre: {`${userDetails.first_name} ${userDetails.last_name}`}
        </p>
        <p className="detail__p">Email: {userDetails.email}</p>
        <p className="detail__p">Birthday: {userDetails.birthday}</p>
      </section>
    </article>
  );
};

export default UserDetails;
