/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/platform'), require('rxjs/Subject'), require('rxjs/Observable'), require('rxjs/observable/fromEvent'), require('rxjs/observable/of'), require('rxjs/operator/auditTime'), require('rxjs/observable/merge')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/cdk/platform', 'rxjs/Subject', 'rxjs/Observable', 'rxjs/observable/fromEvent', 'rxjs/observable/of', 'rxjs/operator/auditTime', 'rxjs/observable/merge'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.scrolling = global.ng.cdk.scrolling || {}),global.ng.core,global.ng.cdk.platform,global.Rx,global.Rx,global.Rx.Observable,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable));
}(this, (function (exports,_angular_core,_angular_cdk_platform,rxjs_Subject,rxjs_Observable,rxjs_observable_fromEvent,rxjs_observable_of,rxjs_operator_auditTime,rxjs_observable_merge) { 'use strict';

/**
 * Time in ms to throttle the scrolling events by default.
 */
var DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
var ScrollDispatcher = (function () {
    /**
     * @param {?} _ngZone
     * @param {?} _platform
     */
    function ScrollDispatcher(_ngZone, _platform) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /**
         * Subject for notifying that a registered scrollable reference element has been scrolled.
         */
        this._scrolled = new rxjs_Subject.Subject();
        /**
         * Keeps track of the global `scroll` and `resize` subscriptions.
         */
        this._globalSubscription = null;
        /**
         * Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards.
         */
        this._scrolledCount = 0;
        /**
         * Map of all the scrollable references that are registered with the service and their
         * scroll event subscriptions.
         */
        this.scrollableReferences = new Map();
    }
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     * @param {?} scrollable Scrollable instance to be registered.
     * @return {?}
     */
    ScrollDispatcher.prototype.register = function (scrollable) {
        var _this = this;
        var /** @type {?} */ scrollSubscription = scrollable.elementScrolled().subscribe(function () { return _this._scrolled.next(); });
        this.scrollableReferences.set(scrollable, scrollSubscription);
    };
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param {?} scrollable Scrollable instance to be deregistered.
     * @return {?}
     */
    ScrollDispatcher.prototype.deregister = function (scrollable) {
        var /** @type {?} */ scrollableReference = this.scrollableReferences.get(scrollable);
        if (scrollableReference) {
            scrollableReference.unsubscribe();
            this.scrollableReferences.delete(scrollable);
        }
    };
    /**
     * Returns an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     * @param {?=} auditTimeInMs
     * @return {?}
     */
    ScrollDispatcher.prototype.scrolled = function (auditTimeInMs) {
        var _this = this;
        if (auditTimeInMs === void 0) { auditTimeInMs = DEFAULT_SCROLL_TIME; }
        return this._platform.isBrowser ? rxjs_Observable.Observable.create(function (observer) {
            if (!_this._globalSubscription) {
                _this._addGlobalListener();
            }
            // In the case of a 0ms delay, use an observable without auditTime
            // since it does add a perceptible delay in processing overhead.
            var /** @type {?} */ subscription = auditTimeInMs > 0 ?
                rxjs_operator_auditTime.auditTime.call(_this._scrolled, auditTimeInMs).subscribe(observer) :
                _this._scrolled.subscribe(observer);
            _this._scrolledCount++;
            return function () {
                subscription.unsubscribe();
                _this._scrolledCount--;
                if (_this._globalSubscription && !_this._scrolledCount) {
                    _this._globalSubscription.unsubscribe();
                    _this._globalSubscription = null;
                }
            };
        }) : rxjs_observable_of.of();
    };
    /**
     * Returns all registered Scrollables that contain the provided element.
     * @param {?} elementRef
     * @return {?}
     */
    ScrollDispatcher.prototype.getScrollContainers = function (elementRef) {
        var _this = this;
        var /** @type {?} */ scrollingContainers = [];
        this.scrollableReferences.forEach(function (_subscription, scrollable) {
            if (_this.scrollableContainsElement(scrollable, elementRef)) {
                scrollingContainers.push(scrollable);
            }
        });
        return scrollingContainers;
    };
    /**
     * Returns true if the element is contained within the provided Scrollable.
     * @param {?} scrollable
     * @param {?} elementRef
     * @return {?}
     */
    ScrollDispatcher.prototype.scrollableContainsElement = function (scrollable, elementRef) {
        var /** @type {?} */ element = elementRef.nativeElement;
        var /** @type {?} */ scrollableElement = scrollable.getElementRef().nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                return true;
            }
        } while (element = element.parentElement);
        return false;
    };
    /**
     * Sets up the global scroll and resize listeners.
     * @return {?}
     */
    ScrollDispatcher.prototype._addGlobalListener = function () {
        var _this = this;
        this._globalSubscription = this._ngZone.runOutsideAngular(function () {
            return rxjs_observable_fromEvent.fromEvent(window.document, 'scroll').subscribe(function () { return _this._scrolled.next(); });
        });
    };
    ScrollDispatcher.decorators = [
        { type: _angular_core.Injectable },
    ];
    /**
     * @nocollapse
     */
    ScrollDispatcher.ctorParameters = function () { return [
        { type: _angular_core.NgZone, },
        { type: _angular_cdk_platform.Platform, },
    ]; };
    return ScrollDispatcher;
}());
/**
 * \@docs-private
 * @param {?} parentDispatcher
 * @param {?} ngZone
 * @param {?} platform
 * @return {?}
 */
