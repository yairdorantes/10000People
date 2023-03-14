import axios from "axios";
import { useEffect, useState } from "react";
// alert("hello world from javaascript");
function App() {
  const [people, setPeople] = useState([]);
  const [amount, setAmount] = useState(11);
  const [quantity, setQuantity] = useState(11);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [toEdit, setToEdit] = useState();
  const [Person, setPerson] = useState({});
  const searchInput = (e) => {
    e.preventDefault();
    const results = people.filter((person) =>
      person.name.toLowerCase().startsWith(query.toLowerCase())
    );
    setResults(results);
  };
  const byAge = (e) => {
    e.preventDefault();
    const results = people.filter((person) => person.age === parseInt(query));
    setResults(results);
  };
  const byId = (e) => {
    e.preventDefault();
    const results = people.filter((person) => person.id === parseInt(query));
    setResults(results);
  };
  const removeUser = (id, search = false) => {
    if (search) {
      const res = results.filter((person) => person.id !== id);
      setResults(res);
      axios.get(`http://127.0.0.1:8000/api/del-people/${id}`);
    } else {
      const results = people.filter((person) => person.id !== id);
      setPeople(results);
      axios.get(`http://127.0.0.1:8000/api/del-people/${id}`);
    }
  };

  const sendDataChange = (id) => {
    if (
      Person.name != "" &&
      Person.age != "" &&
      Person.phone != "" &&
      Person.email != ""
    ) {
      axios
        .put(`http://127.0.0.1:8000/api/update/${id}`, Person)
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            setToEdit(-1);
            const updatedList = people.map((person) => {
              if (person.id === id) {
                return { ...person, ...Person };
              }
              return person;
            });
            setPeople(updatedList);
          }
        });
    } else {
      alert("Llena todos los datos");
    }
  };
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/get-people").then((res) => {
      setPeople(res.data.people);
      console.log(res.data.people);
    });
  }, []);
  const sendData = () => {
    // axios
    //   .post("http://127.0.0.1:8000/api/get-people", {
    //     name: "yair",
    //     age: "20",
    //     email: "jaja",
    //     phone: "72999",
    //   })
    //   .then((res) => {
    //     alert(JSON.stringify(res.data));
    //     console.log(res.data);
    //   });
    alert("😃 Haz pulsado un boton jajaja xdxd");
  };

  return (
    <div className="">
      <div>
        <button className="btn" onClick={sendData}>
          tester
        </button>
      </div>
      <div className="mx-auto text-center text-accent">Por letra incial: </div>
      <form className="mb-10 mt-5 mx-auto w-1/2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          test label
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            onChange={(e) => setQuery(e.target.value)}
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            // required
          />
          <button
            // type="submit"
            onClick={searchInput}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buscar
          </button>
        </div>
      </form>
      <div className="mx-auto text-center text-accent">Por Edad: </div>

      <form className="mb-10 mt-5 mx-auto w-1/2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            onChange={(e) => setQuery(e.target.value)}
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            // required
          />
          <button
            // type="submit"
            onClick={byAge}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buscar
          </button>
        </div>
      </form>
      <div className="mx-auto text-center text-accent">Por ID: </div>

      <form className="mb-10 mt-5 mx-auto w-1/2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Buscar
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            onChange={(e) => setQuery(e.target.value)}
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            // required
          />
          <button
            // type="submit"
            onClick={byId}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buscar
          </button>
        </div>
      </form>
      <div className="mb-10">
        <div className="text-yellow-400 mb-5 font-bold">
          Resultados de busqueda:
        </div>
        {results.length && (
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>id</th>

                  <th className="text-success">nombre</th>
                  <th>edad</th>
                  <th>email</th>
                  <th>numero</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {results.map((person, key) => {
                  if (quantity > key) {
                    return (
                      <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                        <td>{person.age}</td>
                        <td>{person.email}</td>
                        <td>{person.phone}</td>
                        <div
                          onClick={() => removeUser(person.id, true)}
                          className="btn btn-error"
                        >
                          Borrar
                        </div>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
            {results.length > 0 && (
              <div className="btn" onClick={() => setQuantity(quantity + 10)}>
                More
              </div>
            )}
          </div>
        )}
        {results[0] === undefined && query.length > 0 && (
          <div className="alert alert-warning shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                Sin cohincidencias de busqueda para{" "}
                <span className="font-bold">{query}</span> !
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-yellow-500">id</th>
              <th className="text-success">Nombre</th>
              <th className="text-success">Edad</th>
              <th className="text-success">Correo electronico</th>
              <th className="text-success">Numero telefonico</th>
              <th className="text-success">Accion</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, key) => {
              if (amount > key) {
                return (
                  <tr
                    key={person.id}
                    className={person.id % 2 === 0 ? "active" : ""}
                  >
                    <th className="text-yellow-500">{person.id}</th>
                    {toEdit === person.id ? (
                      <td>
                        <input
                          value={Person.name}
                          type="text"
                          onChange={(e) =>
                            setPerson({ ...Person, name: e.target.value })
                          }
                          className="input w-1/2 input-bordered input-accent  max-w-xs"
                        />
                      </td>
                    ) : (
                      <td>{person.name}</td>
                    )}
                    {toEdit === person.id ? (
                      <th>
                        <input
                          type="number"
                          value={Person.age}
                          onChange={(e) =>
                            setPerson({ ...Person, age: e.target.value })
                          }
                          className="input input-bordered input-accent w-1/2 max-w-xs"
                        />
                      </th>
                    ) : (
                      <td>{person.age}</td>
                    )}
                    {toEdit === person.id ? (
                      <td>
                        <input
                          value={Person.email}
                          type="text"
                          onChange={(e) =>
                            setPerson({ ...Person, email: e.target.value })
                          }
                          className="input input-bordered input-accent w-1/2 max-w-xs"
                        />
                      </td>
                    ) : (
                      <td>{person.email}</td>
                    )}
                    {toEdit === person.id ? (
                      <td>
                        <input
                          value={Person.phone}
                          type="text"
                          onChange={(e) =>
                            setPerson({ ...Person, phone: e.target.value })
                          }
                          className="input input-bordered input-accent w-1/2 max-w-xs"
                        />
                      </td>
                    ) : (
                      <td>{person.phone}</td>
                    )}
                    <td className="flex gap-2">
                      {toEdit === person.id ? (
                        <div
                          className="btn"
                          onClick={() => sendDataChange(person.id)}
                        >
                          ✅
                        </div>
                      ) : (
                        <div
                          className="btn"
                          onClick={() => {
                            setPerson({
                              name: person.name,
                              age: person.age,
                              phone: person.phone,
                              email: person.email,
                            });
                            setToEdit(person.id);
                          }}
                        >
                          🖊️
                        </div>
                      )}
                      <div
                        className="btn"
                        onClick={() => removeUser(person.id)}
                      >
                        🗑️
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="btn" onClick={() => setAmount(amount + 100)}>
        more
      </div>
    </div>
  );
}

export default App;
