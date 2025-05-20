import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";

import FloatingButton from "../components/FloatingButton.js";
import CategoriesSection from "../components/CategoriesSection.js";
import EventsOverview from "../components/EventsOverview.js";
import { getEvents } from "../database/getEvents.js";

function HomeScreen() {
  const [events, setEvents] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEvents();
      setEvents(data);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="auto" />
      <CategoriesSection />
      <EventsOverview events={events} maxItems={2} showSeeAll={true} />
      <FloatingButton />
    </SafeAreaView>
  );
}

export default HomeScreen;
