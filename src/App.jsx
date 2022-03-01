import "./App.css";
import { useState } from "react";
import useFrom from "./useForm";

const INITIAL_DATA_STORE = [];

const INITIAL_DATA = {
  name: "",
  age: "",
  dob: "",
  gender: "",
};

function App() {
  const [person, setPerson] = useState(INITIAL_DATA);
  const [dataStore, setDataStore] = useState(INITIAL_DATA_STORE);
  const [loader, setLoader] = useState(false);

  const { dataValidator } = useFrom();
  
  // console.log(0 || "om Prakash" || null);
  
  // Input chnage handler
  const onChnageHandler = (event) => {
    const { name, value } = event.target;
    // const {target:{name , value}} = event

    // const name = event.target.name;
    // const value = event.target.value;

    setPerson((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


//! From submitsion Action
  const handleSubmit = (event) => {
    try {
      setLoader(true);

      // Preventing Default behaviour of form.
      event.preventDefault();

      //Now process manually.
      const validData = dataValidator(person);

      if (validData) {
        setDataStore((prevData) => [...prevData, { ...person }]);
        setPerson(INITIAL_DATA);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoader(false);
    }
  };

  const handleDeleteOperation = (event, dataIndex) => {
    event.preventDefault();
    dataStore.splice(dataIndex, 1);

    setDataStore((currentData) => [...currentData]);
  };

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <div className="from_input">
          <div className="label">
            <label htmlFor="#name">Name</label>
          </div>
          <div className="field">
            <input
              type="text"
              name="name"
              onChange={onChnageHandler}
              id="name"
              value={person.name}
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="from_input">
          <div className="label">
            <label htmlFor="#age">Age</label>
          </div>
          <div className="field">
            <input
              type="number"
              name="age"
              onChange={onChnageHandler}
              value={person.age}
              id="age"
              placeholder="Enter Age"
            />
          </div>
        </div>
        <div className="from_input">
          <div className="label">
            <label htmlFor="#dob">Date of birth</label>
          </div>
          <div className="field">
            <input
              type="date"
              name="dob"
              onChange={onChnageHandler}
              value={person.dob}
              id="dob"
            />
          </div>
        </div>
        <div className="from_input">
          <div className="label">
            <label htmlFor="#gender">Gender</label>
          </div>
          <div className="field">
            <select className="select"
              name="gender"
              id="gender"
              value={person.gender}
              onChange={onChnageHandler}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">others</option>
            </select>
          </div>
        </div>

        <div className="from_button">
          <button className="sub-button" type="submit" disabled={loader}>
            Submit
          </button>
        </div>
      </form>

      <h1>Person Lists</h1>
      {dataStore.length > 0 && (
        <table border="1" >
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataStore.map((person, index) => {
              const { name, age, dob, gender } = person;
              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{age}</td>
                  <td>{dob}</td>
                  <td>{gender}</td>
                  <td>
                    <button className="del-button"
                      onClick={(event) => handleDeleteOperation(event, index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
