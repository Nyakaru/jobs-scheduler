import Joi from '@hapi/joi';
import { join } from 'path';

const dateTimeRegex = /^([0-2]\d|3[0-1])-([01]\d|1[0-2]) ([01]\d|2[0-3]):([0-5]\d)$/;
const dayTimeRegex = /^([0-2]\d|3[0-1]) ([01]\d|2[0-3]):([0-5]\d)$/;
const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
const repeatSequenceRegex = /^(\d+) (\d+):(\d+)$/;

export const jobSchema = Joi.object().keys({
  isRecurring: Joi.boolean().required(),
  time: Joi.when('isRecurring', {
    is: false,
    then: Joi.string()
      .regex(dateTimeRegex)
      .required()
      .error(() => `time must be in the format 'DD-MM HH:mm'`),
  }),
  cron: Joi.when('isRecurring', {
    is: true,
    then: Joi.object()
      .keys({
        isSequential: Joi.boolean().required(),
        repeatTime: Joi.when('isSequential', {
          is: false,
          then: Joi.alternatives()
            .try(
              Joi.string().regex(dayTimeRegex),
              Joi.string().regex(dateTimeRegex),
              Joi.string().regex(timeRegex),
            ).required(),
        }),
        repeatSequence: Joi.when('isSequential', {
          is: true,
          then: Joi.string()
            .regex(repeatSequenceRegex)
            .error(
              () =>
                `repeatSequence must be in the format 'days hours:minutes'`,
            ).required(),
        }),
      })
      .required(),
  }),
  timeZone: Joi.string(),
  payload: Joi.object().keys({
    queueName: Joi.string().required(),
    callbackUrl: Joi.string().required(),
    data: Joi.object().keys({
      key: Joi.string().required(),
      args: Joi.object().required(),
    }),
  }),
});
