import { useEffect, useState } from "react";
import axios from "axios";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNames, setFilteredNames] = useState(persons);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let randomId = Math.random() * 10;
    Math.floor(randomId);
    if (persons.some((el) => el.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
      await personService
        .create({
          name: newName,
          number: newNumber,
          id: randomId.toString(),
        })
        .then((promise) => {
          console.log(promise);
        });
      console.log(persons);
    }
  };

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
      console.log(response);
      console.log(persons);
    });
  }, []);

  console.log(persons);

  useEffect(() => {
    const filteredItems = persons.filter((name) =>
      name.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchTerm === "") {
      setFilteredNames([]);
    }
    setFilteredNames(filteredItems);
  }, [searchTerm]);

  const deletePerson = async (id) => {
    await personService.remove(id);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <label>filter shown with</label>
      <input onChange={(e) => setSearchTerm(e.target.value)} />
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searchTerm != ""
        ? filteredNames.map((name) => <li key={name.id}>{name.name}</li>)
        : persons.map((person, id) => (
            <div key={id}>
              <h3>{person.name}</h3>
              {person.number}
              <button
                onClick={() => {
                  deletePerson(person.id);
                }}
              >
                remove
              </button>
            </div>
          ))}
    </div>
  );
};

export default App;
