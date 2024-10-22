import { gql, DocumentNode } from "@apollo/client";

export const GET_PRODUCT_BY_ID: DocumentNode = gql`
  query getProductByIdForClients($id: String!) {
    getProductByIdForClients(id: $id) {
      product {
        id
        name
        mainImage
        images
        price
        estimatedPrice
        descriptionEn
        descriptionAr
        reviews {
          id
          rating
          name
          message
          status
          createdAt
        }
        offer
        aiGen
        soldOut
      }
      randomProducts {
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
  }
`;
