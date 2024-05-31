import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={"Home"} />
        <Route path="/about" element={"About"} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
