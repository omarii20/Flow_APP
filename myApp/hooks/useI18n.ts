import { useEffect, useState } from 'react';
import i18n, { getRTL } from '../i18n';

export function useI18n() {
  const [isRTL, setIsRTL] = useState(getRTL());

  useEffect(() => {
    // אם תרצה להגיב לשינויים דינמיים בעתיד
    setIsRTL(getRTL());
  }, [i18n.locale]); // מאזין לשינוי שפה

  return { i18n, isRTL };
}
