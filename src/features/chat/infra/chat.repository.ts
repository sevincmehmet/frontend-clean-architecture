import axios from "axios";
import type { IChatRepo, Message } from "../core/chat.entities";

export const BrowserChatRepo: IChatRepo = {
  send: async (msg: Message) => {
    console.log(
      "%c[INFRA]: API isteği hazırlanıyor (Axios)...",
      "color: #f59e0b;",
    );
    // @ts-ignore
    debugger; // "Şu an teknik detaydayız. Yarın burası Firebase veya Socket olabilir."

    // Gerçek bir API olmadığı için hata senaryosunu simüle ettik:
    // throw new Error("Bağlantı Hatası");
    return axios.post("/api/messages", msg);
  },
  saveLocal: async (msg: Message) => {
    console.log(
      "[INFRA]: Browser API (LocalStorage) kullanılarak veri fiziksel olarak kaydediliyor.",
    );
    const list = JSON.parse(localStorage.getItem("off_msgs") || "[]");
    localStorage.setItem("off_msgs", JSON.stringify([...list, msg]));
  },
};
