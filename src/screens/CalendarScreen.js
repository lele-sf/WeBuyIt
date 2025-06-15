import React, { useState, useCallback, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import {
  CalendarProvider,
  ExpandableCalendar,
  AgendaList,
} from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

import EventItem from "../components/calendar/EventItem";
import CreateEventModal from "../components/events/CreateEventModal";
import { useEvents } from "../hooks/useEvents";
import { UserContext } from "../contexts/UserContext";

const TODAY = new Date().toISOString().split("T")[0];
const LIST_ITEM_HEIGHT = 80;

export default function CalendarScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const { items, isLoading, refresh } = useEvents();

  const getMarkedDates = useCallback(() => {
    const marked = {
      [TODAY]: {
        selected: true,
        selectedColor: colors.primary,
      },
    };

    items.forEach((item) => {
      const dateString = item.title;
      if (!marked[dateString]) {
        marked[dateString] = { marked: true, dotColor: colors.primary };
      } else if (marked[dateString].selected) {
        marked[dateString].marked = true;
        marked[dateString].dotColor = colors.primary;
      }
    });

    return marked;
  }, [items, colors.primary]);

  const handleEventPress = useCallback(
    (event) => {
      navigation.dispatch(
        CommonActions.navigate({
          name: "Home",
          params: {
            screen: "EventDetail",
            params: { event },
          },
        })
      );
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <EventItem item={item} colors={colors} onPress={handleEventPress} />
    ),
    [colors, handleEventPress]
  );

  const keyExtractor = useCallback(
    (item) => item.id?.toString() || Math.random().toString(),
    []
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <CalendarProvider
          date={TODAY}
          showTodayButton
          theme={{ todayButtonTextColor: colors.primary }}
        >
          <ExpandableCalendar
            theme={{
              calendarBackground: colors.card,
              textSectionTitleColor: colors.text,
              dayTextColor: colors.text,
              todayTextColor: colors.primary,
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: "#fff",
              monthTextColor: colors.text,
              indicatorColor: colors.primary,
              arrowColor: colors.primary,
            }}
            markedDates={getMarkedDates()}
            firstDay={1}
            initialPosition="open"
            allowShadow
          />

          {isLoading ? (
            <View style={styles.centeredContent}>
              <Text style={{ color: colors.text }}>Carregando eventos...</Text>
            </View>
          ) : items.length === 0 ? (
            <View style={styles.centeredContent}>
              <Text style={{ color: colors.text }}>
                Nenhum evento encontrado
              </Text>
            </View>
          ) : (
            <AgendaList
              sections={items}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              sectionStyle={styles.section}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              windowSize={5}
              removeClippedSubviews={Platform.OS === "android"}
              avoidDateUpdates={true}
            />
          )}
        </CalendarProvider>

        <TouchableOpacity
          style={[styles.floatingButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowAddModal(true)}
          accessibilityLabel="Add new event"
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>

        <CreateEventModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onCreated={refresh}
          host={user}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  section: {
    padding: 8,
    backgroundColor: "transparent",
    color: "grey",
    fontFamily: "maven_semibold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
