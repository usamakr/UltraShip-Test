import { MyContext, USER_ROLE } from "./Authcontext";

async function getUser(token: string) {
  return new Promise<MyContext>((res, rej) => {
    if (token === "admin") {
      res({ user: { role: USER_ROLE.admin } });
    } else {
      res({ user: { role: USER_ROLE.user } });
    }
  });
}

export { getUser };
