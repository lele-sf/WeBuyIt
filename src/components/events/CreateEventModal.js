import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Button,
  Image,
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign, Feather } from "@expo/vector-icons";

import Gradient from "../layout/Gradient";
import { pickImage, uploadImageAsync } from "../../utils/imageUpload";
import { formatShortDate, formatTime } from "../../utils/formatDates";
import { createEvent } from "../../database/createEvent";

export default function CreateEventModal({
  visible,
  onClose,
  onCreated,
  host,
}) {
  const { colors } = useTheme();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePickImage = async () => {
    const uri = await pickImage();
    console.log("Imagem selecionada:", uri);
    if (uri) setImageUri(uri);
  };

  const handleSubmit = async () => {
    if (!title) {
      Alert.alert("Preencha o título");
      return;
    }

    try {
      setIsLoading(true);

      const eventDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      );

      //   let imageUrl = "";
      //   if (imageUri) {
      //     imageUrl = await uploadImageAsync(imageUri, `events/${Date.now()}.jpg`);
      //   }

      const placeholderSize = "300";
      const imageUrl = `https://placehold.co/${placeholderSize}.png`;

      await createEvent({
        title,
        date: eventDate,
        imageUrl,
        host,
        location,
        description,
      });

      setTitle("");
      setLocation("");
      setDescription("");
      setImageUri(null);
      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      Alert.alert("Erro ao criar evento");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={[styles.modal, { backgroundColor: colors.card }]}>
          <Gradient style={{ marginBottom: 16 }}>
            <Text style={styles.header}>Criar Evento</Text>
          </Gradient>

          {/* Título */}
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            multiline
            maxLength={50}
            placeholder="Título"
            placeholderTextColor={`${colors.text}80`}
            value={title}
            onChangeText={setTitle}
          />

          {/* Descrição */}
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
            multiline
            placeholder="Descrição"
            placeholderTextColor={`${colors.text}80`}
            value={description}
            onChangeText={setDescription}
          />

          {/* Local */}
          <View
            style={[
              styles.input,
              { borderColor: colors.border, borderWidth: 1 },
            ]}
          >
            <Feather name="map-pin" size={18} color={colors.text} />
            <TextInput
              style={{ flex: 1, marginLeft: 8, color: colors.text }}
              multiline
              placeholder="Local"
              placeholderTextColor={`${colors.text}80`}
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Date + Time */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.input,
                styles.half,
                { borderColor: colors.border, borderWidth: 1 },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <AntDesign name="calendar" size={18} color={colors.text} />
              <Text
                style={[
                  styles.inputText,
                  { color: colors.text, marginLeft: 8 },
                ]}
              >
                {formatShortDate(date)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.input,
                styles.half,
                { marginLeft: 8, borderColor: colors.border, borderWidth: 1 },
              ]}
              onPress={() => setShowTimePicker(true)}
            >
              <AntDesign name="clockcircleo" size={18} color={colors.text} />
              <Text
                style={[
                  styles.inputText,
                  { color: colors.text, marginLeft: 8 },
                ]}
              >
                {formatTime(time)}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={(_, d) => {
                setShowDatePicker(false);
                if (d) setDate(d);
              }}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_, t) => {
                setShowTimePicker(false);
                if (t) setTime(t);
              }}
            />
          )}

          {/* Imagem */}
          <TouchableOpacity
            style={styles.imageButton}
            onPress={handlePickImage}
          >
            <Feather name="image" size={18} color={colors.primary} />
            <Text
              style={[
                styles.imageBtnText,
                { color: colors.primary, marginLeft: 8 },
              ]}
            >
              {imageUri ? "Alterar Imagem" : "Escolher Imagem"}
            </Text>
          </TouchableOpacity>

          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          )}

          <View style={styles.buttonRow}>
            <Button title="Cancelar" onPress={onClose} color="#999" />
            <Button
              title={isLoading ? "Salvando..." : "Criar"}
              onPress={handleSubmit}
              disabled={isLoading}
              color={colors.primary}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    borderRadius: 16,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontFamily: "maven_semibold",
    textAlign: "center",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
  },
  half: {
    flex: 1,
  },
  inputText: {
    fontSize: 14,
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 12,
  },
  imageBtnText: {
    fontSize: 14,
  },
  previewImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
