import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
    zIndex: 0,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
    flexDirection: 'row',
    paddingBottom: 3,
  },

  label: { fontSize: 16, opacity: 0.6, marginBottom: 5, zIndex: 0 },

  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 18,
  },

  text: {
    fontSize: 16,
  },
});
