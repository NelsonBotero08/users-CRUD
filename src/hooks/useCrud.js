import axios from "axios";
import { useState } from "react";

const useCrud = (baseUrl) => {
  const [infoApi, setInfoApi] = useState();

  const getApi = (path) => {
    const url = `${baseUrl}${path}/`;
    axios
      .get(url)
      .then((res) => setInfoApi(res.data))
      .catch((e) => console.log(e));
  };

  const postApi = (path, data) => {
    const url = `${baseUrl}${path}/`;
    axios
      .post(url, data)
      .then((res) => {
        setInfoApi([...infoApi, res.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUserById = (path, id) => {
    const url = `${baseUrl}${path}/${id}/`;
    return axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        console.error(`Error al obtener el usuario por ID: ${id}`, e);
      });
  };

  const deleteApi = (path, id) => {
    const url = `${baseUrl}${path}/${id}/`;
    axios
      .delete(url)
      .then((res) => {
        setInfoApi(infoApi.filter((e) => e.id !== id));
      })
      .catch((e) => console.log(e));
  };

  const updateApi = (path, id, data) => {
    const url = `${baseUrl}${path}/${id}/`;
    axios
      .put(url, data)
      .then((res) => {
        setInfoApi(
          infoApi.map((e) => {
            if (e.id === id) {
              return res.data;
            }
            return e;
          })
        );
      })
      .catch((e) => console.log(e));
  };

  return [infoApi, getApi, postApi, getUserById, deleteApi, updateApi];
};

export default useCrud;
