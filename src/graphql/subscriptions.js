/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
          movieID
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
          movieID
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
          movieID
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
export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie {
    onCreateMovie {
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
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie {
    onUpdateMovie {
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
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie {
    onDeleteMovie {
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
export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview {
    onCreateReview {
      id
      userID
      movieID
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
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview {
    onUpdateReview {
      id
      userID
      movieID
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
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview {
    onDeleteReview {
      id
      userID
      movieID
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
