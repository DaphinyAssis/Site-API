import { Request, Response } from "express";
import { CreateProfileService } from "../../service/profile/CreateProfileService";
class CreateProfileController {
  async handle(request: Request, response: Response) {
   const { name,password } = request.body;
   console.log(name, password)
 
   const profile = {
      name:name,
      password:password,
      
    }; 
    const createProfileService  = new CreateProfileService();
    const ret = await  createProfileService.execute(profile);
    return response.json(ret);

  }
}
export { CreateProfileController };