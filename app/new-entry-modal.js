import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link, Stack, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveTask } from "../firebase-config";

export default function Modal() {
  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  const title = useRef();
  const description = useRef();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const queryClient = useQueryClient();

  // react-query mutation setup
  const taskMutation = useMutation({
    mutationFn: (task) => saveTask(task),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  /**
   *
   */
  const doSaveTask = async () => {
    try {
      debugger;
      await taskMutation.mutateAsync({
        title: title.current,
        description: description.current,
        dueDate: date,
      });

      // reset input fields
      title.current = "";
      (description.current = ""), setDate("");

      // exit modal
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error Saving Task", error.message);
    }
  };

  return (
    <>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
      >
        {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
        {!isPresented && <Link href="../">Dismiss</Link>}
        <View>
          <Text>Enter New Task</Text>
        </View>
        <View>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            placeholder="title"
            autoCapitalize="none"
            nativeID="title"
            onChangeText={(text) => {
              title.current = text;
            }}
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Task Desctiption</Text>
          <TextInput
            numberOfLines={8}
            multiline={true}
            placeholder="description"
            autoCapitalize="none"
            nativeID="description"
            onChangeText={(text) => {
              description.current = text;
            }}
            style={[styles.textInput, { height: 100 }]}
          />
        </View>

        <View>
          <Text style={styles.label}>Task Due Date</Text>
          <View style={{ flexDirection: "row", width: 150 }}>
            <TextInput
              value={date.toLocaleDateString()}
              placeholder="Select a date"
              style={styles.dateInput}
              editable={false}
            />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowDatePicker(true)}
            >
              <AntDesign name="calendar" size={24} color="#920" />
            </TouchableOpacity>
          </View>
          {/* <Button title="Select Date" onPress={() => setShowDatePicker(true)} /> */}
        </View>

        <View>
          {showDatePicker && (
            <DateTimePickerModal
              isVisible={showDatePicker}
              mode="date"
              onConfirm={(v) => {
                setDate(v);
                setShowDatePicker(false);
                console.log(date.toLocaleDateString());
              }}
              onCancel={() => setShowDatePicker(false)}
            />
          )}
        </View>

        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <TouchableOpacity
            onPress={() => {
              doSaveTask();
            }}
            style={[styles.button, { marginRight: 10 }]}
          >
            <Text
              style={{ color: "white", alignSelf: "center", fontWeight: 600 }}
            >
              Save
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={[
              styles.button,
              { marginRight: 10, backgroundColor: "#500", borderColor: "#520" },
            ]}
          >
            <Text
              style={{ color: "white", alignSelf: "center", fontWeight: 600 }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
        <StatusBar style="light" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    marginLeft: 8,
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
    color: "#920",
  },
  textInput: {
    width: 350,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#920",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  dateInput: {
    flex: 1,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#920",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#920",
    borderColor: "#920",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 140,
  },
});
