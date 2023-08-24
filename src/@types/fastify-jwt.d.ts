// fastify-jwt.d.ts - Boilerplate code from docs to improve typing
import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    // payload: { id: number } // payload type is used for signing and verifying. Not using it now
    user: {
      // id: number
      // name: string
      // age: number
      sub: string
    } // user type is return type of `request.user` object
  }
}
