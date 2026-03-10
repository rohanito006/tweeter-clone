import { BaseModel, manyToMany } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import { hasMany } from '@adonisjs/lucid/orm'
import Post from '#models/post'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
export default class User extends compose(BaseModel, withAuthFinder(hash)) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare fullname: string | null

  @column()
  declare bio: string | null

  @column()
  declare location: string | null

  @column()
  declare photoProfil: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  get initials() {
    const [first, last] = this.fullname ? this.fullname.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  /*relations*/
  @hasMany(() => Post)
  declare posts: HasMany<typeof Post> // Un utilisateur peut avoir plusieurs posts

  @manyToMany(() => Post, {
    pivotTable: 'user_likes',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'post_id',
  })
  declare likedPosts: ManyToMany<typeof Post> // Un utilisateur peut aimer plusieurs posts
}
