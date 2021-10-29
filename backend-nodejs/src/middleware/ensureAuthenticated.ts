import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
};

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        const authToken = req.headers.authorization;

        if(!authToken) {
            return res.status(401).json({
                errorCode: "token.invalid",
            });
        };

        // Bearer <token>
        // [0] Bearer
        // [1] <token>

        const [ _, token ] = authToken.split(" ");

        try {
            const { sub } = verify(token, `${process.env.JWT_SECRET}`) as IPayload;

            req.user_id = sub;

            return next();
        }
        catch(err: any) {
            return res.status(400).json({ errorCode: "token.expired", message: err.message });
        };

    };