import { TextInput, TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export function ThemedInput(props: TextInputProps) {
  const backgroundColor = useThemeColor({}, 'inputBackground');
  const borderColor = useThemeColor({}, 'inputBorder');

  return (
    <TextInput
      {...props}
      style={[
        {
          backgroundColor,
          borderColor,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          height: 40,
        },
        props.style,
      ]}
    />
  );
}