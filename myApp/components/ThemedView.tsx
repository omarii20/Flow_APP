import { View, ViewProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

type Props = ViewProps;

export function ThemedView({ style, ...rest }: Props) {
  const { theme } = useTheme();
  const backgroundColor = { backgroundColor: Colors[theme].background };

  return <View style={[backgroundColor, style]} {...rest} />;
}