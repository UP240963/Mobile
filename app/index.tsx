import { Ionicons } from "@expo/vector-icons"; // Iconos integrados en Expo
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Tu IP y puerto confirmados
  const API_URL = "http://192.168.137.1:3000/tasks";

  const getTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTasks();
    }, [])
  );

  const deleteTask = async (id: any) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      getTasks();
    } catch (error) {
      alert("No se pudo eliminar la tarea");
    }
  };

  const renderTask = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <View style={styles.statusContainer}>
          <Ionicons 
            name={item.completed ? "checkmark-circle" : "time-outline"} 
            size={16} 
            color={item.completed ? "#4CAF50" : "#FF9800"} 
          />
          <Text style={[styles.taskStatus, { color: item.completed ? "#4CAF50" : "#FF9800" }]}>
            {item.completed ? " Completada" : " Pendiente"}
          </Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          onPress={() => router.push(`/tasks/${item.id}`)}
          style={styles.actionButton}
        >
          <Ionicons name="pencil" size={20} color="#4A90E2" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => deleteTask(item.id)}
          style={styles.actionButton}
        >
          <Ionicons name="trash" size={20} color="#FF5252" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Tareas</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push("/tasks/new")}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTask}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay tareas disponibles ✨</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#1A1A1A" },
  addButton: {
    backgroundColor: "#4A90E2",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  listContent: { padding: 20 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // Sombras para iOS y Android
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 18, fontWeight: "600", color: "#333", marginBottom: 5 },
  statusContainer: { flexDirection: "row", alignItems: "center" },
  taskStatus: { fontSize: 14, fontWeight: "500" },
  actions: { flexDirection: "row" },
  actionButton: {
    marginLeft: 15,
    padding: 8,
    backgroundColor: "#F0F4F8",
    borderRadius: 10,
  },
  emptyText: { textAlign: "center", marginTop: 50, color: "#999", fontSize: 16 },
});