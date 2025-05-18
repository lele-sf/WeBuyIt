import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";

import { getEvents } from "../database/getEvents";
import EventsOverview from "../components/EventsOverview";

export default function AllEventsScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <EventsOverview
        events={events}
        showSeeAll={false}
      />
    </SafeAreaView>
  );
}
