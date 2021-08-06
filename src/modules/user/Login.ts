import bcrypt from "bcryptjs";
import { MyContext } from "src/types/MyContext";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
export class LoginResolver {

    @Mutation(() => User, { nullable: true })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext
    ): Promise<User | undefined> {
        const user: User | undefined = await User.findOne({ where: { email } });

        if (!user) {
            return undefined;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return undefined;
        }

        // @ts-ignore
        ctx.req.session!.userId = user.id;

        return user;
    }
}
