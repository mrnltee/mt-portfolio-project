"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motion as mtMotion } from "@mt/tokens/motion";
import { ProjectCard } from "./project-card";
import { FilterTag } from "@/components/ui/tag";
import { CATEGORIES } from "@/lib/projects-data";
import type { CaseStudy, Category } from "@/types/project";

type SortOrder = "featured" | "az";

export function ProjectGrid({ projects }: { projects: CaseStudy[] }) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [sort, setSort] = useState<SortOrder>("featured");

  // Only surface categories at least one project uses, kept in canonical order.
  const categories = useMemo(
    () => CATEGORIES.filter((c) => projects.some((p) => p.category === c)),
    [projects],
  );

  const visible = useMemo(() => {
    const list = activeCategory ? projects.filter((p) => p.category === activeCategory) : [...projects];
    if (sort === "az") {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    // "Featured" — flagged projects first, otherwise the authored order in projects-data.ts.
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [projects, activeCategory, sort]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          <FilterTag active={activeCategory === null} onClick={() => setActiveCategory(null)}>
            All
          </FilterTag>
          {categories.map((category) => (
            <FilterTag
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory((prev) => (prev === category ? null : category))}
            >
              {category}
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
