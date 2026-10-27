import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🛠️</Text>

      <Text style={styles.title}>Arıza Takip Sistemi</Text>

      <Text style={styles.description}>
        Teknik destek taleplerinizi oluşturun ve arızalarınızın durumunu takip
        edin.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/ariza")}
      >
        <Text style={styles.primaryButtonText}>Arıza Listesi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/yeni-ariza")}
      >
        <Text style={styles.secondaryButtonText}>+ Yeni Arıza Oluştur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    padding: 24,
  },
  icon: {
    fontSize: 55,
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E3A5F",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#2563EB",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "bold",
  },
});