function SCROLL_DISPATCHER_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new ScrollDispatcher(ngZone, platform);
}
/**
 * \@docs-private
 */
var SCROLL_DISPATCHER_PROVIDER = {
    // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
    provide: ScrollDispatcher,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), ScrollDispatcher], _angular_core.NgZone, _angular_cdk_platform.Platform],
    useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
};

/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
var Scrollable = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _scroll
     * @param {?} _ngZone
     * @param {?} _renderer
     */
    function Scrollable(_elementRef, _scroll, _ngZone, _renderer) {
        this._elementRef = _elementRef;
        this._scroll = _scroll;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._elementScrolled = new rxjs_Subject.Subject();
    }
    /**
     * @return {?}
     */
    Scrollable.prototype.ngOnInit = function () {
        var _this = this;
        this._scrollListener = this._ngZone.runOutsideAngular(function () {
            return _this._renderer.listen(_this.getElementRef().nativeElement, 'scroll', function (event) {
                _this._elementScrolled.next(event);
            });
        });
        this._scroll.register(this);
    };
    /**
     * @return {?}
     */
    Scrollable.prototype.ngOnDestroy = function () {
        this._scroll.deregister(this);
        if (this._scrollListener) {
            this._scrollListener();
            this._scrollListener = null;
        }
    };
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     * @return {?}
     */
    Scrollable.prototype.elementScrolled = function () {
        return this._elementScrolled.asObservable();
    };
    /**
     * @return {?}
     */
    Scrollable.prototype.getElementRef = function () {
        return this._elementRef;
    };
    Scrollable.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[cdk-scrollable], [cdkScrollable]'
                },] },
    ];
    /**
     * @nocollapse
     */
    Scrollable.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: ScrollDispatcher, },
        { type: _angular_core.NgZone, },
        { type: _angular_core.Renderer2, },
    ]; };
    return Scrollable;
}());

/**
 * Time in ms to throttle the resize events by default.
 */
var DEFAULT_RESIZE_TIME = 20;
/**
 * Simple utility for getting the bounds of the browser viewport.
 * \@docs-private
 */
