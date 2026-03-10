import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import post from '#models/post'
import user from '#models/user'
import like from '#models/like'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column()
  declare postId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /*relation */

  @belongsTo(() => post)
  declare posts: BelongsTo<typeof post> // Un commentaire appartient à un post

  @belongsTo(() => user)
  declare user: BelongsTo<typeof user> // un commentaire appartient à un user

  @hasMany(() => like)
  declare likes: HasMany<typeof like> // un commentaire peut recevoir plusieur like
}
