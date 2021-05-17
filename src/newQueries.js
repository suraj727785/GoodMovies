export const listUserFriends = /* GraphQL */ `
  query ListUserFriends(
    $filter: ModelUserFriendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        friendUserID
        name
        email
        mobileNo
        review {
            items {
            id
            movieID
            userID
            rating
            }
        }
        movie {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;