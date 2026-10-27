import { View, Text, StyleSheet } from "react-native";

export default function StatusBadge({ status }) {
  const statusColors = {
    Bekliyor: "#F59E0B",
    İşlemde: "#2563EB",
    Tamamlandı: "#16A34A",
  };

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: statusColors[status] || "#6B7280" },
      ]}
    >
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
});
