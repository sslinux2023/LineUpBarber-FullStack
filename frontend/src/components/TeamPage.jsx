import React from 'react';
import { useTranslation } from 'react-i18next';
import Team from './Team';


const TeamPage = () => {
  const { t } = useTranslation();

  return (
    <div className="section team-page">
      <h2>{t('team.title')}</h2>
      <p className="page-intro">{t('team.intro')}</p>
      <p className="team-subtitle">{t('team.subtitle')}</p>

      {/* existing team cards go here */}
    </div>
  );
};

export default TeamPage;
