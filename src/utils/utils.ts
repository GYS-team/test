import Cookies from "js-cookie";
import { AxiosResponse } from "axios";

export const isCookieExist = (key: string): boolean => {
  if (Cookies.get(key) == null) {
    Cookies.set(key, "test");
    if (Cookies.get(key)) {
      Cookies.remove(key);
      return false;
    }
  }
  return true;
};

export function isResponseOk(res: AxiosResponse): boolean;
export function isResponseOk(res: number): boolean;
export function isResponseOk(res: number | AxiosResponse): boolean {
  let status: number = typeof res === "number" ? res : res.status;
  // return the HTTP Status Code
  return Math.floor(status / 100) === 2;
}
