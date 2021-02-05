import React from "react";
import Icon from "./Icon";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    padding: 10,
    marginLeft: 6
  }
});

/**
 * 戻るボタン
 * @param {object} props
 * @returns {JSX}
 */
export default props => (
  <TouchableWithoutFeedback onPressIn={props.onBack}>
    <Icon
      name="Timer"
      style={styles.icon}
      color="#fff"
      size={24}
    />
  </TouchableWithoutFeedback>
);
