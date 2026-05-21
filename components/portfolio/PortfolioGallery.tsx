'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Project = {
  id: number;
  title: string;
  type: 'facade' | 'scaffolding';
  location: 'copenhagen' | 'aarhus';
  image: string;
  description: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Premium Facade Campaign',
    type: 'facade',
    location: 'copenhagen',
    image: '/api/placeholder/800/600',
    description: 'High-visibility facade advertising in central Copenhagen',
  },
  {
    id: 2,
    title: 'Scaffolding Banner Campaign',
    type: 'scaffolding',
    location: 'aarhus',
    image: '/api/placeholder/800/600',
    description: 'Large-format scaffolding advertising in Århus city center',
  },
  {
    id: 3,
    title: 'Urban Facade Display',
    type: 'facade',
    location: 'copenhagen',
    image: '/api/placeholder/800/600',
    description: 'Strategic facade placement for maximum visibility',
  },
  {
    id: 4,
    title: 'Construction Site Advertising',
    type: 'scaffolding',
    location: 'aarhus',
    image: '/api/placeholder/800/600',
    description: 'Long-term scaffolding campaign in prime location',
  },
  {
    id: 5,
    title: 'City Center Facade',
    type: 'facade',
    location: 'copenhagen',
    image: '/api/placeholder/800/600',
    description: 'Premium facade location in Copenhagen city center',
  },
  {
    id: 6,
    title: 'High-Traffic Scaffolding',
    type: 'scaffolding',
    location: 'aarhus',
    image: '/api/placeholder/800/600',
    description: 'High-impact scaffolding advertising in Århus',
  },
];

export default function PortfolioGallery() {
  const t = useTranslations('portfolio');
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = [
    { key: 'all', label: t('filter.all') },
    { key: 'facade', label: t('filter.facade') },
    { key: 'scaffolding', label: t('filter.scaffolding') },
    { key: 'copenhagen', label: t('filter.copenhagen') },
    { key: 'aarhus', label: t('filter.aarhus') },
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.type === filter || project.location === filter;
  });

  return (
    <>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {filters.map((filterOption) => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key)}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
              filter === filterOption.key
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-12 text-center text-gray-500">{t('noProjects')}</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer overflow-hidden rounded-lg bg-gray-100 shadow-md transition-transform hover:scale-105"
            >
              <div className="relative aspect-[4/3] bg-gray-200">
                <div className="flex h-full items-center justify-center text-6xl">
                  {project.type === 'facade' ? '🏢' : '🏗️'}
                </div>
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{project.description}</p>
                <p className="mt-2 text-xs text-primary-600">
                  {project.location === 'copenhagen' ? 'Copenhagen' : 'Århus'} • {project.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="max-w-4xl rounded-lg bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mb-4 aspect-video bg-gray-200">
              <div className="flex h-full items-center justify-center text-8xl">
                {selectedProject.type === 'facade' ? '🏢' : '🏗️'}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
            <p className="mt-2 text-gray-600">{selectedProject.description}</p>
            <button
              onClick={() => setSelectedProject(null)}
              className="mt-4 rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
