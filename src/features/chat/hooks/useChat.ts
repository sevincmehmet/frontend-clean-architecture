import { useState } from "react";
import { ChatUseCase } from "../core/chat.use-case";
import { BrowserChatRepo } from "../infra/chat.repository";
import type { Message } from "../core/chat.entities";

export const useChat = () => {
  /**
   * MİMARİ NOT: State yönetimi şu an useState ile yapılıyor.
   * Soyutlama (Abstraction) sayesinde yarın Redux, Zustand veya Recoil'e geçmek
   * isterseniz sadece bu Hook içeriğini değiştirmeniz yeterlidir.
   * UI (ChatPage) ve Core (UseCase) bu değişimden etkilenmez.
   */

  // const { messages, addMessage } = useChatStore(); // Zustand kullanmak istersek burada bikaç güncelleme yapmamız yeterli.
  const [messages, setMessages] = useState<Message[]>([]);

  // Dependency Injection: Use Case'e hangi Repo'yu kullanacağını söylüyoruz.
  const logic = ChatUseCase(BrowserChatRepo);

  const onSend = async (text: string) => {
    console.log(
      "%c[PRESENTATION]: Kullanıcı butona bastı. UI katmanından Hooks (Controller) katmanına geçildi.",
      "color: #8b5cf6; font-weight: bold;",
    );

    console.log(
      "%c[STATE]: Mevcut state yönetimi: useState. (Zustand veya Redux ile kolayca yer değiştirilebilir)",
      "color: #ec4899; font-style: italic;",
    );

    const newMessage = await logic.sendMessage(text);

    // Veriyi State'e aktarırken UI'ın bundan bağımsızlığını koruyoruz.
    setMessages((prev) => [...prev, newMessage]);

    console.log(
      "%c[PRESENTATION]: State güncellendi, UI render ediliyor.",
      "color: #8b5cf6;",
    );
  };

  return { messages, onSend };
};
