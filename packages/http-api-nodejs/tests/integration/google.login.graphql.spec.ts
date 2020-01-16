import 'cross-fetch/polyfill'
import { executeShell, TokenGenerator } from '@jsfsi-core/typescript-nodejs'
import { User, Login } from '@jsfsi-core-bootstrap/contracts'
import { Configuration } from '../configuration/Configuration'
import ApolloClient, { gql, ApolloError } from 'apollo-boost'

const graphqlClient = new ApolloClient({
    uri: `${Configuration.baseUrl}${Configuration.graphqlPath}`,
    onError: _ => {},
})

const loginMutation = gql`
    mutation LoginWithGoogle($accessToken: String!) {
        loginWithGoogle(accessToken: $accessToken) {
            token
        }
    }
`

describe('Login using graphql and google', () => {
    it('with success', async () => {
        const googleAccessToken = await executeShell('gcloud auth print-access-token')
        const googleUserEmail = ((await executeShell(
            'gcloud config list account --format "value(core.account)"',
        )) as string).trim()

        const mutationResult = await graphqlClient.mutate<{ loginWithGoogle: Login }>({
            mutation: loginMutation,
            variables: {
                accessToken: googleAccessToken,
            },
        })

        const token = mutationResult?.data?.loginWithGoogle?.token
        const user = await TokenGenerator.verifyJWT<User>(token, {
            publicKey: Buffer.from(Configuration.jwt.publicKey, 'base64'),
            algorithms: [Configuration.jwt.algorithm],
        })

        expect(token).toBeTruthy()
        expect(user).toBeTruthy()
        expect(user.email).toStrictEqual(googleUserEmail)
    })

    it('with invalid google access token', async () => {
        try {
            await graphqlClient.mutate<{ loginWithGoogle: Login }>({
                mutation: loginMutation,
                variables: {
                    accessToken: 'test',
                },
            })
        } catch (error) {
            const apolloError = error as ApolloError
            expect(apolloError.graphQLErrors[0].extensions['code']).toBe(
                'UNAUTHENTICATED',
            )
        }
    })
})
