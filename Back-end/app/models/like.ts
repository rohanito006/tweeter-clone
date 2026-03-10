import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Post from '#models/post'
import User from '#models/user'
import { BaseModel } from '@adonisjs/lucid/orm'

export default class Like extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare userId: number
  @column()
  declare postId: number
  @column()
  declare commentId: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  ///relations
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User> // un like appartient à un user

  @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post> // un like appartient à un post
}
