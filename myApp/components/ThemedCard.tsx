import { View, ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export function ThemedCard({ style, ...rest }: ViewProps) {
  const backgroundColor = useThemeColor({}, 'card');

  return <View style={[{ backgroundColor, borderRadius: 10, padding: 10 }, style]} {...rest} />;
}