import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function getPaste(id) {
  return await redis.get(`paste:${id}`);
}

export async function setPaste(id, data) {
  await redis.set(`paste:${id}`, data);
}

export async function deletePaste(id) {
  await redis.del(`paste:${id}`);
}
