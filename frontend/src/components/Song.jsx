import Release from './Release'
import normalise_uri from '../utils/uri_helper'

const Song = ({ name, nameJa, releases, lang }) => {
  const uri = normalise_uri(name)

  let nameToPrint = name
  if (lang === 'ja') nameToPrint = nameJa

  return (
    <div className='mb-4'>
      <h3 className={lang}><a target='_blank' rel='noreferrer' href={'https://akfgfragments.com/song?' + uri}>{nameToPrint}</a></h3>
      <ul>
        {releases.map(r => {
          return (
          <Release 
            key={r.rel_id}
            name={r.rel_title_ro}
            nameJa={r.rel_title_ja}
            lang={lang}
          />
          )
        })
        }
      </ul>
    </div>
  )
}

export default Song