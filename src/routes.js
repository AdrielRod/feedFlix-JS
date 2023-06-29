import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Filmes from "./pages/Filmes";
import Erro from "./pages/Erro";
import Header from "./components/Header";
import Favoritos from "./pages/Favoritos";

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/filmes/:id" element={ <Filmes/> }/>
                <Route path="/favoritos" element={ <Favoritos/> }/>

                <Route path="*" element={ <Erro/> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp