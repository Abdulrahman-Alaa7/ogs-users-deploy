import { gql, DocumentNode } from "@apollo/client";

export const GET_TOP_RATED: DocumentNode = gql`
  query {
    getTopRated {
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
