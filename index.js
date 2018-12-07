const { ApolloServer, gql } = require('apollo-server');
const { DeliveryClient } = require('kentico-cloud-delivery');


// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
type SystemInfo {
  id: String!
  name: String!
  codename: String!
  language: String!
  type: String!
  lastModified: String!
}
interface ContentItem {
  system: SystemInfo!
}
type MultipleChoiceElementOption {
  name: String!
  codename: String
}
type TaxonomyTerm {
  name: String!
  codename: String
}
type Asset {
  name: String
  type: String
  size: Int
  description: String
  url: String,
}
type Link {
  codename: String
  itemID: String
  urlSlug: String
  type: String
}
type TextElement {
  type: String!
  name: String!
  value: String
}
type NumberElement {
  type: String!
  name: String!
  value: String
  number: Int
}
type DateTimeElement {
  type: String!
  name: String!
  value: String
  datetime: String
}
type MultipleChoiceElement {
  type: String!
  name: String!
  value: String
  options: [MultipleChoiceElementOption]
}
type UrlSlugElement {
  type: String!
  name: String!
  value: String
  data: String
}
type TaxonomyElement {
  type: String!
  name: String!
  value: String
  taxonomyGroup: String
  taxonomyTerms: [TaxonomyTerm]
}
type AssetElement {
  type: String!
  name: String!
  value: String
  assets: [Asset]
}
type RichTextElement {
  type: String!
  name: String!
  value: String
  linkedItemCodenames: [String]
  links: [Link]
}

type AboutUsContentType implements ContentItem {
  system: SystemInfo!
  metadata__og_description: TextElement
  metadata__meta_title: TextElement
  metadata__og_title: TextElement
  metadata__meta_description: TextElement
  metadata__twitter_site: TextElement
  url_pattern: UrlSlugElement
  metadata__twitter_image: AssetElement
  metadata__twitter_creator: TextElement
  metadata__twitter_title: TextElement
  metadata__twitter_description: TextElement
  metadata__og_image: AssetElement
  facts: [ContentItem]
}

type AccessoryContentType implements ContentItem {
  system: SystemInfo!
  metadata__og_description: TextElement
  metadata__meta_title: TextElement
  metadata__og_title: TextElement
  long_description: RichTextElement
  metadata__meta_description: TextElement
  metadata__twitter_site: TextElement
  price: NumberElement
  metadata__twitter_image: AssetElement
  metadata__twitter_creator: TextElement
  url_pattern: UrlSlugElement
  short_description: RichTextElement
  manufacturer: TextElement
  metadata__twitter_title: TextElement
  metadata__twitter_description: TextElement
  metadata__og_image: AssetElement
  product_status: TaxonomyElement
  image: AssetElement
  product_name: TextElement
}

type ArticleContentType implements ContentItem {
  system: SystemInfo!
  metadata__og_description: TextElement
  metadata__meta_title: TextElement
  personas: TaxonomyElement
  body_copy: RichTextElement
  metadata__og_title: TextElement
  metadata__meta_description: TextElement
  metadata__twitter_site: TextElement
  post_date: DateTimeElement
  meta_keywords: TextElement
  teaser_image: AssetElement
  metadata__twitter_image: AssetElement
  metadata__twitter_creator: TextElement
  title: TextElement
  summary: TextElement
  metadata__twitter_title: TextElement
  metadata__twitter_description: TextElement
  meta_description: TextElement
  metadata__og_image: AssetElement
  related_articles: [ContentItem]
  url_pattern: UrlSlugElement
}

type BrewerContentType implements ContentItem {
  system: SystemInfo!
  product_name: TextElement
  metadata__og_description: TextElement
  metadata__meta_title: TextElement
  long_description: RichTextElement
  metadata__og_title: TextElement
  metadata__meta_description: TextElement
  metadata__twitter_site: TextElement
  price: NumberElement
  manufacturer: TaxonomyElement
  metadata__twitter_image: AssetElement
  metadata__twitter_creator: TextElement
  url_pattern: UrlSlugElement
  short_description: RichTextElement
  product_status: TaxonomyElement
  metadata__twitter_title: TextElement
  metadata__twitter_description: TextElement
  metadata__og_image: AssetElement
  image: AssetElement
}

