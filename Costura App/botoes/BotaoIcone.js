import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function BotaoIcone({ apertarBotao, identificarBotao, tamanho }) {
  return (
    <Pressable onPress={apertarBotao}>
      <Ionicons name={identificarBotao} size={tamanho} color="orange" />
    </Pressable>
  );
}
export default BotaoIcone;
