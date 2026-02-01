import { setPaste } from "@/lib/store";
import { nowMs } from "@/lib/time";

export async function POST(req) {
  const body = await req.json();

  // content validation (already exists)
  if (!body.content || body.content.trim() === "") {
    return new Response(
      JSON.stringify({ error: "Content is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // max_views validation (already exists)
  if (
    body.max_views !== undefined &&
    (!Number.isInteger(body.max_views) || body.max_views < 1)
  ) {
    return new Response(
      JSON.stringify({ error: "max_views must be an integer ≥ 1" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 🔹 TTL validation
  if (
    body.ttl_seconds !== undefined &&
    (!Number.isInteger(body.ttl_seconds) || body.ttl_seconds < 1)
  ) {
    return new Response(
      JSON.stringify({ error: "ttl_seconds must be an integer ≥ 1" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const id = crypto.randomUUID();
  const createdAt = nowMs(req);

  // 🔹 Compute expiry
  const expiresAt =
    body.ttl_seconds !== undefined
      ? createdAt + body.ttl_seconds * 1000
      : null;

  await setPaste(id, {
  content: body.content,
  remaining_views:
    body.max_views !== undefined ? body.max_views : null,
  expires_at: expiresAt,
});


const host = req.headers.get("host");
const proto = req.headers.get("x-forwarded-proto") ?? "http";

return new Response(
  JSON.stringify({
    id,
    url: `${proto}://${host}/p/${id}`,
  }),
  { status: 201, headers: { "Content-Type": "application/json" } }
);

}
