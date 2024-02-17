interface HubspotCompanyCreatedProperties {
  [city: string]: string;
  createdate: string;
  domain: string;
  hs_lastmodifieddate: string;
  industry: string;
  name: string;
  phone: string;
  state: string;
}

export interface HubspotCompanyCreatedResponse {
  id: string;
  properties: HubspotCompanyCreatedProperties;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
}
