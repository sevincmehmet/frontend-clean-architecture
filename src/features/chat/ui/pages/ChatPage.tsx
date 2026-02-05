import React, { useState } from "react";
import { useChat } from "../../hooks/useChat";

export const ChatPage = () => {
  const { messages, onSend } = useChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div style={styles.fullScreenWrapper}>
      <div style={styles.mainContainer}>
        {/* Sol Panel - Opsiyonel (Profesyonel Görünüm İçin) */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Chat Engine</h2>
          <div style={styles.badge}>v1.0 - Clean Arch</div>
          <p style={styles.sidebarDesc}>
            Backend disiplini ile geliştirilmiş Frontend mimarisi.
          </p>
        </div>

        {/* Sağ Panel - Chat Alanı */}
        <div style={styles.chatSection}>
          <div style={styles.header}>
            <div style={styles.statusDot}></div>
            <span style={styles.headerText}>Global Chat Channel</span>
          </div>

          <div style={styles.messageArea}>
            {messages.length === 0 && (
              <div style={styles.emptyContainer}>
                <p style={styles.emptyText}>Henüz bir konuşma başlatılmadı.</p>
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent:
                    m.status === "sent" ? "flex-end" : "flex-start",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    ...styles.bubble,
                    backgroundColor:
                      m.status === "sent" ? "#0f172a" : "#ffffff",
                    color: m.status === "sent" ? "#ffffff" : "#1e293b",
                    boxShadow:
                      m.status === "sent"
                        ? "0 4px 12px rgba(0,0,0,0.1)"
                        : "0 2px 8px rgba(0,0,0,0.05)",
                    borderBottomRightRadius:
                      m.status === "sent" ? "4px" : "16px",
                    borderBottomLeftRadius:
                      m.status === "sent" ? "16px" : "4px",
                  }}
                >
                  {m.text}
                  {m.status === "pending" && (
                    <span style={styles.offlineTag}>
                      📵 Offline Modda Kaydedildi
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={styles.inputContainer}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Mesajınızı buraya yazın..."
              style={styles.inputField}
            />
            <button onClick={handleSend} style={styles.sendBtn}>
              GÖNDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  fullScreenWrapper: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f8fafc",
    display: "flex",
    overflow: "hidden",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  mainContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  sidebar: {
    width: "300px",
    backgroundColor: "#0f172a",
    padding: "40px 24px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    borderRight: "1px solid #1e293b",
  },
  sidebarTitle: {
    fontSize: "24px",
    fontWeight: 800,
    margin: 0,
    letterSpacing: "-0.5px",
  },
  badge: {
    backgroundColor: "#334155",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    width: "fit-content",
  },
  sidebarDesc: { color: "#94a3b8", fontSize: "14px", lineHeight: "1.6" },
  chatSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f1f5f9",
  },
  header: {
    padding: "20px 40px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  statusDot: {
    width: "10px",
    height: "10px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
  },
  headerText: { fontWeight: 600, color: "#1e293b" },
  messageArea: {
    flex: 1,
    overflowY: "auto",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
  },
  bubble: {
    maxWidth: "60%",
    padding: "16px 20px",
    borderRadius: "16px",
    fontSize: "15px",
    lineHeight: "1.5",
    position: "relative",
  },
  offlineTag: {
    display: "block",
    fontSize: "11px",
    marginTop: "8px",
    opacity: 0.8,
    fontWeight: "bold",
  },
  inputContainer: {
    padding: "30px 40px",
    backgroundColor: "#ffffff",
    borderTop: "1px solid #e2e8f0",
    display: "flex",
    gap: "15px",
  },
  inputField: {
    flex: 1,
    padding: "16px 24px",
    borderRadius: "12px",
    border: "2px solid #f1f5f9",
    outline: "none",
    fontSize: "16px",
    transition: "border-color 0.2s",
  },
  sendBtn: {
    backgroundColor: "#0f172a",
    color: "white",
    padding: "0 30px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.1s",
  },
  emptyContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: { color: "#94a3b8", fontSize: "16px" },
};
