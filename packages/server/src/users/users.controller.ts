import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'List of all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(Number(id));
  }
}
