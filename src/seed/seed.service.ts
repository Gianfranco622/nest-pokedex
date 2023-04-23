import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
// import { AxiosAdapter } from 'src/common/http-adapters/axios.adapter';

// import axios, { AxiosInstance } from 'axios';

@Injectable()
export class SeedService implements OnModuleInit {

  // private readonly axios: AxiosInstance = axios;

  private readonly logger = new Logger(SeedService.name)

  constructor(
    private readonly httpService: HttpService,
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    // private readonly http: AxiosAdapter
    ) {}


  onModuleInit() {
    this.logger.log('Oninitmodule seedModule')
    this.executeSeed();
  }
  

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    const { data } = await this.httpService.axiosRef.get<PokeResponse>('/pokemon?limit=100')

    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];

      // const pokemon = await this.pokemonModel.create( { name, no } );

      pokemonToInsert.push({ name, no }); // [{ name: bulbasaur, no: 1 }]
      // this.logger.log({message: {pokemonToInsert}})

    });

    // this.logger.error('ERROR')
    await this.pokemonModel.insertMany(pokemonToInsert);




    // const insertPromiseArray = [];

    // data.results.forEach(({ name, url }) => {

    //   const segments = url.split('/');
    //   const no = +segments[ segments.length - 2 ];

    //   // const pokemon = await this.pokemonModel.create( { name, no } );

    //   insertPromiseArray.push(
    //     this.pokemonModel.create({ name, no })
    //   );

    // });
    
    // await Promise.all( insertPromiseArray );


    return 'Seed Executed successfully';
  }

}
