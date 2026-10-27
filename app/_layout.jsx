import { Stack } from "expo-router";
import { TicketProvider } from "../data/TicketContext";

export default function RootLayout() {
  return (
    <TicketProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Ana Sayfa" }} />
        <Stack.Screen name="ariza/index" options={{ title: "Arıza Listesi" }} />
        <Stack.Screen name="ariza/[id]" options={{ title: "Arıza Detayı" }} />
        <Stack.Screen
          name="yeni-ariza"
          options={{ title: "Yeni Arıza Kaydı" }}
        />
      </Stack>
    </TicketProvider>
  );
}
