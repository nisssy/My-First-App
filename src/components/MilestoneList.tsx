import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { MilestoneTabParamList } from '../types/navigation';
import { TaskForMilestone } from '../types/task';
import MilestoneListItem from './MilestoneListItem';

type Props = {
  navigation: StackNavigationProp<MilestoneTabParamList, 'Milestone'>;
  list: TaskForMilestone[];
};

const MilestoneList: React.FC<Props> = ({ navigation, list }: Props) => {
  const newList = list.filter(
    (element, index, self) =>
      self.findIndex((e) => e.id === element.id) === index
  );

  return (
    <View>
      {newList.map((data) => (
        <MilestoneListItem navigation={navigation} data={data} key={data.id} />
      ))}
    </View>
  );
};

export default MilestoneList;
