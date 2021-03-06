import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";

const { width, height } = Dimensions.get("window");

export default function ToDo(props) {

    const [isEditing, setIsEditing] = useState(false);
    const [toDoValue, setToDoValue] = useState("");
    const {isCompleted, text, id, deleteToDo, toggleCompleteToDo, updateToDo} = props;
    
    function startEditing (text) {
        setToDoValue(text)
        setIsEditing(true)
    };
    
    function finishEditing () {
        setIsEditing(false);
        updateToDo(id, toDoValue)
    };
    
    function controlInput (changedText) {
        setToDoValue(changedText);
    }

    return (
        <View style={styles.container}>

            <View style={styles.column}>
                <TouchableOpacity onPress={() => toggleCompleteToDo(id) }>
                    <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                </TouchableOpacity>
                {isEditing ? (
                    <TextInput
                        style={[styles.text, styles.input, isCompleted ? styles.completedText : styles.uncompletedText]}
                        value={toDoValue}
                        multiline={true}
                        onChangeText={changedText=> controlInput(changedText)}
                        returnKeyType={"done"}
                        onBlur={() => finishEditing()}
                        //underlineColorAndroid={"transparent"}
                    />
                ) : (
                        <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}> {text} </Text>
                    )}
            </View>

            {isEditing ? (
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={() => finishEditing(text)}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>✔</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={() => startEditing(text)}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✎</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => deleteToDo(id)}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb",
    },
    uncompletedCircle: {
        borderColor: "red",
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20,
        textAlign:"left"
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 15,
        paddingBottom: 5,
        width: width / 2
    }

})