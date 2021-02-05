import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';

function Checkbox(props: any) {
  const {size} = props;
  const [checked, setChecked] = useState(false);
  function handlePress() {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
      // Alert.alert('達成')
    }
  }
  return (
        <CheckBox
          center
          size={size}
          checked={checked}
          checkedColor='green'
          onPress={() => handlePress()}
        />
  )
}

export default Checkbox;
