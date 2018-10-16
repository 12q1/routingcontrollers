import { JsonController, Get, Param, Body, Put, NotFoundError, Post } from 'routing-controllers'
import User from './entity'

@JsonController()
export default class UserController {

    @Get('/users/:id')
    getUser(
        @Param('id') id: number
        ) {
        return User.findOne(id)
    }//end of @Get

    @Get('/users')
    async allUsers() {
        const users = await User.find()
    return { users }
    }//end of @Get

    @Put('/users/:id')
    async updateUser(
    @Param('id') id: number,
    @Body() update: Partial<User>
    ) {
    const page = await User.findOne(id)
    if (!page) throw new NotFoundError('Cannot find page')

    return User.merge(page, update).save()
    }//end of @Put

    @Post('/users')
    async createUser(
    @Body() user: User
    ) {
    const {password, ...rest} = user
    const entity = User.create(rest)
    await entity.setPassword(password)
    return entity.save()
    }
}
