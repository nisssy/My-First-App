/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import TargetListItem from './TargetListItem';
import QuoterListLabelBottom from './QuoterListLabelBottom';
import QuoterListLabelTop from './QuoterListLabelTop';
import QuoterAchievementRatioContext from '../contexts/QuoterAchievementRatioContext';
import { TargetMonth, TargetQuoter } from '../types/target';

type Props = {
  quoter: number;
  dataSetForMonth: TargetMonth[];
  dataSetForQuoter: TargetQuoter[];
};

const TargetListQuoter: React.FC<Props> = ({
  quoter,
  dataSetForMonth,
  dataSetForQuoter,
}: Props) => {
  const firstQuoterMonth = 1 + (quoter - 1) * 3;
  const secondQuoterMonth = firstQuoterMonth + 1;
  const thirdQuoterMonth = secondQuoterMonth + 1;
  // eslint-disable-next-line prettier/prettier
  const [quoterAchievementRatio, setQuoterAchievementRatio] = useState<number | undefined>(0);

  useEffect(() => {
    if (typeof dataSetForQuoter[0] !== 'undefined') {
      const initialAchievementRatio = dataSetForQuoter
        .filter((item) => {
          return item.quoter === `${quoter}Q`;
        })
        .shift();
      setQuoterAchievementRatio(initialAchievementRatio?.grade);
    }
  }, [dataSetForQuoter]);

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
      <QuoterListLabelTop quoter={`${quoter}Q`} />
      <TargetListItem
        monthOrigin={`${firstQuoterMonth}月`}
        dataSetForMonth={dataSetForMonth}
      />
      <TargetListItem
        monthOrigin={`${secondQuoterMonth}月`}
        dataSetForMonth={dataSetForMonth}
      />
      <TargetListItem
        monthOrigin={`${thirdQuoterMonth}月`}
        dataSetForMonth={dataSetForMonth}
      />
      <QuoterListLabelBottom
        quoter={quoter}
        dataSetForQuoter={dataSetForQuoter}
        quoterAchievementRatio={quoterAchievementRatio}
      />
    </QuoterAchievementRatioContext.Provider>
  );
};

export default TargetListQuoter;
