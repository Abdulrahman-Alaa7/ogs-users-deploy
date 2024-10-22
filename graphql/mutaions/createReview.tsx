import { gql, DocumentNode } from "@apollo/client";

export const CREATE_REVIEW: DocumentNode = gql`
  mutation createReview(
    $rating: Float!
    $name: String!
    $message: String!
    $productId: String!
  ) {
    createReview(
      createReviewDto: {
        rating: $rating
        name: $name
        message: $message
        productId: $productId
      }
    ) {
      message
    }
  }
`;
