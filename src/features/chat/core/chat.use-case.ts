import type { IChatRepo, Message } from "./chat.entities";

export const ChatUseCase = (repo: IChatRepo) => ({
  sendMessage: async (text: string): Promise<Message> => {
    console.log(
      "%c[CORE]: İş mantığı başladı. Yeni mesaj nesnesi oluşturuluyor...",
      "color: #3b82f6; font-weight: bold;",
    );

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      status: "sent" as const,
    };

    console.log(
      "[CORE]: Bağımlılık (Repo) üzerinden gönderim deneniyor. Debugger tetikleniyor...",
    );
    // @ts-ignore
    debugger; // Şu an iş mantığındayız, teknoloji bağımsızız

    try {
      await repo.send(newMessage);
      console.log(
        "%c[CORE]: Mesaj başarıyla sunucuya (Infrastructure) iletildi.",
        "color: #10b981;",
      );
    } catch (error) {
      console.warn(
        "[CORE]: Altyapı katmanında hata oluştu! Hata yönetimi devreye giriyor (Offline-First).",
      );
      newMessage.status = "pending";

      console.log(
        "[CORE]: Mesaj yerel hafızaya (Local Storage) yedekleniyor...",
      );
      // @ts-ignore
      debugger; // "Hata anında iş kuralı devreye girdi ve veriyi korumaya aldık."

      await repo.saveLocal(newMessage);
    }

    return newMessage;
  },
});
