import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

function EventCard({ event, onPress }) {
  const { colors } = useTheme();
  const { imageUrl, date, title, attendees, attendeesCount } = event;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}

      <View style={styles.content}>
        <View style={styles.row}>
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text
            style={[styles.date, { color: colors.primary }]}
            numberOfLines={1}
          >
            {date}
          </Text>
        </View>

        <View style={styles.footer}>
          {attendees && attendees.length > 0 && (
            <View style={styles.attendeesContainer}>
              {attendees.slice(0, 2).map((person, idx) => (
                <Image
                  key={idx}
                  source={{ uri: person.imageUrl }}
                  style={[styles.avatar, { marginLeft: idx === 0 ? 0 : -8 }]}
                />
              ))}
              {attendeesCount > 2 && (
                <Text style={styles.moreText}>+ {attendeesCount - 2} confirmados</Text>
              )}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default EventCard;

const AVATAR_SIZE = 32;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 8,
    width: "100%",
    maxWidth: 400,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    flexShrink: 1,
    flexGrow: 1,
    fontSize: 16,
    fontFamily: "maven_semibold",
  },
  date: {
    fontSize: 12,
    fontFamily: "maven_medium",
    marginLeft: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attendeesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 1,
    borderColor: "#1e1e1e",
  },
  moreText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#aaa",
  },
});
