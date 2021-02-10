import React,{ useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import Button from './Button';
import TimeContext from '../contexts/TimeContext';

function TimeContents(props) {
  const { data } = props;
  const navigation = useNavigation();
  const now = useContext(TimeContext);
  const [left, setLeft] = useState(0);
  const [due, setDue] = useState('');
  const [textColor, setTextColor] = useState({color: '#646464'})

  useEffect(() => {
    if(data.end == null) return;
      const jstNow = utcToZonedTime(now, 'Asia/Tokyo');

      const jstEnd = utcToZonedTime(data.end, 'Asia/Tokyo').getTime();
      const left = jstEnd - Math.floor(jstNow);

      const leftDay = Math.floor(left/ 1000 / 60 / 60 / 24) + 1;
      setLeft(leftDay)
      const endString = format(data.end, 'yyyy年MM月dd日');
      setDue(endString);
      leftDay <= 1 ? setTextColor({color: '#A1AD17'}) : leftDay <= 3 ? setTextColor({color: '#FA5046'}) : setTextColor({color: '#646464'});
  },[now])

  function handlePress() {
    navigation.navigate('MilestoneEditor', { data });
  }

   if(data.end == null) {
    return (
      <View style={styles.milestoneListItemTime}>
        <Button value={'〆切を設定'} onPress={handlePress} style={styles.styleForButton} />
      </View>
    )
   }
    return (
      <View style={styles.milestoneListItemTime}>
        <Text style={[styles.milestoneListListItemDue, textColor]}>{`〆切：${due}`}</Text>
        <Text style={[styles.milestoneListListItemLeft, textColor]}>{`残り：${left}日`}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  milestoneListItemTime: {
    height: 44,
    minWidth: 170,
  },
  styleForButton: {
    position: 'absolute',
    marginTop: 8,
    height: 28,
    padding: 0,
    paddingLeft: 41,

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
});

export default TimeContents;
