import React from 'react';
import { View } from 'react-native';
import MilestoneListItem from './MilestoneListItem';
import { utcToZonedTime } from 'date-fns-tz';

function MilestoneList(props) {
  const {navigation, list} = props;
  const newList = list.filter((element, index, self) =>
    self.findIndex(e =>
      e.id === element.id
    ) === index
  );

  return (
    <View>
      {
        newList.map(data => <MilestoneListItem navigation={navigation} data={data} key={data.id} />)
      }
    </View>
  )
}

export default MilestoneList;
