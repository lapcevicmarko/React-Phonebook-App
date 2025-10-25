import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if(storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  const handleAdd = () => {
    if(!name || !phone) return;

    const newContact = {name, phone};
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setName('');
    setPhone('');
  };

  const handleDelete = (index) =>  {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>

      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Name">
      </input>

      <input 
        type="text" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone number">
      </input>

      <button onClick={handleAdd}>Add</button>

      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact.name} - {contact.phone}
            <button onClick={() => handleDelete(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;