import { Suspense, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

import Search from './components/Search'
import Results from './components/Results'
import Footer from './components/Footer'
import Info from './components/Info'
import Language from './components/Language'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [songName, setSongName] = useState('')
  const [results, setResults] = useState([])
  const [infoShown, setInfoShown] = useState(false)
  const [language, setLanguage] = useState('en')

  const { i18n, t } = useTranslation()

  const handleSearch = async event => {
    event.preventDefault()

    setLoading(true)

    if (songName === '')
      alert(t('alertNoInput'))
    else if (songName.length === 1)
      alert(t('alertOneLetter'))
    else {
      let search = songName
      if (search.toLowerCase() === 'soranin') search = 'solanin'
      const response = await axios.get('http://localhost:3001/api/songs', { params: { name: search } })
      setResults(response.data)
    }
    setLoading(false)
  }

  const handleSongInput = event => {
    setSongName(event.target.value)
  }

  const handleInfo = event => {
    event.preventDefault()

    setInfoShown(infoShown ? false : true)
  }

  const handleLangs = event => {
    const langCode = event.target.value
    i18n.changeLanguage(langCode)
    setLanguage(langCode)
  }

  return (
    <>
      <Suspense fallback='loading'>
        <main className='container'>
          <div className='row'>
            <div className='col-8 me-3'>
              <Search
                t={t}
                handleSongInput={handleSongInput}
                handleSearch={handleSearch}
              />
              <Results
                isLoading={loading}
                results={results}
                lang={language}
              />
            </div>
            <div className='col ms-3'>
              <Language handleLangs={handleLangs} />
              <Info
                visible={infoShown}
                handleInfo={handleInfo}
                lang={language}
              />
            </div>
          </div>
        </main>
        <Footer />
      </Suspense>
    </>
  )
}

export default App