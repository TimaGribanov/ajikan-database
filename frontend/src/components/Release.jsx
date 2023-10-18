import normalise_uri from '../utils/uri_helper'

const Release = ({ name, nameJa, lang }) => {
  const uri = normalise_uri(name)

  let nameToPrint = name
  if (lang === 'ja') nameToPrint = nameJa

  return <li className={lang}><a target='_blank' rel='noreferrer' href={'https://akfgfragments.com/release?' + uri}>{nameToPrint}</a></li>
}

export default Release