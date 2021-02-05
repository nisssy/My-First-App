import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import React from 'react';
import { useFonts } from '@use-expo/font';

import icomoon from '../../assets/fonts/icomoon.ttf';
import selection from '../../assets/fonts/selection.json';

export default function Icon(props) {
  const [fontLoaded] = useFonts({ icomoon });
  const { name } = props;
  const CustomIcon = createIconSetFromIcoMoon(selection);
  if(fontLoaded) {
    return <CustomIcon name={name} size={50} />
  } else {
    return null;
  }
}
