"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");

  async function createPaste() {
    setError("");
    setResultUrl("");

    if (!content.trim()) {
      setError("Content cannot be empty.");
      return;
    }

    const body: any = { content };

    if (ttl) body.ttl_seconds = Number(ttl);
    if (maxViews) body.max_views = Number(maxViews);

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setResultUrl(data.url);
    setContent("");
    setTtl("");
    setMaxViews("");
  }

  return (
    <main
  style={{
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: "40px",
    fontFamily: "system-ui, sans-serif",
    color: "#000000",
  }}
>
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "#ffffff",
          padding: "24px",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: 16, color: "#000000" }}>
  Pastebin Lite
</h1>


        <label style={{ fontWeight: 600, color: "#000000" }}>Paste content</label>
        <textarea
          rows={8}
          placeholder="Paste your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            marginTop: 6,
            padding: 10,
            borderRadius: 4,
            border: "1px solid #ccc",
            fontSize: 14,
            color: "#000000",
          }}
        />

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 600, color: "#000000" }}>TTL (seconds)</label>
            <input
              type="number"
              placeholder="Optional"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
              style={{
                width: "100%",
                marginTop: 6,
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
                color: "#000000",
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 600, color: "#000000" }}>Max views</label>
            <input
              type="number"
              placeholder="Optional"
              value={maxViews}
              onChange={(e) => setMaxViews(e.target.value)}
              style={{
                width: "100%",
                marginTop: 6,
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>

        <button
          onClick={createPaste}
          style={{
            marginTop: 20,
            padding: "10px 16px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Create Paste
        </button>

        {error && (
          <p style={{ marginTop: 12, color: "#dc2626" }}>
            {error}
          </p>
        )}

        {resultUrl && (
  <div
    style={{
      marginTop: 20,
      padding: 12,
      background: "#f0fdf4",
      border: "1px solid #bbf7d0",
      borderRadius: 6,
    }}
  >
    <p style={{ marginBottom: 6, fontWeight: 600, color: "#000000" }}>
      Paste created successfully
    </p>

    <a
      href={resultUrl}
      target="_blank"
      style={{
        color: "#2563eb",
        textDecoration: "underline",
        wordBreak: "break-all",
      }}
    >
      {resultUrl}
    </a>
  </div>
)}
      </div>
    </main>
  );
}
