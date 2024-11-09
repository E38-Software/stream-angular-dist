import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * We have to export this interface so the module can be compiled
 * with the AOT flag enabled.
 *
 * https://github.com/angular/angular/issues/14050
 */
export class DocumentWrapper {
    get nativeDocument() {
        return document;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: DocumentWrapper, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: DocumentWrapper }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: DocumentWrapper, decorators: [{
            type: Injectable
        }] });
export function getDocumentWrapper() {
    return new DocumentWrapper();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtd3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2Nsb3VkZmxhcmUtc3RyZWFtL3NyYy9saWIvZG9jdW1lbnQtd3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQzs7Ozs7R0FLRztBQUdILE1BQU0sT0FBTyxlQUFlO0lBQzFCLElBQUksY0FBYztRQUNoQixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOytHQUhVLGVBQWU7bUhBQWYsZUFBZTs7NEZBQWYsZUFBZTtrQkFEM0IsVUFBVTs7QUFPWCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLE9BQU8sSUFBSSxlQUFlLEVBQUUsQ0FBQztBQUMvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFdlIGhhdmUgdG8gZXhwb3J0IHRoaXMgaW50ZXJmYWNlIHNvIHRoZSBtb2R1bGUgY2FuIGJlIGNvbXBpbGVkXHJcbiAqIHdpdGggdGhlIEFPVCBmbGFnIGVuYWJsZWQuXHJcbiAqXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE0MDUwXHJcbiAqL1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRXcmFwcGVyIHtcclxuICBnZXQgbmF0aXZlRG9jdW1lbnQoKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RG9jdW1lbnRXcmFwcGVyKCkge1xyXG4gIHJldHVybiBuZXcgRG9jdW1lbnRXcmFwcGVyKCk7XHJcbn1cclxuIl19