import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

import ListDetails from "../components/events/ListDetails";
import Gradient from "../components/layout/Gradient";
import { fetchEventList, addItemToEventList } from "../database/eventLists";
import { formatFullDate, formatTime, formatEventDate } from "../utils/formatDates";

export default function EventDetailScreen({ route }) {
  const { colors } = useTheme();
  const { event } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState({ listId: null, items: [] });
  const [newItemName, setNewItemName] = useState("");

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.text }}>Evento não encontrado</Text>
      </View>
    );
  }

  useEffect(() => {
    const loadEventList = async () => {
      try {
        setLoading(true);
        const data = await fetchEventList(event.id);
        setListData(data);
      } catch (error) {
        console.error("Failed to load list:", error);
        Alert.alert("Erro", "Não foi possível carregar a lista de compras");
      } finally {
        setLoading(false);
      }
    };

    loadEventList();
  }, [event.id]);

  const handleAddItem = async () => {
    if (!newItemName.trim()) return;

    try {
      const newItem = await addItemToEventList(listData.listId, newItemName);
      setListData((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
      }));
      setNewItemName("");
    } catch (error) {
      console.error("Failed to add item:", error);
      Alert.alert("Erro", "Não foi possível adicionar o item à lista");
    }
  };

  const jsDate = formatEventDate(event.date);
  const formattedDate = formatFullDate(event.date);
  const formattedTime = event.hour || formatTime(jsDate);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <ImageBackground
          source={
            event.imageUrl
              ? { uri: event.imageUrl }
              : { uri: "https://placehold.co/400.jpg" }
          }
          style={styles.header}
          imageStyle={styles.headerImage}
        >
          <View style={styles.headerContent}>
            <Text style={[styles.title, { color: colors.primary }]}>
              {event.title}
            </Text>
            <Text style={[styles.subTitle, { color: colors.primary }]}>
              {formattedDate} às {formattedTime}
            </Text>
          </View>
        </ImageBackground>

        <View style={{ padding: 16 }}>
          {/* Location */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View
              style={[
                styles.cardTitleBar,
                { backgroundColor: colors.secondary },
              ]}
            >
              <Text style={styles.cardHeader}>Local</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.row}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={colors.primary}
                />
                <View style={{ marginLeft: 8, flex: 1 }}>
                  <Text style={[styles.cardText, { color: colors.text }]}>
                    {event.location}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View
              style={[
                styles.cardTitleBar,
                { backgroundColor: colors.secondary },
              ]}
            >
              <Text style={styles.cardHeader}>Descrição</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.row}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text
                  style={[
                    styles.cardText,
                    { color: colors.text, marginLeft: 8 },
                  ]}
                >
                  {event.description}
                </Text>
              </View>
            </View>
          </View>

          {/* Shopping List */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View
              style={[
                styles.cardTitleBar,
                { backgroundColor: colors.secondary },
              ]}
            >
              <Text style={styles.cardHeader}>Lista de compras</Text>
              {!loading && listData.items.length > 0 && (
                <Text style={[styles.countText, { color: colors.text }]}>
                  {listData.items.filter((i) => i.ITEM_CHECKED).length}{" "}
                  marcados,{" "}
                  {listData.items.filter((i) => !i.ITEM_CHECKED).length} livres
                </Text>
              )}
            </View>
            <View style={styles.cardContent}>
              {loading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <>
                  {/* Add item input */}
                  <View style={styles.addItemContainer}>
                    <TextInput
                      style={[
                        styles.addItemInput,
                        {
                          backgroundColor: colors.background,
                          color: colors.text,
                        },
                      ]}
                      value={newItemName}
                      onChangeText={setNewItemName}
                      placeholder="Adicionar item..."
                      placeholderTextColor={colors.text + "66"}
                      returnKeyType="done"
                      onSubmitEditing={handleAddItem}
                    />
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={handleAddItem}
                      disabled={!newItemName.trim()}
                    >
                      <Gradient>
                        <Ionicons name="add-circle" size={24} />
                      </Gradient>
                    </TouchableOpacity>
                  </View>
                  {/* List items */}
                  {listData.listId && (
                    <ListDetails
                      data={listData.items}
                      listId={listData.listId}
                      flatListMode={false}
                    />
                  )}
                </>
              )}
            </View>
          </View>

          {/* Confirmed Attendees */}
          <View
            style={[
              styles.card,
              { backgroundColor: colors.card, marginBottom: 32 },
            ]}
          >
            <View
              style={[
                styles.cardTitleBar,
                { backgroundColor: colors.secondary },
              ]}
            >
              <Text style={styles.cardHeader}>Confirmados</Text>
              <Text style={[styles.countText, { color: colors.text }]}>
                {event.attendees.length} Pessoas
              </Text>
            </View>
            <View style={styles.cardContent}>
              {event.attendees.map((person, idx) => (
                <View key={person.id || idx} style={styles.row}>
                  <Image
                    source={{ uri: person.imageUrl }}
                    style={styles.avatar}
                  />
                  <Text
                    style={[
                      styles.cardText,
                      { color: colors.text, marginLeft: 8 },
                    ]}
                  >
                    {person.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const CARD_PADDING = 12;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    width: "100%",
  },
  headerImage: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "maven_semibold",
  },
  subTitle: {
    fontSize: 14,
    fontFamily: "maven_medium",
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    padding: 0,
  },
  cardTitleBar: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardHeader: {
    fontSize: 16,
    fontFamily: "maven_semibold",
    color: "#5DCFAE",
  },
  cardContent: {
    padding: CARD_PADDING,
  },
  countText: {
    fontSize: 12,
    fontFamily: "maven_medium",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: CARD_PADDING / 2,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  addItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
  },
  addItemInput: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    fontFamily: "maven_regular",
  },
  addButton: {
    marginLeft: 8,
  },
});
