import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import StatusBadge from "./StatusBadge";

export default function TicketCard({ ticket }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push(`/ariza/${ticket.id}`)}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{ticket.title}</Text>
        <StatusBadge status={ticket.status} />
      </View>

      <Text style={styles.category}>Kategori: {ticket.category}</Text>

      <Text style={styles.description} numberOfLines={2}>
        {ticket.description}
      </Text>

      <Text style={styles.location}>Konum: {ticket.location}</Text>

      <Text style={styles.date}>Tarih: {ticket.date}</Text>

      <Text style={styles.hint}>Detayları görmek için dokunun.</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  category: {
    color: "#4B5563",
    fontSize: 13,
    marginBottom: 6,
  },
  description: {
    color: "#374151",
    fontSize: 14,
    marginBottom: 8,
  },
  location: {
    color: "#4B5563",
    fontSize: 12,
    marginBottom: 4,
  },
  date: {
    color: "#6B7280",
    fontSize: 12,
  },
  hint: {
    color: "#2563EB",
    fontSize: 12,
    marginTop: 10,
  },
});
