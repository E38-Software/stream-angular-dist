import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CloudflareStreamComponent } from './cloudflare-stream.component';
import { DocumentWrapper, getDocumentWrapper } from './document-wrapper';
import * as i0 from "@angular/core";
export class CloudflareStreamModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: CloudflareStreamModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.11", ngImport: i0, type: CloudflareStreamModule, declarations: [CloudflareStreamComponent], exports: [CloudflareStreamComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: CloudflareStreamModule, providers: [{ provide: DocumentWrapper, useFactory: getDocumentWrapper }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: CloudflareStreamModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CloudflareStreamComponent],
                    // Necessaary because we render a <stream /> element
                    // and Angular will refuse to render this non-standard
                    // element unless we use this.
                    schemas: [NO_ERRORS_SCHEMA],
                    providers: [{ provide: DocumentWrapper, useFactory: getDocumentWrapper }],
                    imports: [],
                    exports: [CloudflareStreamComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRmbGFyZS1zdHJlYW0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY2xvdWRmbGFyZS1zdHJlYW0vc3JjL2xpYi9jbG91ZGZsYXJlLXN0cmVhbS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBWXpFLE1BQU0sT0FBTyxzQkFBc0I7K0dBQXRCLHNCQUFzQjtnSEFBdEIsc0JBQXNCLGlCQVRsQix5QkFBeUIsYUFPOUIseUJBQXlCO2dIQUV4QixzQkFBc0IsYUFKdEIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLENBQUM7OzRGQUk5RCxzQkFBc0I7a0JBVmxDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMseUJBQXlCLENBQUM7b0JBQ3pDLG9EQUFvRDtvQkFDcEQsc0RBQXNEO29CQUN0RCw4QkFBOEI7b0JBQzlCLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLENBQUM7b0JBQ3pFLE9BQU8sRUFBRSxFQUFFO29CQUNYLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixDQUFDO2lCQUNyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENsb3VkZmxhcmVTdHJlYW1Db21wb25lbnQgfSBmcm9tICcuL2Nsb3VkZmxhcmUtc3RyZWFtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERvY3VtZW50V3JhcHBlciwgZ2V0RG9jdW1lbnRXcmFwcGVyIH0gZnJvbSAnLi9kb2N1bWVudC13cmFwcGVyJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbQ2xvdWRmbGFyZVN0cmVhbUNvbXBvbmVudF0sXHJcbiAgLy8gTmVjZXNzYWFyeSBiZWNhdXNlIHdlIHJlbmRlciBhIDxzdHJlYW0gLz4gZWxlbWVudFxyXG4gIC8vIGFuZCBBbmd1bGFyIHdpbGwgcmVmdXNlIHRvIHJlbmRlciB0aGlzIG5vbi1zdGFuZGFyZFxyXG4gIC8vIGVsZW1lbnQgdW5sZXNzIHdlIHVzZSB0aGlzLlxyXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcclxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IERvY3VtZW50V3JhcHBlciwgdXNlRmFjdG9yeTogZ2V0RG9jdW1lbnRXcmFwcGVyIH1dLFxyXG4gIGltcG9ydHM6IFtdLFxyXG4gIGV4cG9ydHM6IFtDbG91ZGZsYXJlU3RyZWFtQ29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIENsb3VkZmxhcmVTdHJlYW1Nb2R1bGUge31cclxuIl19