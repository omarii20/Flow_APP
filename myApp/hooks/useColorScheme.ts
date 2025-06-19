export { useColorScheme } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

const { theme } = useTheme();
const color = Colors[theme].text;
