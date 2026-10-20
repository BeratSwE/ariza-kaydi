import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  SafeAreaView,
  Keyboard,
  ScrollView,
} from "react-native";

// G2: En az 3 arıza kategorisi tanımı
const CATEGORIES = ["Yazılım", "Donanım", "Ağ / İnternet", "Diğer"];

// G7: Durum seçenekleri
const STATUS_OPTIONS = ["Bekliyor", "İşlemde", "Tamamlandı"];

export default function App() {
  // G1: Başlık ve açıklama state'leri
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // G2: Seçilen kategori state'i
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  // G4: Talep listesi state'i
  const [requests, setRequests] = useState([]);

  // G5: Detay modali için seçilen kaydın state'i
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // G3 & G4 & G8: Yeni Talep Ekleme
  const handleAddRequest = () => {
    // G3: Boş veya yalnızca boşluk içeren başlık/açıklama denetimi
    if (!title || title.trim() === "") {
      // G8: Anlaşılır kullanıcı geri bildirimi
      Alert.alert("Hata", "Lütfen geçerli bir talep başlığı giriniz.");
      return;
    }

    if (!description || description.trim() === "") {
      // G8: Anlaşılır kullanıcı geri bildirimi
      Alert.alert("Hata", "Lütfen geçerli bir açıklama giriniz.");
      return;
    }

    // G4: Benzersiz ID oluşturma ve yeni kaydı öncekileri koruyarak ekleme
    const newRequest = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      title: title.trim(),
      description: description.trim(),
      category: selectedCategory, // G2
      status: "Bekliyor", // G7 varsayılan durumu
      date: new Date().toLocaleString("tr-TR"),
    };

    setRequests((prev) => [newRequest, ...prev]);

    // Form alanlarını sıfırlama
    setTitle("");
    setDescription("");
    setSelectedCategory(CATEGORIES[0]);
    Keyboard.dismiss();

    // G8: Başarılı kaydetme bildirimi
    Alert.alert("Başarılı", "Arıza talebiniz başarıyla oluşturuldu.");
  };

  // G6: Uzun basma ile silme onayı
  const handleLongPressDelete = (item) => {
    Alert.alert(
      "Talebi Sil",
      `"${item.title}" başlıklı talebi silmek istediğinize emin misiniz?`,
      [
        {
          text: "Vazgeç",
          style: "cancel",
          onPress: () => {
            // G8: İptal bildirimi/logu
            console.log("Silme işlemi vazgeçildi.");
          },
        },
        {
          text: "Sil",
          style: "destructive",
          onPress: () => {
            setRequests((prev) => prev.filter((req) => req.id !== item.id));
            // G8: Silme sonrası bildirim
            Alert.alert("Bilgi", "Talep başarıyla silindi.");
          },
        },
      ],
      { cancelable: true },
    );
  };

  // G5: Kısa dokunmada detay gösterme
  const handlePressItem = (item) => {
    setSelectedRequest(item);
    setIsModalVisible(true);
  };

  // G7: Durum değiştirme (Modal içinden)
  const handleStatusChange = (newStatus) => {
    if (!selectedRequest) return;

    // Ana listedeki durumu güncelle
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === selectedRequest.id ? { ...req, status: newStatus } : req,
      ),
    );

    // Modal içindeki mevcut detay görünümünü de güncelle
    setSelectedRequest((prev) => ({ ...prev, status: newStatus }));

    // G8: Durum güncelleme bildirimi
    Alert.alert("Başarılı", `Talep durumu "${newStatus}" olarak güncellendi.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Arıza Talep Yönetimi</Text>

      {/* Form Alanı */}
      <View style={styles.formContainer}>
        {/* G1: Başlık Girişi */}
        <Text style={styles.label}>Talep Başlığı (*)</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: E-posta erişim sorunu"
          value={title}
          onChangeText={setTitle}
        />

        {/* G1: Açıklama Girişi */}
        <Text style={styles.label}>Açıklama (*)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Sorunu detaylıca açıklayınız..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        {/* G2: Kategori Seçimi (En az 3 seçenek) */}
        <Text style={styles.label}>Kategori Seçin (*)</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipSelected,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat && styles.categoryChipTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Kaydet Butonu */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAddRequest}
        >
          <Text style={styles.submitButtonText}>Talebi Kaydet</Text>
        </TouchableOpacity>
      </View>

      {/* G4: Liste Alanı */}
      <Text style={styles.listHeader}>Talepler ({requests.length})</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePressItem(item)} // G5: Kısa dokunma
            onLongPress={() => handleLongPressDelete(item)} // G6: Uzun basma
            delayLongPress={600}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {/* G7: Durum Görünümü */}
              <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                <Text style={styles.statusBadgeText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.cardCategory}>Kategori: {item.category}</Text>
            <Text style={styles.cardDesc} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.hintText}>
              * Detaylar için dokunun, silmek için uzun basın.
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Henüz kaydedilmiş arıza talebi bulunmuyor.
          </Text>
        }
      />

      {/* G5 & G7: Detay Modalı */}
      {selectedRequest && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Talep Detayı</Text>

              <Text style={styles.modalLabel}>Başlık:</Text>
              <Text style={styles.modalText}>{selectedRequest.title}</Text>

              <Text style={styles.modalLabel}>Açıklama:</Text>
              <Text style={styles.modalText}>
                {selectedRequest.description}
              </Text>

              <Text style={styles.modalLabel}>Kategori:</Text>
              <Text style={styles.modalText}>{selectedRequest.category}</Text>

              <Text style={styles.modalLabel}>Mevcut Durum:</Text>
              <Text style={[styles.modalText, { fontWeight: "bold" }]}>
                {selectedRequest.status}
              </Text>

              {/* G7: Durumu Değiştirme Seçenekleri */}
              <Text style={styles.modalLabel}>Durumu Güncelle:</Text>
              <View style={styles.statusButtonRow}>
                {STATUS_OPTIONS.map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusOptionButton,
                      selectedRequest.status === status &&
                        styles.statusOptionButtonSelected,
                    ]}
                    onPress={() => handleStatusChange(status)}
                  >
                    <Text
                      style={[
                        styles.statusOptionText,
                        selectedRequest.status === status &&
                          styles.statusOptionTextSelected,
                      ]}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Modali Kapat Butonu */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

// G7: Duruma göre rozet renklendirme yardımcısı
const getStatusStyle = (status) => {
  switch (status) {
    case "Bekliyor":
      return { backgroundColor: "#FFCC00" };
    case "İşlemde":
      return { backgroundColor: "#007AFF" };
    case "Tamamlandı":
      return { backgroundColor: "#34C759" };
    default:
      return { backgroundColor: "#999" };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#1C1C1E",
  },
  formContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FAFAFA",
  },
  textArea: {
    height: 60,
    textAlignVertical: "top",
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#E5E5EA",
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: "#007AFF",
  },
  categoryChipText: {
    fontSize: 12,
    color: "#333",
  },
  categoryChipTextSelected: {
    color: "#FFF",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#34C759",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  listHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  cardCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: "#444",
  },
  hintText: {
    fontSize: 10,
    color: "#AAA",
    marginTop: 6,
    fontStyle: "italic",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    marginTop: 8,
  },
  modalText: {
    fontSize: 14,
    color: "#222",
    marginTop: 2,
  },
  statusButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  statusOptionButton: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 2,
  },
  statusOptionButtonSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  statusOptionText: {
    fontSize: 11,
    color: "#333",
  },
  statusOptionTextSelected: {
    color: "#FFF",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#8E8E93",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
