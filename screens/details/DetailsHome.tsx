import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Link} from 'react-router-native';

const DetailsHome = () => {
  return (
    <View>
      <Text>DetailsHome</Text>
      <TouchableOpacity>
        <Link to="/">
          <Text>dd</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default DetailsHome;
