import { NextFunction, Request, Response } from 'express';
import HttpError from '../helpers/errorHandler';
import JoiHelper from '../helpers/joiHelpers';
import { jobSchema } from './ValidationSchema';

class SchedulerValidator {
    static validateInputs(req: Request, res: Response, next: NextFunction) {
        const data: object = req.body;
        const validate = JoiHelper.validateSubmission(data, jobSchema);
        if (validate.errorMessage) {
            const { errorMessage, ...rest } = validate;
            return HttpError.handleError(errorMessage, 400, res, { ...rest });
          }
        return next();
    }
}

export default SchedulerValidator;
