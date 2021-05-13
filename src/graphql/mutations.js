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
      friend {
        id
        name
        email
        mobileNo
        friend {
          id
          name
          email
          mobileNo
          createdAt
          updatedAt
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
      review {
        items {
          id
          userID
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
      friend {
        id
        name
        email
        mobileNo
        friend {
          id
          name
          email
          mobileNo
          createdAt
          updatedAt
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
      review {
        items {
          id
          userID
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
      friend {
        id
        name
        email
        mobileNo
        friend {
          id
          name
          email
          mobileNo
          createdAt
          updatedAt
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
      review {
        items {
          id
          userID
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