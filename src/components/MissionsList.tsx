import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import MissionsListItem from './MissionsListItem';
import QuoterContainerBottom from './QuoterContainerBottom';
import QuoterContainerTop from './QuoterContainerTop';

function MissionsList() {
  return (
    <ScrollView>
      <QuoterContainerTop />
      <MissionsListItem />
      <MissionsListItem />
      <MissionsListItem />
      <QuoterContainerBottom />
  </ScrollView>
  )
}

const styles = StyleSheet.create({
})

export default MissionsList;
