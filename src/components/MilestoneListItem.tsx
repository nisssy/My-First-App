import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { variables } from '../lib/variables/stylingVariables';
import Checkbox from './Checkbox';
import Icon from './Icon';
import TimeContents from './TimeContents';

function MilestoneListItem(props) {
  const { navigation, data} = props;
  const [checked, setChecked] = useState(data.achievement);
  const defaultMessage = '(タイトルが未設定です)'
  const title = data.title === '' ? defaultMessage : data.title;
  const style =  title === defaultMessage ? {color: '#646464'} : {};


  function handlePress() {
    navigation.navigate('MilestoneEditor', { data });
  }

  return (
    <View style={styles.milestoneListItem}>
      <TouchableOpacity style={styles.successButton}>
        <Checkbox size={25} data={data} checked={checked} setChecked={setChecked} />
      </TouchableOpacity>
      <View style={styles.milestoneListItemTextContainer}>
        <Text style={[styles.milestoneListItemText, style]}>
          {title}
        </Text>
        <TimeContents data={data} />
      </View>
      <TouchableOpacity
        style={styles.timerButton}
        onPress={handlePress}
      >
        <Icon name="Timer" size={20} color="#ccc"  />
      </TouchableOpacity>
    </View>
  )
}

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
  milestoneListItemTime: {
  },
  milestoneListListItemDue:{
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
