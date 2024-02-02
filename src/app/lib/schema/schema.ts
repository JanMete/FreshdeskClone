import { z } from 'zod';

export const createTicketSchema = z.object({
  title: z.string().min(3, 'Subject must be at least 3 characters long.'),
  priority: z.string(),
  body: z.string().min(5, 'Subject must be at least 5 characters long.'),
  status: z.string(),
  user: z.string(),
  user_email: z.string(),
  agent: z.string(),
});

export type TCreateTicketSchema = z.infer<typeof createTicketSchema>;
