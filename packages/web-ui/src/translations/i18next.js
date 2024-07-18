import i18next from 'i18next';

import common_en_ca from './en-CA/common.json';
import settings_en_ca from './en-CA/settings.json';
import common_en_gb from './en-GB/common.json';
import settings_en_gb from './en-GB/settings.json';
import auth_en from './en/auth.json';
import common_en from './en/common.json';
import dashboard_en from './en/dashboard.json';
import integrations_en from './en/integrations.json';
import reports_en from './en/reports.json';
import requests_en from './en/requests.json';
import settings_en from './en/settings.json';
import systems_en from './en/systems.json';
import users_en from './en/users.json';

// todo lazy load with loadable modules

i18next.init({
  interpolation: { escapeValue: false },
  lng: navigator.language,
  fallbackLng: 'en',
  resources: {
    'en': {
      auth: auth_en,
      common: common_en,
      dashboard: dashboard_en,
      integrations: integrations_en,
      settings: settings_en,
      systems: systems_en,
      requests: requests_en,
      users: users_en,
      reports: reports_en,
    },
    'en-CA': {
      settings: settings_en_ca,
      common: common_en_ca,
    },
    'en-GB': {
      settings: settings_en_gb,
      common: common_en_gb,
    },
  },
});

export default i18next;
