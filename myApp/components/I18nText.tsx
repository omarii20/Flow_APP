import React from 'react';
import { Text, TextProps, I18nManager } from 'react-native';
import i18n, { getRTL } from '../i18n';

type Props = TextProps & {
  tKey?: string; // מפתח מתוך קובץ התרגום
  children?: React.ReactNode; // טקסט רגיל אם אין מפתח
};

export default function I18nText({ tKey, children, style, ...props }: Props) {
  return (
    <Text
      {...props}
      style={[
        {
          textAlign: getRTL() ? 'right' : 'left',
          writingDirection: getRTL() ? 'rtl' : 'ltr',
        },
        style,
      ]}
    >
      {tKey ? i18n.t(tKey) : children}
    </Text>
  );
}
