import { ProfilesRepositories } from "../../repositories/profile/CreateProfileRepository";
import { getCustomRepository } from "typeorm";
import { hash } from "bcrypt";
interface IProfileRequest {
    name: string;
    password:string;
   
  }
  
  class CreateProfileService {
    async execute({ name, password}: IProfileRequest) {
     console.log("app")
      const profilesRepository = getCustomRepository(ProfilesRepositories);

      console.log("app")
      const profile=profilesRepository.create(
        {
          name,
          password
         
        });
      await profilesRepository.save(profile);
      return profile;
    }
  }
  
  export { CreateProfileService };