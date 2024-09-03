import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService)) private AuthService: AuthService
  ) { }

  findAll() {
    return `This action returns all user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOne(query: any): Promise<any> {
    return await this.userModel.findOne(query).select('-password');
  }


  async create(user: any): Promise<any> {
    console.log('Creating user.');

    const hashedPassword = await this.AuthService.getHashedPassword(
      user.password
    );
    user.password = hashedPassword;
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOneAndUpdate(query: any, payload: any): Promise<User> {
    console.log('Updating User.');
    return this.userModel.findOneAndUpdate(query, payload, {
      new: true,
      upsert: true,
    }).select('-password');
  }

  async findOneAndRemove(query: any): Promise<any> {
    return this.userModel.findOneAndDelete(query);
  }
}
