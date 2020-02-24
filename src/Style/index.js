import { StyleSheet } from 'react-native';
import THEME from './theme';

export default StyleSheet.create({
  // safeArea
  safeArea: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    backgroundColor: THEME.SAFE_AREA_BG,
  },
  // Buttons
  btn: {
    borderRadius: 10,
    paddingBottom: 12,
    paddingTop: 12,
  },
  primaryBtn: {
    backgroundColor: THEME.YELLOW_POKEMON,
  },
  smallBtn: {
    width: '80%',
  }
});