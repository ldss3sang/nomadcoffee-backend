import { gql } from "apollo-server";
export default gql`
  scalar Upload
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      username: String
      email: String
      name: String
      password: String
      location: String
      avatarURL: Upload
      githubUsername: String
    ): EditProfileResult!
  }
`;
