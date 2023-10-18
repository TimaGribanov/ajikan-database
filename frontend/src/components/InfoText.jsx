import { Trans } from 'react-i18next'

const InfoText = ({ visible, lang }) => {
  if (visible)
    return (
      <div id='infoText' className={lang}>
        <Trans
          i18nKey='infoBlock'
          components={{
            site_anchor: <a href='https://akfgfragments.com' rel='noreferrer' target='_blank' />
          }}/>
      </div>
    )

  return <></>
}

export default InfoText