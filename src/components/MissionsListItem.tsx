import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Checkbox from './Checkbox';
import Icon from './Icon';

function MissionsListItem() {
  return (
      <View style={styles.missionListItem}>
        <View style={styles.missionListItemLeft}>
          <Text style={styles.missionListItemMonth}>1月</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox size={30} />
          </View>
        </View>
        <View style={styles.listItemTextContainer}>
          <Text style={styles.listItemText}>
            月収10万円の達成
          </Text>
        </View>
        <TouchableOpacity style={styles.listItemDeleteButton}>
          <Icon name="Delete" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
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
    width: 50,
    height: 50,
    right: 12,
    top: 40,
    alignItems: 'center',
  },
  checkboxContainer: {
    position: 'absolute',
    top: 16,
    width: 50,
    alignItems: 'center',
  },
})

export default MissionsListItem;
