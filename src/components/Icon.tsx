import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import React from 'react';
import { useFonts } from '@use-expo/font';

import icomoon from '../../assets/fonts/icomoon.ttf';
import selection from '../../assets/fonts/selection.json';

export default function Icon(props: any) {
  const [fontLoaded] = useFonts({ icomoon });
  const { name, size, color } = props;
  const CustomIcon = createIconSetFromIcoMoon(selection);
  if(fontLoaded) {
    return <CustomIcon name={name} size={size} color={color} />
  } else {
    return null;
  }
}
