import { gql, DocumentNode } from "@apollo/client";

export const GET_TOP_SELLING: DocumentNode = gql`
  query {
    getTopSelling {
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
