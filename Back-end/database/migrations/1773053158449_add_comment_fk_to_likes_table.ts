import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'likes'

    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table
                .integer('comment_id')
                .unsigned()
                .references('id')
                .inTable('comments')
                .onDelete('CASCADE')
                .alter()
        })
    }

    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['comment_id'])
        })
    }
}
