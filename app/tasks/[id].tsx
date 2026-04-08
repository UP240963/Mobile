import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator, SafeAreaView, ScrollView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const API_URL = 'http://192.168.137.1:3000/tasks';

  const getTask = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setDescription(data.description);
      setCompleted(data.completed);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, completed }),
      });
      router.back();
    } catch (error) {
      alert('No se pudo actualizar');
    }
  };

  useEffect(() => { getTask(); }, [id]);

  if (loading) return <ActivityIndicator style={{flex:1}} size="large" color="#4A90E2" />;

  return (
    <SafeAreaView style={styles.container}>
      {/* --- BOTÓN DE REGRESO --- */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.headerTitle}>Actualizar Tarea</Text>
          
          <Text style={styles.label}>Título</Text>
          <TextInput 
            value={title} 
            onChangeText={setTitle} 
            style={styles.input} 
            placeholder="Título de la tarea"
          />
          
          <Text style={styles.label}>Descripción</Text>
          <TextInput 
            value={description} 
            onChangeText={setDescription} 
            multiline 
            style={[styles.input, {height: 100, textAlignVertical: 'top'}]} 
            placeholder="Añade una descripción..."
          />

          <TouchableOpacity 
            style={[styles.statusToggle, { backgroundColor: completed ? '#E8F5E9' : '#FFF3E0' }]}
            onPress={() => setCompleted(!completed)}
          >
            <Ionicons 
              name={completed ? "checkmark-circle" : "ellipse-outline"} 
              size={24} 
              color={completed ? "#4CAF50" : "#FF9800"} 
            />
            <Text style={[styles.statusText, { color: completed ? "#2E7D32" : "#E65100" }]}>
              {completed ? "Tarea Completada" : "Pendiente de completar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={updateTask}>
            <Ionicons name="save-outline" size={20} color="white" />
            <Text style={styles.saveButtonText}> Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", padding: 20 },
  backButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20,
    paddingVertical: 5
  },
  backText: { fontSize: 16, marginLeft: 5, color: "#333", fontWeight: '500' },
  card: { 
    backgroundColor: "white", 
    borderRadius: 20, 
    padding: 25, 
    elevation: 4, 
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10 
  },
  headerTitle: { fontSize: 26, fontWeight: "bold", marginBottom: 25, color: "#1A1A1A" },
  label: { fontSize: 14, fontWeight: "bold", color: "#888", marginBottom: 8, textTransform: 'uppercase' },
  input: { 
    backgroundColor: "#F0F4F8", 
    borderRadius: 12, 
    padding: 15, 
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E1E8ED"
  },
  statusToggle: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 25 
  },
  statusText: { marginLeft: 10, fontWeight: '600', fontSize: 15 },
  saveButton: { 
    backgroundColor: "#4A90E2", 
    flexDirection: 'row',
    padding: 18, 
    borderRadius: 15, 
    alignItems: "center", 
    justifyContent: 'center',
    elevation: 3
  },
  saveButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});