export const Configuration = {
    baseUrl: process.env.TEST_BASE_URL,
    graphqlPath: process.env.TEST_GRAPHQL_PATH,
    jwt: {
        publicKey: process.env.TEST_JWT_PUBLIC_KEY,
        privateKey: process.env.TEST_JWT_PRIVATE_KEY,
        algorithm: process.env.TEST_JWT_ALGORITHM,
    },
}
