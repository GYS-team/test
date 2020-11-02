import { useState, useReducer, Reducer } from "react";
import { createContainer } from "unstated-next";
import { isCookieExist, isResponseOk } from "../utils/utils";
import fetch from "../utils/fetch";
import { Student, parseToStudent } from "./student";
import { AxiosPromise, AxiosResponse } from "axios";
export enum LoginStatus {
  notLogged,
  logged,
  logging,
}

export enum UserPower {
  common,
  admin,
}

const User = createContainer(() => {
  const [status, setStatus] = useState(
    isCookieExist("session_id") ? LoginStatus.logged : LoginStatus.notLogged
  );
  const [id, setId] = useState<number>();
  const [power, setPower] = useState<UserPower>(UserPower.common);
  const [info, infoDispatcher] = useReducer<
    Reducer<Partial<Student>, Partial<Student>>
  >((info, partialInfo) => {
    return { ...info, ...partialInfo };
  }, {});

  const clearInfo = () => {
    setId(0);
    setPower(UserPower.common);
    infoDispatcher({
      id: 0,
      name: "",
      score: 0,
      email: "",
    });
  };

  const fetchInfo = async () => {
    const res: AxiosResponse<any> = await fetch.get("/"); // TODO: where to get info
    if (isResponseOk(res)) {
      const data = res.data.data;
      setId(data.id);
      setPower(data.admin ? UserPower.admin : UserPower.common);
      const student = data.student;
      if (student != null) {
        infoDispatcher(parseToStudent(student));
      }
    }
  };

//   const login = async (userName: string, password: string) => {
//     setStatus(LoginStatus.logging);
//     try {
//       const res = await spanPromise(
//         500,
//         fetch({
//           method: "POST",
//           url: "/user_management/login/",
//           data: {
//             username: userName,
//             password: password,
//           },
//         })
//       );
//       if (!isResponseOk(res)) {
//         if (res.data && res.data.message) throw new Error(res.data.message);
//         else throw new Error(`${res.status}: ${res.statusText}`);
//       }
//       setPower(res.data.data.admin ? UserPower.admin : UserPower.common);
//       setStatus(LoginStatus.logged);
//     } catch (e) {
//       console.log(e.response);
//       setStatus(LoginStatus.notLogged);
//       throw e;
//     }
//   };
  const logout = async () => {
    try {
      const res: AxiosResponse<any> = await fetch.post("/"); // TODO: where to logout
      if (isResponseOk(res) && res.data.code === 1) {
        setStatus(LoginStatus.notLogged);
        clearInfo();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    // states
    status,
    name,
    power,
    id,
    info,
    // actions
    //login,
    updateInfo: fetchInfo,
    logout,
  };
});
