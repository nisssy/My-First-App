import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MilestoneTabParamList } from '../types/navigation';
import { TaskForMilestone } from '../types/task';
import Checkbox from './Checkbox';
import Icon from './Icon';
import TimeContents from './TimeContents';

type Props = {
  navigation: StackNavigationProp<MilestoneTabParamList, 'Milestone'>;
  data: TaskForMilestone;
};

const MilestoneListItem: React.FC<Props> = ({ navigation, data }: Props) => {
  const defaultMessage = '(タイトルが未設定です)';
  const title = data.title === '' ? defaultMessage : data.title;
  const style = title === defaultMessage ? { color: '#646464' } : {};
  const [checked, setChecked] = useState<boolean>(data.achievement);

  const handlePress: () => void = () => {
    navigation.navigate('MilestoneEditor', { data });
  };

  return (
    <View style={styles.milestoneListItem}>
      <View style={styles.successButton}>
        <Checkbox
          size={25}
          data={data}
          checked={checked}
          setChecked={setChecked}
        />
      </View>
      <View style={styles.milestoneListItemTextContainer}>
        <Text style={[styles.milestoneListItemText, style]}>{title}</Text>
        <TimeContents data={data} />
      </View>
      <TouchableOpacity style={styles.timerButton} onPress={handlePress}>
        <Icon name="Timer" size={20} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  milestoneListItem: {
    width: '100%',
    height: 104,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  milestoneListItemTextContainer: {
    justifyContent: 'center',
    marginLeft: 16,
  },
  milestoneListItemText: {
    color: '#000',
    fontSize: 16,
    lineHeight: 32,
  },
  milestoneListItemTime: {},
  milestoneListListItemDue: {
    color: '#646464',
    fontSize: 14,
    lineHeight: 24,
  },
  milestoneListListItemLeft: {
    color: '#646464',
    fontSize: 14,
    lineHeight: 20,
  },
  timerButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 24,
    top: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneListItemDeleteButton: {
    position: 'absolute',
    right: 24,
    top: '50%',
  },
  successButton: {
    width: 50,
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MilestoneListItem;
