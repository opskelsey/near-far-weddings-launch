import { z } from 'zod';
import { offerings } from './wedding-offerings';

export const intakeSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your names.').max(100, 'Please keep names under 100 characters.'),
  email: z.string().trim().email('Please enter a valid email address.').max(255),
  date: z.string().max(10).refine(value => value === '' || (/^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value), 'Please choose a valid wedding date.'),
  services: z.string().refine(value => value === 'Not sure yet' || offerings.some(item => item.service === value), 'Please choose an available service.'),
  botcheck: z.boolean().default(false),
});

export type IntakeInput = z.infer<typeof intakeSchema>;