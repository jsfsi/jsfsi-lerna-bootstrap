import 'cross-fetch/polyfill'
import { executeShell, TokenGenerator } from '@jsfsi-core/typescript-nodejs'
import { Configuration } from '../configuration/Configuration'
import ApolloClient, { gql, ApolloError } from 'apollo-boost'
import { Login, UserToken } from '../../src/communication/graphql/types/Login'

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
        const user = await TokenGenerator.verifyJWT<UserToken>(token, {
            publicKey: Buffer.from(Configuration.jwt.publicKey, 'base64'),
            algorithms: [Configuration.jwt.algorithm],
        })

        expect(token).toBeTruthy()
        expect(user).toBeTruthy()
        expect(user.email).toStrictEqual(googleUserEmail)
        expect(user.id).toBeTruthy()
        expect(user.tenant).toBeTruthy()
        expect(user.roles).toBeTruthy()
        expect(Object.keys(user.roles).length).toBeGreaterThan(0)
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
