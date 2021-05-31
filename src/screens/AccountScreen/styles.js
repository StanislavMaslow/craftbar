import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },

  containerForm: {
    marginTop: 20,
    marginLeft: 35,
  },

  headerForm: {
    flexDirection: 'row',
  },

  containerImage: {
    borderRadius: 5,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    marginRight: 20,
    position: 'relative',
  },

  opacityImageContainer: {
    position: 'absolute',
    width: 135,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addIconImage: {
    fontSize: 50,
  },

  image: {
    width: 135,
    height: 185,
  },

  changePictureContainer: {
    height: 45,
    backgroundColor: 'rgb(236, 237, 241)',
    justifyContent: 'center',
  },

  changePictureText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'OpenSansBold',
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 18,
    fontFamily: 'OpenSansRegular',
    opacity: 0.6,
    color: '#000',
    top: -10,
  },

  item: {
    marginTop: 10,
    marginLeft: 0,
  },

  input: {
    fontSize: 18,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
