import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messages from "./pages/Messages";
import Form from "./pages/Form";
import MessageDetails from "./pages/MessageDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Messages />} />
        <Route path="/new" element={<Form />} />
        <Route path="/messages/:id" element={<MessageDetails />} />
        <Route path="/messages/:id/edit" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
