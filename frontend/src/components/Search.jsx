const Search = ({ t, handleSongInput, handleSearch }) => {
  return (
    <form onSubmit={handleSearch} className='mb-3 mt-3'>
      <div className='input-group'>
        <input onChange={handleSongInput} type='text' className='form-control form-control-lg border-dark' placeholder={t('searchPlaceholder')} />
        <button type='submit' className='btn btn-outline-dark'>{t('searchBtn')}</button>
      </div>
    </form>
  )
}

export default Search