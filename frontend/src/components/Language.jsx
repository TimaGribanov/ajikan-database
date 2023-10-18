import { LANGUAGES } from '../constants/languages'

const Language = ({ handleLangs }) => {
  return (
    <select className='form-select mt-3 border-dark w-50' onChange={handleLangs}>
      {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
    </select>
  )
}

export default Language