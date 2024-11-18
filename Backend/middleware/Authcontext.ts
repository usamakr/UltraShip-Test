export enum USER_ROLE {
  user = "USER",
  admin = "ADMIN",
}

interface UserInterface {
  role: USER_ROLE;
}

export interface MyContext {
  user: UserInterface;
}

import { MiddlewareFn } from "type-graphql";

// Middleware to inject the authorization header into resolver's context
export const AuthHeader: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context?.user.role || USER_ROLE.user;
  context.user.role = authorization; // Store in context for access in resolver
  return next();
};
