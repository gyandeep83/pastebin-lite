import { nowMs } from "@/lib/time";
import { getPaste, setPaste, deletePaste } from "@/lib/store";


export async function GET(req, context) {
  const { id } = await context.params;
  const paste = await getPaste(id);

  // 1️⃣ Missing paste
  if (!paste) {
    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2️⃣ TTL check (BEFORE view count)
  if (
    paste.expires_at !== null &&
    nowMs(req) > paste.expires_at
  ) {
    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // 3️⃣ View limit check
  if (paste.remaining_views === 0) {
    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // 4️⃣ Decrement views
  if (paste.remaining_views !== null) {
    paste.remaining_views -= 1;
  }

  
// Optional cleanup
if (
  paste.remaining_views === 0 ||
  (paste.expires_at !== null && nowMs(req) > paste.expires_at)
) {
  await deletePaste(id);
} else {
  await setPaste(id, paste);
}


  return new Response(
    JSON.stringify({
      content: paste.content,
      remaining_views: paste.remaining_views,
      expires_at: paste.expires_at
        ? new Date(paste.expires_at).toISOString()
        : null,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
