import React from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Persons } from "./Persons";
import { PersonForm } from "./PersonForm";
import { usePersons } from "./persons/custom-hooks.js";
import { Notify } from "./Notify";
import { PhoneForm } from "./PhoneForm";
import { LoginForm } from "./LoginForm";
import { useApolloClient } from "@apollo/client";
import { RemoveForm } from "./RemoveForm";
import { CreateForm } from "./CreateForm";

function App() {
  const { data, error, loading } = usePersons();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [token, setToken] = React.useState(() =>
    localStorage.getItem("phonenumbers-user-token")
  );
  const client = useApolloClient();

  if (error) return <span style="color: red">{error}</span>;

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div className="App">
      <Notify errorMessage={errorMessage} />
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {loading ? <p>Loading...</p> : <Persons persons={data?.allPersons} />}
      {token 
      ? <button className="logOut" onClick={logout}>Log out</button>
      : <LoginForm notifyError={notifyError} setToken={setToken} />
      }
      {!token && <CreateForm notifyError={notifyError} />}
      {token && <PersonForm notifyError={notifyError} />}
      {token && <PhoneForm notifyError={notifyError} />}
      {token && <RemoveForm notifyError={notifyError} />}
    </div>
  );
}

export default App;
