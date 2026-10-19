-- rls_policies.sql

-- Example Row-Level Security policies (review and adjust to your project)

-- enable RLS for reuse_items
alter table reuse_items enable row level security;

-- owners can insert/select/update/delete their own items
create policy "reuse_items_owner_policy" on reuse_items
  for all
  using (owner = auth.uid())
  with check (owner = auth.uid());

-- enable RLS for item_requests
alter table item_requests enable row level security;
create policy "item_requests_owner" on item_requests
  for select using (requester = auth.uid());
create policy "item_requests_insert" on item_requests
  for insert with check (requester = auth.uid());

-- notifications: recipients only
alter table notifications enable row level security;
create policy "notifications_recipient" on notifications
  for all
  using (recipient = auth.uid())
  with check (recipient = auth.uid());
