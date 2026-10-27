import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useTickets } from "../data/TicketContext";

const CATEGORIES = ["Yazılım", "Donanım", "Ağ / İnternet", "Diğer"];

export default function YeniArizaScreen() {
  const router = useRouter();
  const { addTicket } = useTickets();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleAddTicket = () => {
    if (!title.trim() || !description.trim() || !location.trim()) {
      Alert.alert(
        "Eksik Bilgi",
        "Lütfen başlık, açıklama ve konum alanlarını doldurun.",
      );
      return;
    }

    const newTicket = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      category,
      status: "Bekliyor",
      date: new Date().toLocaleDateString("tr-TR"),
    };

    addTicket(newTicket);
    Keyboard.dismiss();

    Alert.alert("Başarılı", "Yeni arıza kaydı oluşturuldu.", [
      {
        text: "Arıza Listesine Git",
        onPress: () => router.replace("/ariza"),
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen options={{ title: "Yeni Arıza Kaydı" }} />

      <Text style={styles.heading}>Yeni Arıza Oluştur</Text>
      <Text style={styles.info}>
        Arıza bilgilerini girerek yeni bir destek talebi oluştur.
      </Text>

      <Text style={styles.label}>Arıza Başlığı *</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: Bilgisayar açılmıyor"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />

      <Text style={styles.label}>Açıklama *</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Arızayı detaylıca açıklayın..."
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
        maxLength={1000}
      />

      <Text style={styles.label}>Konum *</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: Bilgi İşlem"
        value={location}
        onChangeText={setLocation}
        maxLength={100}
      />

      <Text style={styles.label}>Kategori *</Text>
      <View style={styles.categoryContainer}>
        {CATEGORIES.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryButton,
              category === item && styles.categorySelected,
            ]}
            onPress={() => setCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                category === item && styles.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleAddTicket}>
        <Text style={styles.submitText}>Arıza Kaydını Oluştur</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E3A5F",
    marginBottom: 8,
  },
  info: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 13,
    fontSize: 15,
  },
  textArea: {
    minHeight: 110,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  categorySelected: {
    backgroundColor: "#2563EB",
  },
  categoryText: {
    color: "#374151",
    fontSize: 13,
  },
  categoryTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#16A34A",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 28,
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
