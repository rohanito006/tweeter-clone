import { PostSchema } from '#database/schema'
import { DateTime } from 'luxon'
import { belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import comment from '#models/comment'
import Hashtag from '#models/hashtag'
import Like from '#models/like'
import Media from '#models/media'
import Retweet from '#models/post'

export default class Post extends PostSchema {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare title: string

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  /*relations*/

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User> // un post appartient à 1 et 1 seule utilisateur pour une relation inverse de hasMany

  @hasMany(() => comment)
  declare comments: HasMany<typeof comment> // Un post peut avoir plusieurs commentaires

  @hasMany(() => Like)
  declare likes: HasMany<typeof Like> // Un post peut avoir plusieurs likes

  @hasMany(() => Retweet)
  declare retweets: HasMany<typeof Retweet>

  @hasMany(() => Media)
  declare medias: HasMany<typeof Media> // Un post peut contenir plusieurs médias (images/vidéos)

  @manyToMany(() => Hashtag, {
    pivotTable: 'post_hashtags',
  })
  declare hashtags: ManyToMany<typeof Hashtag>
  static id: number | undefined
}
