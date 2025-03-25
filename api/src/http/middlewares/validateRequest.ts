import { AnyZodObject, z, ZodEffects } from "zod";
import { NextFunction, Request, Response } from "express";

type ZodSchema = AnyZodObject | ZodEffects<AnyZodObject>;

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        res.status(400).json({
          errors,
        });

        return;
      }

      next(error);
    }
  };
};
