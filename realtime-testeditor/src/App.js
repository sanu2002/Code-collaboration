import logo from "./logo.svg";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

import { Home } from "./pages/Home";
import { Editorpage } from "./pages/Editorpage";

import { BrowserRouter, Routes, Route } from "react-router";
import { ToastBar } from "react-hot-toast";

function App() {

  
  
  
  return (
    <>
      <div>
        {/* for showing toast  we have to make it global and it willl accessible in the entire endpoint  */}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              iconTheme: {
                name: "success",
                color: "#008000",
              },
            },
          }}
        />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomid" element={<Editorpage />} />
      </Routes>
    </>
  );
}

export default App;
