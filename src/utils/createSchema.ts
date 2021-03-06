import { buildSchema } from "type-graphql";
import { useContainer } from "typeorm";
import { Container } from 'typeorm-typedi-extensions';
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { CreateProductResolver, CreateUserResolver } from "../modules/user/CreateUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/user/Me";
import { ProfilePictureResolver } from "../modules/user/ProfilePicture";
import { RegisterResolver } from "../modules/user/Register";

useContainer(Container);

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      CreateUserResolver,
      CreateProductResolver,
      ProfilePictureResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
    container: Container
  });