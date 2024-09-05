import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, Pressable, View } from "react-native";
import Cores from "../../constantes/Cores";
function IconesTelaMenu({ nomeIcone, tamanho, cor, texto, apertarBotao }) {
  return (
    <View style={styles.botaoMenu}>
      <Pressable
        onPress={apertarBotao}
        style={styles.pressionavel}
        android_ripple={{ color: "#ccc" }}
      >
        <Ionicons name={nomeIcone} size={tamanho} color={cor} />
        <Text>{texto}</Text>
      </Pressable>
    </View>
  );
}
export default IconesTelaMenu;

const styles = StyleSheet.create({
  botaoMenu: {
    margin: 10,
    width: 70,
    height: 60,
    backgroundColor: Cores.primary400,
    borderRadius: 10,
    overflow: "hidden",
  },
  pressionavel: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
