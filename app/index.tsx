import React from "react";
import { Button, Image, ScrollView, Text, TextInput, View } from "react-native";

export default function Index() {
  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome to React Native!</Text>
        <Image
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          style={{ width: 100, height: 100, marginTop: 10 }}
        />
      </View>

      <TextInput
        placeholder="Enter your name"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <Button title="Click Me" onPress={() => alert("Button pressed!")} />
    </ScrollView>
  );
}
