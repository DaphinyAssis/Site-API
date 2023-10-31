import { getCustomRepository } from "typeorm";
import { ProfilesRepositories } from "../../repositories/profile/CreateProfileRepository";
import {hash} from "bcrypt";
interface IProfileRequest {
    id: string;
    name: string;
    password: string;
  }
  
  class UpdateProfileService {
    async execute({ id, name, password}: IProfileRequest) {
     
      const profilesRepository = getCustomRepository(ProfilesRepositories);
      const profileAlreadyExists = await profilesRepository.findOne({
        id,
      });
    
      if (!profileAlreadyExists){
        throw new Error ("Profile not exists") }
        
       profileAlreadyExists.name=name;
       profileAlreadyExists.password=password;
       

       const profile = await profilesRepository.update(id, profileAlreadyExists)
       return profile;
      
      
    }
  }
  
  export { UpdateProfileService };