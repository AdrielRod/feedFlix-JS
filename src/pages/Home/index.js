import './index.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {toast} from 'react-toastify'

function Home() {

  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function fetchApi(){

      const response = await api.get('movie/now_playing', {
        params: {
          api_key: "793d61f09cc067ffddceab5912d2bed6",
          language: 'pt-BR',
          page: 1
        }
      })

      setFilmes(response.data.results.slice(0, 10))
      setLoading(false)
      console.log(filmes)
      
      
    }

    fetchApi()
  }, [])

  if(loading){
    return(
      <div className="loading"> 
        <h2>Carregando filmes..</h2>
      </div>
    )
  }

  return (
    <div className='app'>
      <div className='lista-filmes'>
        {filmes.map((filme) => {
          return(
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
              <Link to={`/filmes/${filme.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  );
}

export default Home;
