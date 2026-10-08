-- TeaGhiu · char_stats: bảng lưu tim / copy / ghim theo tuần
-- Dán toàn bộ vào Supabase SQL Editor rồi bấm Run.

create table if not exists public.char_stats (
  week_key  text not null,
  char_name text not null,
  hearts    integer not null default 0,
  copies    integer not null default 0,
  pins      integer not null default 0,
  primary key (week_key, char_name)
);

alter table public.char_stats enable row level security;

create policy "char_stats_select" on public.char_stats for select using (true);
create policy "char_stats_insert" on public.char_stats for insert with check (true);
create policy "char_stats_update" on public.char_stats for update using (true);

-- Hàm tăng chỉ số an toàn (được gọi qua rpc từ web)
create or replace function public.increment_stat(wk text, cn text, fld text, d integer)
returns void language plpgsql security definer set search_path = public as $$
begin
  if fld not in ('hearts','copies','pins') then
    raise exception 'field khong hop le';
  end if;
  execute format(
    'insert into public.char_stats (week_key, char_name, %1$s) values ($1, $2, $3)
     on conflict (week_key, char_name)
     do update set %1$s = greatest(0, public.char_stats.%1$s + $3)', fld)
  using wk, cn, d;
end $$;

grant execute on function public.increment_stat(text, text, text, integer) to anon;
