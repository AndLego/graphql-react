import React from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Persons } from "./Persons";
import { PersonForm } from "./PersonForm";
import { usePersons } from "./persons/custom-hooks.js";
import { Notify } from "./Notify";
import { PhoneForm } from "./PhoneForm";

function App() {
  const { data, error, loading } = usePersons();
  const [errorMessage, setErrorMessage] = React.useState(null);

  if (error) return <span style="color: red">{error}</span>;

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
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
      <PhoneForm />
      <PersonForm notifyError={notifyError} />
    </div>
  );
}

export default App;
