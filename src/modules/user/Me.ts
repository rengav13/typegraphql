import { MyContext } from "src/types/MyContext";
import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
export class MeResolver {

    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        // @ts-ignore
        const userId = ctx.req.session!.userId;
        
        if (!userId) {
            return undefined;
        }

        return await User.findOne(userId);
    }
}