var ViewportRuler = (function () {
    /**
     * @param {?} platform
     * @param {?} ngZone
     */
    function ViewportRuler(platform, ngZone) {
        var _this = this;
        this._change = platform.isBrowser ? ngZone.runOutsideAngular(function () {
            return rxjs_observable_merge.merge(rxjs_observable_fromEvent.fromEvent(window, 'resize'), rxjs_observable_fromEvent.fromEvent(window, 'orientationchange'));
        }) : rxjs_observable_of.of();
        this._invalidateCache = this.change().subscribe(function () { return _this._cacheViewportGeometry(); });
    }
    /**
     * @return {?}
     */
    ViewportRuler.prototype.ngOnDestroy = function () {
        this._invalidateCache.unsubscribe();
    };
    /**
     * Gets a ClientRect for the viewport's bounds.
     * @param {?=} documentRect
     * @return {?}
     */
    ViewportRuler.prototype.getViewportRect = function (documentRect) {
        if (documentRect === void 0) { documentRect = this._documentRect; }
        // Cache the document bounding rect so that we don't recompute it for multiple calls.
        if (!documentRect) {
            this._cacheViewportGeometry();
            documentRect = this._documentRect;
        }
        // Use the document element's bounding rect rather than the window scroll properties
        // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
        // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
        // conceptual viewports. Under most circumstances these viewports are equivalent, but they
        // can disagree when the page is pinch-zoomed (on devices that support touch).
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
        // We use the documentElement instead of the body because, by default (without a css reset)
        // browsers typically give the document body an 8px margin, which is not included in
        // getBoundingClientRect().
        var /** @type {?} */ scrollPosition = this.getViewportScrollPosition(documentRect);
        var /** @type {?} */ height = window.innerHeight;
        var /** @type {?} */ width = window.innerWidth;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height: height,
            width: width,
        };
    };
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param {?=} documentRect
     * @return {?}
     */
    ViewportRuler.prototype.getViewportScrollPosition = function (documentRect) {
        if (documentRect === void 0) { documentRect = this._documentRect; }
        // Cache the document bounding rect so that we don't recompute it for multiple calls.
        if (!documentRect) {
            this._cacheViewportGeometry();
            documentRect = this._documentRect;
        }
        // The top-left-corner of the viewport is determined by the scroll position of the document
        // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
        // whether `document.body` or `document.documentElement` is the scrolled element, so reading
        // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
        // `document.documentElement` works consistently, where the `top` and `left` values will
        // equal negative the scroll position.
        var /** @type {?} */ top = -((documentRect)).top || document.body.scrollTop || window.scrollY ||
            document.documentElement.scrollTop || 0;
        var /** @type {?} */ left = -((documentRect)).left || document.body.scrollLeft || window.scrollX ||
            document.documentElement.scrollLeft || 0;
        return { top: top, left: left };
    };
    /**
     * Returns a stream that emits whenever the size of the viewport changes.
     * @param {?=} throttleTime
     * @return {?}
     */
    ViewportRuler.prototype.change = function (throttleTime) {
        if (throttleTime === void 0) { throttleTime = DEFAULT_RESIZE_TIME; }
        return throttleTime > 0 ? rxjs_operator_auditTime.auditTime.call(this._change, throttleTime) : this._change;
    };
    /**
     * Caches the latest client rectangle of the document element.
     * @return {?}
     */
    ViewportRuler.prototype._cacheViewportGeometry = function () {
        this._documentRect = document.documentElement.getBoundingClientRect();
    };
    ViewportRuler.decorators = [
        { type: _angular_core.Injectable },
    ];
    /**
     * @nocollapse
     */
    ViewportRuler.ctorParameters = function () { return [
        { type: _angular_cdk_platform.Platform, },
        { type: _angular_core.NgZone, },
    ]; };
    return ViewportRuler;
}());
/**
 * \@docs-private
 * @param {?} parentRuler
 * @param {?} platform
 * @param {?} ngZone
 * @return {?}
 */
function VIEWPORT_RULER_PROVIDER_FACTORY(parentRuler, platform, ngZone) {
    return parentRuler || new ViewportRuler(platform, ngZone);
}
/**
 * \@docs-private
 */
var VIEWPORT_RULER_PROVIDER = {
    // If there is already a ViewportRuler available, use that. Otherwise, provide a new one.
    provide: ViewportRuler,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), ViewportRuler], _angular_cdk_platform.Platform, _angular_core.NgZone],
    useFactory: VIEWPORT_RULER_PROVIDER_FACTORY
};

var ScrollDispatchModule = (function () {
    function ScrollDispatchModule() {
    }
    ScrollDispatchModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_cdk_platform.PlatformModule],
                    exports: [Scrollable],
                    declarations: [Scrollable],
                    providers: [SCROLL_DISPATCHER_PROVIDER],
                },] },
    ];
    /**
     * @nocollapse
     */
    ScrollDispatchModule.ctorParameters = function () { return []; };
    return ScrollDispatchModule;
}());

exports.DEFAULT_SCROLL_TIME = DEFAULT_SCROLL_TIME;
exports.ScrollDispatcher = ScrollDispatcher;
exports.SCROLL_DISPATCHER_PROVIDER_FACTORY = SCROLL_DISPATCHER_PROVIDER_FACTORY;
exports.SCROLL_DISPATCHER_PROVIDER = SCROLL_DISPATCHER_PROVIDER;
exports.Scrollable = Scrollable;
exports.DEFAULT_RESIZE_TIME = DEFAULT_RESIZE_TIME;
exports.ViewportRuler = ViewportRuler;
exports.VIEWPORT_RULER_PROVIDER_FACTORY = VIEWPORT_RULER_PROVIDER_FACTORY;
exports.VIEWPORT_RULER_PROVIDER = VIEWPORT_RULER_PROVIDER;
exports.ScrollDispatchModule = ScrollDispatchModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-scrolling.umd.js.map
