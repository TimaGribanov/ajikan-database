import InfoText from './InfoText'

const Info = ({ visible, handleInfo, lang }) => {

  return (
    <div id='infoBlock' className='mt-3'>
      <i className='bi bi-question-circle fs-4' onClick={handleInfo}></i>
      <InfoText visible={visible} lang={lang} />
    </div>
  )
}

export default Info