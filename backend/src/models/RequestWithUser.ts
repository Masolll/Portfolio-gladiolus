import {Request} from "express";
import {UserViewModel} from "./UserViewModel";

export interface RequestWithUser extends Request{
    user?: UserViewModel;
}