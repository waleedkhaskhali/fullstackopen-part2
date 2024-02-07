import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
    { name: "Arto Hellas" },
    { name: "Arto Hellas" },
    { name: "Arto Hellas" },
  ]);
  const [newName, setNewName] = useState("");

  console.log(persons[0].name);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPersons(persons.concat(newName));
    console.log(persons);
  };
  console.log(newName);

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit" onSubmit={(e) => handleSubmit(e)}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => {
          <div>
            <h1>{person.name}</h1>
          </div>;
          console.log(person);
        })}
      </div>
    </div>
  );
};

export default App;
