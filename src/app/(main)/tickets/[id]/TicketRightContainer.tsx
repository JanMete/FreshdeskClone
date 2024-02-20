import DeleteButton from './DeleteButton';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import UpdateTicketForm from './UpdateTicketForm';

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

async function getUsers() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.from('Users').select();

  if (error) {
    console.log(error.message);
  }
  return data || [];
}

export default async function TicketRightContainer({
  id,
  ticket,
}: {
  id: string;
  ticket: ticket;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();
  const usersFetchData = await getUsers();
  const users = usersFetchData.map((item) => item.user_email);

  return (
    <section className='w-1/5 m-5 p-8 bg-white shadow-sm'>
      <p>{capitalizeFirstLetter(ticket.status!)}</p>
      <hr className='my-3' />
      <p className='text-xs'>PROPERTIES</p>
      <UpdateTicketForm id={id} ticket={ticket} users={users} />
      {data.session!.user.email === ticket.user_email && (
        <DeleteButton id={ticket.id} />
      )}
    </section>
  );
}
