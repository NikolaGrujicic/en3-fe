import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import CreateEvent from "./pages/CreateEvent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={"wkjnfwenfjwei"} />
        <Route path="/about" element={"wojnwmedc"} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
