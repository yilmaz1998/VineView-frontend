import { Fragment } from 'react'
import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Red from "./Wines/Red"
import White from "./Wines/White"
import Rose from "./Wines/Rose"
import Sparkling from "./Wines/Sparkling"
import Dessert from "./Wines/Dessert"
import Port from "./Wines/Port"
import ShowWines from './components/ShowWines'

function App() {

  return ( 
  <Fragment>
    <Header />
    <Routes>
    <Route path="/red" element={<Red />} />
    <Route path="/white" element={<White />} />
    <Route path="/rose" element={<Rose />} />
    <Route path="/sparkling" element={<Sparkling />} />
    <Route path="/dessert" element={<Dessert />} />
    <Route path="/port" element={<Port />} />
    <Route path="/:type/:id" element={<ShowWines />} />
    </Routes>
  </Fragment>
)}

export default App
