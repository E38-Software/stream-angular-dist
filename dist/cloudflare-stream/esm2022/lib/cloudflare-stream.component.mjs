import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewChild, } from '@angular/core';
import { DocumentWrapper } from './document-wrapper';
import * as i0 from "@angular/core";
import * as i1 from "./document-wrapper";
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
export class CloudflareStreamComponent {
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
        }], ctorParameters: () => [{ type: i0.Renderer2 }, { type: i1.DocumentWrapper, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRmbGFyZS1zdHJlYW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY2xvdWRmbGFyZS1zdHJlYW0vc3JjL2xpYi9jbG91ZGZsYXJlLXN0cmVhbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxNQUFNLEVBQ04sV0FBVyxFQUdYLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUVyRCxNQUFNLGFBQWEsR0FBRztJQUNwQixVQUFVO0lBQ1YsVUFBVTtJQUNWLGFBQWE7SUFDYixjQUFjO0lBQ2QsT0FBTztJQUNQLE1BQU07SUFDTixRQUFRO0lBQ1IsU0FBUztJQUNULGtCQUFrQjtDQUNWLENBQUM7QUFrRFgsTUFBTSxPQUFPLHlCQUF5QjtJQTJLcEMsWUFDVSxTQUFvQixFQUNLLEdBQW9CLEVBQ3hCLFVBQWU7UUFGcEMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNLLFFBQUcsR0FBSCxHQUFHLENBQWlCO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQUs7UUF4RzlDLG1DQUFtQztRQUNuQzs7V0FFRztRQUNPLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUyxDQUFDO1FBQzVDOztXQUVHO1FBQ08sWUFBTyxHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7UUFDOUM7O1dBRUc7UUFDTyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7UUFDckQ7O1dBRUc7UUFDTyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7UUFDckQ7O1dBRUc7UUFDTyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUM1Qzs7V0FF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TTtnQkFJRyxPQUFPO3NCQUFoQixNQUFNO2dCQUlHLFVBQVU7c0JBQW5CLE1BQU07Z0JBSUcsWUFBWTtzQkFBckIsTUFBTTtnQkFJRyxPQUFPO3NCQUFoQixNQUFNO2dCQUlHLGFBQWE7c0JBQXRCLE1BQU07Z0JBSUcsV0FBVztzQkFBcEIsTUFBTTtnQkFJRyxlQUFlO3NCQUF4QixNQUFNO2dCQUVnQixRQUFRO3NCQUE5QixTQUFTO3VCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE91dHB1dCxcclxuICBQTEFURk9STV9JRCxcclxuICBSZW5kZXJlcjIsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3Q2hpbGQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvY3VtZW50V3JhcHBlciB9IGZyb20gJy4vZG9jdW1lbnQtd3JhcHBlcic7XHJcblxyXG5jb25zdCBwcm9wZXJ0eVByb3BzID0gW1xyXG4gICdhdXRvcGxheScsXHJcbiAgJ2NvbnRyb2xzJyxcclxuICAnY3VycmVudFRpbWUnLFxyXG4gICdwcmltYXJ5Q29sb3InLFxyXG4gICdtdXRlZCcsXHJcbiAgJ2xvb3AnLFxyXG4gICd2b2x1bWUnLFxyXG4gICdwcmVsb2FkJyxcclxuICAnZGVmYXVsdFRleHRUcmFjaycsXHJcbl0gYXMgY29uc3Q7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Nsb3VkZmxhcmUtc3RyZWFtJyxcclxuICAvLyBhdHRyLiBwcmVmaXggaXMgcmVxdWlyZWQgZm9yIG91ciBhdHRyaWJ1dGVzIHNpbmNlIDxzdHJlYW0gLz4gaXMgYSBub24tc3RhbmRhcmRcclxuICAvLyBlbGVtZW50IGFuZCBhbmd1bGFyIHdpbGwgbm90IGJpbmQgdGhlIGF0dHJpYnV0ZXMgd2l0aG91dCBpdC5cclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHN0cmVhbVxyXG4gICAgICAjc3RyZWFtRWxcclxuICAgICAgW2F0dHIuYWQtdXJsXT1cImFkVXJsXCJcclxuICAgICAgW2F0dHIuc3JjXT1cInNyY1wiXHJcbiAgICAgIFthdHRyLmF1dG9wbGF5XT1cImF1dG9wbGF5XCJcclxuICAgICAgW2F0dHIuY29udHJvbHNdPVwiY29udHJvbHNcIlxyXG4gICAgICBbYXR0ci5kZWZhdWx0LXRleHQtdHJhY2tdPVwiZGVmYXVsdFRleHRUcmFja1wiXHJcbiAgICAgIFthdHRyLmxvb3BdPVwibG9vcFwiXHJcbiAgICAgIFthdHRyLnByZWxvYWRdPVwicHJlbG9hZFwiXHJcbiAgICAgIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIlxyXG4gICAgICBbYXR0ci53aWR0aF09XCJ3aWR0aFwiXHJcbiAgICAgIFthdHRyLnBvc3Rlcl09XCJwb3N0ZXJcIlxyXG4gICAgICBbYXR0ci5wcmltYXJ5LWNvbG9yXT1cInByaW1hcnlDb2xvclwiXHJcbiAgICAgIFthdHRyLm11dGVkXT1cIm11dGVkXCJcclxuICAgICAgKHBsYXkpPVwicGxheS5lbWl0KCRldmVudClcIlxyXG4gICAgICAoYWJvcnQpPVwiYWJvcnQuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKGNhbnBsYXkpPVwiY2FucGxheS5lbWl0KCRldmVudClcIlxyXG4gICAgICAoY2FucGxheXRocm91Z2gpPVwiY2FucGxheXRocm91Z2guZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKGR1cmF0aW9uY2hhbmdlKT1cImR1cmF0aW9uY2hhbmdlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgIChlbmRlZCk9XCJlbmRlZC5lbWl0KCRldmVudClcIlxyXG4gICAgICAoZXJyb3IpPVwiZXJyb3IuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKGxvYWRlZGRhdGEpPVwibG9hZGVkZGF0YS5lbWl0KCRldmVudClcIlxyXG4gICAgICAobG9hZGVkbWV0YWRhdGEpPVwibG9hZGVkbWV0YWRhdGEuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKGxvYWRzdGFydCk9XCJsb2Fkc3RhcnQuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKHBhdXNlKT1cInBhdXNlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgIChwbGF5KT1cInBsYXkuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKHBsYXlpbmcpPVwicGxheWluZy5lbWl0KCRldmVudClcIlxyXG4gICAgICAocHJvZ3Jlc3MpPVwicHJvZ3Jlc3MuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKHJhdGVjaGFuZ2UpPVwicmF0ZWNoYW5nZS5lbWl0KCRldmVudClcIlxyXG4gICAgICAoc2Vla2VkKT1cInNlZWtlZC5lbWl0KCRldmVudClcIlxyXG4gICAgICAoc2Vla2luZyk9XCJzZWVraW5nLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgIChzdGFsbGVkKT1cInN0YWxsZWQuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKHN1c3BlbmQpPVwic3VzcGVuZC5lbWl0KCRldmVudClcIlxyXG4gICAgICAodGltZXVwZGF0ZSk9XCJ0aW1ldXBkYXRlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICh2b2x1bWVjaGFuZ2UpPVwidm9sdW1lY2hhbmdlLmVtaXQoJGV2ZW50KVwiXHJcbiAgICAgICh3YWl0aW5nKT1cIndhaXRpbmcuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKHN0cmVhbS1hZHN0YXJ0KT1cInN0cmVhbUFkU3RhcnQuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgKHN0cmVhbS1hZGVuZCk9XCJzdHJlYW1BZEVuZC5lbWl0KCRldmVudClcIlxyXG4gICAgICAoc3RyZWFtLWFkdGltZW91dCk9XCJzdHJlYW1BZFRpbWVvdXQuZW1pdCgkZXZlbnQpXCJcclxuICAgID48L3N0cmVhbT5cclxuICBgLFxyXG4gIHN0eWxlczogW10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbG91ZGZsYXJlU3RyZWFtQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlc1xyXG57XHJcbiAgLy8gcGxhY2UgdG8gc3RvcmUgcmVmZXJlbmNlIHRvIHRoZSBzY3JpcHQgdGFnIGFkZGVkIHRvIHRoZSBkb21cclxuICBwcml2YXRlIHN0cmVhbVNjcmlwdD86IEhUTUxTY3JpcHRFbGVtZW50O1xyXG5cclxuICAvKipcclxuICAgKiBVUkwgdG8gYSBWQVNUIGFkdmVydGlzaW5nIHRhZy4gSWYgc3BlY2lmaWVkLCB0aGUgcGxheWVyIHdpbGwgYXR0ZW1wdCB0byBkaXNwbGF5IGFkcyBzcGVmaWNpZWQgYnkgdGhlIFZBU1QgYWQgc2NoZW1hLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFkVXJsPzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFRlbGxzIHRoZSBicm93c2VyIHRvIGltbWVkaWF0ZWx5IHN0YXJ0IGRvd25sb2FkaW5nIHRoZSB2aWRlbyBhbmQgcGxheSBpdCBhcyBzb29uIGFzIGl0IGNhbi4gTm90ZSB0aGF0IG1vYmlsZSBicm93c2VycyBnZW5lcmFsbHkgZG8gbm90IHN1cHBvcnQgdGhpcyBhdHRyaWJ1dGUsIHRoZSB1c2VyIG11c3QgdGFwIHRoZSBzY3JlZW4gdG8gYmVnaW4gdmlkZW8gcGxheWJhY2suIFBsZWFzZSBjb25zaWRlciBtb2JpbGUgdXNlcnMgb3IgdXNlcnMgd2l0aCBJbnRlcm5ldCB1c2FnZSBsaW1pdHMgYXMgc29tZSB1c2VycyBkb27igJl0IGhhdmUgdW5saW1pdGVkIEludGVybmV0IGFjY2VzcyBiZWZvcmUgdXNpbmcgdGhpcyBhdHRyaWJ1dGUuXHJcbiAgICpcclxuICAgKiBUbyBkaXNhYmxlIHZpZGVvIGF1dG9wbGF5LCB0aGUgYXV0b3BsYXkgYXR0cmlidXRlIG5lZWRzIHRvIGJlIHJlbW92ZWQgYWx0b2dldGhlciBhcyB0aGlzIGF0dHJpYnV0ZS4gU2V0dGluZyBhdXRvcGxheT1cImZhbHNlXCIgd2lsbCBub3Qgd29yazsgdGhlIHZpZGVvIHdpbGwgYXV0b3BsYXkgaWYgdGhlIGF0dHJpYnV0ZSBpcyB0aGVyZSBpbiB0aGUgPHN0cmVhbT4gdGFnLlxyXG4gICAqXHJcbiAgICogSW4gYWRkaXRpb24sIHNvbWUgYnJvd3NlcnMgbm93IHByZXZlbnQgdmlkZW9zIHdpdGggYXVkaW8gZnJvbSBwbGF5aW5nIGF1dG9tYXRpY2FsbHkuIFlvdSBtYXkgYWRkIHRoZSBtdXRlIGF0dHJpYnV0ZSB0byBhbGxvdyB5b3VyIHZpZGVvcyB0byBhdXRvcGxheS4gRm9yIG1vcmUgaW5mb3JtYXRpb24sIFtnbyBoZXJlXShodHRwczovL3dlYmtpdC5vcmcvYmxvZy82Nzg0L25ldy12aWRlby1wb2xpY2llcy1mb3ItaW9zLykuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYXV0b3BsYXk/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRoZSBkZWZhdWx0IHZpZGVvIGNvbnRyb2xzIHN1Y2ggYXMgYnV0dG9ucyBmb3IgcGxheS9wYXVzZSwgdm9sdW1lIGNvbnRyb2xzLiBZb3UgbWF5IGNob29zZSB0byBidWlsZCBidXR0b25zIGFuZCBjb250cm9scyB0aGF0IHdvcmsgd2l0aCB0aGUgcGxheWVyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRyb2xzPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHBsYXliYWNrIHRpbWUgaW4gc2Vjb25kcy4gU2V0dGluZyB0aGlzIHZhbHVlIHNlZWtzIHRoZSB2aWRlbyB0byBhIG5ldyB0aW1lLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGN1cnJlbnRUaW1lPzogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgcGxheWJhY2sgdGltZSBpbiBzZWNvbmRzLiBTZXR0aW5nIHRoaXMgdmFsdWUgc2Vla3MgdGhlIHZpZGVvIHRvIGEgbmV3IHRpbWUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGVmYXVsdFRleHRUcmFjaz86IHN0cmluZztcclxuICAvKipcclxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSB2aWRlb+KAmXMgZGlzcGxheSBhcmVhLCBpbiBDU1MgcGl4ZWxzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGhlaWdodD86IHN0cmluZztcclxuICAvKipcclxuICAgKiBBIEJvb2xlYW4gYXR0cmlidXRlOyBpZiBpbmNsdWRlZCB0aGUgcGxheWVyIHdpbGwgYXV0b21hdGljYWxseSBzZWVrIGJhY2sgdG8gdGhlIHN0YXJ0IHVwb24gcmVhY2hpbmcgdGhlIGVuZCBvZiB0aGUgdmlkZW8uXHJcbiAgICovXHJcbiAgQElucHV0KCkgbG9vcD86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogQSBCb29sZWFuIGF0dHJpYnV0ZSB3aGljaCBpbmRpY2F0ZXMgdGhlIGRlZmF1bHQgc2V0dGluZyBvZiB0aGUgYXVkaW8gY29udGFpbmVkIGluIHRoZSB2aWRlby4gSWYgc2V0LCB0aGUgYXVkaW8gd2lsbCBiZSBpbml0aWFsbHkgc2lsZW5jZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbXV0ZWQ/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIEEgVVJMIGZvciBhbiBpbWFnZSB0byBiZSBzaG93biBiZWZvcmUgdGhlIHZpZGVvIGlzIHN0YXJ0ZWQgb3Igd2hpbGUgdGhlIHZpZGVvIGlzIGRvd25sb2FkaW5nLiBJZiB0aGlzIGF0dHJpYnV0ZSBpc27igJl0IHNwZWNpZmllZCwgYSB0aHVtYm5haWwgaW1hZ2Ugb2YgdGhlIHZpZGVvIGlzIHNob3duLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBvc3Rlcj86IHN0cmluZztcclxuICAvKipcclxuICAgKiBUaGlzIGVudW1lcmF0ZWQgYXR0cmlidXRlIGlzIGludGVuZGVkIHRvIHByb3ZpZGUgYSBoaW50IHRvIHRoZSBicm93c2VyIGFib3V0IHdoYXQgdGhlIGF1dGhvciB0aGlua3Mgd2lsbCBsZWFkIHRvIHRoZSBiZXN0IHVzZXIgZXhwZXJpZW5jZS4gWW91IG1heSBjaG9vc2UgdG8gaW5jbHVkZSB0aGlzIGF0dHJpYnV0ZSBhcyBhIGJvb2xlYW4gYXR0cmlidXRlIHdpdGhvdXQgYSB2YWx1ZSwgb3IgeW91IG1heSBzcGVjaWZ5IHRoZSB2YWx1ZSBwcmVsb2FkPVwiYXV0b1wiIHRvIHByZWxvYWQgdGhlIGJlZ2lubmluZyBvZiB0aGUgdmlkZW8uIE5vdCBpbmNsdWRpbmcgdGhlIGF0dHJpYnV0ZSBvciB1c2luZyBwcmVsb2FkPVwibWV0YWRhdGFcIiB3aWxsIGp1c3QgbG9hZCB0aGUgbWV0YWRhdGEgbmVlZGVkIHRvIHN0YXJ0IHZpZGVvIHBsYXliYWNrIHdoZW4gcmVxdWVzdGVkLlxyXG4gICAqXHJcbiAgICogVGhlIDx2aWRlbz4gZWxlbWVudCBkb2VzIG5vdCBmb3JjZSB0aGUgYnJvd3NlciB0byBmb2xsb3cgdGhlIHZhbHVlIG9mIHRoaXMgYXR0cmlidXRlOyBpdCBpcyBhIG1lcmUgaGludC4gRXZlbiB0aG91Z2ggdGhlIHByZWxvYWQ9XCJub25lXCIgb3B0aW9uIGlzIGEgdmFsaWQgSFRNTDUgYXR0cmlidXRlLCBTdHJlYW0gcGxheWVyIHdpbGwgYWx3YXlzIGxvYWQgc29tZSBtZXRhZGF0YSB0byBpbml0aWFsaXplIHRoZSBwbGF5ZXIuIFRoZSBhbW91bnQgb2YgZGF0YSBsb2FkZWQgaW4gdGhpcyBjYXNlIGlzIG5lZ2xpZ2FibGUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHJlbG9hZD86ICdhdXRvJyB8ICdtZXRhZGF0YScgfCAnbm9uZScgfCBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIEFueSB2YWxpZCBDU1MgY29sb3IgdmFsdWUgcHJvdmlkZWQgd2lsbCBiZSBhcHBsaWVkIHRvIGNlcnRhaW4gZWxlbWVudHMgb2YgdGhlIHBsYXllcidzIFVJLlxyXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9jb2xvcl92YWx1ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHByaW1hcnlDb2xvcj86IHN0cmluZztcclxuICAvKipcclxuICAgKiBFaXRoZXIgdGhlIHZpZGVvIGlkIG9yIHRoZSBzaWduZWQgdXJsIGZvciB0aGUgdmlkZW8geW914oCZdmUgdXBsb2FkZWQgdG8gQ2xvdWRmbGFyZSBTdHJlYW0gc2hvdWxkIGJlIGluY2x1ZGVkIGhlcmUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3JjITogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFNldHMgdm9sdW1lIGZyb20gMC4wIChzaWxlbnQpIHRvIDEuMCAobWF4aW11bSB2YWx1ZSlcclxuICAgKi9cclxuICBASW5wdXQoKSB2b2x1bWU/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogVGhlIHdpZHRoIG9mIHRoZSB2aWRlb+KAmXMgZGlzcGxheSBhcmVhLCBpbiBDU1MgcGl4ZWxzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHdpZHRoPzogc3RyaW5nO1xyXG5cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZTogbm8tb3V0cHV0LW5hdGl2ZVxyXG4gIC8qKlxyXG4gICAqIFNlbnQgd2hlbiBwbGF5YmFjayBpcyBhYm9ydGVkOyBmb3IgZXhhbXBsZSwgaWYgdGhlIG1lZGlhIGlzIHBsYXlpbmcgYW5kIGlzIHJlc3RhcnRlZCBmcm9tIHRoZSBiZWdpbm5pbmcsIHRoaXMgZXZlbnQgaXMgc2VudC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgYWJvcnQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xyXG4gIC8qKlxyXG4gICAqIFNlbnQgd2hlbiBlbm91Z2ggZGF0YSBpcyBhdmFpbGFibGUgdGhhdCB0aGUgbWVkaWEgY2FuIGJlIHBsYXllZCwgYXQgbGVhc3QgZm9yIGEgY291cGxlIG9mIGZyYW1lcy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2FucGxheSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogU2VudCB3aGVuIHRoZSBlbnRpcmUgbWVkaWEgY2FuIGJlIHBsYXllZCB3aXRob3V0IGludGVycnVwdGlvbiwgYXNzdW1pbmcgdGhlIGRvd25sb2FkIHJhdGUgcmVtYWlucyBhdCBsZWFzdCBhdCB0aGUgY3VycmVudCBsZXZlbC4gSXQgd2lsbCBhbHNvIGJlIGZpcmVkIHdoZW4gcGxheWJhY2sgaXMgdG9nZ2xlZCBiZXR3ZWVuIHBhdXNlZCBhbmQgcGxheWluZy4gTm90ZTogTWFudWFsbHkgc2V0dGluZyB0aGUgY3VycmVudFRpbWUgd2lsbCBldmVudHVhbGx5IGZpcmUgYSBjYW5wbGF5dGhyb3VnaCBldmVudCBpbiBmaXJlZm94LiBPdGhlciBicm93c2VycyBtaWdodCBub3QgZmlyZSB0aGlzIGV2ZW50LlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjYW5wbGF5dGhyb3VnaCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogVGhlIG1ldGFkYXRhIGhhcyBsb2FkZWQgb3IgY2hhbmdlZCwgaW5kaWNhdGluZyBhIGNoYW5nZSBpbiBkdXJhdGlvbiBvZiB0aGUgbWVkaWEuIFRoaXMgaXMgc2VudCwgZm9yIGV4YW1wbGUsIHdoZW4gdGhlIG1lZGlhIGhhcyBsb2FkZWQgZW5vdWdoIHRoYXQgdGhlIGR1cmF0aW9uIGlzIGtub3duLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBkdXJhdGlvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogU2VudCB3aGVuIHBsYXliYWNrIGNvbXBsZXRlcy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgZW5kZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xyXG4gIC8qKlxyXG4gICAqIFNlbnQgd2hlbiBhbiBlcnJvciBvY2N1cnMuIChlLmcuIHRoZSB2aWRlbyBoYXMgbm90IGZpbmlzaGVkIGVuY29kaW5nIHlldCwgb3IgdGhlIHZpZGVvIGZhaWxzIHRvIGxvYWQgZHVlIHRvIGFuIGluY29ycmVjdCBzaWduZWQgVVJMKVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogVGhlIGZpcnN0IGZyYW1lIG9mIHRoZSBtZWRpYSBoYXMgZmluaXNoZWQgbG9hZGluZy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbG9hZGVkZGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogVGhlIG1lZGlh4oCZcyBtZXRhZGF0YSBoYXMgZmluaXNoZWQgbG9hZGluZzsgYWxsIGF0dHJpYnV0ZXMgbm93IGNvbnRhaW4gYXMgbXVjaCB1c2VmdWwgaW5mb3JtYXRpb24gYXMgdGhleeKAmXJlIGdvaW5nIHRvLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsb2FkZWRtZXRhZGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogU2VudCB3aGVuIGxvYWRpbmcgb2YgdGhlIG1lZGlhIGJlZ2lucy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbG9hZHN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcclxuICAvKipcclxuICAgKiBTZW50IHdoZW4gdGhlIHBsYXliYWNrIHN0YXRlIGlzIGNoYW5nZWQgdG8gcGF1c2VkIChwYXVzZWQgcHJvcGVydHkgaXMgdHJ1ZSkuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBhdXNlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcclxuICAvKipcclxuICAgKiBTZW50IHdoZW4gdGhlIHBsYXliYWNrIHN0YXRlIGlzIG5vIGxvbmdlciBwYXVzZWQsIGFzIGEgcmVzdWx0IG9mIHRoZSBwbGF5IG1ldGhvZCwgb3IgdGhlIGF1dG9wbGF5IGF0dHJpYnV0ZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcGxheSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogU2VudCB3aGVuIHRoZSBtZWRpYSBoYXMgZW5vdWdoIGRhdGEgdG8gc3RhcnQgcGxheWluZywgYWZ0ZXIgdGhlIHBsYXkgZXZlbnQsIGJ1dCBhbHNvIHdoZW4gcmVjb3ZlcmluZyBmcm9tIGJlaW5nIHN0YWxsZWQsIHdoZW4gbG9vcGluZyBtZWRpYSByZXN0YXJ0cywgYW5kIGFmdGVyIHNlZWtlZCwgaWYgaXQgd2FzIHBsYXlpbmcgYmVmb3JlIHNlZWtpbmcuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBsYXlpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xyXG4gIC8qKlxyXG4gICAqIFNlbnQgcGVyaW9kaWNhbGx5IHRvIGluZm9ybSBpbnRlcmVzdGVkIHBhcnRpZXMgb2YgcHJvZ3Jlc3MgZG93bmxvYWRpbmcgdGhlIG1lZGlhLiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgY3VycmVudCBhbW91bnQgb2YgdGhlIG1lZGlhIHRoYXQgaGFzIGJlZW4gZG93bmxvYWRlZCBpcyBhdmFpbGFibGUgaW4gdGhlIG1lZGlhIGVsZW1lbnTigJlzIGJ1ZmZlcmVkIGF0dHJpYnV0ZS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcHJvZ3Jlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xyXG4gIC8qKlxyXG4gICAqIFNlbnQgd2hlbiB0aGUgcGxheWJhY2sgc3BlZWQgY2hhbmdlcy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcmF0ZWNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogU2VudCB3aGVuIGEgc2VlayBvcGVyYXRpb24gY29tcGxldGVzLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWVrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBTZW50IHdoZW4gYSBzZWVrIG9wZXJhdGlvbiBiZWdpbnMuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlZWtpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xyXG4gIC8qKlxyXG4gICAqIFNlbnQgd2hlbiB0aGUgdXNlciBhZ2VudCBpcyB0cnlpbmcgdG8gZmV0Y2ggbWVkaWEgZGF0YSwgYnV0IGRhdGEgaXMgdW5leHBlY3RlZGx5IG5vdCBmb3J0aGNvbWluZy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgc3RhbGxlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogU2VudCB3aGVuIGxvYWRpbmcgb2YgdGhlIG1lZGlhIGlzIHN1c3BlbmRlZDsgdGhpcyBtYXkgaGFwcGVuIGVpdGhlciBiZWNhdXNlIHRoZSBkb3dubG9hZCBoYXMgY29tcGxldGVkIG9yIGJlY2F1c2UgaXQgaGFzIGJlZW4gcGF1c2VkIGZvciBhbnkgb3RoZXIgcmVhc29uLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzdXNwZW5kID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcclxuICAvKipcclxuICAgKiBUaGUgdGltZSBpbmRpY2F0ZWQgYnkgdGhlIGVsZW1lbnTigJlzIGN1cnJlbnRUaW1lIGF0dHJpYnV0ZSBoYXMgY2hhbmdlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgdGltZXVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogU2VudCB3aGVuIHRoZSBhdWRpbyB2b2x1bWUgY2hhbmdlcyAoYm90aCB3aGVuIHRoZSB2b2x1bWUgaXMgc2V0IGFuZCB3aGVuIHRoZSBtdXRlZCBhdHRyaWJ1dGUgaXMgY2hhbmdlZCkuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHZvbHVtZWNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogU2VudCB3aGVuIHRoZSByZXF1ZXN0ZWQgb3BlcmF0aW9uIChzdWNoIGFzIHBsYXliYWNrKSBpcyBkZWxheWVkIHBlbmRpbmcgdGhlIGNvbXBsZXRpb24gb2YgYW5vdGhlciBvcGVyYXRpb24gKHN1Y2ggYXMgYSBzZWVrKS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgd2FpdGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogRmlyZXMgd2hlbiBhZC11cmwgYXR0cmlidXRlIGlzIHByZXNlbnQgYW5kIHRoZSBhZCBiZWdpbnMgcGxheWJhY2tcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc3RyZWFtQWRTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogRmlyZXMgd2hlbiBhZC11cmwgYXR0cmlidXRlIGlzIHByZXNlbnQgYW5kIHRoZSBhZCBmaW5pc2hlcyBwbGF5YmFja1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzdHJlYW1BZEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcbiAgLyoqXHJcbiAgICogRmlyZXMgd2hlbiBhZC11cmwgYXR0cmlidXRlIGlzIHByZXNlbnQgYW5kIHRoZSBhZCB0b29rIHRvbyBsb25nIHRvIGxvYWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHN0cmVhbUFkVGltZW91dCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ3N0cmVhbUVsJykgc3RyZWFtRWwhOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjI6IFJlbmRlcmVyMixcclxuICAgIEBJbmplY3QoRG9jdW1lbnRXcmFwcGVyKSBwcml2YXRlIGRvYzogRG9jdW1lbnRXcmFwcGVyLFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnlcclxuICApIHt9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIC8vIG5nT25DaGFuZ2VzIGZpcmVzIHdoZW4gdGhlIGNvbXBvbmVudCBtb3VudHMgYnV0IGJlZm9yZSB0aGUgdmlld1xyXG4gICAgLy8gaXMgaW5pdGlhbGl6ZWQsIHNvIHdlIG5lZWQgdG8gYmFpbCB3aGVuIHRoaXMgZmlyZXMgZm9yIHRoZSBmaXJzdFxyXG4gICAgLy8gdGltZS5cclxuICAgIGlmICghdGhpcy5zdHJlYW1FbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyBjb252ZXJ0IFNpbXBsZUNoYW5nZXMgaW50byBhIFJlY29yZCB0aGF0IGhhcyBjdXJyZW50VmFsdWVzIHRvIGJlXHJcbiAgICAvLyBzeW5jZWQgb250byBzdHJlYW1FbFxyXG4gICAgdGhpcy5zeW5jUHJvcGVydGllcyhcclxuICAgICAgT2JqZWN0LmtleXMoY2hhbmdlcykucmVkdWNlKFxyXG4gICAgICAgIChhY2MsIGtleSkgPT4gKHtcclxuICAgICAgICAgIC4uLmFjYyxcclxuICAgICAgICAgIFtrZXldOiBjaGFuZ2VzW2tleV0uY3VycmVudFZhbHVlLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHt9XHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gdGFrZSBhbiBvYmplY3QgYW5kIHN5bmMga2V5cyBmcm9tIHByb3BlcnR5UHJvcHMgb250b1xyXG4gICAqIHRoZSBzdHJlYW0gZWxlbWVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3luY1Byb3BlcnRpZXMocHJvcGVydGllczogUmVjb3JkPHN0cmluZywgYW55Pikge1xyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBwcm9wZXJ0eVByb3BzIGFuZCBhc3NpZ24gdGhlbSB0byB0aGUgc3RyZWFtRWxcclxuICAgIHByb3BlcnR5UHJvcHMuZm9yRWFjaCgocHJvcCkgPT4ge1xyXG4gICAgICAvLyBvbmx5IGFzc2lnbiB0aGUgcHJvcGVydHkgaWYgaXQgaXMgcHJlc2VudFxyXG4gICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgIHRoaXMuc3RyZWFtRWwubmF0aXZlRWxlbWVudFtwcm9wXSA9IHByb3BlcnRpZXNbcHJvcF07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgLy8gc3RyZWFtRWwgaXMgZmlyc3QgYXZhaWxhYmxlIHdpdGhpbiBuZ0FmdGVyVmlld0luaXQsIHNvIHdlIG5lZWQgdG8gc3luY1xyXG4gICAgLy8gcHJvcGVydGllcyBvbnRvIHRoZSBlbGVtZW50XHJcbiAgICB0aGlzLnN5bmNQcm9wZXJ0aWVzKFxyXG4gICAgICAvLyBwbHVjayBjdXJyZW50IHByb3BlcnR5UHJvcHMgb2ZmIG9mIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgdG8gc3luYyB0aGVtIHRvIHN0cmVhbUVsXHJcbiAgICAgIHByb3BlcnR5UHJvcHMucmVkdWNlKFxyXG4gICAgICAgIChhY2MsIHByb3ApID0+XHJcbiAgICAgICAgICAvLyBza2lwIHZhbHVlcyB0aGF0IGFyZSB1bmRlZmluZWRcclxuICAgICAgICAgIHRoaXNbcHJvcF0gPT09IHVuZGVmaW5lZCA/IGFjYyA6IHsgLi4uYWNjLCBbcHJvcF06IHRoaXNbcHJvcF0gfSxcclxuICAgICAgICB7fVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgdGhpcy5sb2FkU3RyZWFtU2NyaXB0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNCcm93c2VyKCkge1xyXG4gICAgcmV0dXJuIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRTdHJlYW1TY3JpcHQoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNCcm93c2VyKSByZXR1cm47XHJcbiAgICB0aGlzLnN0cmVhbVNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgdGhpcy5zdHJlYW1TY3JpcHQuc2V0QXR0cmlidXRlKCdkYXRhLWNmYXN5bmMnLCAnZmFsc2UnKTtcclxuICAgIHRoaXMuc3RyZWFtU2NyaXB0LnNldEF0dHJpYnV0ZSgnZGVmZXInLCAndHJ1ZScpO1xyXG4gICAgdGhpcy5zdHJlYW1TY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xyXG4gICAgdGhpcy5zdHJlYW1TY3JpcHQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAnc3JjJyxcclxuICAgICAgJ2h0dHBzOi8vZW1iZWQuY2xvdWRmbGFyZXN0cmVhbS5jb20vZW1iZWQvcjR4dS5mbGE5LmxhdGVzdC5qcydcclxuICAgICk7XHJcbiAgICB0aGlzLnJlbmRlcmVyMi5hcHBlbmRDaGlsZCh0aGlzLmRvYy5uYXRpdmVEb2N1bWVudC5oZWFkLCB0aGlzLnN0cmVhbVNjcmlwdCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFuVXBTdHJlYW1TY3JpcHQoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNCcm93c2VyKSByZXR1cm47XHJcbiAgICB0aGlzLnJlbmRlcmVyMi5yZW1vdmVDaGlsZCh0aGlzLmRvYy5uYXRpdmVEb2N1bWVudC5oZWFkLCB0aGlzLnN0cmVhbVNjcmlwdCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2xlYW5VcFN0cmVhbVNjcmlwdCgpO1xyXG4gIH1cclxufVxyXG4iXX0=