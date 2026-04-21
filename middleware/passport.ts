import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserByEmailIdAndPassword,
  getUserById,
} from "../controller/userController";

type User = {
  id: number;
  uname: string;
  password: string;
};

const localLogin = new LocalStrategy(
  {
    usernameField: "uname",
    passwordField: "password",
  },
  async (uname: string, password: string, done) => {
    // Check if user exists in databse
    const user = (await getUserByEmailIdAndPassword(uname, password)) as
      | User
      | null;
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again.",
        });
  }
);

passport.serializeUser(function (user: Express.User, done) {
  const u = user as User;
  done(null, u.id);
});

passport.deserializeUser(async function (id: string, done) {
  try {
    const user = (await getUserById(id)) as User | null;
    if (!user) {
      done(null, false);
      return;
    }
    done(null, user);
  } catch (err) {
    done(err as Error);
  }
});

export default passport.use(localLogin);
