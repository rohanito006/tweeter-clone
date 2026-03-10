import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import hashtag from '#models/hashtag'

export default class Hashtag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tag: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  /*relation */
  //manytomany

  @manyToMany(() => hashtag, {
    pivotTable: 'post_hashtags',
  })
  declare hashtags: ManyToMany<typeof hashtag>
}
