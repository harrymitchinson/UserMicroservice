import { Module } from "@nestjs/common";
import { DatabaseProvider } from "./database.provider";

const COMPONENTS = [DatabaseProvider];
/**
 * Database providing module.
 * @export
 * @class DatabaseModule
 */
@Module({ components: COMPONENTS, exports: COMPONENTS })
export class DatabaseModule {}
