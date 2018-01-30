import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { CommonModule } from "./common/common.module";

const IMPORTS = [CommonModule, UserModule];

/**
 * The main application module.
 * @export
 * @class AppModule
 */
@Module({ imports: IMPORTS })
export class AppModule {}
