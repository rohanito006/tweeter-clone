import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // who receives the notification
      table.integer('actor_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // who triggered it
      table.string('type').notNullable() // 'like' | 'follow' | 'comment' | 'retweet'
      table.boolean('read').defaultTo(false)
      table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}