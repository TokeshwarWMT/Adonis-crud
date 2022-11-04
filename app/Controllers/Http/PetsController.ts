import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Pet from 'App/Models/Pet'

export default class PetsController {
  public async index(ctx: HttpContextContract) {
    return Pet.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const newPetSchema = schema.create({
      name: schema.string({ trim: true }),
    })
    const payload = await request.validate({ schema: newPetSchema })
    const pet = await Pet.create(payload)
    response.status(201).send(pet)
  }

  public async show({ params }: HttpContextContract) {
    return Pet.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const pet = await Pet.findOrFail(params.id)
    pet.name = body.name
    return pet.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const pet = await Pet.findOrFail(params.id)
    return pet.delete()
  }
}
