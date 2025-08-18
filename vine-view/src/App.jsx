import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect } from "react"

import Header from "./components/Header"
import Red from "./Wines/Red"
import White from "./Wines/White"
import Rose from "./Wines/Rose"
import Sparkling from "./Wines/Sparkling"
import Dessert from "./Wines/Dessert"
import Port from "./Wines/Port"
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import MyFavorites from './components/MyFavorites'
import WelcomePage from './components/WelcomePage'

function App() {
const location = useLocation()
const [searchQuery, setSearchQuery] = useState("");

useEffect(() => {
  setSearchQuery("")
}, [location.pathname])

  return ( 
    <AnimatePresence>
    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <div className="pt-16">
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/red" element={<Red searchQuery={searchQuery}/>} />
      <Route path="/white" element={<White searchQuery={searchQuery}/>} />
      <Route path="/rose" element={<Rose searchQuery={searchQuery}/>} />
      <Route path="/sparkling" element={<Sparkling searchQuery={searchQuery}/>} />
      <Route path="/dessert" element={<Dessert searchQuery={searchQuery}/>} />
      <Route path="/port" element={<Port searchQuery={searchQuery}/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/favorites" element={<MyFavorites searchQuery={searchQuery}/>} />
    </Routes>
  </div>
    </AnimatePresence>
)}

export default App
