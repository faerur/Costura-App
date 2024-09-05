import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import BotaoData from "../botoes/BotaoData";
import Ionicons from "@expo/vector-icons/Ionicons";

export default ({ formatarData }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  function retornarDataFormatada(data) {
    let dia = data.getDate().toString();
    let mes = (data.getMonth() + 1).toString();
    let ano = data.getFullYear().toString();
    formatarData(`${dia}/${mes}/${ano}`);
  }

  return (
    <>
      <BotaoData
        onPress={() => setOpen(true)}
        icone={<Ionicons name="calendar-outline" size={20} color="black" />}
      />

      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        title={"Data"}
        locale="pt_BR"
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          retornarDataFormatada(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
