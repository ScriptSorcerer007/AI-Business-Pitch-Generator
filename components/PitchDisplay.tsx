
import React from 'react';
import { PitchData } from '../types';
import { BulletIcon, CompetitorIcon, LightbulbIcon, MoneyIcon, PresentationIcon, QuoteIcon, TagIcon } from './icons';

interface PitchDisplayProps {
  data: PitchData;
}

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children }) => (
  <div className="bg-slate-900/50 p-6 rounded-lg ring-1 ring-slate-700/50 backdrop-blur-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-purple-400">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-200">{title}</h3>
    </div>
    <div className="text-slate-300 space-y-2">{children}</div>
  </div>
);

export const PitchDisplay: React.FC<PitchDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <InfoCard title="Tagline" icon={<TagIcon />}>
        <p className="text-2xl font-bold text-center italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 py-2">
          "{data.tagline}"
        </p>
      </InfoCard>

      <InfoCard title="Elevator Pitch" icon={<QuoteIcon />}>
        <p className="leading-relaxed">{data.elevator_pitch}</p>
      </InfoCard>
      
      <InfoCard title="Unique Value Proposition" icon={<LightbulbIcon />}>
        <p className="leading-relaxed">{data.value_proposition}</p>
      </InfoCard>
      
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Core Deck Slides" icon={<PresentationIcon />}>
          <ul className="list-none space-y-2">
            {data.slide_bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-purple-400 pt-1"><BulletIcon /></span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Suggested Slide Titles" icon={<PresentationIcon />}>
          <ul className="list-none space-y-2">
            {data.suggested_pitch_slide_titles.map((title, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-purple-400 pt-1"><BulletIcon /></span>
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </InfoCard>
      </div>

      <InfoCard title="Potential Competitors" icon={<CompetitorIcon />}>
        <ul className="list-none space-y-2">
          {data.competitors.map((competitor, index) => (
            <li key={index} className="flex items-start gap-2">
               <span className="text-purple-400 pt-1"><BulletIcon /></span>
              <span>{competitor}</span>
            </li>
          ))}
        </ul>
      </InfoCard>

      <InfoCard title="Revenue Models" icon={<MoneyIcon />}>
        <ul className="list-none space-y-2">
          {data.revenue_models.map((model, index) => (
            <li key={index} className="flex items-start gap-2">
               <span className="text-purple-400 pt-1"><BulletIcon /></span>
              <span>{model}</span>
            </li>
          ))}
        </ul>
      </InfoCard>
    </div>
  );
};
