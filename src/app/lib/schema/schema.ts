import { z } from 'zod';

export const createTicketSchema = z.object({
  title: z.string().min(3, 'Subject must be at least 3 characters long.'),
  priority: z.string(),
  body: z.string().min(5, 'Subject must be at least 5 characters long.'),
  status: z.string().default('open'),
  user: z.string().default('unknown'),
  user_email: z.string().default('unknown@gmail.com'),
  agent: z.string().default('unassigned'),
});

export type TCreateTicketSchema = z.infer<typeof createTicketSchema>;

export const singnUpSchema = z
  .object({
    user_email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords must match',
    path: ['confirm_password'],
  });

export type TSignUpSchema = z.infer<typeof singnUpSchema>;

export const logInSchema = z.object({
  user_email: z.string().email(),
  password: z.string(),
});

export type TLogInSchema = z.infer<typeof logInSchema>;

export const updateTicket = z.object({
  status: z.string(),
  priority: z.string(),
  agent: z.string(),
});
export type TUpdateTicket = z.infer<typeof updateTicket>;
