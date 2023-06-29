import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../services/api"
import "./index.css"
import {toast} from 'react-toastify'

export default function Filmes(){
    const {id} = useParams()
    const navigate = useNavigate()

    const [filme, setFilme] = useState({})
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        async function fetchFilme(){
            const response = await api.get(`/movie/${id}`, {
                params:{
                    api_key: "793d61f09cc067ffddceab5912d2bed6",
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false)
            })
            .catch((err) =>{
                console.log("Filme não encontrado")
                setLoading(false)
                navigate("/", {replace: true})
            })
        }
        fetchFilme()


    }, [id, navigate])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix")
        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme já esta na sua lista")
            
        }else{
            filmesSalvos.push(filme)
            localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
            toast.success("Filme salvo com sucesso.")
        }

        
    }

    if(loading){
        return(
          <div className="loading"> 
            <h2>Carregando filme..</h2>
          </div>
        )
      }
    
    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>

            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel="external">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}