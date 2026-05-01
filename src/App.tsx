import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
import { ContextProvider } from "./hooks/Context"
import { Login } from "./pages/Login";
import { SharedBrain } from "./pages/SharedBrain";


function App() {
 
  return (

   
  

    <BrowserRouter>
    <ToastContainer
    position="bottom-right"
    autoClose={1000}
    closeOnClick={true}
    pauseOnHover={true}
    theme="light"
    draggable
    
    />
    


    <Routes>

      <Route   path="/"  element={<Signup/>}/>
      <Route  path="/Signup" element={<Signup/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Dashboard" element={<ContextProvider>
        
        
        <Dashboard/>
        
        </ContextProvider>}/>

        <Route path="/brainly/:shareLink" element={<SharedBrain/>}/>


      




    </Routes>
    </BrowserRouter>
  )
}

export default App
