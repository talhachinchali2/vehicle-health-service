const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const db = require('./db'); // Adjust the path based on your project structure

const typeDefs = gql`
  type DTC {
    id: ID
    code: String!
    description: String
    is_manufacturer_defined: Boolean
    is_sae_defined: Boolean
    severity_level: Int
    subsystem: String
    system: String
    causes: [String]
    symptoms: [String]
    tags: [String]
    uuid: String
    timestamp: String


  }

  type Query {
  
    getDTCs(codes: [String!]): [DTC]
  }

 
`;

const resolvers = {
  Query: {
   
    getDTCs: async (_, { codes }) => {
        try {
            const n = 5;
            let FirstNvalues = codes;
    
            if (codes.length > n) {
                FirstNvalues = codes.slice(0, n);
            }
    
            console.log('Selected DTC codes:', FirstNvalues);
    
            const result = await db.query('SELECT * FROM dtc WHERE code = ANY($1)', [FirstNvalues]);
    
            return result.rows;
        } catch (error) {
            console.error('Error fetching DTCs:', error);
            throw new Error('Error fetching DTCs');
        }
    },
    
  },

};
const server = new ApolloServer({ typeDefs, resolvers });
const startServer = async () => {
    await server.start();
  
    const app = express();
    server.applyMiddleware({ app });
  
    const PORT = process.env.PORT || 3000;
  
    app.listen({ port: PORT }, () => {
      console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  };
  startServer();