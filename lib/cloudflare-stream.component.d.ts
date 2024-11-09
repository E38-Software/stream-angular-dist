import { AfterViewInit, EventEmitter, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { DocumentWrapper } from './document-wrapper';
import * as i0 from "@angular/core";
export declare class CloudflareStreamComponent implements OnDestroy, AfterViewInit, OnChanges {
    private renderer2;
    private doc;
    private platformId;
    private streamScript?;
    /**
     * URL to a VAST advertising tag. If specified, the player will attempt to display ads speficied by the VAST ad schema.
     */
    adUrl?: string;
    /**
     * Tells the browser to immediately start downloading the video and play it as soon as it can. Note that mobile browsers generally do not support this attribute, the user must tap the screen to begin video playback. Please consider mobile users or users with Internet usage limits as some users don’t have unlimited Internet access before using this attribute.
     *
     * To disable video autoplay, the autoplay attribute needs to be removed altogether as this attribute. Setting autoplay="false" will not work; the video will autoplay if the attribute is there in the <stream> tag.
     *
     * In addition, some browsers now prevent videos with audio from playing automatically. You may add the mute attribute to allow your videos to autoplay. For more information, [go here](https://webkit.org/blog/6784/new-video-policies-for-ios/).
     */
    autoplay?: boolean;
    /**
     * Shows the default video controls such as buttons for play/pause, volume controls. You may choose to build buttons and controls that work with the player.
     */
    controls?: boolean;
    /**
     * Returns the current playback time in seconds. Setting this value seeks the video to a new time.
     */
    currentTime?: number;
    /**
     * Returns the current playback time in seconds. Setting this value seeks the video to a new time.
     */
    defaultTextTrack?: string;
    /**
     * The height of the video’s display area, in CSS pixels.
     */
    height?: string;
    /**
     * A Boolean attribute; if included the player will automatically seek back to the start upon reaching the end of the video.
     */
    loop?: boolean;
    /**
     * A Boolean attribute which indicates the default setting of the audio contained in the video. If set, the audio will be initially silenced.
     */
    muted?: boolean;
    /**
     * A URL for an image to be shown before the video is started or while the video is downloading. If this attribute isn’t specified, a thumbnail image of the video is shown.
     */
    poster?: string;
    /**
     * This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. You may choose to include this attribute as a boolean attribute without a value, or you may specify the value preload="auto" to preload the beginning of the video. Not including the attribute or using preload="metadata" will just load the metadata needed to start video playback when requested.
     *
     * The <video> element does not force the browser to follow the value of this attribute; it is a mere hint. Even though the preload="none" option is a valid HTML5 attribute, Stream player will always load some metadata to initialize the player. The amount of data loaded in this case is negligable.
     */
    preload?: 'auto' | 'metadata' | 'none' | boolean;
    /**
     * Any valid CSS color value provided will be applied to certain elements of the player's UI.
     * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
     */
    primaryColor?: string;
    /**
     * Either the video id or the signed url for the video you’ve uploaded to Cloudflare Stream should be included here.
     */
    src: string;
    /**
     * Sets volume from 0.0 (silent) to 1.0 (maximum value)
     */
    volume?: number;
    /**
     * The width of the video’s display area, in CSS pixels.
     */
    width?: string;
    /**
     * Sent when playback is aborted; for example, if the media is playing and is restarted from the beginning, this event is sent.
     */
    abort: EventEmitter<Event>;
    /**
     * Sent when enough data is available that the media can be played, at least for a couple of frames.
     */
    canplay: EventEmitter<Event>;
    /**
     * Sent when the entire media can be played without interruption, assuming the download rate remains at least at the current level. It will also be fired when playback is toggled between paused and playing. Note: Manually setting the currentTime will eventually fire a canplaythrough event in firefox. Other browsers might not fire this event.
     */
    canplaythrough: EventEmitter<Event>;
    /**
     * The metadata has loaded or changed, indicating a change in duration of the media. This is sent, for example, when the media has loaded enough that the duration is known.
     */
    durationchange: EventEmitter<Event>;
    /**
     * Sent when playback completes.
     */
    ended: EventEmitter<Event>;
    /**
     * Sent when an error occurs. (e.g. the video has not finished encoding yet, or the video fails to load due to an incorrect signed URL)
     */
    error: EventEmitter<Event>;
    /**
     * The first frame of the media has finished loading.
     */
    loadeddata: EventEmitter<Event>;
    /**
     * The media’s metadata has finished loading; all attributes now contain as much useful information as they’re going to.
     */
    loadedmetadata: EventEmitter<Event>;
    /**
     * Sent when loading of the media begins.
     */
    loadstart: EventEmitter<Event>;
    /**
     * Sent when the playback state is changed to paused (paused property is true).
     */
    pause: EventEmitter<Event>;
    /**
     * Sent when the playback state is no longer paused, as a result of the play method, or the autoplay attribute.
     */
    play: EventEmitter<Event>;
    /**
     * Sent when the media has enough data to start playing, after the play event, but also when recovering from being stalled, when looping media restarts, and after seeked, if it was playing before seeking.
     */
    playing: EventEmitter<Event>;
    /**
     * Sent periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element’s buffered attribute.
     */
    progress: EventEmitter<Event>;
    /**
     * Sent when the playback speed changes.
     */
    ratechange: EventEmitter<Event>;
    /**
     * Sent when a seek operation completes.
     */
    seeked: EventEmitter<Event>;
    /**
     * Sent when a seek operation begins.
     */
    seeking: EventEmitter<Event>;
    /**
     * Sent when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
     */
    stalled: EventEmitter<Event>;
    /**
     * Sent when loading of the media is suspended; this may happen either because the download has completed or because it has been paused for any other reason.
     */
    suspend: EventEmitter<Event>;
    /**
     * The time indicated by the element’s currentTime attribute has changed.
     */
    timeupdate: EventEmitter<Event>;
    /**
     * Sent when the audio volume changes (both when the volume is set and when the muted attribute is changed).
     */
    volumechange: EventEmitter<Event>;
    /**
     * Sent when the requested operation (such as playback) is delayed pending the completion of another operation (such as a seek).
     */
    waiting: EventEmitter<Event>;
    /**
     * Fires when ad-url attribute is present and the ad begins playback
     */
    streamAdStart: EventEmitter<Event>;
    /**
     * Fires when ad-url attribute is present and the ad finishes playback
     */
    streamAdEnd: EventEmitter<Event>;
    /**
     * Fires when ad-url attribute is present and the ad took too long to load.
     */
    streamAdTimeout: EventEmitter<Event>;
    streamEl: any;
    constructor(renderer2: Renderer2, doc: DocumentWrapper, platformId: any);
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Method to take an object and sync keys from propertyProps onto
     * the stream element
     */
    private syncProperties;
    ngAfterViewInit(): void;
    get isBrowser(): boolean;
    private loadStreamScript;
    private cleanUpStreamScript;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CloudflareStreamComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CloudflareStreamComponent, "cloudflare-stream", never, { "adUrl": { "alias": "adUrl"; "required": false; }; "autoplay": { "alias": "autoplay"; "required": false; }; "controls": { "alias": "controls"; "required": false; }; "currentTime": { "alias": "currentTime"; "required": false; }; "defaultTextTrack": { "alias": "defaultTextTrack"; "required": false; }; "height": { "alias": "height"; "required": false; }; "loop": { "alias": "loop"; "required": false; }; "muted": { "alias": "muted"; "required": false; }; "poster": { "alias": "poster"; "required": false; }; "preload": { "alias": "preload"; "required": false; }; "primaryColor": { "alias": "primaryColor"; "required": false; }; "src": { "alias": "src"; "required": false; }; "volume": { "alias": "volume"; "required": false; }; "width": { "alias": "width"; "required": false; }; }, { "abort": "abort"; "canplay": "canplay"; "canplaythrough": "canplaythrough"; "durationchange": "durationchange"; "ended": "ended"; "error": "error"; "loadeddata": "loadeddata"; "loadedmetadata": "loadedmetadata"; "loadstart": "loadstart"; "pause": "pause"; "play": "play"; "playing": "playing"; "progress": "progress"; "ratechange": "ratechange"; "seeked": "seeked"; "seeking": "seeking"; "stalled": "stalled"; "suspend": "suspend"; "timeupdate": "timeupdate"; "volumechange": "volumechange"; "waiting": "waiting"; "streamAdStart": "streamAdStart"; "streamAdEnd": "streamAdEnd"; "streamAdTimeout": "streamAdTimeout"; }, never, never, false, never>;
}
