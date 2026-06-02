<div align="center">
  <h1 style="font-size: 28px; margin: 10px 0;">GitHub Readme Stats</h1>
  <p>¡Genera estadísticas de GitHub dinámicamente en tu README!</p>
</div>

<details>
<summary>Tabla de contenidos (Clic para mostrar)</summary>

- [Tarjeta de Estadísticas de GitHub](#tarjeta-de-estadísticas-de-github)
    - [Ocultar estadísticas individuales](#ocultar-estadísticas-individuales)
    - [Mostrar estadísticas adicionales](#mostrar-estadísticas-adicionales)
    - [Mostrar iconos](#mostrar-iconos)
    - [Mostrar commits de un año específico](#mostrar-commits-de-un-año-específico)
    - [Temas](#temas)
    - [Personalización](#personalización)
- [Pines Extra de GitHub](#pines-extra-de-github)
- [Pines de GitHub Gist](#pines-de-github-gist)
- [Tarjeta de Lenguajes Principales](#tarjeta-de-lenguajes-principales)
    - [Algoritmo de estadísticas de lenguajes](#algoritmo-de-estadísticas-de-lenguajes)
    - [Layouts disponibles](#layouts-disponibles)
- [Tarjeta de Estadísticas WakaTime](#tarjeta-de-estadísticas-wakatime)
- [Desplegar por tu cuenta](#desplegar-por-tu-cuenta)
  - [GitHub Actions](#github-actions)
  - [Self-hosted (Vercel/Otros)](#self-hosted-vercelotros)
    - [Primer paso: obtener tu Personal Access Token (PAT)](#primer-paso-obtener-tu-personal-access-token-pat)
    - [En Vercel](#en-vercel)
    - [Variables de entorno disponibles](#variables-de-entorno-disponibles)
</details>

> [!NOTE]
> En todos los ejemplos de este documento, reemplaza `TU-INSTANCIA.vercel.app` por el dominio de tu propia instancia desplegada (ver [Desplegar por tu cuenta](#desplegar-por-tu-cuenta)) y `jeanpierre-max` por tu nombre de usuario de GitHub.

# Tarjeta de Estadísticas de GitHub

Copia y pega esto en tu markdown. Cambia el valor de `?username=` por tu nombre de usuario de GitHub.

```md
![GitHub stats](https://TU-INSTANCIA.vercel.app/api?username=jeanpierre-max)
```

> [!NOTE]
> Los rangos disponibles son S (top 1%), A+ (12.5%), A (25%), A- (37.5%), B+ (50%), B (62.5%), B- (75%), C+ (87.5%) y C (todos). El percentil global se calcula como una suma ponderada de percentiles para cada estadística (commits, pull requests, reviews, issues, estrellas y seguidores), basada en distribuciones exponencial y log-normal. La implementación está en [src/calculateRank.js](src/calculateRank.js). El círculo alrededor del rango muestra 100 menos el percentil global.

### Ocultar estadísticas individuales

Pasa el parámetro `&hide=` para ocultar estadísticas específicas con valores separados por comas.

> Opciones: `&hide=stars,commits,prs,issues,contribs`

```md
![GitHub stats](https://TU-INSTANCIA.vercel.app/api?username=jeanpierre-max&hide=contribs,prs)
```

### Mostrar estadísticas adicionales

Pasa el parámetro `&show=` para mostrar estadísticas adicionales con valores separados por comas.

> Opciones: `&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage`

```md
![GitHub stats](https://TU-INSTANCIA.vercel.app/api?username=jeanpierre-max&show=reviews,prs_merged)
```

### Mostrar iconos

Para activar los iconos, pasa `&show_icons=true`:

```md
![GitHub stats](https://TU-INSTANCIA.vercel.app/api?username=jeanpierre-max&show_icons=true)
```

### Mostrar commits de un año específico

Especifica un año para obtener solo los commits de ese año con `&commits_year=YYYY`:

```md
![GitHub stats](https://TU-INSTANCIA.vercel.app/api?username=jeanpierre-max&commits_year=2025)
```

### Temas

Usa el parámetro `&theme=NOMBRE_TEMA`:

```md
![GitHub stats](https://TU-INSTANCIA.vercel.app/api?username=jeanpierre-max&show_icons=true&theme=radical)
```

Hay varios temas integrados (`dark`, `radical`, `merko`, `gruvbox`, `tokyonight`, `onedark`, `cobalt`, `synthwave`, `highcontrast`, `dracula`, `midnight-purple`, etc.). Puedes ver el [archivo de configuración de temas](themes/index.js) o crear los tuyos en esa carpeta.

#### Tema responsivo a modo oscuro/claro

Como GitHub vuelve a subir las tarjetas y las sirve desde su CDN, no se puede inferir el tema del navegador en el servidor. Puedes usar las etiquetas de contexto de GitHub agregando `#gh-dark-mode-only` o `#gh-light-mode-only` al final de la URL, o el elemento HTML `<picture>` con `prefers-color-scheme`:

```html
<picture>
  <source
    srcset="https://TU-INSTANCIA.vercel.app/api?username=jeanpierre-max&show_icons=true&theme=dark"
    media="(prefers-color-scheme: dark)"
  />
  <img src="https://TU-INSTANCIA.vercel.app/api?username=jeanpierre-max&show_icons=true" />
</picture>
```

### Personalización

Puedes personalizar el aspecto de todas tus tarjetas mediante parámetros URL.

#### Opciones Comunes

| Nombre | Descripción | Tipo | Valor predeterminado |
| --- | --- | --- | --- |
| `title_color` | Color del título de la tarjeta. | string (hex) | `2f80ed` |
| `text_color` | Color del texto principal. | string (hex) | `434d58` |
| `icon_color` | Color de los iconos si están disponibles. | string (hex) | `4c71f2` |
| `border_color` | Color del borde. No aplica con `hide_border`. | string (hex) | `e4e2e2` |
| `bg_color` | Color de fondo de la tarjeta. | string (hex o degradado *ángulo,inicio,fin*) | `fffefe` |
| `hide_border` | Oculta el borde de la tarjeta. | boolean | `false` |
| `theme` | Nombre del tema. | enum | `default` |
| `cache_seconds` | Header de caché manual (mín: 21600, máx: 86400). | integer | `21600` |
| `locale` | Idioma de la tarjeta (ej. `es`). | enum | `en` |
| `border_radius` | Redondez de las esquinas. | number | `4.5` |

> [!WARNING]
> Las horas de caché por defecto son: tarjeta de estadísticas - 24h, lenguajes principales - 144h (6 días), pin - 240h (10 días), gist - 48h (2 días), wakatime - 24h. Configura la variable de entorno `CACHE_SECONDS` para cambiarlo.

##### Degradado en bg\_color

Proporciona varios valores separados por comas para renderizar un degradado:

    &bg_color=GRADOS,COLOR1,COLOR2,COLOR3...COLOR10

##### Locales disponibles

El parámetro `locale` acepta códigos como `es`, `en`, `pt-br`, `fr`, `de`, `ja`, `ru`, entre muchos otros. Consulta los locales soportados en [src/translations.js](src/translations.js).

#### Opciones Exclusivas de la Tarjeta de Estadísticas

| Nombre | Descripción | Tipo | Valor predeterminado |
| --- | --- | --- | --- |
| `hide` | Oculta los elementos especificados. | string (valores separados por comas) | `null` |
| `hide_title` | Oculta el título de la tarjeta. | boolean | `false` |
| `card_width` | Establece el ancho manualmente. | number | `500px (aprox.)` |
| `hide_rank` | Oculta el rango y redimensiona la tarjeta. | boolean | `false` |
| `rank_icon` | Icono de rango: `github`, `percentile` o `default`. | enum | `default` |
| `show_icons` | Muestra iconos junto a las estadísticas. | boolean | `false` |
| `include_all_commits` | Cuenta el total de commits en lugar de solo el año actual. | boolean | `false` |
| `line_height` | Interlineado. | integer | `25` |
| `exclude_repo` | Excluye repositorios específicos. | string (valores separados por comas) | `null` |
| `custom_title` | Título personalizado. | string | `<usuario> GitHub Stats` |
| `text_bold` | Usa texto en negrita. | boolean | `true` |
| `disable_animations` | Desactiva las animaciones. | boolean | `false` |
| `ring_color` | Color del círculo del rango. | string (hex) | `2f80ed` |
| `number_format` | Formato de valores: `short` (6.6k) o `long` (6626). | enum | `short` |
| `show` | Muestra elementos adicionales (`reviews`, `prs_merged`, etc.). | string (valores separados por comas) | `null` |
| `commits_year` | Cuenta solo commits del año especificado. | integer | `<año actual>` |

> [!WARNING]
> El título personalizado debe estar codificado en URI (ej: `Mis Stats` → `Mis%20Stats`).

***

# Pines Extra de GitHub

Permiten fijar más de 6 repositorios en tu perfil.

Endpoint: `api/pin?username=jeanpierre-max&repo=nombre-repo`

```md
![Readme Card](https://TU-INSTANCIA.vercel.app/api/pin/?username=jeanpierre-max&repo=nombre-repo)
```

| Nombre | Descripción | Tipo | Valor predeterminado |
| --- | --- | --- | --- |
| `show_owner` | Muestra el nombre del propietario del repo. | boolean | `false` |
| `description_lines_count` | Número de líneas para la descripción (1 a 3). | number | `null` |

# Pines de GitHub Gist

Permiten fijar gists en tu perfil.

Endpoint: `api/gist?id=ID_DEL_GIST`

```md
![Gist Card](https://TU-INSTANCIA.vercel.app/api/gist?id=ID_DEL_GIST)
```

| Nombre | Descripción | Tipo | Valor predeterminado |
| --- | --- | --- | --- |
| `show_owner` | Muestra el nombre del propietario del gist. | boolean | `false` |

# Tarjeta de Lenguajes Principales

Muestra los lenguajes más usados.

Endpoint: `api/top-langs?username=jeanpierre-max`

```md
![Top Langs](https://TU-INSTANCIA.vercel.app/api/top-langs/?username=jeanpierre-max)
```

| Nombre | Descripción | Tipo | Valor predeterminado |
| --- | --- | --- | --- |
| `hide` | Oculta los lenguajes especificados. | string (valores separados por comas) | `null` |
| `hide_title` | Oculta el título. | boolean | `false` |
| `layout` | `normal`, `compact`, `donut`, `donut-vertical` o `pie`. | enum | `normal` |
| `card_width` | Ancho de la tarjeta. | number | `300` |
| `langs_count` | Número de lenguajes (1 a 20). | integer | `5`/`6` |
| `exclude_repo` | Excluye repositorios. | string (valores separados por comas) | `null` |
| `custom_title` | Título personalizado. | string | `Most Used Languages` |
| `hide_progress` | Layout compacto, oculta porcentajes y barras. | boolean | `false` |
| `size_weight` | Peso del tamaño en el algoritmo. | integer | `1` |
| `count_weight` | Peso del conteo en el algoritmo. | integer | `0` |
| `stats_format` | `percentages` o `bytes`. | enum | `percentages` |

> [!WARNING]
> Esta tarjeta muestra el uso de lenguajes solo en tus repositorios propios no forkeados, y solo de los primeros 100 repositorios (limitación de la API de GitHub).

### Algoritmo de estadísticas de lenguajes

```js
ranking_index = (byte_count ^ size_weight) * (repo_count ^ count_weight)
```

Por defecto solo se usa el conteo de bytes (`size_weight=1`, `count_weight=0`). Ejemplos:

*   `&size_weight=1&count_weight=0` — *(predeterminado)* Ordena por bytes
*   `&size_weight=0.5&count_weight=0.5` — *(recomendado)* Usa bytes y conteo de repos
*   `&size_weight=0&count_weight=1` — Ordena por conteo de repos

### Layouts disponibles

```md
![Top Langs](https://TU-INSTANCIA.vercel.app/api/top-langs/?username=jeanpierre-max&layout=compact)
![Top Langs](https://TU-INSTANCIA.vercel.app/api/top-langs/?username=jeanpierre-max&layout=donut)
![Top Langs](https://TU-INSTANCIA.vercel.app/api/top-langs/?username=jeanpierre-max&layout=pie)
```

# Tarjeta de Estadísticas WakaTime

> [!WARNING]
> Solo se muestran datos de perfiles de WakaTime públicos. Activa ambas opciones en WakaTime: `Display code time publicly` y `Display languages, editors, os, categories publicly`.

Endpoint: `api/wakatime?username=TU_USUARIO_WAKATIME`

```md
![WakaTime stats](https://TU-INSTANCIA.vercel.app/api/wakatime?username=tu_usuario)
```

| Nombre | Descripción | Tipo | Valor predeterminado |
| --- | --- | --- | --- |
| `hide` | Oculta los lenguajes especificados. | string (valores separados por comas) | `null` |
| `hide_title` | Oculta el título. | boolean | `false` |
| `card_width` | Ancho de la tarjeta. | number | `495` |
| `line_height` | Interlineado. | integer | `25` |
| `hide_progress` | Oculta la barra de progreso y el porcentaje. | boolean | `false` |
| `custom_title` | Título personalizado. | string | `WakaTime Stats` |
| `layout` | `default` o `compact`. | enum | `default` |
| `langs_count` | Limita el número de lenguajes. | integer | `null` |
| `api_domain` | Dominio de API personalizado (debe ser un dominio válido). | string | `wakatime.com` |
| `display_format` | `time` o `percent`. | enum | `time` |

***

# Desplegar por tu cuenta

Hay dos formas recomendadas: GitHub Actions (SVGs estáticos en tu repo, más simple) o self-hosting (Vercel u otro, estadísticas más frescas con caché).

## GitHub Actions

Genera SVGs estáticos y evita llamadas a la API por solicitud. Crea `/.github/workflows/grs.yml` en tu repositorio de perfil (`USUARIO/USUARIO`):

```yaml
name: Actualizar tarjetas del README

on:
  schedule:
    - cron: "0 3 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Generar tarjeta de estadísticas
        uses: readme-tools/github-readme-stats-action@v1
        with:
          card: stats
          options: username=${{ github.repository_owner }}&show_icons=true
          path: profile/stats.svg
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Hacer commit de las tarjetas
        run: |
          git config user.name "github-actions"
          git config user.email "github-actions@users.noreply.github.com"
          git add profile/*.svg
          git commit -m "Actualizar tarjetas del README" || exit 0
          git push
```

Luego incrusta desde tu README de perfil:

```md
![Stats](./profile/stats.svg)
```

## Self-hosted (Vercel/Otros)

Ejecutar tu propia instancia evita los límites de tasa públicos y da control total sobre caché, tokens y estadísticas privadas.

### Primer paso: obtener tu Personal Access Token (PAT)

Necesitas crear un GitHub Personal Access Token (PAT).

#### Token Clásico

* Ve a [Settings → Developer Settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens).
* `Generate new token → Generate new token (classic)`.
* Permisos: `repo` y `read:user`.
* `Generate token` y cópialo.

#### Token de Granularidad Fina

> [!WARNING]\
> Esto limita el alcance a issues en tus repositorios e incluye solo commits públicos.

* Ve a [Settings → Developer Settings → Personal access tokens → Fine-grained tokens](https://github.com/settings/tokens).
* Permisos (read-only): Commit statuses, Contents, Issues, Metadata, Pull requests.

### En Vercel

Como la API de GitHub solo permite 5k solicitudes por hora, alojar tu propia instancia evita alcanzar el límite.

> [!NOTE]
> En el plan Pro de Vercel puedes aumentar `maxDuration` en [vercel.json](vercel.json) cuando la instancia supera el tiempo límite. Mantenlo por debajo de `30` segundos para evitar uso excesivo de memoria.

1.  Crea una cuenta en [vercel.com](https://vercel.com/).
2.  Importa este repositorio como un nuevo proyecto.
3.  Crea un Personal Access Token (PAT) como se describe arriba.
4.  Agrega el PAT como variable de entorno con el nombre `PAT_1`.
5.  Haz deploy. Usa el dominio resultante como tu instancia (`TU-INSTANCIA.vercel.app`).

### Variables de entorno disponibles

| Nombre | Descripción | Valores soportados |
| --- | --- | --- |
| `CACHE_SECONDS` | Duración del caché en segundos. Tiene precedencia sobre los valores por defecto. | Entero positivo o `0` para desactivar |
| `WHITELIST` | Usuarios de GitHub permitidos. Si no se establece, todos tienen acceso. | Nombres separados por comas |
| `GIST_WHITELIST` | IDs de Gist permitidos. Si no se establece, todos están permitidos. | IDs separados por comas |
| `EXCLUDE_REPO` | Repositorios excluidos de las tarjetas sin exponer sus nombres en URLs. | Nombres separados por comas |
| `FETCH_MULTI_PAGE_STARS` | Obtiene todos los repos con estrellas para conteos precisos (>100 repos). | `true` o `false` |

> [!WARNING]
> Recuerda redesplegar tu instancia después de cambiar las variables de entorno.

***

Hecho con JavaScript.
