import Song from './Song'
import loadingImg from '../assets/img/loading-image-black.svg'

const Results = ({ isLoading, results, lang }) => {
  if (isLoading) {
    return (
      <div className='d-flex justify-content-center'>
        <img src={loadingImg} />
      </div>
    )
  }

  return (
    <div className='ms-3'>
      {results.map(s => {       
        return (
          <Song 
            key={s.id}
            name={s.song[0]}
            nameJa={s.song[1]}
            releases={s.releases}
            lang={lang}
         />)
      })}
    </div>
  )
}

export default Results