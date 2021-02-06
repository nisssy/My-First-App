import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import TargetListItem from './TargetListItem';
import QuoterContainerBottom from './QuoterContainerBottom';
import QuoterContainerTop from './QuoterContainerTop';

function TargetList() {
  return (
    <ScrollView style={styles.container}>
      <QuoterContainerTop />
      <TargetListItem />
      <TargetListItem />
      <TargetListItem />
      <QuoterContainerBottom />
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  }
})

export default TargetList;
