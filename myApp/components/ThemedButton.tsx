import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = TouchableOpacityProps & {
  title: string;
};

export function ThemedButton({ title, style, ...rest }: Props) {
  const backgroundColor = useThemeColor({}, 'buttonBackground');
  const color = useThemeColor({}, 'buttonText');

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }, style]} {...rest}>
      <Text style={[styles.text, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 2,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});
