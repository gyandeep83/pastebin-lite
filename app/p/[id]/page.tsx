import { headers } from "next/headers";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ✅ await headers()
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";

  const res = await fetch(
    `${proto}://${host}/api/pastes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <h1>404 – Paste not found</h1>;
  }

  const data = await res.json();

  return (
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {data.content}
    </pre>
  );
}
