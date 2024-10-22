import { gql, DocumentNode } from "@apollo/client";

export const GET_TOP_SELLING_WITH_LIMIT: DocumentNode = gql`
  query {
    getTopSellingWithLimit {
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
