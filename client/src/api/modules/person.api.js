import publicClient from "../client/public.client";

const personEndpoints = {
  detail: ({personId}) => `person/${personId}`,
  medias: ({personId}) => `person/${personId}/medias`,
};
