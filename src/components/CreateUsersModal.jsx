import React, { useEffect } from "react";
import "../Styles/ModalUser.css";
import { useForm } from "react-hook-form";

const CreateUsersModal = ({
  openModal,
  createUser,
  infoUpdate,
  setInfoUpdate,
  updateUser,
  setShowCreateMessage,
  setError,
  setShowUpdateMessage,
}) => {
  const { handleSubmit, register, reset } = useForm();

  useEffect(() => {
    reset(infoUpdate);
  }, [infoUpdate]);

  const submit = (data) => {
    if (infoUpdate) {
      if (
        infoUpdate.email !== data.email ||
        infoUpdate.password !== data.password ||
        infoUpdate.first_name !== data.first_name ||
        infoUpdate.last_name !== data.last_name ||
        infoUpdate.birthday !== data.birthday ||
        infoUpdate.image_url !== data.image_url
      ) {
        updateUser("/users", infoUpdate.id, data);
        setInfoUpdate();
        openModal();
        setShowUpdateMessage(true);
        setTimeout(() => {
          setShowUpdateMessage(false);
        }, 1500);
      } else {
        setShowUpdateMessage(false);
        openModal();
      }
    } else {
      if (
        data.email &&
        data.password &&
        data.first_name &&
        data.last_name &&
        data.birthday
      ) {
        createUser("/users", data);
        openModal();
        setShowCreateMessage(true);

        setTimeout(() => {
          setShowCreateMessage(false);
        }, 1500);
      } else {
        setError(true);
        openModal();
      }
      setTimeout(() => {
        setError(false);
      }, 1500);
    }

    reset({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
    });
  };

  const handleExit = () => {
    openModal();
    setInfoUpdate();
  };

  return (
    <div className="modal-overlay">
      <div className="content">
        <div className="modal-content">
          <h2 className="header__title--modal">
            {infoUpdate ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>
          <i onClick={handleExit} className="bx bx-x img__modal"></i>
        </div>
        <form className="form__modal" onSubmit={handleSubmit(submit)}>
          <div className="div__info">
            <label className="label__info" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className="input__info"
              type="text"
              placeholder="Example@gmail"
              id="email"
            />
          </div>
          <div className="div__info">
            <label className="label__info" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              className="input__info"
              type="password"
              placeholder="Password"
              id="password"
            />
          </div>
          <div className="div__info">
            <label className="label__info" htmlFor="first_name">
              First_name
            </label>
            <input
              {...register("first_name")}
              className="input__info"
              type="text"
              placeholder="First_name"
              id="first_name"
            />
          </div>
          <div className="div__info">
            <label className="label__info" htmlFor="last_name">
              Last_name
            </label>
            <input
              {...register("last_name")}
              className="input__info"
              type="text"
              placeholder="Last_name"
              id="last_name"
            />
          </div>
          <div className="div__info">
            <label className="label__info" htmlFor="birthday">
              Birthday
            </label>
            <input
              {...register("birthday")}
              className="input__info"
              type="date"
              placeholder="dd/mm/aaaa"
              id="birthday"
            />
          </div>
          <div className="div__info">
            <label className="label__info" htmlFor="image_url">
              Image
            </label>
            <input
              {...register("image_url")}
              className="input__info"
              type="text"
              placeholder="image_url"
              id="image_url"
              defaultValue="../../"
            />
          </div>
          <button className="form__btn" onClick={handleSubmit(submit)}>
            {infoUpdate ? "Guardar Cambios" : "Agregar Nuevo Usuario"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUsersModal;
