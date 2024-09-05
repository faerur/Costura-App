import { Pressable, Text, View } from "react-native";

function Botao({ texto, apertarBotao }) {
  return (
    <View>
      <Pressable onPress={apertarBotao}>
        <Text>{texto}</Text>
      </Pressable>
    </View>
  );
}
export default Botao;
