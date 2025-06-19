import { Text, TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = TextProps & {
  type?: 'default' | 'title' | 'link';
};

export function ThemedText({ style, type = 'default', ...rest }: Props) {
  const color = useThemeColor({}, 'text');

  let typeStyle = styles.default;
  if (type === 'title') typeStyle = styles.title;
  if (type === 'link') typeStyle = styles.link;

  return <Text style={[{ color }, typeStyle, style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: '#1B95E0',
    textDecorationLine: 'underline',
  },
});
