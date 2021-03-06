import { StyleSheet } from 'react-native';
import { color, font } from 'repeat-please-styles';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: color.light,
	},
	levelTitleStyle: {
		fontFamily: font.title,
		fontSize: 24,
		marginHorizontal: 20,
	},
	levelChoiceContainer: {
		marginTop: 5,
	},
	playButtonContainer: {
		alignItems: 'center',
	},
	playButtonStyle: {
		position: 'absolute',
		bottom: 10,
	},
});
