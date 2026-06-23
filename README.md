<div align="center">

# &lt;tklmn /&gt;

### Personal site & blog of **Tom Kilimann** — Full-Stack Web Developer

[![Live Site](https://img.shields.io/badge/live-tklmn.github.io-2547c9?style=for-the-badge&logo=githubpages&logoColor=white)](https://tklmn.github.io)
[![Deploy](https://img.shields.io/github/deployments/tklmn/tklmn.github.io/github-pages?style=for-the-badge&label=deploy&logo=github)](https://github.com/tklmn/tklmn.github.io/deployments)
[![License: MIT](https://img.shields.io/badge/license-MIT-22c55e?style=for-the-badge)](LICENSE)

<br />

![Jekyll](https://img.shields.io/badge/Jekyll-CC0000?style=flat-square&logo=jekyll&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222?style=flat-square&logo=githubpages&logoColor=white)

</div>

---

## ✨ Features

| | |
|---|---|
| 🎨 | **Modern, minimal design** with light & dark theme toggle |
| 🔌 | **Live GitHub projects** — pulled straight from the GitHub API, zero maintenance |
| ✍️ | **Markdown blog** — write a file, push, done |
| 🌗 | Theme preference remembered across visits |
| ⚡ | Fully static — no backend, no database |
| 📱 | Responsive & accessible (reduced-motion aware) |

---

## 🗂️ Project structure

```
tklmn.github.io/
├── _config.yml          # ⚙️ Site config (title, GitHub user, sections, default_lang)
├── _data/
│   ├── i18n/             # 🌍 One folder per language — auto-discovered
│   │   ├── en/           #    English (default): content, profile, skills, timeline
│   │   └── de/           #    German — add a folder to add a language
│   └── social_icons.yml # 🌐 Icon + label registry for social platforms (language-neutral)
├── _layouts/            # 🧱 default.html · post.html
├── _includes/           # 🔧 head · nav · footer · social
├── _posts/              # 📝 Blog posts (Markdown)
├── assets/
│   ├── css/main.css     # 🎨 Styles (light + dark)
│   ├── js/main.js       # ⚙️ Theme toggle · reveal · GitHub import
│   └── img/             # 🖼️ Images
└── index.html           # 🏠 Home (all sections)
```

> 💡 **Everything visible on the site is data-driven.** You should almost never
> need to touch `index.html` or the `_includes/` — edit the `_data/*.yml` files.

---

## 🔌 How projects are loaded

Projects are **not** stored in this repo. On page load, `assets/js/main.js` fetches
the public repositories of the user configured in `_config.yml` and renders them:

```yaml
# _config.yml
github_username: tklmn
projects:
  hide:                 # repos to never show
    - tklmn.github.io
  max: 12               # maximum number of cards
```

- ⛔ Forks, archived and private repos are filtered out
- ⭐ Sorted by stars, then most recently updated
- 🔄 New repos appear automatically — nothing to edit here

---

## ✍️ Writing a blog post

Create `_posts/YYYY-MM-DD-title.md`:

```markdown
---
title: "My post title"
date: 2026-06-23
description: "Short summary for previews and SEO."
---

Write your post in **Markdown** here.
```

Commit & push — GitHub Pages rebuilds the site automatically. 🚀
The newest posts show on the home page, and each gets its own page at `/blog/title/`.

---

## 🛠️ Where to edit what

> 🌍 All text lives **per language** under `_data/i18n/<code>/`. Paths below use
> `en` (the default) as an example — edit the matching file in each language folder.

| Want to change… | File | Key |
|---|---|---|
| 👤 Name, greeting, role, bio, lede | `_data/i18n/en/profile.yml` | `name`, `greeting`, `role`, `bio`, `lede` |
| 📊 Stats (the big numbers) | `_data/i18n/en/profile.yml` | `stats` |
| 📍 Location & email | `_data/i18n/en/profile.yml` | `location`, `email` |
| 🌐 Social links | `_data/i18n/en/profile.yml` | `social` |
| 🧩 Skills, categories & levels | `_data/i18n/en/skills.yml` | — |
| 📅 Career timeline | `_data/i18n/en/timeline.yml` | — |
| 🔤 Nav brand + menu labels | `_data/i18n/en/content.yml` | `nav` |
| 🔤 Section headings, eyebrows, buttons | `_data/i18n/en/content.yml` | `hero`, `about`, `skills`, … |
| ➕ Add / remove a language | `_data/i18n/` | one folder per language |
| 🌍 Default language | `_config.yml` | `default_lang` |
| 🔀 Turn whole sections on/off | `_config.yml` | `sections` |
| 🔌 GitHub user & project rules | `_config.yml` | `github_username`, `projects` |
| 🏠 Posts shown on the home page | `_config.yml` | `home_posts` |
| 🎨 Colors & styling | `assets/css/main.css` | CSS variables at top |

---

## 🌍 Languages (i18n)

The site is multilingual and **convention-based** — there is no language list to
maintain. Every translatable string lives under `_data/i18n/<code>/`:

```
_data/i18n/
├── en/   ← default language (content.yml, profile.yml, skills.yml, timeline.yml)
└── de/   ← German
```

**To add a language** (e.g. French): copy the whole `en` folder to `fr` and
translate the values. That's it — `fr` is auto-discovered, a “Français” entry
appears in the language switcher, and the site offers it automatically.

```bash
cp -r _data/i18n/en _data/i18n/fr   # then translate the YAML inside
```

- The native name shown in the switcher comes from `lang_name` in that folder's
  `content.yml` (falls back to the code in CAPS, e.g. `FR`).
- The **default language** (rendered server-side for SEO / no-JS) is set with
  `default_lang` in `_config.yml`.
- The site always starts in the **default language**; only a language the visitor
  explicitly picked is remembered (browser language is not auto-detected).
  Switching is instant (client-side, no reload).
- Keep the **same structure** (item counts/order in `stats`, `timeline`, `skills`)
  across languages — only the text is swapped per key.
- `email`, `social` URLs and icons are language-neutral; leave them identical in
  every folder.

> Blog posts are written in a single language (their own Markdown file). The site
> chrome (nav, buttons, headings) translates everywhere.

---

## 👤 Profile & stats

`_data/i18n/<lang>/profile.yml` drives the hero and about section:

```yaml
greeting: "Hello, I'm"
name: Tom Kilimann
role: Full-Stack Web Developer
lede: >-          # short hero intro
  I build exceptional digital experiences...
bio: >-           # longer about paragraph
  I am a passionate full-stack developer...

stats:            # the big numbers — add/remove freely, or leave empty to hide
  - { value: "15+",  label: Years Experience }
  - { value: "100+", label: Projects Completed }

location: Munich, Germany
email: tkilimann@icloud.com
```

---

## 🌐 Social links (fully dynamic)

Social links are a **list** — add, remove or reorder as many as you like. They
render automatically in both the hero and the footer.

```yaml
# _data/i18n/<lang>/profile.yml
social:
  - platform: github
    url: https://github.com/tklmn
  - platform: linkedin
    url: https://www.linkedin.com/in/tklmn

social_show_email: true   # also show the email address as an icon
```

- `platform` looks up the **icon + label** in `_data/social_icons.yml`.
- Known platforms out of the box: `github`, `gitlab`, `linkedin`, `x`, `mastodon`,
  `bluesky`, `instagram`, `facebook`, `youtube`, `twitch`, `discord`, `telegram`,
  `codepen`, `dribbble`, `behance`, `stackoverflow`, `devto`, `medium`, `website`.

**Adding a brand-new platform?** Either register it once in `_data/social_icons.yml`:

```yaml
# _data/social_icons.yml  →  key = the platform name you use above
threads: { icon: "simple-icons:threads", label: Threads }
```

…or override per-entry directly in `profile.yml` (no registry edit needed):

```yaml
  - platform: custom
    url: https://example.com
    icon: "ph:globe-bold"     # any Iconify icon name
    label: My Website
```

> Icons use [Iconify](https://icon-sets.iconify.design) — search there for any
> `simple-icons:*` (brands) or `ph:*` (Phosphor) name.

---

## 📅 Career timeline

Each entry is one block in `_data/i18n/<lang>/timeline.yml`:

```yaml
- period: "2026 — Present"
  role: Team Leader Web Development
  org: Kufer Software GmbH
```

Add a new entry by copying a block. **Leave the file empty** and the about
section automatically collapses to a single column (the “Journey” column hides).

---

## 🧩 Skills

`_data/i18n/<lang>/skills.yml` is a list of categories, each with items:

```yaml
- category: Frontend
  items:
    - { name: JavaScript, level: 90, icon: "simple-icons:javascript" }
    - { name: React,      level: 80, icon: "simple-icons:react" }
```

`level` (0–100) draws the progress bar; omit it to show just the name. `icon` is
optional. The whole section hides automatically when the file is empty.

---

## 🔤 Labels & section headings

Every heading, eyebrow, button and the nav lives in `_data/i18n/<lang>/content.yml`
— no HTML editing needed:

```yaml
nav:
  brand: "<tklmn />"   # shown top-left; rendered as plain text
  about: "About"
  skills: "Skills"
  # …one label per section

about:
  eyebrow: "About Me"
  heading: "Who am I?"
  journey_heading: "My Journey"
```

---

## 🔀 Enabling / disabling sections

Toggle whole sections in `_config.yml` — the matching nav links disappear too:

```yaml
sections:
  about: true
  skills: true
  projects: true
  blog: true
  contact: true
```

Data-driven blocks (skills, timeline, stats) also hide automatically when their
data is empty, so you rarely need to flip these by hand.

---

## 💻 Local development

```bash
bundle install
bundle exec jekyll serve
# → http://localhost:4000
```

> [!NOTE]
> GitHub Pages builds with its own `github-pages` gem in **safe mode**.
> Don't add the `paginate` key to `_config.yml` — `jekyll-paginate` is auto-loaded
> and crashes the build even when set to `false`.

---

## 📄 License

Released under the [MIT License](LICENSE) — © 2026 Tom Kilimann.

<div align="center">

Made with ☕ and a lot of `git push` by **[Tom Kilimann](https://github.com/tklmn)**

</div>
