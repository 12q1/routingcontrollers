import { JsonController, Body, Post, BadRequestError} from 'routing-controllers'
import { IsString } from 'class-validator'
import User from '../users/entity'
// src/logins/controller.ts

class AuthenticatePayload {
    @IsString()
    email: string
  
    @IsString()
    password: string
  }
  
  @JsonController()
  export default class LoginController {
  
    @Post('/logins')
    async authenticate(
      @Body() {email, password}: AuthenticatePayload
    ) {
      const user = await User.findOne({ where: { email } })
      if (!user) throw new BadRequestError('A user with this email does not exist')
    
      if (!await user.checkPassword(password)) throw new BadRequestError('The password is not correct')
    
      // send back a jwt token
    }
  }