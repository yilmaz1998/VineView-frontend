import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from 'framer-motion'

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
  return ( 
    <AnimatePresence>
    <Header />
    <Routes location={location} key={location.pathname}>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/red" element={<Red />} />
    <Route path="/white" element={<White />} />
    <Route path="/rose" element={<Rose />} />
    <Route path="/sparkling" element={<Sparkling />} />
    <Route path="/dessert" element={<Dessert />} />
    <Route path="/port" element={<Port />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/favorites" element={<MyFavorites />} />
    </Routes>
    </AnimatePresence>
)}

export default App
