import { v4 } from "uuid";
import { redis } from "../../redis";
import { forgotPasswordPrefix, redisKey } from "../constants/redisPrefixes";

export const createRecoverPasswordUrl = async (userId: number) => {
  const token = v4();
  await redis.set(redisKey(forgotPasswordPrefix, token), userId, "ex", 60 * 60 * 24); // 1 day expiration

  return `http://localhost:3000/user/change-password/${token}`;
};