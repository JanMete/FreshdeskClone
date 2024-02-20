import { Database as DB } from '@/app/lib/types/database.types';

declare global {
  type Database = DB;
  type ticket = DB['public']['Tables']['Tickets']['Row'];
  type users = DB['public']['Tables']['Users']['Row'];
}
