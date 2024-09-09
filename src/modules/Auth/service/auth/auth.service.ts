import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, Role, SignUp } from '@prisma/client';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { StringUtils } from 'src/common/string.utils';
import { create } from 'domain';
import { jwtPayload } from 'src/modules/Authrization/interface/jwt.payload';
import { AuthRepo } from '../../Repo/auth.repo';
import { AuthLoginDto } from '../../Dto/login.dto';
import AuthDto from '../../Dto/signup.dto';

// Instantiate Prisma Client
const prisma = new PrismaClient();

// HTTP Methods categorized by access levels
const readOnlyMethods = ['GET'];
const partialReadWriteMethods = ['POST'];
const writeMethods = ['DELETE', 'PUT', 'PATCH'];

// Function to create roles if they do not exist in the database
async function createRolesIfNotExist() {
  const roles: Array<Role> = Object.values(Role);
  for (const role of roles) {
    const existingRole = await prisma.roles.findFirst({
      where: { role }
    });

    if (!existingRole) {
      // Role doesn't exist, create it
      const createdRole = await prisma.roles.create({
        data: {
          roleId: StringUtils.generateRandomAlphaNumeric(),
          role,
        },
      });
      console.log(`Created role: ${role}, createdRole`);
    }
  }
}

// Helper function to set authorization permissions
function setAuthorizationPermissions(
  roleId: string,
  path: string,
  method: Array<string>,
  userId: string
) {
  return {
    roleId,
    path,
    method,
    userId,
  };
}


// Functions to get permissions for different roles
function getAdminPermissions(roleId: string, userId: string) { // Added userId parameter
  return [
    setAuthorizationPermissions(roleId, '/menus', [
      ...readOnlyMethods,
      ...partialReadWriteMethods,
      ...writeMethods,
    ], userId),
    setAuthorizationPermissions(roleId, '/tables', [
      ...readOnlyMethods,
      ...partialReadWriteMethods,
      ...writeMethods,
    ], userId),
    setAuthorizationPermissions(roleId, '/orders', [
      ...readOnlyMethods,
      ...partialReadWriteMethods,
      ...writeMethods,
    ], userId),
    setAuthorizationPermissions(roleId, '/restaurant', [
      ...readOnlyMethods,
      ...partialReadWriteMethods,
      ...writeMethods,
    ], userId),
    setAuthorizationPermissions(roleId, '/bookings', [
      ...readOnlyMethods,
      ...partialReadWriteMethods,
      ...writeMethods,
    ], userId),
  ];
}

function getStudentPermissions(roleId: string, userId: string) { // Added userId parameter
  return [
    setAuthorizationPermissions(roleId, '/orders', [
      ...readOnlyMethods,
      ...partialReadWriteMethods,
      ...writeMethods,
    ], userId),
    setAuthorizationPermissions(roleId, '/restaurant', [...readOnlyMethods], userId),
    setAuthorizationPermissions(roleId, '/bookings', [...readOnlyMethods], userId),
  ];
}

function getTeacherPermissions(roleId: string, userId: string) { // Added userId parameter
  return [
    setAuthorizationPermissions(roleId, '/orders', [
      ...readOnlyMethods,
      ...partialReadWriteMethods,
    ], userId),
    setAuthorizationPermissions(roleId, '/restaurant', [...readOnlyMethods], userId),
    setAuthorizationPermissions(roleId, '/bookings', [
      ...readOnlyMethods,
      ...partialReadWriteMethods,
    ], userId),
  ];
}

function getSuperAdminPermissions(roleId: string, userId: string) { // Added userId parameter
  return [
    setAuthorizationPermissions(roleId, '/restaurant', [
      ...readOnlyMethods,
      ...partialReadWriteMethods,
      ...writeMethods,
    ], userId),
  ];
}


