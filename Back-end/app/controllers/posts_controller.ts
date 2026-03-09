import Post from '#models/post'
import { createPostValidator } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  public async index({ response }: HttpContext) {
    const posts = await Post.query().orderBy('createdAt', 'desc')
    return response.ok(posts)
  }

  async store({ request, serialize, auth }: HttpContext) {
    const user = await auth.authenticate()

    const payload = await request.validateUsing(createPostValidator)

    const post = await user.related('posts').create(payload)

    return serialize({ post: {} })
  }
}
