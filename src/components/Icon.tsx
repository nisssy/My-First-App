import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import React from 'react';
import { useFonts } from '@use-expo/font';

import icomoon from '../../assets/fonts/icomoon.ttf';
import selection from '../../assets/fonts/selection.json';

type Props = {
  name: string;
  size: number;
  color?: any;
};

const Icon: React.FC<Props> = ({ name, size, color }: Props) => {
  const [fontLoaded] = useFonts({ icomoon });
  const CustomIcon = createIconSetFromIcoMoon(selection);
  if (fontLoaded) {
    return <CustomIcon name={name} size={size} color={color} />;
  }
  return null;
};

Icon.defaultProps = {
  color: {},
};

export default Icon;
