
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useTickets } from "../../data/TicketContext";
import TicketCard from "../../components/TicketCard";

export default function TicketListScreen() {
  const { tickets } = useTickets();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Arıza Listesi" }} />

      <Text style={styles.heading}>
        Kayıtlı Arızalar ({tickets.length})
      </Text>

      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TicketCard ticket={item} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Henüz arıza kaydı bulunmuyor.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 30,
  },
});
