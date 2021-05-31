import { StyleSheet } from 'react-native';
import { brownGrey } from '../../../utils/variables';

const styles = StyleSheet.create({
  withdrawContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
  },
  withdraw: {
    width: '40%',
  },
  withdrawText: {
    fontSize: 15,
    color: brownGrey,
    marginTop: 4,
  },
});

export default styles;
