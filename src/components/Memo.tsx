import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import TimeContext from '../contexts/TimeContext';

function Memo(props) {
  const { data } = props;
  const [message, setMessage] = useState('まだメモが作られていません');
  const now = useContext(TimeContext);

  useEffect(() => {
    if(!data.updateAt) {
      const updatedDay = Math.floor(data.updatedAt.seconds / 60 / 60 / 24);
      const today = now.getTime() / 1000 / 60 / 60 /24;
      const diff = Math.floor(today - updatedDay);
      const message = diff === 0 ? `最終更新：今日` : `最終更新日：${diff}日前`;
      setMessage(message);
    }
  },[data])

  return (
    <View>
      <View style={styles.messageContainer}>
        <Text style={styles.message} >{message}</Text>
      </View>
      <Text style={styles.memo} >{data.memo}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  memo: {
    fontSize: 16,
    lineHeight: 24,
  },
  message: {
    color: '#646464',
  },
  messageContainer: {
    position: 'absolute',
    top: -58,
  },
})

export default Memo;
