-- Nour Amri Deco - Supabase initialization
-- Safe to run multiple times.

create extension if not exists pgcrypto;

create table if not exists public.realisations (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  description text not null,
  categorie text not null check (
    categorie in ('Plafonds', 'Corniches', 'Moulures', U&'Staff d\00E9coratif', 'Autre')
  ),
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.realisations alter column image_url drop not null;

create index if not exists realisations_created_at_idx
  on public.realisations (created_at desc);

create index if not exists realisations_categorie_idx
  on public.realisations (categorie);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  telephone text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx
  on public.messages (created_at desc);

-- Optional: keep data layer simple for launch phase.
alter table public.realisations disable row level security;
alter table public.messages disable row level security;

-- Seed only if the table is empty.
insert into public.realisations (titre, description, categorie, image_url, created_at)
select *
from (
  values
    (
      'Plafond floral salon',
      'Rosace centrale et corniches douces pour un salon lumineux.',
      'Plafonds',
      'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&w=1200&q=80',
      '2026-01-12T10:00:00Z'::timestamptz
    ),
    (
      'Corniche classique',
      'Finition artisanale precise avec motifs geometriques.',
      'Corniches',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
      '2026-02-02T09:00:00Z'::timestamptz
    ),
    (
      'Moulures murales modernes',
      'Composition murale elegante pour une entree haut de gamme.',
      'Moulures',
      'https://images.unsplash.com/photo-1616627561839-074385245ff6?auto=format&fit=crop&w=1200&q=80',
      '2026-03-20T09:00:00Z'::timestamptz
    ),
    (
      'Staff decoratif chambre',
      'Habillage complet avec lignes fines et style intemporel.',
      U&'Staff d\00E9coratif',
      'https://images.unsplash.com/photo-1616594039964-3d0ec89a7a66?auto=format&fit=crop&w=1200&q=80',
      '2026-04-18T09:00:00Z'::timestamptz
    ),
    (
      'Faux plafond entree',
      'Volume discret et eclairage indirect integre.',
      'Autre',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
      '2026-05-28T09:00:00Z'::timestamptz
    ),
    (
      'Plafond double niveau',
      'Decoupe sur mesure pour valoriser espace principal.',
      'Plafonds',
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=80',
      '2026-06-10T09:00:00Z'::timestamptz
    )
) as seed(titre, description, categorie, image_url, created_at)
where not exists (select 1 from public.realisations limit 1);
