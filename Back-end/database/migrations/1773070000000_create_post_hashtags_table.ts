import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'post_hashtags'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE')
            table.integer('hashtag_id').unsigned().references('id').inTable('hashtags').onDelete('CASCADE')
            table.unique(['post_id', 'hashtag_id'])

            table.timestamp('created_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
