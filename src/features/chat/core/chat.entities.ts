  export interface Message {
    id: string;
    text: string;
    status: "sent" | "pending";
  }

  export interface IChatRepo {
    send(msg: Message): Promise<void>;
    saveLocal(msg: Message): Promise<void>;
  }
