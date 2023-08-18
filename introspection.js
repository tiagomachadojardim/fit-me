const {  gql } = require('graphql-request');
const { GraphQLClient } = require('graphql-request');


const introspectionQuery = gql`
mutation LogIn{
  logIn(input: {
    username: "tiago"
    password: "12345678"
  }){
    viewer{
      user{
        id
        createdAt
        updatedAt
        username
      }
      sessionToken
    }
  }
}
`;

const endpointUrl = 'https://parseapi.back4app.com/graphql'; 




const client = new GraphQLClient(endpointUrl, {
  headers: {
    'X-Parse-Application-Id': 'DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL',
  'X-Parse-Master-Key': '0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9',
  'X-Parse-Client-Key': 'zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V',
  },
});


client.request(introspectionQuery).then(data => {
  console.log(JSON.stringify(data, null, 2));
});

