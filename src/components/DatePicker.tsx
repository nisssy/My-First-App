import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  start: Date;
  setStart: React.Dispatch<React.SetStateAction<Date>>;
  end: Date;
  setEnd: React.Dispatch<React.SetStateAction<Date>>;
};

const DatePicker: React.FC<Props> = ({
  start,
  setStart,
  end,
  setEnd,
}: Props) => {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const onChangeStart = (event: any, selectedDate: Date | undefined): void => {
    const currentDate = selectedDate || start;
    setShowStart(Platform.OS === 'ios');
    setStart(currentDate);
  };

  const onChangeEnd = (event: any, selectedDate: Date | undefined): void => {
    const currentDate = selectedDate || end;
    setShowEnd(Platform.OS === 'ios');
    setEnd(currentDate);
  };

  const showDatepickerStart = () => {
    setShowStart(true);
  };

  const showDatepickerEnd = () => {
    setShowEnd(true);
  };

  return (
    <View>
      <View style={styles.button}>
        <Button onPress={showDatepickerStart} title="開始日をえらぶ" />
      </View>
      {showStart && (
        <DateTimePicker
          testID="dateTimePicker"
          value={start}
          mode="date"
          is24Hour
          display="default"
          onChange={onChangeStart}
        />
      )}
      <View style={styles.button}>
        <Button onPress={showDatepickerEnd} title="終了日をえらぶ" />
      </View>
      {showEnd && (
        <DateTimePicker
          testID="dateTimePicker"
          value={end}
          mode="date"
          is24Hour
          display="default"
          onChange={onChangeEnd}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    marginBottom: 16,
  },
});

export default DatePicker;
