import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import { variables } from '../lib/stylingVariables/stylingVariables';
import HeaderBackButton from './HeaderBackButton';
import Icon from './Icon';

function MissionsList() {
  return (
    <ScrollView>
    <View style={styles.quoterContainerTop}>
      <View style={styles.quoterContainerTopInner}>
        <Text style={styles.quoterText}>1Q</Text>
      </View>
    </View>
    <View style={styles.missionList}>
      <View style={styles.missionListItem}>
        <View style={styles.missionListItemLeft}>
          <Text style={styles.missionListItemMonth}>1月</Text>
          <Text style={styles.missionListItemCheckbox}>■</Text>
        </View>
        <View style={styles.listItemTextContainer}>
          <Text style={styles.listItemText}>
            月収10万円の達成
          </Text>
        </View>
        <TouchableOpacity style={styles.listItemDeleteButton}>
          <Icon name="Delete" />
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.missionList}>
      <View style={styles.missionListItem}>
        <View style={styles.missionListItemLeft}>
          <Text style={styles.missionListItemMonth}>2月</Text>
          <Text style={styles.missionListItemCheckbox}>■</Text>
        </View>
        <View style={styles.listItemTextContainer}>
          <Text style={styles.listItemText}>
            月収10万円の達成
          </Text>
        </View>
        <TouchableOpacity style={styles.listItemDeleteButton}>
          <Text>✖️</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.missionList}>
      <View style={styles.missionListItem}>
        <View style={styles.missionListItemLeft}>
          <Text style={styles.missionListItemMonth}>3月</Text>
          <Text style={styles.missionListItemCheckbox}>■</Text>
        </View>
        <View style={styles.listItemTextContainer}>
          <Text style={styles.listItemText}>
            月収10万円の達成
          </Text>
        </View>
        <TouchableOpacity style={styles.listItemDeleteButton}>
          <Text>✖️</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.quoterContainerBottom}>
      <View style={styles.quoterInner}>
        <Text style={styles.quoterAchievementRate}>達成率</Text>
        <Text style={styles.achievementScore}>A</Text>
      </View>
      <View style={styles.quoterTextContainer}>
        <Text style={styles.quoterText}>フリーランスとして自立</Text>
      </View>
      <TouchableOpacity style={styles.listItemDeleteButton}>
        <Text>✖️</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  quoterContainerTop: {
    height: 80,
    backgroundColor: variables.subColor,
    justifyContent: 'center',
  },
  quoterContainerTopInner: {
    width: 50,
    marginLeft: 16,
    alignItems: 'center',
  },
  quoterText: {
    fontSize: 24,
    color: variables.mainColor,
  },

  missionList: {
    flexDirection: 'row',
  },
  missionListItem: {
    width: '100%',
    height: 104,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  missionListItemLeft: {
    height: '100%',
    width: 50,
    marginTop: 24,
    marginLeft: 16,
    alignItems: 'center',
  },
  missionListItemMonth: {
    lineHeight: 24,
    fontSize: 24,
    color: '#646464',
  },
  missionListItemCheckbox: {
    marginTop: 12,
    lineHeight: 24,
    fontSize: 24,
    color: '#646464',
  },
  listItemTextContainer: {
    marginLeft: 24,
    justifyContent: 'center',
  },
  listItemText: {
    color: '#000',
    fontSize: 24,

  },
  listItemDeleteButton: {
    position: 'absolute',
    right: 24,
    top: '50%',
  },
  quoterContainerBottom: {
    height: 80,
    marginBottom: 32,
    backgroundColor: variables.subColor,
    flexDirection: 'row',
  },
  quoterInner: {
    width: 50,
    marginLeft: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  quoterAchievementRate: {
    color: variables.mainColor,
    fontSize: 16,
  },
  achievementScore: {
    color: variables.mainColor,
    fontSize: 24,
    marginTop: 8,
  },
  quoterTextContainer: {
    marginLeft: 24,
    justifyContent: 'center',
  },
})

export default MissionsList;
