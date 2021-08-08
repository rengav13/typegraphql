import { MyContext } from "src/types/MyContext";
import { Ctx, Query, Resolver } from "type-graphql";
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from "../../entity/User";
import { UserRepo } from "../repo/UserRepo";

@Resolver()
export class MeResolver {

    @InjectRepository(UserRepo)
    private readonly repository: UserRepo;

    @Query(() => User, { nullable: true, complexity: 5 })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        // @ts-ignore
        const userId = ctx.req.session!.userId;

        if (!userId) {
            return undefined;
        }

        return await this.repository.findOne(userId);
    }
}
