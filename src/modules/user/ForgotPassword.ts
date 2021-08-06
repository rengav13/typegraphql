import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { createRecoverPasswordUrl } from "../util/createRecoverPasswordUrl";
import { sendEmail } from "../util/sendEmail";

@Resolver()
export class ForgotPasswordResolver {

    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string): Promise<boolean> {
        const user = await User.findOne({ email });

        if (!user) {
            return false;
        }

        sendEmail(email, await createRecoverPasswordUrl(user.id));

        return true;
    }

}
