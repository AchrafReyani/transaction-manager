create table transactions (
  id serial primary key,
  user_id uuid references auth.users not null,
  title text,
  description text,
  amount numeric not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone
);

alter table transactions enable row level security;

create policy "Users can view their own transactions." on transactions
  for select using (auth.uid() = user_id);

create policy "Users can add their own transactions." on transactions
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own transactions." on transactions
  for update using (auth.uid() = user_id);

create policy "Users can delete their own transactions." on transactions
  for delete using (auth.uid() = user_id);