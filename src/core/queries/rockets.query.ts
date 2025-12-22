export const GET_ROCKETS = `
  query Rockets($limit: Int) {
    rockets(limit: $limit) {
      id
      name
      active
      stages
      boosters
      cost_per_launch
      success_rate_pct
      first_flight
      description
    }
  }
`;