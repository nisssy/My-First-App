import React, {useState} from 'react';
import {View, Button, Platform, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

function DatePicker(props) {
  const {start, setStart, end, setEnd} = props;
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || start;
    setShowStart(Platform.OS === 'ios');
    setStart(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || end;
    setShowEnd(Platform.OS === 'ios');
    setEnd(currentDate);
  };

  const showDatepickerStart = () => {
    setShowStart(true)
  };

  const showDatepickerEnd = () => {
    setShowEnd(true)
  };

  return (
    <View>
      <View style={styles.button}>
        <Button onPress={showDatepickerStart} title='開始日をえらぶ' />
      </View>
      {showStart && (
        <DateTimePicker
          testID="dateTimePicker"
          value={start}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeStart}
        />
      )}
      <View style={styles.button}>
        <Button onPress={showDatepickerEnd} title='終了日をえらぶ' />
      </View>
      {showEnd && (
        <DateTimePicker
          testID="dateTimePicker"
          value={end}
          mode="date"
          is24Hour={true}
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
  }
})

export default DatePicker;
