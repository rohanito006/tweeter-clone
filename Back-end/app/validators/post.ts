import vine from '@vinejs/vine'

export const createPostValidator = vine.create({
  title: vine.string(),
  body: vine.string(),
  publishedAt: vine.date(),
})
