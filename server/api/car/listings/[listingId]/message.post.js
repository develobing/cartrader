import Joi from 'joi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string().pattern(/^[0-9]+$/),
  name: Joi.string().required(),
  message: Joi.string().min(20).max(1000).required(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { listingId } = event.context.params;

  const { error } = await schema.validate(body);

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }

  const { message, email, phone, name } = body;

  return prisma.message.create({
    data: {
      message,
      email,
      phone,
      name,
      listingId: parseInt(listingId),
    },
  });
});
