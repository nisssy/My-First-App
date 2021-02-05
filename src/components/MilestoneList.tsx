import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import MissionsList from './MissionsList';

function MilestoneList() {
  return (
    <View style={styles.milestoneList}>
    <View style={styles.milestoneListItem}>
      <TouchableOpacity style={styles.successButton}>
          <Text>■</Text>
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
        <Text>✖️</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.milestoneListItem}>
      <TouchableOpacity style={styles.successButton}>
          <Text>■</Text>
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
        <Text>✖️</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.milestoneListItem}>
      <TouchableOpacity style={styles.successButton}>
          <Text>■</Text>
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
        <Text>✖️</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  milestoneList: {
  },
  milestoneListItem: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  milestoneListItemTextContainer: {
    justifyContent: 'center',
    marginLeft: 8,
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
    right: 24,
    top: '50%',
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
  changeBorderWidth0: {
    borderWidth: 0,
  },
});

export default MilestoneList;
