import type { CollectionEntry } from 'astro:content';
import { TRACKS, type Track } from '../tracks';

export interface TrackSection {
  track: Track;
  scenarios: CollectionEntry<'scenarios'>[];
}

/** "~1.5 h" for a scenario; "~75 min" for a problem set, which is planned in minutes. */
export function timeLabel(
  estimatedMinutes: number,
  format: 'scenario' | 'problem-set',
): string {
  if (format === 'problem-set') return `~${estimatedMinutes} min`;
  return `~${(estimatedMinutes / 60).toFixed(1).replace(/\.0$/, '')} h`;
}

/**
 * Group published scenarios into per-track sections, tracks in registry
 * order, scenarios by frontmatter order; empty tracks are dropped.
 */
export function groupScenariosByTrack(
  scenarios: CollectionEntry<'scenarios'>[],
): TrackSection[] {
  return TRACKS.map((track) => ({
    track,
    scenarios: scenarios
      .filter((scenario) => scenario.data.track === track.id)
      .sort((a, b) => a.data.order - b.data.order),
  })).filter((section) => section.scenarios.length > 0);
}
