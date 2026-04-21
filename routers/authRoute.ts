import express, { NextFunction, Request, Response } from "express";
import passport from "../middleware/passport";
const router = express.Router();

router.get("/login", async (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/auth/login",
  })
);

function logoutHandler(req: Request, res: Response, next: NextFunction) {
  req.logout(function (err: unknown) {
    if (err) return next(err as Error);
    res.redirect("/");
  });
}

router.get("/logout", logoutHandler);
router.post("/logout", logoutHandler);

export default router;
