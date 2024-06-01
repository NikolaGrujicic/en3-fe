import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import CreateEvent from "./pages/CreateEvent/index";
import Events from "./pages/Events/index";
import Header from "./components/Header";
import SingleEvent from "./pages/SingleEvent";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={"wkjnfwenfjwei"} />
        <Route path="/about" element={"wojnwmedc"} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<SingleEvent />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
