import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTickets } from "../../data/TicketContext";
import StatusBadge from "../../components/StatusBadge";

const STATUS_OPTIONS = ["Bekliyor", "İşlemde", "Tamamlandı"];

export default function ArizaDetayScreen() {
  const { id } = useLocalSearchParams();
  const { tickets, updateTicketStatus } = useTickets();

  const ticket = tickets.find((item) => item.id === String(id));

  if (!ticket) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Arıza Detayı" }} />
        <Text>Arıza kaydı bulunamadı.</Text>
      </View>
    );
  }

  const handleStatusChange = (status) => {
    updateTicketStatus(ticket.id, status);
    Alert.alert("Başarılı", `Durum "${status}" olarak güncellendi.`);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Arıza Detayı" }} />

      <Text style={styles.title}>{ticket.title}</Text>

      <Text style={styles.label}>Açıklama</Text>
      <Text style={styles.value}>{ticket.description}</Text>

      <Text style={styles.label}>Kategori</Text>
      <Text style={styles.value}>{ticket.category}</Text>

      <Text style={styles.label}>Konum</Text>
      <Text style={styles.value}>{ticket.location}</Text>

      <Text style={styles.label}>Kayıt Tarihi</Text>
      <Text style={styles.value}>{ticket.date}</Text>

      <Text style={styles.label}>Mevcut Durum</Text>
      <StatusBadge status={ticket.status} />

      <Text style={styles.label}>Durumu Değiştir</Text>

      {STATUS_OPTIONS.map((status) => (
        <TouchableOpacity
          key={status}
          style={[
            styles.statusButton,
            ticket.status === status && styles.selectedButton,
          ]}
          onPress={() => handleStatusChange(status)}
        >
          <Text
            style={[
              styles.statusText,
              ticket.status === status && styles.selectedText,
            ]}
          >
            {status === ticket.status ? "✓ " : ""}
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E3A5F",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 6,
    color: "#555",
  },
  value: {
    fontSize: 15,
    color: "#222",
    lineHeight: 22,
  },
  statusButton: {
    padding: 13,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  selectedButton: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  statusText: {
    textAlign: "center",
    fontSize: 15,
    color: "#374151",
    fontWeight: "600",
  },
  selectedText: {
    color: "#FFFFFF",
  },
});
