import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";

import Gradient from "../layout/Gradient";
import EventCardPreview from "./EventCardPreview";
import { formatShortDate } from "../../utils/formatDates";

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
        renderItem={({ item: evt }) => {
          const formattedDate = formatShortDate(evt.date, "pt-BR");
          return (
            <EventCardPreview
              event={{
                imageUrl: evt.imageUrl || null,
                date: formattedDate,
                title: evt.title,
                attendees: evt.attendees || [],
                attendeesCount: evt.attendeesCount,
              }}
              onPress={() =>
                navigation.navigate("EventDetail", {
                  event: evt,
                })
              }
            />
          );
        }}
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
