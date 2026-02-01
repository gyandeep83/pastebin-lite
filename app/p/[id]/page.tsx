import { headers } from "next/headers";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";

  const res = await fetch(
    `${proto}://${host}/api/pastes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
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
          <p>404 – Paste not found</p>
        </div>
      </main>
    );
  }

  const data = await res.json();

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

        <pre
          style={{
            whiteSpace: "pre-wrap",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          {data.content}
        </pre>
      </div>
    </main>
  );
}
