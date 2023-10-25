import axios from "axios";
import { useEffect } from "react";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

export function useFetch(callback: () => void) {
  useEffect(() => {
    const execute = async () => {
      callback();
    };
    execute();
  }, []);
}
