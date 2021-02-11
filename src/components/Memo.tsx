import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TimeContext from '../contexts/TimeContext';

function Memo(props) {
  const { data } = props;
  const [message, setMessage] = useState('まだメモが作られていません');
  const [memo, setMemo] = useState('');
  const now = useContext(TimeContext);

  useEffect(() => {
    const hour = 24;
    const minutes = 60;
    const seconds = 60;
    const mm = 1000;

    if (typeof data !== 'undefined' && typeof data.updatedAt !== 'undefined') {
      const updatedDay = Math.floor(
        data.updatedAt.seconds / seconds / minutes / hour
      );
      const today = now.getTime() / mm / seconds / minutes / hour;
      const diff = Math.floor(today - updatedDay);
      const message = diff === 0 ? `最終更新：今日` : `最終更新日：${diff}日前`;
      setMessage(message);
      setMemo(data.memo);
    }
  }, [data]);

  return (
    <View>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Text style={styles.memo}>{memo}</Text>
    </View>
  );
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
});

export default Memo;
