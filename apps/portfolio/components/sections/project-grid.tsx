"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motion as mtMotion } from "@mt/tokens/motion";
import { ProjectCard } from "./project-card";
import { FilterTag } from "@/components/ui/tag";
import { getAllTags } from "@/lib/projects-data";
import type { CaseStudy } from "@/types/project";

type SortOrder = "featured" | "az";

export function ProjectGrid({ projects }: { projects: CaseStudy[] }) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOrder>("featured");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => getAllTags(p).forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const visible = useMemo(() => {
    let list = projects;
    if (activeTags.length > 0) {
      list = list.filter((p) => getAllTags(p).some((t) => activeTags.includes(t)));
    }
    if (sort === "az") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [projects, activeTags, sort]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by role, tool, or type">
          <FilterTag active={activeTags.length === 0} onClick={() => setActiveTags([])}>
            All
          </FilterTag>
          {allTags.map((tag) => (
            <FilterTag key={tag} active={activeTags.includes(tag)} onClick={() => toggleTag(tag)}>
              {tag}
            </FilterTag>
          ))}
        </div>

        <label className="flex items-center gap-2 text-caption text-text-secondary">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOrder)}
            className="focus-ring rounded-field border border-border-default bg-background-surface px-2 py-1.5 text-caption text-text-primary"
          >
            <option value="featured">Featured</option>
            <option value="az">A–Z</option>
          </select>
        </label>
      </div>

      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: mtMotion.easing.standard }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-body text-text-secondary">No projects match the selected filters.</p>
      )}
    </div>
  );
}
