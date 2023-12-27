import "./App.css";
import UserDetails from "./components/UserDetailId";
import { Route, Routes } from "react-router-dom";
import HomeUsers from "./components/HomeUsers";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomeUsers />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
