import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import CreateEvent from "./pages/CreateEvent/index";
import Events from "./pages/Events/index";
import Header from "./components/Header";
import SingleEvent from "./pages/SingleEvent";
import Home from "./pages/Home";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    if (window.ethereum && window) {
      const callWindowEthereum = async () => {
        const res: any = await window.ethereum.enable();
        console.log(res);
      };
      callWindowEthereum();
      console.log(window.ethereum);
      // window.ethereum.request({
      //   method: "eth_accounts",
      // });
      // const signerAccount = provider.getSigner();
      // setSigner(signerAccount);
      // signerAccount.getAddress().then((address) => setAccount(address));
    }
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={"wojnwmedc"} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<SingleEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
