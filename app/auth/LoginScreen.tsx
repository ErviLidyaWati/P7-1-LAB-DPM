import React, {useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ThemedView} from "@/components/ThemedView";
import {Button, Dialog, PaperProvider, Portal} from "react-native-paper";
import API_URL from "../../config/config";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
            const { token } = response.data.data;
            await AsyncStorage.setItem("token", token);
            setDialogMessage("Login successful!");
            setIsSuccess(true);
            setDialogVisible(true);
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || "An error occurred";
            setDialogMessage(errorMessage);
            setIsSuccess(false);
            setDialogVisible(true);
        }
    };

    const handleDialogDismiss = () => {
        setDialogVisible(false);
        if (isSuccess) {
            router.replace("/(tabs)");
        }
    };

    return (
        <PaperProvider>
            <ThemedView style={styles.container}>
                <Image source={require("../../assets/images/icon.png")} style={styles.logo} />
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>Log in to continue</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#C39EA0"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#C39EA0"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={() => router.push("/auth/RegisterScreen")}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={handleDialogDismiss}>
                        <Dialog.Title>{isSuccess ? "Success" : "Login Failed"}</Dialog.Title>
                        <Dialog.Content>
                            <Text>{dialogMessage}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleDialogDismiss}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ThemedView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#FFD9E8", // Soft pink pastel
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 24,
        resizeMode: "contain",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#721121", // Dark maroon for contrast
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 24,
        color: "#C3073F", // Bright pink for visibility
    },
    input: {
        width: "100%",
        height: 48,
        borderColor: "#F8BBD0", // Light pink pastel
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: "#FFFFFF", // White input background
        color: "#4A4A4A", // Dark gray text
    },
    loginButton: {
        width: "100%",
        height: 48,
        backgroundColor: "#C3073F", // Bright pink button
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    loginButtonText: {
        color: "#FFFFFF", // White text
        fontSize: 18,
        fontWeight: "bold",
    },
    registerButton: {
        width: "100%",
        height: 48,
        borderWidth: 2,
        borderColor: "#C3073F", // Bright pink border
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFE4EB", // Light pastel pink background
    },
    registerButtonText: {
        color: "#C3073F", // Bright pink text
        fontSize: 16,
        fontWeight: "bold",
    },
});
