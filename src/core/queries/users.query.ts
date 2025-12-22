/* Query to get Users */
export const GET_USERS = `
  query Users($limit: Int) {
    users(limit: $limit) {
      id
      name
    }
  }
`;

/* Mutations to create */
export const CREATE_USER_MUTATION = `
mutation InsertUser($name: String!) {
    insert_users(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;
/* Mutations to delete users */
export const DELETE_USER_MUTATION = `
  mutation DeleteUser($id: ID!) {
    delete_users_by_pk(id: $id) {
      id
    }
  }
`;
