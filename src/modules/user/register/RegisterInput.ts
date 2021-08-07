import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { OkMixin } from "../../../modules/shared/OkInput";
import { PasswordMixin } from "../../shared/PasswordInput";

@InputType()
export class RegisterInput extends OkMixin(PasswordMixin(class { })) {
    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    email: string;
}