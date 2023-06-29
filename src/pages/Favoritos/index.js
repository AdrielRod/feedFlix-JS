import { useEffect, useState } from "react"
import { useParams, useNavigate, json } from "react-router-dom"
import api from "../../services/api"
import { Link } from "react-router-dom"
import "./index.css"
import {toast} from 'react-toastify'

export default function Favoritos(){

    const [filmes, setFilmes] = useState([])
    
    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhaLista) || [])
    })

    function excluirFilme(id){
        let filtro = filmes.filter((item) =>{
            return (item.id !== id)
        })

        setFilmes(filtro)
        localStorage.setItem("@primeflix", JSON.stringify(filtro))
        toast.success("Filme removido com sucesso.")
    }
    
    return(
        <div className="meus-filmes">
            <h1>Filmes Favoritados</h1>

            {filmes.length === 0  && <span>Salve algum filme primeiro</span>}
            <ul>
                {filmes.map((item) =>{
                    return(
                        <li key={item.id}>
                            <span> {item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}