import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  stubContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 200,
  },
  button: {
    marginTop: 42,
    marginBottom: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
    height: 50,
    width: 255,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
