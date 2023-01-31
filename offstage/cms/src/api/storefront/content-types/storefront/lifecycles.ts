// import chartingRules from '@/jollyRoger/collections/pdp/chartingRules';

const {uid} = require('uid/secure');

const cmsIdPrefix = 'st';

export default {
  beforeCreate(event) {
    const eventData = event.params.data;

    event.params.data.cmsId = `${cmsIdPrefix}-${uid(4)}`;
    event.params.data.baseUrl = eventData?.baseUrl?.toLowerCase().trim();
    event.params.data.name = eventData?.name?.trim();
    event.params.data.slug = eventData?.slug?.trim();
  },

  async beforeUpdate(event) {
    const {id: cmsId} = event.params.where;
    const eventData = event.params.data;

    event.params.data.cmsId = eventData?.cmsId || `${cmsIdPrefix}-${uid(4)}`;
    event.params.data.baseUrl = eventData?.baseUrl?.toLowerCase().trim();
    event.params.data.name = eventData?.name?.trim();
    event.params.data.slug = eventData?.slug?.trim();

    // Cleanup chartingRules
    // if (chartingRules?.cmsId) {
    //   await chartingRules('brand', cmsId, chartingRules?.cmsId);
    // }
  },
};
