import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  public async index({ response }: HttpContext) {
    const posts = await Post.query().orderBy('createdAt', 'desc')
    return response.ok(posts)
  }

  async store({ request, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const payload = await request.validateUsing(createPostValidator)

    const post = await user.related('posts').create(payload)

    return serialize({ post: {} })
  }
}
