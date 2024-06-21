import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

const CustomTextInput = ({
  text,
  onChange,
  multiline = false,
  placeholder,
  numberOfLines,
}) => (
  <View style={styles.container}>
    <TextInput
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={"#B9D2D2"}
      onChangeText={onChange}
      defaultValue={text}
    />
  </View>
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    padding: 10,
    color: "#fff",
    borderRadius: 3,
  },
  container: {
    marginTop: 20,
  },
});

export default CustomTextInput;
