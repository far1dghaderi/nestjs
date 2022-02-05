import { Controller, Get } from "@nestjs/common";

@Controller()
class AppController {
  @Get()
  getRootRoutes() {
    return "hi there";
  }
}

export default AppController;
