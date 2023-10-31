import { Request, Response } from "express";
import { UpdateProfileService } from "../../service/profile/UpdateProfileService";

class UpdateProfileController {

  async handle(request: Request, response: Response) {
    const { id, name, password } = request.body;

    const updateProfileService = new UpdateProfileService();

    const profile = await updateProfileService.execute({id,
      name,
      password
    });
    return response.json(profile);
  }
}

export { UpdateProfileController };