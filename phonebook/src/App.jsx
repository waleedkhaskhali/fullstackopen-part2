import { useEffect, useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto besto", number: "23423425", id: 1 },
    { name: "Ricardo jacker", number: "23423456", id: 2 },
    { name: "Diego pop", number: "65445656", id: 3 },
    { name: "Luis lorn", number: "67576578", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNames, setFilteredNames] = useState(persons);

  const handleSubmit = () => {
    if (persons.some((el) => el.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber, id: 200 }]);
      console.log(persons);
    }
  };

  useEffect(() => {
    const filteredItems = persons.filter((name) =>
      name.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredNames(filteredItems);
  }, [searchTerm]);

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
          <button type="button" onClick={() => handleSubmit()}>
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
            </div>
          ))}
    </div>
  );
};

export default App;
