import InfoText from './InfoText'

const Info = ({ visible, handleInfo, lang }) => {

  return (
    <div id='infoBlock' className='mt-3 row d-flex justify-content-md-start justify-content-center'>
      <div className='col d-flex justify-content-md-start justify-content-center'>
        <i className='bi bi-question-circle fs-4' onClick={handleInfo}></i>
      </div>
      <InfoText visible={visible} lang={lang} />
    </div>
  )
}

export default Info