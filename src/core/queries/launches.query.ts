export const GET_LAUNCHES = `
  query Launches($limit: Int, $launch_year: String, $launch_success: String) {
    launchesPast(limit: $limit, find: { launch_year: $launch_year, launch_success: $launch_success }) {
      id
      mission_name
      launch_year
      launch_success
      details
      links {
        flickr_images
      }
    }
  }
`;