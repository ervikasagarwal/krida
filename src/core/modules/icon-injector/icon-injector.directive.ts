import { Input, Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import * as _ from "lodash";

import { IconInjectorService } from './icon-injector.service';


/**
 * Dm-Icon-Injector is a directive which is used to display SVG, Image or Base 64 Image
 * 
 * Parameters needed for DmIconInjector:
 *      
 *      - config: configuration for dmIconInjector directive 
 *          
 *          Attributes of Config:
 * 
 *             cssClass {string} - [Optional] css class which handles any styling related to SVG or Image.
 *              
 *             icon {string} - [Optional] pass the SVG symbol id (with #) to load SVG or image URL/base 64 image path to load Image.
 *  
 *             isSVG {boolean} - Default TRUE - pass true if the icon is SVG or false if it is Image.
 * 
 * @example
 <span dmIconInjector [config] = "
 {
    cssClass: "org",
    icon: "icon_ToggleSideMenu or URL or Base64",
    iSVG: true
}"> </span>
 * 
 * 
 */

@Directive({
    selector: '[dmIconInjector]',  //use this as directive name 
    providers: [IconInjectorService]  //service which would give us the proper config which is passed
})
export class IconInjectorDirective implements OnInit{
    
    /**
     * configuration for icon injector directive
     */
    @Input('config') config: any;

    /**
     * Used to refer the native element
     */
    private iconImage: any;

    constructor(private _eleRef: ElementRef, private _renderer: Renderer2, private _IconInjectorService: IconInjectorService) {

    }
    
    ngOnInit() {
        this.config = this._IconInjectorService.getExtendedConfig(this.config);
        this.renderUI();
    }
    ngAfterViewInit() {
        
    }
    /**
     * Function to render the Image or SVG
     */
    renderUI(){
        this.iconImage = this._eleRef.nativeElement;
        if (this.config.isSVG) {
            //Render SVG
            let svgElem: SVGSVGElement = this._renderer.createElement('svg', 'http://www.w3.org/2000/svg'),
            useElem: SVGUseElement = this._renderer.createElement('use', 'http://www.w3.org/2000/svg'),
            anchorElm: HTMLElement = this._renderer.createElement("a");
      
            useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${this.config.icon}`);
            this._renderer.setAttribute(svgElem, 'class', `${this.config.cssClass}`);
            this._renderer.setAttribute(svgElem, 'focusable', 'false');
            this._renderer.setAttribute(anchorElm, 'class', `icon`);
            svgElem.appendChild(useElem);
            anchorElm.appendChild(svgElem);
            this._renderer.appendChild(this.iconImage, anchorElm);
            
        } else {
            //Render Image
            let iconImgElem: HTMLElement = this._renderer.createElement("img");
            this._renderer.setAttribute(iconImgElem, 'class', `${this.config.cssClass}`);
            this._renderer.setAttribute(iconImgElem, 'focusable', 'false');
            this._renderer.setAttribute(iconImgElem, 'src', `${this.config.icon}`);
            this._renderer.appendChild(this.iconImage, iconImgElem);
            
        }
        
    }

}