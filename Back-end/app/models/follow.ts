import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from '#models/user'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Follow extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare followerId: number

  @column()
  declare followingId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @manyToMany(() => User, {
    pivotTable: 'follows',
    pivotForeignKey: 'follower_id',
    pivotRelatedForeignKey: 'following_id',
  })
  declare following: ManyToMany<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'follows',
    pivotForeignKey: 'following_id',
    pivotRelatedForeignKey: 'follower_id',
  })
  declare followers: ManyToMany<typeof User>
}
