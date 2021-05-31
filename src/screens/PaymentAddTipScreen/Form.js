import React from 'react';
import { View, Text } from 'react-native';
import { Form, Picker, Icon } from 'native-base';

import PropTypes from 'prop-types';
import NumbersDashboard from './NumbersDashboard';

import styles from './formStyle';

const FormComponent = ({
  amount,
  currency,
  handlePressNumberDashboard,
  handleDeleteText,
  handleChangeCurrency,
  currencySign,
  visibility,
  handleChangeStatus,
  handleConfirmTip,
  isConfirmTipLoading,
}) => (
  <View style={styles.container}>
    <Form style={styles.form}>
      <View style={styles.input}>
        <Text style={styles.inputText}>{currencySign}</Text>
        <Text numberOfLines={1} style={styles.inputText}>
          {amount.length && `${amount}.00`}
        </Text>
      </View>
      <Picker
        mode="dropdown"
        iosHeader="Public"
        iosIcon={<Icon style={{ left: -20, opacity: 0.6 }} name="ios-arrow-down" />}
        style={[styles.picker, styles.firstPicker]}
        selectedValue={visibility}
        textStyle={styles.pickerTextStyle}
        onValueChange={text => handleChangeStatus(text)}
      >
        <Picker.Item label="Public" value="public" />
        <Picker.Item label="Private" value="private" />
      </Picker>

      <Picker
        mode="dropdown"
        iosHeader="USD"
        iosIcon={<Icon style={{ left: -20, opacity: 0.6 }} name="ios-arrow-down" />}
        style={styles.picker}
        selectedValue={currency}
        textStyle={styles.pickerTextStyle}
        onValueChange={text => handleChangeCurrency(text)}
      >
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
      </Picker>
    </Form>

    <NumbersDashboard
      handlePressNumberDashboard={handlePressNumberDashboard}
      handleDeleteText={handleDeleteText}
      handleConfirmTip={handleConfirmTip}
      isConfirmTipLoading={isConfirmTipLoading}
    />
    <View style={styles.disclosureContainer}>
      <Text>
        {'  '}A Transaction Fee of 10% and a Payment Processing Fee of 2.9% + $0.35 will be added to
        your Tip.
      </Text>
    </View>
  </View>
);

FormComponent.propTypes = {
  amount: PropTypes.string,
  handleChangeCurrency: PropTypes.func,
  handleChangeStatus: PropTypes.func,
  handlePressNumberDashboard: PropTypes.func,
  handleConfirmTip: PropTypes.func,
  handleDeleteText: PropTypes.func,
  currency: PropTypes.string,
  currencySign: PropTypes.string,
  visibility: PropTypes.string,
  isConfirmTipLoading: PropTypes.bool,
};

FormComponent.defaultProps = {
  handlePressNumberDashboard: () => {},
  handleChangeCurrency: () => {},
  handleDeleteText: () => {},
  handleChangeStatus: () => {},
  handleConfirmTip: () => {},
  isConfirmTipLoading: false,
  amount: '',
  currency: '',
  currencySign: '',
  visibility: '',
};

export default FormComponent;