type CafeContentType implements ContentItem {
  system: SystemInfo!
  phone: TextElement
  city: TextElement
  photo: AssetElement
  email: TextElement
  country: TextElement
  street: TextElement
  state: TextElement
  zip_code: TextElement
}

type CoffeeContentType implements ContentItem {
  system: SystemInfo!
  metadata__og_description: TextElement
  metadata__meta_title: TextElement
  metadata__og_title: TextElement
  product_status: TaxonomyElement
  altitude: TextElement
  metadata__meta_description: TextElement
  variety: TextElement
  image: AssetElement
  metadata__twitter_site: TextElement
  url_pattern: UrlSlugElement
  price: NumberElement
  metadata__twitter_image: AssetElement
  metadata__twitter_creator: TextElement
  country: TextElement
  metadata__twitter_title: TextElement
  short_description: RichTextElement
  processing: TaxonomyElement
  metadata__twitter_description: TextElement
  metadata__og_image: AssetElement
  long_description: RichTextElement
  farm: TextElement
  product_name: TextElement
}

type FactAboutUsContentType implements ContentItem {
  system: SystemInfo!
  description: RichTextElement
  title: TextElement
  image: AssetElement
}

type GrinderContentType implements ContentItem {
  system: SystemInfo!
  metadata__og_description: TextElement
  metadata__meta_title: TextElement
  metadata__og_title: TextElement
  price: NumberElement
  long_description: RichTextElement
  short_description: RichTextElement
  manufacturer: TextElement
  metadata__meta_description: TextElement
  metadata__twitter_site: TextElement
  product_status: TaxonomyElement
  metadata__twitter_image: AssetElement
  metadata__twitter_creator: TextElement
  image: AssetElement
  metadata__twitter_title: TextElement
  product_name: TextElement
  metadata__twitter_description: TextElement
  url_pattern: UrlSlugElement
  metadata__og_image: AssetElement
}

type HeroUnitContentType implements ContentItem {
  system: SystemInfo!
  title: TextElement
  image: AssetElement
  marketing_message: RichTextElement
}

type HomeContentType implements ContentItem {
  system: SystemInfo!
  metadata__og_description: TextElement
  metadata__meta_title: TextElement
  metadata__og_title: TextElement
  articles: [ContentItem]
  hero_unit: [ContentItem]
  metadata__meta_description: TextElement
  metadata__twitter_site: TextElement
  our_story: [ContentItem]
  cafes: [ContentItem]
  metadata__twitter_image: AssetElement
  metadata__twitter_creator: TextElement
  metadata__twitter_title: TextElement
  metadata__twitter_description: TextElement
  metadata__og_image: AssetElement
  url_pattern: UrlSlugElement
  contact: RichTextElement
}

type HostedVideoContentType implements ContentItem {
  system: SystemInfo!
  video_id: TextElement
  video_host: MultipleChoiceElement
}

type OfficeContentType implements ContentItem {
  system: SystemInfo!
  state: TextElement
  email: TextElement
  phone: TextElement
  country: TextElement
  city: TextElement
  name: TextElement
  zip_code: TextElement
  street: TextElement
}

type TweetContentType implements ContentItem {
  system: SystemInfo!
  tweet_link: TextElement
  theme: MultipleChoiceElement
  display_options: MultipleChoiceElement
}

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    items: [ContentItem],
    itemsByType(type: String!): [ContentItem]
  }
`;

const deliveryClient = new DeliveryClient({
  projectId: '975bf280-fd91-488c-994c-2f04416e5ee3',
  typeResolvers: []
});

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  ContentItem: {
    __resolveType(item, context, info) {
      const type = item.system.type
        .split('_')
        .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length))
        .join('') + 'ContentType';
      return type;
    }
  },
  Query: {

    items: async () => {
      const response = await deliveryClient.items()
        .getPromise();
      return response.items;
    },
    itemsByType: async (_, { type }) => {
      const response = await deliveryClient.items()
        .type(type)
        .getPromise();
      return response.items;
    }
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});