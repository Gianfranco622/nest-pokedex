import { Module } from '@nestjs/common';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    HttpModule.register({ baseURL: 'https://pokeapi.co/api/v2'}),
    PokemonModule,
    CommonModule
  ]
})
export class SeedModule {}
