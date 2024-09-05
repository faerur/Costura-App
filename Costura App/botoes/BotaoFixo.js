import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function BotaoFixo({ onPress }) {
  return (
    <View style={styles.conteinerExterno}>
      <View style={styles.conteinerInterno}>
        <Pressable
          style={styles.botao}
          android_ripple={{ color: "#fff" }}
          onPress={onPress}
        >
          <Ionicons name="add" size={24} color={"white"} style={styles.icone} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteinerExterno: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  conteinerInterno: {
    position: "absolute",
    bottom: 30,
    right: 30,
    elevation: 4,
    width: 60,
    height: 60,
    flex: 1,
    backgroundColor: "#ed2800",
    borderRadius: 30,
    overflow: "hidden",
  },
  botao: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  icone: {
    flexDirection: "column",
  },
});

export default BotaoFixo;
