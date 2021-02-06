import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from './Icon';

function AddListItem() {
  return (
    <TouchableOpacity style={styles.addListItem}>
      <View style={styles.addListItemInner}>
        <Icon name="Plus" size={20} color="#646464" />
        <View style={styles.addListItemTextContainer}>
          <Text style={styles.addListItemText}>
            リストを追加する
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  addListItem: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addListItemInner: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addListItemAddButton: {
    color: '#646464',
  },
  addListItemTextContainer: {
    marginLeft: 8,
  },
  addListItemText: {
    fontSize: 20,
    color: '#646464',
  },
});

export default AddListItem;
