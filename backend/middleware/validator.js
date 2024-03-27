// middleware/validate.js
import { ValidationError } from 'yup';

export const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ error: error.errors });
        }
        next(error); // Gérer d'autres types d'erreurs potentielles
    }
};
