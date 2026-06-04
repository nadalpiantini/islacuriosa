# Kling Lip-Sync — Semillas listas para cosechar 🎬

Fuzzy debe MOVER LA BOCA con sus palabras. No hay API de Kling (solo app premier),
así que aquí están TODAS las semillas listas: tú las corres en kling.ai (sembrar),
dejas caer los .mp4 en el destino, y Sephirot las cablea (cosechar).

## Base recomendada
- `fuzzy-front-talk.png` (de frente, boca visible) — súbela a Kling para el clip hablante.
- Alternativa por escena: los videos Sora ya existentes (`public/fuzzy/video/*.mp4`) como base + Lip Sync.

## Flujo en Kling.ai (por cada línea)
1. Kling AI → **Lip Sync**.
2. Base: sube `fuzzy-front-talk.png` (o el video de la escena).
3. Audio: sube el `.mp3` de la línea (carpeta `audio/`). NO uses el TTS de Kling — usa NUESTRO audio (la voz canónica de Fuzzy).
4. Genera, descarga, y guarda el resultado con el nombre exacto del destino.

## Las 5 líneas (sembrar todas)
| Línea | Audio | Escena | Guardar el .mp4 como |
|-------|-------|--------|----------------------|
| Aló / contesta | `audio/telefono.mp3` | 2 (teléfono) | `public/fuzzy/video/lipsync/lipsync-telefono.mp4` |
| Hola, ¿vienes? | `audio/saludo.mp3` | 3 (invita) | `public/fuzzy/video/lipsync/lipsync-saludo.mp4` |
| Trae merienda | `audio/chiste.mp3` | 2 (teléfono) | `public/fuzzy/video/lipsync/lipsync-chiste.mp4` |
| ¡Lo lograste! | `audio/celebra.mp3` | 4 (win) | `public/fuzzy/video/lipsync/lipsync-celebra.mp4` |
| Nos vemos en la isla | `audio/despedida.mp3` | 5 (despedida) | `public/fuzzy/video/lipsync/lipsync-despedida.mp4` |

## Cosechar (Sephirot)
Cuando dejes los .mp4 en `public/fuzzy/video/lipsync/`, avísame y los cableo:
cada escena usará el clip de Fuzzy hablando sincronizado en vez del loop genérico,
y el audio del clip se silencia (ya viene en el video) o se mantiene el mp3 + video mudo.
