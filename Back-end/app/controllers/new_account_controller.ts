import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
export default class NewAccountController {
  async store({ request, serialize }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)

    const user = await User.create({
      fullname: payload.fullName,
      email: payload.email,
      password: payload.password,
      bio: null,
      location: null,
      photoProfil: null,
    })
    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  async show({ auth, serialize, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const { email, password } = request.only(['email', 'password'])
    await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return serialize(UserTransformer.transform(user))
  }
}
