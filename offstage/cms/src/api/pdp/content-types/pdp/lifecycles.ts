const {uid} = require('uid/secure');

export default {
  beforeCreate(event) {
    event.params.data.cmsId = `pd-${uid(6)}`; // Set cmsId
  },

  beforeUpdate(event) {
    const {cmsId} = event.params.data;
    if (!cmsId) {
      event.params.data.cmsId = `pd-${uid(6)}`; // Set cmsId
    }
  },
};
