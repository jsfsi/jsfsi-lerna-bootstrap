export const Configuration = {
    baseUrl: process.env.TEST_BASE_URL,
    graphqlPath: process.env.TEST_GRAPHQL_PATH,
    restPath: process.env.TEST_REST_PATH,
    jwt: {
        publicKey: process.env.TEST_JWT_PUBLIC_KEY,
        algorithm: process.env.TEST_JWT_ALGORITHM,
    },
}
