# launchdg.com

Website for Launch Development Group. Plain HTML and one stylesheet, no build step.

```
index.html        Home
hangars.html      Projects: Falcon Field, Provo, Sugar Land
who-we-are.html   Founders and partners
contact.html      Contact details and form
assets/site.css   All styles (brand colors are at the top)
vercel.json       Serves /hangars instead of /hangars.html
```

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import this GitHub repo.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Deploy. Every push to the default branch redeploys the site.

## Point launchdg.com at Vercel

In the Vercel project, open **Settings → Domains** and add `launchdg.com` and `www.launchdg.com`.
Vercel then shows the exact records to create. They are usually:

| Type  | Name  | Value                  |
|-------|-------|------------------------|
| A     | @     | 76.76.21.21            |
| CNAME | www   | cname.vercel-dns.com   |

Add those at your domain registrar (or wherever the DNS is hosted), and delete any old A or CNAME
records for `@` and `www` that point at the current site builder.

Leave the MX, SPF (TXT) and DKIM records alone. They handle the @launchdg.com email addresses, and
changing them would interrupt email.

## Still to do

- Founder headshots: put them in `assets/` and replace the initials in the `.portrait` blocks on
  `who-we-are.html` with `<img>` tags.
- Hangar renderings and photos of the Provo hangar.
- Connect the contact form to a form service (for example Formspree). For now it opens the
  visitor's email app.
