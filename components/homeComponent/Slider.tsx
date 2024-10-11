import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Swiper from 'react-native-web-swiper';

const {width} = Dimensions.get('window');

const SliderComp = () => {
  return (
    <View style={styles.container}>
      <Swiper loop>
        {/* 첫 번째 슬라이드 */}
        <View style={styles.slide}>
          <View style={styles.box}>
            <Text style={styles.text}>슬라이드 1 - 콘텐츠 1</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>슬라이드 1 - 콘텐츠 2</Text>
          </View>
        </View>

        {/* 두 번째 슬라이드 */}
        <View style={styles.slide}>
          <View style={styles.box}>
            <Text style={styles.text}>슬라이드 2 - 콘텐츠 1</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>슬라이드 2 - 콘텐츠 2</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>슬라이드 2 - 콘텐츠 3</Text>
          </View>
        </View>

        {/* 세 번째 슬라이드 */}
        <View style={styles.slide}>
          <View style={styles.box}>
            <Text style={styles.text}>슬라이드 3 - 콘텐츠 1</Text>
          </View>
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flexDirection: 'row', // 수평으로 배치
    justifyContent: 'space-around', // 공간을 균등하게 배치
    alignItems: 'center',
    backgroundColor: '#99ff99',
    padding: 20,
  },
  box: {
    width: '30%', // 박스 너비 설정
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default SliderComp;
