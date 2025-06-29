interface BaseProfile {
  userId: string;
  name: string;
}

interface AgentProfile extends BaseProfile {
  role: "agent";
  partner?: undefined;
}

interface PartnerAgentProfile extends BaseProfile {
  role: "partner_agent";
  partner: string;
}

export type Profile = AgentProfile | PartnerAgentProfile;
