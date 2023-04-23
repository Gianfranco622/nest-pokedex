import { Injectable, Logger } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable()
export class AxiosAdapter implements HttpAdapter {
    private readonly logger = new Logger(AxiosAdapter.name);
    private axios: AxiosInstance = axios;
    
    async get<K>(url: string): Promise<K> {
        try {
            const { data } = await this.axios.get<K>( url );
            return data;

        } catch (error) {
            this.logger.error({message: 'ERROR', error});
            throw new Error('This is an error - check logs');
        }
    }

}