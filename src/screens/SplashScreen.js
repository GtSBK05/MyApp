import { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    const t = setTimeout(() => {
      navigation.replace("Home");
    }, 4500);

    return () => clearTimeout(t);
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrap, { opacity, transform: [{ scale }] }]}>
        <Image source={require("../../assets/images/PRTS.png")} style={styles.logo} resizeMode="contain" />
      </Animated.View>

      <Text style={styles.title}>NavMyApp</Text>
      <Text style={styles.subtitle}>Stand • By • HerSide</Text>

      <View style={styles.footer}>
        <View style={styles.pulse} />
        <Text style={styles.loading}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f10", // deep charcoal
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoWrap: {
    width: Math.min(260, width * 0.6),
    height: Math.min(260, width * 0.6),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  logo: {
    width: "100%",
    height: "100%",
    tintColor: "#ffffff", // ensure monochrome if image supports tint
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    letterSpacing: 2,
    fontWeight: "700",
    marginTop: 6,
  },
  subtitle: {
    color: "#bfbfbf",
    fontSize: 13,
    marginTop: 6,
  },
  footer: {
    position: "absolute",
    bottom: 36,
    alignItems: "center",
  },
  pulse: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#e6e6e6",
    opacity: 0.6,
    marginBottom: 8,
  },
  loading: {
    color: "#9a9a9a",
    fontSize: 12,
  },
});

export default SplashScreen;
