interface HubspotContactCreatedProperties {
  [company: string]: string;
  createdate: string;
  email: string;
  firstname: string;
  lastmodifieddate: string;
  lastname: string;
  phone: string;
  website: string;
}

export interface HubspotContactCreatedResponse {
  id: string;
  properties: HubspotContactCreatedProperties;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
}
