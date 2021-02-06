import React from 'react';
import { View } from 'react-native';
import MilestoneListItem from './MilestoneListItem';

function MilestoneList(props) {
  const {navigation} = props;
  return (
    <View>
      <MilestoneListItem navigation={navigation} />
    </View>
  )
}

export default MilestoneList;
