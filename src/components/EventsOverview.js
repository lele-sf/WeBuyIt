import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";

import Gradient from "./Gradient";
import EventCard from "./EventCardPreview";

function EventsOverview({
  events = [],
  maxItems = undefined,
  showSeeAll = false,
}) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const displayEvents =
    typeof maxItems === "number" ? events.slice(0, maxItems) : events;

  return (
    <View>
      <View style={styles.headerRow}>
        <Gradient>
          <Text style={[styles.title, { color: colors.text }]}>Eventos</Text>
        </Gradient>

        {showSeeAll && events.length >= (maxItems ?? events.length) && (
          <TouchableOpacity
            onPress={() => navigation.navigate("AllEvents")}
            style={styles.seeAllButton}
          >
            <Gradient>
              <Text style={[styles.seeAllText]}>Ver todos →</Text>
            </Gradient>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={displayEvents}
        keyExtractor={(evt) => evt.id.toString()}
        renderItem={({ item: evt }) => (
          <EventCard
            event={{
              imageUrl: evt.imageUrl || null,
              date: evt.date.toDate
                ? evt.date.toDate().toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                  })
                : evt.date,
              title: evt.title,
              attendees: evt.attendees || [],
              attendeesCount: evt.attendeesCount,
            }}
            onPress={() => console.log("Abrir card evento", evt.id)}
          />
        )}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 6,
  },
  title: {
    fontFamily: "maven_medium",
    fontSize: 24,
  },
  seeAllButton: {
    padding: 4,
  },
  seeAllText: {
    fontSize: 12,
    fontFamily: "maven_semibold",
  },
  container: {
    borderRadius: 15,
    marginHorizontal: 20,
    paddingBottom: 80,
  },
});

export default EventsOverview;
