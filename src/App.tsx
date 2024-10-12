import { Signup } from "./pages/signup"
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {Dashboard} from "./pages/dashboard"
function App() {


  return (
    <>
    <div>

    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<Signup />}></Route>
      {/* <Route path="/home" element ={<DashBoard />}></Route> */}
    </Routes>
    </BrowserRouter>

    </div>
    </>
  )
}

export default App
