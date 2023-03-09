import { useTranslation } from 'react-i18next';

import style from './NotFound.module.css';


const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className={style.wrapper}>
      <div className={style.title}>{t('Not found')}</div>
      <div className={style.text}>{t('Page was deleted or you do not have enough rights')}</div>
    </div>
  )
}

export default NotFound;
