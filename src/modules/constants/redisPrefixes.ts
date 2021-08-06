export const confirmPrefix = "user-confirmation";
export const forgotPasswordPrefix = "forgot-password";

export function redisKey(prefix: string, token: string) {
    return `${prefix}:${token}`;
}