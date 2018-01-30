import { Module } from "@nestjs/common";
import { DatabaseProvider } from "./database.provider";

const COMPONENTS = [DatabaseProvider];

@Module({ components: COMPONENTS, exports: COMPONENTS })
export class DatabaseModule {}
