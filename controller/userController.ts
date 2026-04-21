import * as db from "../fake-db";

export const getUserByEmailIdAndPassword = async (
  uname: string,
  password: string
) => {
  const user = db.getUserByUsername(uname);
  if (!user) return null;
  return user.password === password ? user : null;
};

export const getUserById = async (id: string) => {
  let user = db.getUser(id);
  if (user) {
    return user;
  }
  return null;
};
