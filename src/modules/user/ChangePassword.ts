import bcript from "bcryptjs";
import { MyContext } from "../../types/MyContext";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix, redisKey } from "../constants/redisPrefixes";
import { ChangePasswordInput } from "./register/ChangePasswordInput";

@Resolver()
export class ChangePasswordResolver {

    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data") { token, password }: ChangePasswordInput,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        const userId = await redis.get(redisKey(forgotPasswordPrefix, token));

        if (!userId) {
            return null;
        }

        const user = await User.findOne(userId);

        if (!user) {
            return null;
        }

        await redis.del(redisKey(forgotPasswordPrefix, token));

        user.password = await bcript.hash(password, 12);
        await user.save();;

        // @ts-ignore
        ctx.req.session!.userId = user.id;

        return user;
    }

}
