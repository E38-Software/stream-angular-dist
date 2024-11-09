import * as i0 from "@angular/core";
/**
 * We have to export this interface so the module can be compiled
 * with the AOT flag enabled.
 *
 * https://github.com/angular/angular/issues/14050
 */
export declare class DocumentWrapper {
    get nativeDocument(): Document;
    static ɵfac: i0.ɵɵFactoryDeclaration<DocumentWrapper, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DocumentWrapper>;
}
export declare function getDocumentWrapper(): DocumentWrapper;
