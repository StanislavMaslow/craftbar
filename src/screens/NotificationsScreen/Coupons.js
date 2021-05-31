import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
// import { Icon } from 'native-base';
import style from './couponsStyle';

// const couponImg1 = require('../../../assets/images/coupon1.png');
// const couponImg2 = require('../../../assets/images/coupon2.png');
// const couponImg3 = require('../../../assets/images/coupon3.png');

export default () => (
  <View style={style.container}>
    <View
      style={{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
      }}
    >
      <Text>Sorry, we didn't find any coupons.</Text>
    </View>
    {/* <View style={style.greyBlock} />
    <ScrollView>
      <View style={style.row}>
        <View style={style.leftSide}>
          <Image source={couponImg1} />
        </View>
        <View style={style.rigthSide}>
          <Text style={style.caption}>End of Summer</Text>
          <Text style={style.dolar}>$15</Text>
          <View style={style.containerText}>
            <Icon
              name="location-pin"
              type="SimpleLineIcons"
              style={style.pinIcon}
            />
            <Text style={style.textIcon}>Puzzles Bar</Text>
          </View>

          <View style={style.containerText}>
            <Icon name="clock" type="EvilIcons" style={style.clockIcon} />
            <Text style={style.textIcon}>31 August</Text>
          </View>
        </View>
      </View>

      <View style={style.row}>
        <View style={style.leftSide}>
          <Image source={couponImg2} />
        </View>
        <View style={style.rigthSide}>
          <Text style={style.caption}>End of Summer</Text>
          <Text style={style.dolar}>$25</Text>
          <View style={style.containerText}>
            <Icon
              name="location-pin"
              type="SimpleLineIcons"
              style={style.pinIcon}
            />
            <Text style={style.textIcon}>Puzzles Bar</Text>
          </View>

          <View style={style.containerText}>
            <Icon name="clock" type="EvilIcons" style={style.clockIcon} />
            <Text style={style.textIcon}>31 September</Text>
          </View>
        </View>
      </View>

      <View style={[style.row, { marginBottom: 20 }]}>
        <View style={style.leftSide}>
          <Image source={couponImg3} />
        </View>
        <View style={style.rigthSide}>
          <Text style={style.caption}>End of Summer</Text>
          <Text style={style.dolar}>$10</Text>
          <View style={style.containerText}>
            <Icon
              name="location-pin"
              type="SimpleLineIcons"
              style={style.pinIcon}
            />
            <Text style={style.textIcon}>Puzzles Bar</Text>
          </View>

          <View style={style.containerText}>
            <Icon name="clock" type="EvilIcons" style={style.clockIcon} />
            <Text style={style.textIcon}>25 September</Text>
          </View>
        </View>
      </View>
    </ScrollView> */}
  </View>
);
