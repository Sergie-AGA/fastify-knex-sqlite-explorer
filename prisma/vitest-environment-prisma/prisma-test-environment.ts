import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('ran')

    return {
      teardown() {},
    }
  },
}
