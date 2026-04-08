import { Ionicons } from '@expo/vector-icons'; // Iconos integrados en Expo
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function NewTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Tu IP y puerto confirmados
  const API_URL = 'http://192.168.137.1:3000/tasks';

  const createTask = async () => {
    // Validación básica: No permitir tareas sin título
    if (!title.trim()) {
      Alert.alert("Error", "El título de la tarea es obligatorio.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          completed: false, // Por defecto, una tarea nueva está pendiente
          createdAt: new Date().toISOString(), // Opcional: guardar fecha de creación
        }),
      });

      if (!res.ok) throw new Error('Error en el servidor');

      // Si todo sale bien, regresar a la lista
      Alert.alert("¡Éxito!", "Tarea creada correctamente.", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo crear la tarea. Verifica tu conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <Ionicons name="clipboard-outline" size={28} color="#4A90E2" />
              <Text style={styles.headerTitle}>Nueva Tarea</Text>
            </View>
            <Text style={styles.headerSubTitle}>Organiza tu día agregando una nueva actividad.</Text>

            <Text style={styles.label}>Título de la tarea</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Ej. Proyecto final de React Native"
              style={styles.input}
              placeholderTextColor="#AAB8C2"
            />

            <Text style={styles.label}>Descripción (Opcional)</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Detalla los pasos o materiales necesarios..."
              multiline
              style={[styles.input, styles.textArea]}
              placeholderTextColor="#AAB8C2"
            />

            <TouchableOpacity 
              style={[styles.createButton, isSubmitting && styles.createButtonDisabled]} 
              onPress={createTask}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Ionicons name="add-circle-outline" size={22} color="white" />
                  <Text style={styles.createButtonText}> Crear Tarea</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  keyboardView: { flex: 1 },
  scrollContent: { padding: 20 },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 22,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#1A1A1A", marginLeft: 10 },
  headerSubTitle: { fontSize: 15, color: "#777", marginBottom: 25, lineHeight: 22 },
  label: { fontSize: 14, fontWeight: "bold", color: "#555", marginBottom: 8 },
  input: {
    backgroundColor: "#F0F4F8",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#E1E8ED",
    color: "#333",
  },
  textArea: { height: 120, textAlignVertical: "top" },
  createButton: {
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    elevation: 3,
  },
  createButtonDisabled: { backgroundColor: "#AAB8C2" },
  createButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});