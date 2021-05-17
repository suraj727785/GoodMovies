/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createUserFriend = /* GraphQL */ `
  mutation CreateUserFriend(
    $input: CreateUserFriendInput!
    $condition: ModelUserFriendConditionInput
  ) {
    createUserFriend(input: $input, condition: $condition) {
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
export const updateUserFriend = /* GraphQL */ `
  mutation UpdateUserFriend(
    $input: UpdateUserFriendInput!
    $condition: ModelUserFriendConditionInput
  ) {
    updateUserFriend(input: $input, condition: $condition) {
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
export const deleteUserFriend = /* GraphQL */ `
  mutation DeleteUserFriend(
    $input: DeleteUserFriendInput!
    $condition: ModelUserFriendConditionInput
  ) {
    deleteUserFriend(input: $input, condition: $condition) {
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
export const createMovie = /* GraphQL */ `
  mutation CreateMovie(
    $input: CreateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    createMovie(input: $input, condition: $condition) {
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
export const updateMovie = /* GraphQL */ `
  mutation UpdateMovie(
    $input: UpdateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    updateMovie(input: $input, condition: $condition) {
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
export const deleteMovie = /* GraphQL */ `
  mutation DeleteMovie(
    $input: DeleteMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    deleteMovie(input: $input, condition: $condition) {
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
export const createReview = /* GraphQL */ `
  mutation CreateReview(
    $input: CreateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    createReview(input: $input, condition: $condition) {
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
export const updateReview = /* GraphQL */ `
  mutation UpdateReview(
    $input: UpdateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    updateReview(input: $input, condition: $condition) {
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
export const deleteReview = /* GraphQL */ `
  mutation DeleteReview(
    $input: DeleteReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    deleteReview(input: $input, condition: $condition) {
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
