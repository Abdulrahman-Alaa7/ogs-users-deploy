import { gql, DocumentNode } from "@apollo/client";

export const GET_TOP_RATED_WITH_LIMIT: DocumentNode = gql`
  query {
    getTopRatedWithLimit {
      id
      name
      mainImage
      images
      price
      estimatedPrice
      offer
      aiGen
      soldOut
    }
  }
`;
