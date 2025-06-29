import { useEffect, useState, useContext } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";

import FloatingButton from "../components/layout/FloatingButton.js";
import CategoriesSection from "../components/home/CategoriesSection.js";
import EventsOverview from "../components/events/EventsOverview.js";
import CreateEventModal from "../components/events/CreateEventModal.js";
import { fetchEvents } from "../database/fetchEvents.js";
import { AuthContext } from "../contexts/AuthContext.js";

function HomeScreen() {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  const { user } = useContext(AuthContext);
  console.log("Usuário atual:", user);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEvents();
      setEvents(data);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="auto" />
      <CategoriesSection />
      <EventsOverview events={events} maxItems={2} showSeeAll={true} />
      <FloatingButton onPress={() => setModalVisible(true)} />
      <CreateEventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreated={fetchEvents}
        host={user}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
