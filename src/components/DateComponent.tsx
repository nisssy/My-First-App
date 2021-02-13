import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  displayYear: boolean;
  displayMonth: boolean;
  displayDate: boolean;
};

const DateRepresentor: React.FC<Props> = ({
  displayYear,
  displayMonth,
  displayDate,
}) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const styleYear: {} = displayYear ? {} : { display: 'none' };
  const styleMonth: {} = displayMonth ? {} : { display: 'none' };
  const styleDate: {} = displayDate ? {} : { display: 'none' };
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={[styles.number, styleYear]}>{year}</Text>
        <Text style={[styles.unit, styleYear]}>年</Text>
        <Text style={[styles.number, styleMonth]}>{month}</Text>
        <Text style={[styles.unit, styleMonth]}>月</Text>
        <Text style={[styles.number, styleDate]}>{day}</Text>
        <Text style={[styles.unit, styleDate]}>日</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dateContainer: {
    paddingLeft: 8,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  number: {
    marginLeft: 8,
    fontSize: 32,
  },
  unit: {
    fontSize: 24,
    paddingLeft: 4,
    paddingBottom: 6,
  },
});

export default DateRepresentor;
