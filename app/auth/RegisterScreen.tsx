import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import axios from "axios";
import {ThemedView} from "@/components/ThemedView";
import {Button, Dialog, PaperProvider, Portal} from "react-native-paper";
import API_URL from "../../config/config";

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/register`, {username, password, email});
            router.replace("/auth/LoginScreen");
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || "An error occurred";
            setDialogMessage(errorMessage);
            setDialogVisible(true);
        }
    };

    return (
        <PaperProvider>
            <ThemedView style={styles.container}>
                <Text style={styles.title}>Create an Account</Text>
                <Text style={styles.subtitle}>Join us and get started</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#A37A93"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#A37A93"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#A37A93"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/auth/LoginScreen")}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                        <Dialog.Title>Registration Failed</Dialog.Title>
                        <Dialog.Content>
                            <Text>{dialogMessage}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setDialogVisible(false)}>OK</Button>
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
        backgroundColor: "#F8E4EE",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#5D3A58",
    },
    subtitle: {
        fontSize: 16,
        color: "#7A506F",
        marginBottom: 24,
    },
    input: {
        width: "100%",
        height: 48,
        borderColor: "#E0AFC8",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: "#FFFFFF",
    },
    registerButton: {
        width: "100%",
        height: 48,
        backgroundColor: "#E09ABC",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    registerButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    loginButton: {
        width: "100%",
        height: 48,
        borderWidth: 1,
        borderColor: "#E09ABC",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    loginButtonText: {
        color: "#E09ABC",
        fontSize: 16,
        fontWeight: "600",
    },
});
