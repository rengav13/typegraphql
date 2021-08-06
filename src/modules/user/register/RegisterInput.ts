import { IsEmail, Length, Min } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @Min(5)
    password: string;
}