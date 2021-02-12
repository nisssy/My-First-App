/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import TargetListItem from './TargetListItem';
import QuoterListLabelBottom from './QuoterListLabelBottom';
import QuoterListLabelTop from './QuoterListLabelTop';
import QuoterAchievementRatioContext from '../contexts/QuoterAchievementRatioContext';

function TargetListQuoter(props) {
  const { quoter, dataSetForMonth, dataSetForQuoter } = props;
  const [quoterAchievementRatio, setQuoterAchievementRatio] = useState(0);
  const value = { quoterAchievementRatio, setQuoterAchievementRatio };
  const firstQuoterMonth = `${1 + (quoter - 1) * 3}月`;
  const secondQuoterMonth = `${firstQuoterMonth + 1}月`;
  const thirdQuoterMonth = `${secondQuoterMonth + 1}月`;
  useEffect(() => {
    const result = dataSetForMonth.filter((item) => {
      return (
        item.month === firstQuoterMonth || secondQuoterMonth || thirdQuoterMonth
      );
    });
    let initialAchievementRatio = 0;
    result.forEach((item) => {
      item.achievement
        ? (initialAchievementRatio += 1)
        : (initialAchievementRatio += 0);
    });
    setQuoterAchievementRatio(initialAchievementRatio);
  }, []);
  useEffect(() => {
    if (quoterAchievementRatio === 3) {
      Alert.alert(`🎉🎉おめでとう！🎉🎉
${quoter}の目標を全て達成！！`);
    }
  }, [quoterAchievementRatio]);

  return (
    <QuoterAchievementRatioContext.Provider
      value={{ quoterAchievementRatio, setQuoterAchievementRatio }}
    >
      <QuoterListLabelTop quoter="1Q" />
      <TargetListItem
        monthOrigin="1月"
        dataSetForMonth={dataSetForMonth}
        quoterAchievementRatio={quoterAchievementRatio}
        dataSetForQuoter={dataSetForQuoter}
        value={value}
      />
      <TargetListItem
        monthOrigin="2月"
        dataSetForMonth={dataSetForMonth}
        quoterAchievementRatio={quoterAchievementRatio}
        dataSetForQuoter={dataSetForQuoter}
        value={value}
      />
      <TargetListItem
        monthOrigin="3月"
        dataSetForMonth={dataSetForMonth}
        quoterAchievementRatio={quoterAchievementRatio}
        dataSetForQuoter={dataSetForQuoter}
        value={value}
      />
      <QuoterListLabelBottom
        quoter={quoter}
        dataSetForQuoter={dataSetForQuoter}
        quoterAchievementRatio={quoterAchievementRatio}
      />
    </QuoterAchievementRatioContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default TargetListQuoter;
