import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Post from '#models/post'

export default class Notification extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare userId: number // who receives the notification

    @column()
    declare actorId: number // who triggered it

    @column()
    declare type: string // 'like' | 'follow' | 'comment' | 'retweet'

    @column()
    declare read: boolean

    @column()
    declare postId: number | null

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null

    /* relations */
    @belongsTo(() => User, { foreignKey: 'userId' })
    declare user: BelongsTo<typeof User>

    @belongsTo(() => User, { foreignKey: 'actorId' })
    declare actor: BelongsTo<typeof User>

    @belongsTo(() => Post)
    declare post: BelongsTo<typeof Post>
}