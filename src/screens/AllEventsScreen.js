import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";

import { fetchEvents } from "../database/fetchEvents";
import EventsOverview from "../components/events/EventsOverview";

export default function AllEventsScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <EventsOverview events={events} showSeeAll={false} />
    </SafeAreaView>
  );
}
