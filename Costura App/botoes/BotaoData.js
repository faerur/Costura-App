import { Pressable, View, StyleSheet } from "react-native";
import Cores from "../constantes/Cores";
function BotaoData({ onPress, icone }) {
  return (
    <View style={styles.exteriorBotao}>
      <Pressable style={styles.interiorBotao} onPress={onPress}>
        {icone}
      </Pressable>
    </View>
  );
}

export default BotaoData;

const styles = StyleSheet.create({
  interiorBotao: {
    paddingVertical: 3,
    marginRight: 10,
  },
});