@Injectable()
export class AuthService {
  constructor(
    private authentication: AuthRepo,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  // Method to create a user
  async create(dto: AuthDto): Promise<string> {
    try {
        const hash = await argon.hash(dto.password);
        const userId = StringUtils.generateRandomAlphaNumeric();

        // Map AuthDto to User type
        const userData: SignUp = {
          id: userId,
                email: dto.email,
                password: hash,
                name: dto.name,
                shopCart: dto.shopCart,
                myPetData:dto.myPetData,
                favourite:dto.favourite,
                userImage: dto.userImage,
                phone: dto.phone,
                roles: dto.roles, // Use the converted Role[] here
              };

        await this.authentication.create(userData);

        return 'Created successfully';
    } catch (error) {
        // Handle error and provide context
        throw new Error(`Failed to create user: ${error.message}`);
    }
}

  // Method for signing up an admin user
  // async signupForAdmin(dto: AuthDto ) {
  //   const hash = await argon.hash(dto.password);
  //   const userId = StringUtils.generateRandomAlphaNumeric();
  
  //   const adminSignupData: User = {
  //     id: userId,
  //     email: dto.email,
  //     password: hash,
  //     name: dto.name,
  //     address: dto.address,
  //     contact: dto.contact,
  //     gender: dto.gender,
  //     image: dto.image,
  //     status: dto.status,
  //     emailVerified: dto.email_verified,
  //     roles: dto.roles,
  //     createdDate: dto.createdDate,
  //     rmark: dto.rmark,
  //   };
  
  //   await this.authentication.create(adminSignupData);
  
  //   await createRolesIfNotExist();
  
  //   const adminRole = await prisma.roles.findFirst({
  //     where: { role: Role.ADMIN },
  //     select: { roleId: true },
  //   });
  //   const studentRole = await prisma.roles.findFirst({
  //     where: { role: Role.STUDENT },
  //     select: { roleId: true },
  //   });
  //   const teacherRole = await prisma.roles.findFirst({
  //     where: { role: Role.TEACHER },
  //     select: { roleId: true },
  //   });
  
  //   const permissions = [
  //     ...getAdminPermissions(adminRole.roleId, userId),
  //     ...getStudentPermissions(studentRole.roleId, userId),
  //     ...getTeacherPermissions(teacherRole.roleId, userId),
  //   ];
  
  //   await prisma.authorization.createMany({
  //     data: permissions,
  //     skipDuplicates: true, // Optionally skip duplicates
  //   });
  // }
  
  
  // Method for signing in a user
  async signIn(loginDto: AuthLoginDto) {
    // Validate input
    if (!loginDto.email || !loginDto.password) {
      throw new ForbiddenException('Email and password must be provided');
    }

    // Find user by email
    const user = await this.authentication.findUnique(loginDto.email);
  
    // Verify user existence and password
    if (!user || !(await argon.verify(user.password, loginDto.password))) {
      throw new ForbiddenException('Credentials incorrect');
    }
  
    // Generate tokens
    return this.signToken(user.id, user.email, user.roles, user.id);
  }
  

  // Method to sign a token for a user
  async signToken(
    userId: string,
    email: string,
    roles: Role[],
    restaurant: string,
  ): Promise<{ access_token: string; reference_token: string }> {
    const payload = {
      sub: userId,
      email,
      roles,
      restaurant,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '40m',
      secret: secret,
    });

    return {
      access_token: token,
      reference_token: refreshToken,
    };
  }

  // Method to generate a new access token from a refresh token
  async generateAccessTokenFromRefreshToken(
    refreshToken: string,
  ): Promise<{ access_token: string; reference_token: string }> {
    try {
      // Verify the refresh token
      const decoded: jwtPayload = this.jwt.verify(refreshToken);
      return this.signToken(
        decoded.sub,
        decoded.email,
        decoded.roles,
        decoded.user,
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token: ' + error);
    }
  }

  // Method to get all users
  async getAll() {
    return await this.authentication.find();
  }

  // Method to get a user by ID
  async getOne(id: string) {
    return await this.authentication.findOne(id);
  }

  // Method to delete a user by ID
  async deleteById(id: string) {
    await this.authentication.delete(id);
  }

  // Method to update a user by ID
  async updateUser(id: string, dto: SignUp) {
    try {
      await this.authentication.update(id, dto);
      return "Edited successfully";
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }
}
