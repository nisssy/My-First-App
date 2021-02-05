import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from './Icon';

function MilestoneListItem() {
  const [checked, setChecked] = useState(false);
  function handlePress() {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
      // Alert.alert('達成')
    }
  }
  return (
    <View style={styles.milestoneListItem}>
      <TouchableOpacity style={styles.successButton}>
        <CheckBox
          center
          checked={checked}
          checkedColor='green'
          onPress={() => handlePress()}
        />
      </TouchableOpacity>
      <View style={styles.milestoneListItemTextContainer}>
        <Text style={styles.milestoneListItemText}>
          ランサーズに登録
        </Text>
        <View style={styles.milestoneListItemTime}>
          <Text style={styles.milestoneListListItemDue}>〆切：2021年1月24日</Text>
          <Text style={styles.milestoneListListItemLeft}>残り：3日</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.timerButton}>
        <Icon name="Timer" size={20} color="#ccc"  />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  milestoneListItem: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
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
    right: 12,
    top: 60-10,
    alignItems: 'center',
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
