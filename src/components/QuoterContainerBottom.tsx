import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { variables } from '../lib/variables/stylingVariables';
import Icon from './Icon';

function QuoterContainerBottom() {
  return (
    <View style={styles.quoterContainerBottom}>
      <View style={styles.quoterInner}>
        <Text style={styles.quoterAchievementRate}>達成率</Text>
        <Text style={styles.achievementScore}>A</Text>
      </View>
      <View style={styles.quoterTextContainer}>
        <Text style={styles.quoterText}>フリーランスとして自立</Text>
      </View>
      <TouchableOpacity style={styles.listItemDeleteButton}>
        <Icon name="Delete" size={24} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  missionList: {
    flexDirection: 'row',
  },

  quoterContainerBottom: {
    height: 64,
    marginBottom: 32,
    backgroundColor: variables.subColor,
    flexDirection: 'row',
  },
  quoterInner: {
    width: 50,
    marginLeft: 16,
    marginTop: 12,
    alignItems: 'center',
  },
  quoterAchievementRate: {
    color: variables.mainColor,
    fontSize: 16,
  },
  achievementScore: {
    color: variables.mainColor,
    fontSize: 24,
    marginTop: 4,
  },
  quoterTextContainer: {
    marginLeft: 24,
    justifyContent: 'center',
  },
  quoterText: {
    fontSize: 24,
    color: variables.mainColor,
  },
  listItemDeleteButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 12,
    top: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuoterContainerBottom;
