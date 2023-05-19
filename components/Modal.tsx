import { View, Text, Heading, Box } from "native-base";
import React from "react";

const Modal = () => {
  return (
    <View style={{ height: "100%" }}>
      <Heading>This week</Heading>
      <Box>
        <Text>WED</Text>
        <Text>24</Text>
        <Text>Rainy</Text>
      </Box>
    </View>
  );
};

export default Modal;
