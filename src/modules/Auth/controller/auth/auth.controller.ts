import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import AuthDto from "../../Dto/signup.dto";
import { AuthLoginDto } from "../../Dto/login.dto";
import { AuthService } from "../../service/auth/auth.service";

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: AuthDto) {
    return this.authService.create(signupDto);
  }

  @Post('signin')
  async signIn(@Body() dto: AuthLoginDto) {
    return this.authService.signIn(dto);
  }

  // @Post('signupAdmin')
  // async signupAdmin(@Body() signupDto: AuthDto) {
  //   return this.authService.signupForAdmin(signupDto);
  // }

  // @Post('forgotPassword')
  // async forgotPassword(@Body() forgotPasswordDto: AuthLoginDto) {
  //   return this.authService.forgotPassword(forgotPasswordDto); // Assuming the method exists
  // }

  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    return this.authService.getOne(id);
  }

  @Get('users')
  async getAllUsers() {
    return this.authService.getAll();
  }
}
