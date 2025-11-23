import { Link } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

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

<Link href="/onboarding" style={{ marginVertical: 10 }}>
onboarding</Link>
  
    </ScrollView>
  );
}
