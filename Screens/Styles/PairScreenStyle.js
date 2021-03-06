import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#16AB1F',
		alignItems: 'center',
	},
	pairingFormContainer: {
		flex: 3,
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
		backgroundColor: '#090B0C',
		width: '90%',
		borderRadius: 20,
	},
	headerContainer: {
		flex: 2,
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 20,
		resizeMode: 'repeat',
		width:'100%',
		height:undefined
	},
	logoImage: {
		width: '40%',
		height: undefined,
		resizeMode: 'contain',
		flex:1,
	},
	pairCodeInput: {
		color: '#FFFFFF',
		fontSize: 30,
		fontWeight: 'bold',
		fontFamily: 'Roboto',
		borderColor: '#16AB1F',
		borderWidth: 1,
		borderRadius: 4,
		borderBottomColor: '#FFFFFF',
		borderBottomWidth: 4,
		width: '22%',
		height: 53,
		textAlign: 'center', 
	},
	connectImage: {
		width: 28,
		height: 28,
		marginBottom: 10,
	},
	pairStatusContainer: {
		paddingBottom:20,
		paddingTop:20,
		flex: 2,
		backgroundColor: '#0F1416',
		width: '100%',
		alignItems: 'center',
		borderRadius: 20,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	codeFieldsContainer : {
		flexDirection: 'row',
		flex: 1,
		width: '80%',
		justifyContent: 'space-around',
		paddingTop:20,
		paddingBottom:20,
	},
	connectMessage : {
		alignItems : 'center',
		textAlign : 'center',
		fontFamily : 'Roboto',
		color : '#FFFFFF',
		width : '50%',
		fontSize : 16,
	},
	ventilatorName : {
		color : '#20AFFF',
	},
	bottomSpacer: {
		flex: 1,
	},
	buttonContainer: {
		flex:2,
		paddingTop: 30,
		paddingBottom: 20,
		width: '80%', 
	},
	submitButton: {
		width: '100%',
		backgroundColor: '#16AB1F',
		height: 54,
		borderRadius: 10,
	},
	submitButtonText: {
		color: '#FFFFFF',
		textAlign: 'center',
		lineHeight: 54,
		fontSize: 19,
		fontWeight: 'bold',
	}
});
