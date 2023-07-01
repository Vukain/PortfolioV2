export const timelineKiller = (timelines: gsap.core.Timeline[]) => {
  for (const timeline of timelines) {
    timeline.kill();
  }
};
