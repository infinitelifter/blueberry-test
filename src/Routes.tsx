import React from "react";
import { Route } from "react-router";
import { ROUTES } from "./constants/routes";
import { WinnersList } from "./pages/winners-list/WinnersList";
import { Game } from "./pages/game/Game";
import { SignUp } from "./pages/sign-up/SignUp";
import { Login } from "./pages/login/Login";

export const Routes = () => (
  <>
    <Route exact path={ROUTES.LIST} component={WinnersList} />
    <Route exact path={ROUTES.GAME} component={Game} />
    <Route exact path={ROUTES.SIGN_IN} component={Login} />
    <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
  </>
);
