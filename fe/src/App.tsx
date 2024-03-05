import { useEffect } from "react";
import "./App.css";

const fetchUsers = async () => {
  const response = await fetch("/api/users");
  const users = await response.json();
  return users;
};

function App() {
  useEffect(() => {
    fetchUsers()
      .then((users) => console.log(users))
      .catch(console.error);
  }, []);
  return <>Hello World</>;
}

export default App;
