import { createServerFn } from '@tanstack/react-start';
import { intakeSchema } from './intake-schema';
import { deliverIntake } from './intake.server';

export const submitIntake = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => intakeSchema.parse(input))
  .handler(async ({ data }) => {
    const accessKey = process.env['WEB3FORMS_ACCESS_KEY'];
    if (!accessKey) return { success: false };
    return deliverIntake(data, accessKey);
  });