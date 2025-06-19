import { useTheme } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { theme } = useTheme();
  const colorFromProps = props[theme];
  return colorFromProps ?? Colors[theme][colorName];
}