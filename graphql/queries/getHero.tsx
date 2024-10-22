import { gql, DocumentNode } from "@apollo/client";

export const GET_SETTINGS_HERO: DocumentNode = gql`
  query {
    getSettingsHero {
      id
      image
      titleEn
      titleAr
      descEn
      descAr
    }
  }
`;
