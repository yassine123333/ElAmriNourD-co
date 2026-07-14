# Nour Amri Deco

Site vitrine professionnel pour un atelier tunisien de decoration en platre.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres) pour les metadonnees
- Cloudinary pour l'upload et le service des images
- Deploiement cible: Vercel

## Fonctionnalites

- Pages publiques:
	- Accueil
	- Galerie avec filtres par categorie
	- A propos
	- Contact
- API:
	- POST /api/contact
	- GET, POST /api/realisations
	- DELETE /api/realisations/[id]
	- POST /api/upload
- Admin:
	- Espace /admin protege par mot de passe simple via header x-admin-password
	- Upload image vers Cloudinary
	- Ajout et suppression de realisations

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Puis ouvrez http://localhost:3000

## Variables d'environnement

Voir le fichier .env.example.

Variables requises:

- SUPABASE_DB_URL
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- ADMIN_PASSWORD

SUPABASE_DB_URL est la chaine de connexion Postgres complete (Connection string), pas l'URL projet https://...supabase.co.

## Schema Supabase

Initialisation recommandee en une seule etape:

1. Renseigner SUPABASE_DB_URL dans .env.local.
2. Lancer npm run supabase:bootstrap.

Le script cree les tables, indexes et injecte un seed initial seulement si la table realisations est vide.
Pour un workflow Supabase CLI, le meme script existe aussi dans supabase/migrations/202607130001_init_schema_seed.sql.

### Table realisations

- id uuid primary key default gen_random_uuid()
- titre text not null
- description text not null
- categorie text not null
- image_url text not null
- created_at timestamp with time zone default now()

### Table messages (optionnelle)

- id uuid primary key default gen_random_uuid()
- nom text not null
- telephone text not null
- message text not null
- created_at timestamp with time zone default now()

## Deploiement Vercel

Le pipeline est compose de deux parties : GitHub Actions valide chaque pull request et chaque push sur `main`, puis Vercel realise le deploiement.

1. Pousser le projet sur GitHub, avec `main` comme branche de production.
2. Dans Vercel, importer le depot GitHub et conserver les reglages detectes pour Next.js.
3. Dans **Settings > Environment Variables**, ajouter les variables du fichier `.env.example` pour les environnements **Production**, **Preview** et **Development** :
   - `SUPABASE_DB_URL`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `ADMIN_PASSWORD`
4. Dans **Settings > Git**, verifier que la branche de production est `main`.
5. Lancer le premier deploiement.

Chaque pull request cree un deploiement Preview. Chaque push sur `main` execute la verification CI puis declenche un deploiement Production via l'integration Git de Vercel.

`SUPABASE_DB_URL` est un secret serveur : ne le prefixez jamais par `NEXT_PUBLIC_` et ne le commitez pas dans Git.
