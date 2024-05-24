import axios from "axios";
import { useSelector } from 'react-redux';
import { BACKEND_URL } from "../utils/constants";

const useAxios = () => {
  const accessToken = useSelector((store) => store?.user?.userDetail?.accessToken);

  const instance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return instance;
};

export default useAxios;
