import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { KeycloakConfigService } from "./config.service";

@Module({
    imports: [ConfigModule],
    providers: [KeycloakConfigService],
    exports: [KeycloakConfigService],
})

export class KeycloackConfigModule {}
