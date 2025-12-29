export const GET_SHIPS = `
  query Ships($limit: Int) {
    ships(limit: $limit) {
      id
      name
      type
      home_port
      status
      speed_kn
      course_deg
      position {
        latitude
        longitude
      }
      successful_landings
      attempted_landings
      missions {
        name
        flight
      }
      url
      image
    }
  }
`;