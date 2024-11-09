import * as i0 from '@angular/core';
import { Injectable, EventEmitter, PLATFORM_ID, Component, Inject, Input, Output, ViewChild, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

class CloudflareStreamService {
    constructor() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: CloudflareStreamService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: CloudflareStreamService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: CloudflareStreamService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

/**
 * We have to export this interface so the module can be compiled
 * with the AOT flag enabled.
 *
 * https://github.com/angular/angular/issues/14050
 */
class DocumentWrapper {
    get nativeDocument() {
        return document;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: DocumentWrapper, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: DocumentWrapper }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: DocumentWrapper, decorators: [{
            type: Injectable
        }] });
function getDocumentWrapper() {
    return new DocumentWrapper();
}

const propertyProps = [
    'autoplay',
    'controls',
    'currentTime',
    'primaryColor',
    'muted',
    'loop',
    'volume',
    'preload',
    'defaultTextTrack',
];
class CloudflareStreamComponent {
    constructor(renderer2, doc, platformId) {
        this.renderer2 = renderer2;
        this.doc = doc;
        this.platformId = platformId;
        // tslint:disable: no-output-native
        /**
         * Sent when playback is aborted; for example, if the media is playing and is restarted from the beginning, this event is sent.
         */
        this.abort = new EventEmitter();
        /**
         * Sent when enough data is available that the media can be played, at least for a couple of frames.
         */
        this.canplay = new EventEmitter();
        /**
         * Sent when the entire media can be played without interruption, assuming the download rate remains at least at the current level. It will also be fired when playback is toggled between paused and playing. Note: Manually setting the currentTime will eventually fire a canplaythrough event in firefox. Other browsers might not fire this event.
         */
        this.canplaythrough = new EventEmitter();
        /**
         * The metadata has loaded or changed, indicating a change in duration of the media. This is sent, for example, when the media has loaded enough that the duration is known.
         */
        this.durationchange = new EventEmitter();
        /**
         * Sent when playback completes.
         */
        this.ended = new EventEmitter();
        /**
         * Sent when an error occurs. (e.g. the video has not finished encoding yet, or the video fails to load due to an incorrect signed URL)
         */
        this.error = new EventEmitter();
        /**
         * The first frame of the media has finished loading.
         */
        this.loadeddata = new EventEmitter();
        /**
         * The media’s metadata has finished loading; all attributes now contain as much useful information as they’re going to.
         */
        this.loadedmetadata = new EventEmitter();
        /**
         * Sent when loading of the media begins.
         */
        this.loadstart = new EventEmitter();
        /**
         * Sent when the playback state is changed to paused (paused property is true).
         */
        this.pause = new EventEmitter();
        /**
         * Sent when the playback state is no longer paused, as a result of the play method, or the autoplay attribute.
         */
        this.play = new EventEmitter();
        /**
         * Sent when the media has enough data to start playing, after the play event, but also when recovering from being stalled, when looping media restarts, and after seeked, if it was playing before seeking.
         */
        this.playing = new EventEmitter();
        /**
         * Sent periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element’s buffered attribute.
         */
        this.progress = new EventEmitter();
        /**
         * Sent when the playback speed changes.
         */
        this.ratechange = new EventEmitter();
        /**
         * Sent when a seek operation completes.
         */
        this.seeked = new EventEmitter();
        /**
         * Sent when a seek operation begins.
         */
        this.seeking = new EventEmitter();
        /**
         * Sent when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
         */
        this.stalled = new EventEmitter();
        /**
         * Sent when loading of the media is suspended; this may happen either because the download has completed or because it has been paused for any other reason.
         */
        this.suspend = new EventEmitter();
        /**
         * The time indicated by the element’s currentTime attribute has changed.
         */
        this.timeupdate = new EventEmitter();
        /**
         * Sent when the audio volume changes (both when the volume is set and when the muted attribute is changed).
         */
        this.volumechange = new EventEmitter();
        /**
         * Sent when the requested operation (such as playback) is delayed pending the completion of another operation (such as a seek).
         */
        this.waiting = new EventEmitter();
        /**
         * Fires when ad-url attribute is present and the ad begins playback
         */
        this.streamAdStart = new EventEmitter();
        /**
         * Fires when ad-url attribute is present and the ad finishes playback
         */
        this.streamAdEnd = new EventEmitter();
        /**
         * Fires when ad-url attribute is present and the ad took too long to load.
         */
        this.streamAdTimeout = new EventEmitter();
    }
    ngOnChanges(changes) {
        // ngOnChanges fires when the component mounts but before the view
        // is initialized, so we need to bail when this fires for the first
        // time.
        if (!this.streamEl) {
            return;
        }
        // convert SimpleChanges into a Record that has currentValues to be
        // synced onto streamEl
        this.syncProperties(Object.keys(changes).reduce((acc, key) => ({
            ...acc,
            [key]: changes[key].currentValue,
        }), {}));
    }
    /**
     * Method to take an object and sync keys from propertyProps onto
     * the stream element
     */
    syncProperties(properties) {
        // iterate over the propertyProps and assign them to the streamEl
        propertyProps.forEach((prop) => {
            // only assign the property if it is present
            if (properties.hasOwnProperty(prop)) {
                this.streamEl.nativeElement[prop] = properties[prop];
            }
        });
    }
    ngAfterViewInit() {
        // streamEl is first available within ngAfterViewInit, so we need to sync
        // properties onto the element
        this.syncProperties(
        // pluck current propertyProps off of the component instance to sync them to streamEl
        propertyProps.reduce((acc, prop) => 
        // skip values that are undefined
        this[prop] === undefined ? acc : { ...acc, [prop]: this[prop] }, {}));
        this.loadStreamScript();
    }
    get isBrowser() {
        return isPlatformBrowser(this.platformId);
    }
    loadStreamScript() {
        if (!this.isBrowser)
            return;
        this.streamScript = document.createElement('script');
        this.streamScript.setAttribute('data-cfasync', 'false');
        this.streamScript.setAttribute('defer', 'true');
        this.streamScript.setAttribute('type', 'text/javascript');
        this.streamScript.setAttribute('src', 'https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js');
        this.renderer2.appendChild(this.doc.nativeDocument.head, this.streamScript);
    }
    cleanUpStreamScript() {
        if (!this.isBrowser)
            return;
        this.renderer2.removeChild(this.doc.nativeDocument.head, this.streamScript);
    }
    ngOnDestroy() {
        this.cleanUpStreamScript();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: CloudflareStreamComponent, deps: [{ token: i0.Renderer2 }, { token: DocumentWrapper }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.11", type: CloudflareStreamComponent, selector: "cloudflare-stream", inputs: { adUrl: "adUrl", autoplay: "autoplay", controls: "controls", currentTime: "currentTime", defaultTextTrack: "defaultTextTrack", height: "height", loop: "loop", muted: "muted", poster: "poster", preload: "preload", primaryColor: "primaryColor", src: "src", volume: "volume", width: "width" }, outputs: { abort: "abort", canplay: "canplay", canplaythrough: "canplaythrough", durationchange: "durationchange", ended: "ended", error: "error", loadeddata: "loadeddata", loadedmetadata: "loadedmetadata", loadstart: "loadstart", pause: "pause", play: "play", playing: "playing", progress: "progress", ratechange: "ratechange", seeked: "seeked", seeking: "seeking", stalled: "stalled", suspend: "suspend", timeupdate: "timeupdate", volumechange: "volumechange", waiting: "waiting", streamAdStart: "streamAdStart", streamAdEnd: "streamAdEnd", streamAdTimeout: "streamAdTimeout" }, viewQueries: [{ propertyName: "streamEl", first: true, predicate: ["streamEl"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <stream
      #streamEl
      [attr.ad-url]="adUrl"
      [attr.src]="src"
      [attr.autoplay]="autoplay"
      [attr.controls]="controls"
      [attr.default-text-track]="defaultTextTrack"
      [attr.loop]="loop"
      [attr.preload]="preload"
      [attr.height]="height"
      [attr.width]="width"
      [attr.poster]="poster"
      [attr.primary-color]="primaryColor"
      [attr.muted]="muted"
      (play)="play.emit($event)"
      (abort)="abort.emit($event)"
      (canplay)="canplay.emit($event)"
      (canplaythrough)="canplaythrough.emit($event)"
      (durationchange)="durationchange.emit($event)"
      (ended)="ended.emit($event)"
      (error)="error.emit($event)"
      (loadeddata)="loadeddata.emit($event)"
      (loadedmetadata)="loadedmetadata.emit($event)"
      (loadstart)="loadstart.emit($event)"
      (pause)="pause.emit($event)"
      (play)="play.emit($event)"
      (playing)="playing.emit($event)"
      (progress)="progress.emit($event)"
      (ratechange)="ratechange.emit($event)"
      (seeked)="seeked.emit($event)"
      (seeking)="seeking.emit($event)"
      (stalled)="stalled.emit($event)"
      (suspend)="suspend.emit($event)"
      (timeupdate)="timeupdate.emit($event)"
      (volumechange)="volumechange.emit($event)"
      (waiting)="waiting.emit($event)"
      (stream-adstart)="streamAdStart.emit($event)"
      (stream-adend)="streamAdEnd.emit($event)"
      (stream-adtimeout)="streamAdTimeout.emit($event)"
    ></stream>
  `, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11", ngImport: i0, type: CloudflareStreamComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cloudflare-stream', template: `
    <stream
      #streamEl
      [attr.ad-url]="adUrl"
      [attr.src]="src"
      [attr.autoplay]="autoplay"
      [attr.controls]="controls"
      [attr.default-text-track]="defaultTextTrack"
      [attr.loop]="loop"
      [attr.preload]="preload"
      [attr.height]="height"
      [attr.width]="width"
      [attr.poster]="poster"
      [attr.primary-color]="primaryColor"
      [attr.muted]="muted"
      (play)="play.emit($event)"
      (abort)="abort.emit($event)"
      (canplay)="canplay.emit($event)"
      (canplaythrough)="canplaythrough.emit($event)"
      (durationchange)="durationchange.emit($event)"
      (ended)="ended.emit($event)"
      (error)="error.emit($event)"
      (loadeddata)="loadeddata.emit($event)"
      (loadedmetadata)="loadedmetadata.emit($event)"
      (loadstart)="loadstart.emit($event)"
      (pause)="pause.emit($event)"
      (play)="play.emit($event)"
      (playing)="playing.emit($event)"
      (progress)="progress.emit($event)"
      (ratechange)="ratechange.emit($event)"
      (seeked)="seeked.emit($event)"
      (seeking)="seeking.emit($event)"
      (stalled)="stalled.emit($event)"
      (suspend)="suspend.emit($event)"
      (timeupdate)="timeupdate.emit($event)"
      (volumechange)="volumechange.emit($event)"
      (waiting)="waiting.emit($event)"
      (stream-adstart)="streamAdStart.emit($event)"
      (stream-adend)="streamAdEnd.emit($event)"
      (stream-adtimeout)="streamAdTimeout.emit($event)"
    ></stream>
  ` }]
        }], ctorParameters: () => [{ type: i0.Renderer2 }, { type: DocumentWrapper, decorators: [{
                    type: Inject,
                    args: [DocumentWrapper]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }], propDecorators: { adUrl: [{
                type: Input
            }], autoplay: [{
                type: Input
            }], controls: [{
                type: Input
            }], currentTime: [{
                type: Input
            }], defaultTextTrack: [{
                type: Input
            }], height: [{
                type: Input
            }], loop: [{
                type: Input
            }], muted: [{
                type: Input
            }], poster: [{
                type: Input
            }], preload: [{
                type: Input
            }], primaryColor: [{
                type: Input
            }], src: [{
                type: Input
            }], volume: [{
                type: Input
            }], width: [{
                type: Input
            }], abort: [{
                type: Output
            }], canplay: [{
                type: Output
            }], canplaythrough: [{
                type: Output
            }], durationchange: [{
                type: Output
            }], ended: [{
                type: Output
            }], error: [{
                type: Output
            }], loadeddata: [{
                type: Output
            }], loadedmetadata: [{
                type: Output
            }], loadstart: [{
                type: Output
            }], pause: [{
                type: Output
            }], play: [{
                type: Output
            }], playing: [{
                type: Output
            }], progress: [{
                type: Output
            }], ratechange: [{
                type: Output
            }], seeked: [{
                type: Output
            }], seeking: [{
                type: Output
            }], stalled: [{
                type: Output
            }], suspend: [{
                type: Output
            }], timeupdate: [{
                type: Output
            }], volumechange: [{
                type: Output
            }], waiting: [{
                type: Output
            }], streamAdStart: [{
                type: Output
            }], streamAdEnd: [{
                type: Output
            }], streamAdTimeout: [{
                type: Output
            }], streamEl: [{
                type: ViewChild,
                args: ['streamEl']
            }] } });

class CloudflareStreamModule {
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

/*
 * Public API Surface of cloudflare-stream
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CloudflareStreamComponent, CloudflareStreamModule, CloudflareStreamService };
//# sourceMappingURL=cloudflare-stream-angular.mjs.map
