import { gql, DocumentNode } from "@apollo/client";

export const GET_PRODUCTS: DocumentNode = gql`
  query {
    getProductsForClients {
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
