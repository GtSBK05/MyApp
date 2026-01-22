import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AboutScreen = ({ navigation }) => {
  const [dataList, setDataList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const ambilData = async () => {
      try {
        const data = await AsyncStorage.getItem("listUser");
        if (data) setDataList(JSON.parse(data));
      } catch (error) {}
    };
    ambilData();
  }, []);

  const hapusSatu = async (index) => {
    const dataBaru = dataList.filter((_, i) => i !== index);
    setDataList(dataBaru);
    await AsyncStorage.setItem("listUser", JSON.stringify(dataBaru));
  };

  const hapusSemua = async () => {
    await AsyncStorage.removeItem("listUser");
    setDataList([]);
  };

  const addTask = () => {
    if (!text.trim()) return;
    if (editId) {
      setTasks(
        tasks.map((task) =>
          task.id === editId ? { ...task, text } : task
        )
      );
      setEditId(null);
      setText("");
      return;
    }
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText("");
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setText(task.text);
    setEditId(task.id);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      <Text style={styles.title}>Daftar Data Form</Text>

      {dataList.length > 0 ? (
        dataList.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>Nama: {item.nama}</Text>
            <Text style={styles.label}>Umur: {item.umur}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => hapusSatu(index)}
            >
              <Text style={styles.deleteText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>Belum ada data tersimpan.</Text>
      )}

      {dataList.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={hapusSemua}>
          <Text style={styles.clearText}>🗑 Hapus Semua Data</Text>
        </TouchableOpacity>
      )}

      <View style={styles.divider} />

      <Text style={styles.title}>To Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tambah tugas baru..."
          placeholderTextColor="#888"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Feather name={editId ? "save" : "plus"} size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <Text
              style={[
                styles.taskText,
                task.completed && styles.completedTask,
              ]}
            >
              {task.text}
            </Text>
            <View style={styles.taskButtons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => toggleCompleted(task.id)}
              >
                <Feather
                  name={task.completed ? "check-square" : "square"}
                  size={22}
                  color={task.completed ? "#09bd75" : "#ccc"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => editTask(task)}
              >
                <Feather name="edit" size={22} color="#FFD369" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => deleteTask(task.id)}
              >
                <Feather name="trash-2" size={22} color="#FF6666" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>Belum ada tugas.</Text>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Kembali</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F10", padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },
  label: { color: "#FFFFFF", fontSize: 16 },
  deleteButton: {
    marginTop: 8,
    alignSelf: "flex-end",
    backgroundColor: "#2E2E2E",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteText: { color: "#FF6666", fontWeight: "bold" },
  clearButton: { alignItems: "center", marginBottom: 15 },
  clearText: { color: "#FF6666", fontSize: 15, fontWeight: "bold" },
  noData: { color: "#B0B0B0", textAlign: "center", marginVertical: 20 },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#2E2E2E",
    marginVertical: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 8,
    padding: 10,
  },
  taskCard: {
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  taskText: { color: "#FFFFFF", fontSize: 16 },
  completedTask: { textDecorationLine: "line-through", color: "#777" },
  taskButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 12,
  },
  iconButton: { padding: 4 },
  backButton: { marginTop: 20, alignItems: "center" },
  backText: { color: "#B0B0B0", fontSize: 15 },
});

export default AboutScreen;
