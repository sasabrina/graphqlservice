import { gql } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = gql`
  type Coordinates {
    lon: Float
    lat: Float
  }
  type Weather {
    id: Int!
    main: String
    description: String
    icon: String
  }
  type WeatherTemp {
    temp: Float
    feelsLike: Float
    tempMin: Float
    tempMax: Float
  }
  type WeatherResponse {
    id: String!
    name: String
    dt: Float
    base: String
    coord: Coordinates
    main: WeatherTemp
    weather: [Weather]!
  }
  type Query {
    weatherById(id: String!): WeatherResponse
    weatherByCity(city: String!): WeatherResponse
    getCities(id: [String!]): [WeatherResponse]
  }
`;

const resolvers = {
  Query: {
    weatherById(_, { id }, { dataSources }) {
      return dataSources.weatherAPI.getCityById(id);
    },
    weatherByCity(_, { city }, { dataSources }) {
      return dataSources.weatherAPI.withCity(city);
    },
    getCities(_, { id }, { dataSources }) {
      return dataSources.weatherAPI.getCities(id);
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
