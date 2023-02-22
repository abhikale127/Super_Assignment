import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage("user", userData);

  const navigate = useNavigate();

  const login = async (data) => {
    // var data = JSON.stringify({
    //   username: "abhishek.kale",
    //   password: "TVpX7HSZ5J3679j1LOjJswjbZr0HPl0S",
    // });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://test.indusgame.com/logins/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setUser(response.data);
        window.localStorage.setItem(
          "accessToken",
          response.data.auth.accessToken
        );
        window.localStorage.setItem(
          "refreshToken",
          response.data.auth.refreshToken
        );
        console.log(response.data.auth.accessToken);
        navigate("Dashboard", { replace: true });
      })
      .catch(function (error) {
        console.log(error);
        alert("Error in login, Incorrect Id or passowrd");
      });
  };

  const logout = () => {
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://test.indusgame.com/logouts",
      headers: {
        Authorization: `Bearer  ${window.localStorage.getItem("accessToken")}`,
      },
    };

    axios(config)
      .then(function (response) {
        alert("successful logout");
        setUser(null);
        navigate("/", { replace: true });
      })
      .catch(function (error) {
        var data = JSON.stringify({
          refreshToken: window.localStorage.getItem("refreshToken"),
        });

        var config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://test.indusgame.com/auths",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.localStorage.setItem(
              "accessToken",
              response.data.accessToken
            );

            window.localStorage.setItem(
              "refreshToken",
              response.data.accessToken
            );
            logout();
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(error);
      });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
