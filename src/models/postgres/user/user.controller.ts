import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  InternalServerErrorException,
  Query,
  DefaultValuePipe,
  UseInterceptors,
  NotFoundException,
  UseGuards,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator, FileTypeValidator,
} from '@nestjs/common';
import { CreateUserDto } from '@model/postgres/user/dto/create-user.dto';
import { UpdateUserDto } from '@model/postgres/user/dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserService } from '@model/postgres/user/user.service';
import { UserEntity } from '@model/postgres/user/entities/user.entity';
import { ParseIntPipe } from '@pipe/parse-int.pipe';
import { PaginationInterceptor } from '@interceptor/pagination.interceptor';
import { Roles } from '@decorator/roles.decorator';
import { Role } from '@enum/role.enum';
import { AuthGuard } from '@guard/auth.guard';
import { RolesGuard } from '@guard/roles.guard';
import { PoliciesGuard } from '@guard/policies.guard';
import { CheckPolicies, ReadUserAbility } from '@decorator/policies.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, basename } from 'path';


@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles([Role.Admin])
  @UseInterceptors(PaginationInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) _page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) _limit: number) {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }

  @Get(':id')
  @CheckPolicies([new ReadUserAbility()])
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, PoliciesGuard)
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user: UserEntity = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException('Cannot find user with id ' + id);
    }
    try {
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  @Patch(':id')
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateUserDto: UpdateUserDto) {
    const user: UserEntity = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException('Cannot find user with id ' + id);
    }
    try {
      return this.userService.update(+id, updateUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }


  @Post('avatar')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // comment: { type: 'string' },
        // outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './images',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e7);
        const ext = extname(file.originalname);
        const nameWithoutExt = basename(file.originalname, extname(file.originalname));
        const filename = `${nameWithoutExt.replace(/\s+/g, '')}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
  }))
  addAvatar(@UploadedFile(new ParseFilePipe(
    {
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
        new FileTypeValidator({ fileType: 'image' }),
      ],
    },
  )) file: Express.Multer.File) {
    console.log(file);
    return 'File upload successfully';
  }
}
