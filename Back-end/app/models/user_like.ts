import { column } from '@adonisjs/lucid/orm'
import { BaseModel } from '@adonisjs/lucid/orm'

export default class UserLike extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare postId: number
}
