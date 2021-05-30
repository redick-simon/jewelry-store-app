import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appPlugin]'
})
export class PluginDirective {

    constructor(public vcRef: ViewContainerRef) {

    }

}