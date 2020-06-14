import { Injectable } from '@angular/core';
import { DmIconInjectorConfig } from './icon-injector.config';

@Injectable()
export class IconInjectorService {

    constructor() { }


    getExtendedConfig(config) {

        let defaultConfig = {}; 
        defaultConfig = JSON.parse(JSON.stringify(DmIconInjectorConfig));
        if(!config){
            config = defaultConfig;
        }
        else {
            config = Object.assign(defaultConfig,config)
        }
        return config;
    }


}