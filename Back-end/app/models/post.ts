import { PostSchema } from '#database/schema'
import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'

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
}
