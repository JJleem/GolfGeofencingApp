import React from 'react';
import {Dimensions, SafeAreaView, View} from 'react-native';
import Carousel from './Carousel';

const screenWidth = Math.round(Dimensions.get('window').width);
const PAGES = [
  {
    num: 1,
    color: '#86E3CE',
  },
  {
    num: 2,
    color: '#D0E6A5',
  },
  {
    num: 3,
    color: '#FFDD94',
  },
  {
    num: 4,
    color: '#FA897B',
  },
  {
    num: 5,
    color: '#CCABD8',
  },
  {
    num: 6,
    color: '#a2ABD8',
  },
  {
    num: 7,
    color: '#f00',
  },
  {
    num: 8,
    color: '#ff0',
  },
  {
    num: 9,
    color: '#0ff',
  },
  {
    num: 10,
    color: '#f0f',
  },
  {
    num: 11,
    color: '#ffd',
  },
];

const HomeSlider = () => {
  return <Carousel gap={2} offset={1} pages={PAGES} pageWidth={35} />;
};

export default HomeSlider;
