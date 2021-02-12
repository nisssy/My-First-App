import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import Button from './Button';
import TimeContext from '../contexts/TimeContext';
import { variables } from '../lib/variables/stylingVariables';

function TimeContents(props) {
  const { data } = props;
  const navigation = useNavigation();
  const now = useContext(TimeContext);
  const [left, setLeft] = useState(0);
  const [due, setDue] = useState('');
  const [textColor, setTextColor] = useState({ color: '#646464' });

  useEffect(() => {
    const hour = 24;
    const minutes = 60;
    const seconds = 60;
    const mm = 1000;
    if (data.end == null) return;
    const jstNow = utcToZonedTime(now, 'Asia/Tokyo');

    const jstEnd = utcToZonedTime(data.end, 'Asia/Tokyo').getTime();
    const left = jstEnd - Math.floor(jstNow);

    const leftDay = Math.ceil(left / mm / seconds / minutes / hour);
    setLeft(leftDay);
    const endString = format(data.end, 'yyyy年MM月dd日');
    setDue(endString);
    if (leftDay <= 1) {
      setTextColor({ color: 'red' });
    } else if (leftDay <= 3) {
      setTextColor({ color: variables.mainColor });
    }
  }, [now]);

  function handlePress() {
    navigation.navigate('MilestoneEditor', { data });
  }

  if (data.changed === false) {
    return (
      <View style={styles.milestoneListItemTime}>
        <Button
          value="〆切を設定"
          onPress={handlePress}
          style={styles.styleForButton}
        />
      </View>
    );
  }
  return (
    <View style={styles.milestoneListItemTime}>
      <Text style={[styles.milestoneListListItemDue, textColor]}>
        {`〆切：${due}`}
      </Text>
      <Text style={[styles.milestoneListListItemLeft, textColor]}>
        {`残り：${left}日`}
      </Text>
    </View>
  );
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
  milestoneListListItemDue: {
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
