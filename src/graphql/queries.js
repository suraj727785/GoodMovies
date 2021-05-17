/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      mobileNo
      userFriend {
        items {
          id
          userID
          friendUserID
          name
          email
          mobileNo
          createdAt
          updatedAt
        }
        nextToken
      }
      review {
        items {
          id
          userID
          movieID
          userName
          reviewContent
          rating
          comedy
          romance
          Action
          Thrill
          Drama
          horror
          createdAt
          updatedAt
        }
        nextToken
      }
      movie {
        items {
          id
          userID
          name
          imageUri
          cast
          language
          releaseDate
          aboutMovie
          rating
          comedy
          romance
          Action
          Thrill
          Drama
          horror
          ratingCount
          comedyCount
          romanceCount
          ActionCount
          ThrillCount
          DramaCount
          horrorCount
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        mobileNo
        userFriend {
          nextToken
        }
        review {
          nextToken
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
export const getUserFriend = /* GraphQL */ `
  query GetUserFriend($id: ID!) {
    getUserFriend(id: $id) {
      id
      userID
      friendUserID
      name
      email
      mobileNo
      review {
        items {
          id
          userID
          movieID
          userName
          reviewContent
          rating
          comedy
          romance
          Action
          Thrill
          Drama
          horror
          createdAt
          updatedAt
        }
        nextToken
      }
      movie {
        items {
          id
          userID
          name
          imageUri
          cast
          language
          releaseDate
          aboutMovie
          rating
          comedy
          romance
          Action
          Thrill
          Drama
          horror
          ratingCount
          comedyCount
          romanceCount
          ActionCount
          ThrillCount
          DramaCount
          horrorCount
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
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
          nextToken
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
export const getMovie = /* GraphQL */ `
  query GetMovie($id: ID!) {
    getMovie(id: $id) {
      id
      userID
      name
      imageUri
      cast
      language
      releaseDate
      aboutMovie
      rating
      comedy
      romance
      Action
      Thrill
      Drama
      horror
      ratingCount
      comedyCount
      romanceCount
      ActionCount
      ThrillCount
      DramaCount
      horrorCount
      createdAt
      updatedAt
    }
  }
`;
export const listMovies = /* GraphQL */ `
  query ListMovies(
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        name
        imageUri
        cast
        language
        releaseDate
        aboutMovie
        rating
        comedy
        romance
        Action
        Thrill
        Drama
        horror
        ratingCount
        comedyCount
        romanceCount
        ActionCount
        ThrillCount
        DramaCount
        horrorCount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      userID
      movieID
      userName
      reviewContent
      rating
      comedy
      romance
      Action
      Thrill
      Drama
      horror
      createdAt
      updatedAt
    }
  }
`;
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        movieID
        userName
        reviewContent
        rating
        comedy
        romance
        Action
        Thrill
        Drama
        horror
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
