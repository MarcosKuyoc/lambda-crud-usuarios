import { UserRepositoryDynamo } from '../../infraestruture/repositories/user.repository';
import { RequestNewUser } from '../interfaces/new-user.interface';

export class UserService {
  async findById(id: string) {
    const usersRepository = new UserRepositoryDynamo();
    return await usersRepository.findById(id);
  }

  async create(data: RequestNewUser) {
    const usersRepository = new UserRepositoryDynamo();
    return await usersRepository.create(data);
  }

  async update(id: string, data: RequestNewUser) {
    const usersRepository = new UserRepositoryDynamo();
    return await usersRepository.update(id, data);
  }

  async delete(id: string) {
    const userRepository = new UserRepositoryDynamo();
    return userRepository.delete(id);
  }
}