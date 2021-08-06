import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { confirmPrefix, redisKey } from "../constants/redisPrefixes";

@Resolver()
export class ConfirmUserResolver {

    @Mutation(() => Boolean)
    async confirmUser(
        @Arg("token") token: string
    ): Promise<boolean> {
        const userId = await redis.get(redisKey(confirmPrefix, token));

        if (!userId) {
            return false;
        }

        await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
        await redis.del(redisKey(confirmPrefix, token));

        return true;
    }

}
