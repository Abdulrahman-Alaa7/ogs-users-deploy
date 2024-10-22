import { gql, DocumentNode } from "@apollo/client";

export const GET_NEW_WITH_LIMIT: DocumentNode = gql`
  query {
    getNewProductsWithLimit {
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
