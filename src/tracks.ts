/**
 * Track registry — the single place a tech stack is defined.
 *
 * Adding a new tech stack to the catalog:
 *   1. Append an entry here (id is the URL segment and frontmatter value).
 *   2. Set `track: <id>` in the new scenario's markdown file.
 * The Zod schema, catalog sections, and /scenarios/track/<id>/ pages all
 * derive from this constant.
 */
export const TRACKS = [
  {
    id: 'dotnet-backend',
    label: '.NET Backend',
    blurb: 'Extend and debug realistic ASP.NET Core APIs.',
    order: 1,
  },
] as const;

export type Track = (typeof TRACKS)[number];
export type TrackId = Track['id'];

export const TRACK_IDS = TRACKS.map((t) => t.id) as [TrackId, ...TrackId[]];

export function trackById(id: TrackId): Track {
  const track = TRACKS.find((t) => t.id === id);
  if (!track) throw new Error(`Unknown track: ${id}`);
  return track;
}
