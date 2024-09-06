import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsArray,
    IsUUID
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export default class UserDto {
    @ApiProperty()
    @IsUUID() // Ensures the id is a UUID
    id: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    favourite?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    shopCart?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    myPetData?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    userImage?: string;

    @ApiProperty({ type: [String] })
    @IsEnum(Role, { each: true })
    roles: Role[];

    // Assuming Authorization is another entity and needs a separate DTO
    // @ApiProperty({ type: [AuthorizationDto] })
    // @IsOptional()
    // authorizations?: AuthorizationDto[];
}

// Define the AuthorizationDto if needed
// export class AuthorizationDto {
//     @ApiProperty()
//     @IsString()
//     @IsNotEmpty()
//     type: string;

//     @ApiProperty()
//     @IsString()
//     @IsNotEmpty()
//     value: string;
// }
