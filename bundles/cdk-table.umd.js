/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/collections'), require('rxjs/operators'), require('rxjs'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@angular/cdk/table', ['exports', '@angular/core', '@angular/cdk/collections', 'rxjs/operators', 'rxjs', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.table = {}),global.ng.core,global.ng.cdk.collections,global.Rx.operators,global.Rx,global.ng.common));
}(this, (function (exports,core,collections,operators,rxjs,common) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * The row template that can be used by the mat-table. Should not be used outside of the
 * material library.
 */
var /** @type {?} */ CDK_ROW_TEMPLATE = "<ng-container cdkCellOutlet></ng-container>";
/**
 * Base class for the CdkHeaderRowDef and CdkRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 * @abstract
 */
var   /**
 * Base class for the CdkHeaderRowDef and CdkRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 * @abstract
 */
BaseRowDef = /** @class */ (function () {
    function BaseRowDef(template, _differs) {
        this.template = template;
        this._differs = _differs;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    BaseRowDef.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // Create a new columns differ if one does not yet exist. Initialize it based on initial value
        // of the columns property or an empty array if none is provided.
        var /** @type {?} */ columns = changes['columns'].currentValue || [];
        if (!this._columnsDiffer) {
            this._columnsDiffer = this._differs.find(columns).create();
            this._columnsDiffer.diff(columns);
        }
    };
    /**
     * Returns the difference between the current columns and the columns from the last diff, or null
     * if there is no difference.
     */
    /**
     * Returns the difference between the current columns and the columns from the last diff, or null
     * if there is no difference.
     * @return {?}
     */
    BaseRowDef.prototype.getColumnsDiff = /**
     * Returns the difference between the current columns and the columns from the last diff, or null
     * if there is no difference.
     * @return {?}
     */
    function () {
        return this._columnsDiffer.diff(this.columns);
    };
    return BaseRowDef;
}());
/**
 * Header row definition for the CDK table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
var CdkHeaderRowDef = /** @class */ (function (_super) {
    __extends(CdkHeaderRowDef, _super);
    function CdkHeaderRowDef(template, _differs) {
        return _super.call(this, template, _differs) || this;
    }
    CdkHeaderRowDef.decorators = [
        { type: core.Directive, args: [{
                    selector: '[cdkHeaderRowDef]',
                    inputs: ['columns: cdkHeaderRowDef'],
                },] },
    ];
    /** @nocollapse */
    CdkHeaderRowDef.ctorParameters = function () { return [
        { type: core.TemplateRef, },
        { type: core.IterableDiffers, },
    ]; };
    return CdkHeaderRowDef;
}(BaseRowDef));
/**
 * Data row definition for the CDK table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 * @template T
 */
var CdkRowDef = /** @class */ (function (_super) {
    __extends(CdkRowDef, _super);
    // TODO(andrewseguin): Add an input for providing a switch function to determine
    //   if this template should be used.
    function CdkRowDef(template, _differs) {
        return _super.call(this, template, _differs) || this;
    }
    CdkRowDef.decorators = [
        { type: core.Directive, args: [{
                    selector: '[cdkRowDef]',
                    inputs: ['columns: cdkRowDefColumns', 'when: cdkRowDefWhen'],
                },] },
    ];
    /** @nocollapse */
    CdkRowDef.ctorParameters = function () { return [
        { type: core.TemplateRef, },
        { type: core.IterableDiffers, },
    ]; };
    return CdkRowDef;
}(BaseRowDef));
/**
 * Outlet for rendering cells inside of a row or header row.
 * \@docs-private
 */
var CdkCellOutlet = /** @class */ (function () {
    function CdkCellOutlet(_viewContainer) {
        this._viewContainer = _viewContainer;
        CdkCellOutlet.mostRecentCellOutlet = this;
    }
    /**
     * Static property containing the latest constructed instance of this class.
     * Used by the CDK table when each CdkHeaderRow and CdkRow component is created using
     * createEmbeddedView. After one of these components are created, this property will provide
     * a handle to provide that component's cells and context. After init, the CdkCellOutlet will
     * construct the cells with the provided context.
     */
    CdkCellOutlet.mostRecentCellOutlet = null;
    CdkCellOutlet.decorators = [
        { type: core.Directive, args: [{ selector: '[cdkCellOutlet]' },] },
    ];
    /** @nocollapse */
    CdkCellOutlet.ctorParameters = function () { return [
        { type: core.ViewContainerRef, },
    ]; };
    return CdkCellOutlet;
}());
/**
 * Header template container that contains the cell outlet. Adds the right class and role.
 */
var CdkHeaderRow = /** @class */ (function () {
    function CdkHeaderRow() {
    }
    CdkHeaderRow.decorators = [
        { type: core.Component, args: [{selector: 'cdk-header-row, tr[cdk-header-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'cdk-header-row',
                        'role': 'row',
                    },
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                },] },
    ];
    return CdkHeaderRow;
}());
/**
 * Data row template container that contains the cell outlet. Adds the right class and role.
 */
var CdkRow = /** @class */ (function () {
    function CdkRow() {
    }
    CdkRow.decorators = [
        { type: core.Component, args: [{selector: 'cdk-row, tr[cdk-row]',
                    template: CDK_ROW_TEMPLATE,
                    host: {
                        'class': 'cdk-row',
                        'role': 'row',
                    },
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                },] },
    ];
    return CdkRow;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
var CdkCellDef = /** @class */ (function () {
    function CdkCellDef(template) {
        this.template = template;
    }
    CdkCellDef.decorators = [
        { type: core.Directive, args: [{ selector: '[cdkCellDef]' },] },
    ];
    /** @nocollapse */
    CdkCellDef.ctorParameters = function () { return [
        { type: core.TemplateRef, },
    ]; };
    return CdkCellDef;
}());
/**
 * Header cell definition for a CDK table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
var CdkHeaderCellDef = /** @class */ (function () {
    function CdkHeaderCellDef(template) {
        this.template = template;
    }
    CdkHeaderCellDef.decorators = [
        { type: core.Directive, args: [{ selector: '[cdkHeaderCellDef]' },] },
    ];
    /** @nocollapse */
    CdkHeaderCellDef.ctorParameters = function () { return [
        { type: core.TemplateRef, },
    ]; };
    return CdkHeaderCellDef;
}());
/**
 * Column definition for the CDK table.
 * Defines a set of cells available for a table column.
 */
var CdkColumnDef = /** @class */ (function () {
    function CdkColumnDef() {
    }
    Object.defineProperty(CdkColumnDef.prototype, "name", {
        get: /**
         * Unique name for this column.
         * @return {?}
         */
        function () { return this._name; },
        set: /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            // If the directive is set without a name (updated programatically), then this setter will
            // trigger with an empty string and should not overwrite the programatically set value.
            if (!name) {
                return;
            }
            this._name = name;
            this.cssClassFriendlyName = name.replace(/[^a-z0-9_-]/ig, '-');
        },
        enumerable: true,
        configurable: true
    });
    CdkColumnDef.decorators = [
        { type: core.Directive, args: [{ selector: '[cdkColumnDef]' },] },
    ];
    /** @nocollapse */
    CdkColumnDef.propDecorators = {
        "name": [{ type: core.Input, args: ['cdkColumnDef',] },],
        "cell": [{ type: core.ContentChild, args: [CdkCellDef,] },],
        "headerCell": [{ type: core.ContentChild, args: [CdkHeaderCellDef,] },],
    };
    return CdkColumnDef;
}());
/**
 * Header cell template container that adds the right classes and role.
 */
var CdkHeaderCell = /** @class */ (function () {
    function CdkHeaderCell(columnDef, elementRef) {
        elementRef.nativeElement.classList.add("cdk-column-" + columnDef.cssClassFriendlyName);
    }
    CdkHeaderCell.decorators = [
        { type: core.Directive, args: [{
                    selector: 'cdk-header-cell, th[cdk-header-cell]',
                    host: {
                        'class': 'cdk-header-cell',
                        'role': 'columnheader',
                    },
                },] },
    ];
    /** @nocollapse */
    CdkHeaderCell.ctorParameters = function () { return [
        { type: CdkColumnDef, },
        { type: core.ElementRef, },
    ]; };
    return CdkHeaderCell;
}());
/**
 * Cell template container that adds the right classes and role.
 */
var CdkCell = /** @class */ (function () {
    function CdkCell(columnDef, elementRef) {
        elementRef.nativeElement.classList.add("cdk-column-" + columnDef.cssClassFriendlyName);
    }
    CdkCell.decorators = [
        { type: core.Directive, args: [{
                    selector: 'cdk-cell, td[cdk-cell]',
                    host: {
                        'class': 'cdk-cell',
                        'role': 'gridcell',
                    },
                },] },
    ];
    /** @nocollapse */
    CdkCell.ctorParameters = function () { return [
        { type: CdkColumnDef, },
        { type: core.ElementRef, },
    ]; };
    return CdkCell;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Returns an error to be thrown when attempting to find an unexisting column.
 * \@docs-private
 * @param {?} id Id whose lookup failed.
 * @return {?}
 */
function getTableUnknownColumnError(id) {
    return Error("Could not find column with id \"" + id + "\".");
}
/**
 * Returns an error to be thrown when two column definitions have the same name.
 * \@docs-private
 * @param {?} name
 * @return {?}
 */
function getTableDuplicateColumnNameError(name) {
    return Error("Duplicate column definition name provided: \"" + name + "\".");
}
/**
 * Returns an error to be thrown when there are multiple rows that are missing a when function.
 * \@docs-private
 * @return {?}
 */
function getTableMultipleDefaultRowDefsError() {
    return Error("There can only be one default row without a when predicate function.");
}
/**
 * Returns an error to be thrown when there are no matching row defs for a particular set of data.
 * \@docs-private
 * @return {?}
 */
function getTableMissingMatchingRowDefError() {
    return Error("Could not find a matching row definition for the provided row data.");
}
/**
 * Returns an error to be thrown when there is no row definitions present in the content.
 * \@docs-private
 * @return {?}
 */
function getTableMissingRowDefsError() {
    return Error('Missing definitions for header and row, ' +
        'cannot determine which columns should be rendered.');
}
/**
 * Returns an error to be thrown when the data source does not match the compatible types.
 * \@docs-private
 * @return {?}
 */
function getTableUnknownDataSourceError() {
    return Error("Provided data source did not match an array, Observable, or DataSource");
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * \@docs-private
 */
var RowPlaceholder = /** @class */ (function () {
    function RowPlaceholder(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
    RowPlaceholder.decorators = [
        { type: core.Directive, args: [{ selector: '[rowPlaceholder]' },] },
    ];
    /** @nocollapse */
    RowPlaceholder.ctorParameters = function () { return [
        { type: core.ViewContainerRef, },
        { type: core.ElementRef, },
    ]; };
    return RowPlaceholder;
}());
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header.
 * \@docs-private
 */
var HeaderRowPlaceholder = /** @class */ (function () {
    function HeaderRowPlaceholder(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
    HeaderRowPlaceholder.decorators = [
        { type: core.Directive, args: [{ selector: '[headerRowPlaceholder]' },] },
    ];
    /** @nocollapse */
    HeaderRowPlaceholder.ctorParameters = function () { return [
        { type: core.ViewContainerRef, },
        { type: core.ElementRef, },
    ]; };
    return HeaderRowPlaceholder;
}());
/**
 * The table template that can be used by the mat-table. Should not be used outside of the
 * material library.
 */
var /** @type {?} */ CDK_TABLE_TEMPLATE = "\n  <ng-container headerRowPlaceholder></ng-container>\n  <ng-container rowPlaceholder></ng-container>";
/**
 * Class used to conveniently type the embedded view ref for rows with a context.
 * \@docs-private
 * @abstract
 * @template T
 */
var /**
 * Class used to conveniently type the embedded view ref for rows with a context.
 * \@docs-private
 * @abstract
 * @template T
 */
RowViewRef = /** @class */ (function (_super) {
    __extends(RowViewRef, _super);
    function RowViewRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RowViewRef;
}(core.EmbeddedViewRef));
/**
 * A data table that renders a header row and data rows. Uses the dataSource input to determine
 * the data to be rendered. The data can be provided either as a data array, an Observable stream
 * that emits the data array to render, or a DataSource with a connect function that will
 * return an Observable stream that emits the data array to render.
 * @template T
 */
var CdkTable = /** @class */ (function () {
    function CdkTable(_differs, _changeDetectorRef, _elementRef, role) {
        this._differs = _differs;
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        /**
         * Subject that emits when the component has been destroyed.
         */
        this._onDestroy = new rxjs.Subject();
        /**
         * Map of all the user's defined columns (header and data cell template) identified by name.
         * Collection populated by the column definitions gathered by `ContentChildren` as well as any
         * custom column definitions added to `_customColumnDefs`.
         */
        this._columnDefsByName = new Map();
        /**
         * Column definitions that were defined outside of the direct content children of the table.
         */
        this._customColumnDefs = new Set();
        /**
         * Row definitions that were defined outside of the direct content children of the table.
         */
        this._customRowDefs = new Set();
        /**
         * Whether the header row definition has been changed. Triggers an update to the header row after
         * content is checked.
         */
        this._headerRowDefChanged = false;
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as a heuristic of what data should be provided.
         */
        this.viewChange = new rxjs.BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
        if (!role) {
            this._elementRef.nativeElement.setAttribute('role', 'grid');
        }
    }
    Object.defineProperty(CdkTable.prototype, "trackBy", {
        get: /**
         * Tracking function that will be used to check the differences in data changes. Used similarly
         * to `ngFor` `trackBy` function. Optimize row operations by identifying a row based on its data
         * relative to the function to know if a row should be added/removed/moved.
         * Accepts a function that takes two parameters, `index` and `item`.
         * @return {?}
         */
        function () { return this._trackByFn; },
        set: /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            if (core.isDevMode() &&
                fn != null && typeof fn !== 'function' && /** @type {?} */ (console) && /** @type {?} */ (console.warn)) {
                console.warn("trackBy must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._trackByFn = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTable.prototype, "dataSource", {
        get: /**
         * The table's source of data, which can be provided in three ways (in order of complexity):
         *   - Simple data array (each object represents one table row)
         *   - Stream that emits a data array each time the array changes
         *   - `DataSource` object that implements the connect/disconnect interface.
         *
         * If a data array is provided, the table must be notified when the array's objects are
         * added, removed, or moved. This can be done by calling the `renderRows()` function which will
         * render the diff since the last table render. If the data array reference is changed, the table
         * will automatically trigger an update to the rows.
         *
         * When providing an Observable stream, the table will trigger an update automatically when the
         * stream emits a new array of data.
         *
         * Finally, when providing a `DataSource` object, the table will use the Observable stream
         * provided by the connect function and trigger updates when that stream emits new data array
         * values. During the table's ngOnDestroy or when the data source is removed from the table, the
         * table will call the DataSource's `disconnect` function (may be useful for cleaning up any
         * subscriptions registered during the connect process).
         * @return {?}
         */
        function () { return this._dataSource; },
        set: /**
         * @param {?} dataSource
         * @return {?}
         */
        function (dataSource) {
            if (this._dataSource !== dataSource) {
                this._switchDataSource(dataSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkTable.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this._elementRef.nativeElement.nodeName === 'TABLE') {
            this._applyNativeTableSections();
        }
        // TODO(andrewseguin): Setup a listener for scrolling, emit the calculated view to viewChange
        this._dataDiffer = this._differs.find([]).create(this._trackByFn);
        // If the table has a header row definition defined as part of its content, flag this as a
        // header row def change so that the content check will render the header row.
        if (this._headerRowDef) {
            this._headerRowDefChanged = true;
        }
    };
    /**
     * @return {?}
     */
    CdkTable.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        // Cache the row and column definitions gathered by ContentChildren and programmatic injection.
        this._cacheRowDefs();
        this._cacheColumnDefs();
        // Make sure that the user has at least added a header row or row def.
        if (!this._headerRowDef && !this._rowDefs.length) {
            throw getTableMissingRowDefsError();
        }
        // Render updates if the list of columns have been changed for the header or row definitions.
        this._renderUpdatedColumns();
        // If the header row definition has been changed, trigger a render to the header row.
        if (this._headerRowDefChanged) {
            this._renderHeaderRow();
            this._headerRowDefChanged = false;
        }
        // If there is a data source and row definitions, connect to the data source unless a
        // connection has already been made.
        if (this.dataSource && this._rowDefs.length > 0 && !this._renderChangeSubscription) {
            this._observeRenderChanges();
        }
    };
    /**
     * @return {?}
     */
    CdkTable.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._rowPlaceholder.viewContainer.clear();
        this._headerRowPlaceholder.viewContainer.clear();
        this._onDestroy.next();
        this._onDestroy.complete();
        if (this.dataSource instanceof collections.DataSource) {
            this.dataSource.disconnect(this);
        }
    };
    /**
     * Renders rows based on the table's latest set of data, which was either provided directly as an
     * input or retrieved through an Observable stream (directly or from a DataSource).
     * Checks for differences in the data since the last diff to perform only the necessary
     * changes (add/remove/move rows).
     *
     * If the table's data source is a DataSource or Observable, this will be invoked automatically
     * each time the provided Observable stream emits a new data array. Otherwise if your data is
     * an array, this function will need to be called to render any changes.
     */
    /**
     * Renders rows based on the table's latest set of data, which was either provided directly as an
     * input or retrieved through an Observable stream (directly or from a DataSource).
     * Checks for differences in the data since the last diff to perform only the necessary
     * changes (add/remove/move rows).
     *
     * If the table's data source is a DataSource or Observable, this will be invoked automatically
     * each time the provided Observable stream emits a new data array. Otherwise if your data is
     * an array, this function will need to be called to render any changes.
     * @return {?}
     */
    CdkTable.prototype.renderRows = /**
     * Renders rows based on the table's latest set of data, which was either provided directly as an
     * input or retrieved through an Observable stream (directly or from a DataSource).
     * Checks for differences in the data since the last diff to perform only the necessary
     * changes (add/remove/move rows).
     *
     * If the table's data source is a DataSource or Observable, this will be invoked automatically
     * each time the provided Observable stream emits a new data array. Otherwise if your data is
     * an array, this function will need to be called to render any changes.
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ changes = this._dataDiffer.diff(this._data);
        if (!changes) {
            return;
        }
        var /** @type {?} */ viewContainer = this._rowPlaceholder.viewContainer;
        changes.forEachOperation(function (record, adjustedPreviousIndex, currentIndex) {
            if (record.previousIndex == null) {
                _this._insertRow(record.item, currentIndex);
            }
            else if (currentIndex == null) {
                viewContainer.remove(adjustedPreviousIndex);
            }
            else {
                var /** @type {?} */ view = /** @type {?} */ (viewContainer.get(adjustedPreviousIndex));
                viewContainer.move(/** @type {?} */ ((view)), currentIndex);
            }
        });
        // Update the meta context of a row's context data (index, count, first, last, ...)
        this._updateRowIndexContext();
        // Update rows that did not get added/removed/moved but may have had their identity changed,
        // e.g. if trackBy matched data on some property but the actual data reference changed.
        changes.forEachIdentityChange(function (record) {
            var /** @type {?} */ rowView = /** @type {?} */ (viewContainer.get(/** @type {?} */ ((record.currentIndex))));
            rowView.context.$implicit = record.item;
        });
    };
    /**
     * Sets the header row definition to be used. Overrides the header row definition gathered by
     * using `ContentChild`, if one exists. Sets a flag that will re-render the header row after the
     * table's content is checked.
     */
    /**
     * Sets the header row definition to be used. Overrides the header row definition gathered by
     * using `ContentChild`, if one exists. Sets a flag that will re-render the header row after the
     * table's content is checked.
     * @param {?} headerRowDef
     * @return {?}
     */
    CdkTable.prototype.setHeaderRowDef = /**
     * Sets the header row definition to be used. Overrides the header row definition gathered by
     * using `ContentChild`, if one exists. Sets a flag that will re-render the header row after the
     * table's content is checked.
     * @param {?} headerRowDef
     * @return {?}
     */
    function (headerRowDef) {
        this._headerRowDef = headerRowDef;
        this._headerRowDefChanged = true;
    };
    /** Adds a column definition that was not included as part of the direct content children. */
    /**
     * Adds a column definition that was not included as part of the direct content children.
     * @param {?} columnDef
     * @return {?}
     */
    CdkTable.prototype.addColumnDef = /**
     * Adds a column definition that was not included as part of the direct content children.
     * @param {?} columnDef
     * @return {?}
     */
    function (columnDef) {
        this._customColumnDefs.add(columnDef);
    };
    /** Removes a column definition that was not included as part of the direct content children. */
    /**
     * Removes a column definition that was not included as part of the direct content children.
     * @param {?} columnDef
     * @return {?}
     */
    CdkTable.prototype.removeColumnDef = /**
     * Removes a column definition that was not included as part of the direct content children.
     * @param {?} columnDef
     * @return {?}
     */
    function (columnDef) {
        this._customColumnDefs.delete(columnDef);
    };
    /** Adds a row definition that was not included as part of the direct content children. */
    /**
     * Adds a row definition that was not included as part of the direct content children.
     * @param {?} rowDef
     * @return {?}
     */
    CdkTable.prototype.addRowDef = /**
     * Adds a row definition that was not included as part of the direct content children.
     * @param {?} rowDef
     * @return {?}
     */
    function (rowDef) {
        this._customRowDefs.add(rowDef);
    };
    /** Removes a row definition that was not included as part of the direct content children. */
    /**
     * Removes a row definition that was not included as part of the direct content children.
     * @param {?} rowDef
     * @return {?}
     */
    CdkTable.prototype.removeRowDef = /**
     * Removes a row definition that was not included as part of the direct content children.
     * @param {?} rowDef
     * @return {?}
     */
    function (rowDef) {
        this._customRowDefs.delete(rowDef);
    };
    /**
     * Update the map containing the content's column definitions.
     * @return {?}
     */
    CdkTable.prototype._cacheColumnDefs = /**
     * Update the map containing the content's column definitions.
     * @return {?}
     */
    function () {
        var _this = this;
        this._columnDefsByName.clear();
        var /** @type {?} */ columnDefs = this._contentColumnDefs ? this._contentColumnDefs.toArray() : [];
        this._customColumnDefs.forEach(function (columnDef) { return columnDefs.push(columnDef); });
        columnDefs.forEach(function (columnDef) {
            if (_this._columnDefsByName.has(columnDef.name)) {
                throw getTableDuplicateColumnNameError(columnDef.name);
            }
            _this._columnDefsByName.set(columnDef.name, columnDef);
        });
    };
    /**
     * Update the list of all available row definitions that can be used.
     * @return {?}
     */
    CdkTable.prototype._cacheRowDefs = /**
     * Update the list of all available row definitions that can be used.
     * @return {?}
     */
    function () {
        var _this = this;
        this._rowDefs = this._contentRowDefs ? this._contentRowDefs.toArray() : [];
        this._customRowDefs.forEach(function (rowDef) { return _this._rowDefs.push(rowDef); });
        var /** @type {?} */ defaultRowDefs = this._rowDefs.filter(function (def) { return !def.when; });
        if (defaultRowDefs.length > 1) {
            throw getTableMultipleDefaultRowDefsError();
        }
        this._defaultRowDef = defaultRowDefs[0];
    };
    /**
     * Check if the header or rows have changed what columns they want to display. If there is a diff,
     * then re-render that section.
     * @return {?}
     */
    CdkTable.prototype._renderUpdatedColumns = /**
     * Check if the header or rows have changed what columns they want to display. If there is a diff,
     * then re-render that section.
     * @return {?}
     */
    function () {
        var _this = this;
        // Re-render the rows when the row definition columns change.
        this._rowDefs.forEach(function (def) {
            if (!!def.getColumnsDiff()) {
                // Reset the data to an empty array so that renderRowChanges will re-render all new rows.
                // Reset the data to an empty array so that renderRowChanges will re-render all new rows.
                _this._dataDiffer.diff([]);
                _this._rowPlaceholder.viewContainer.clear();
                _this.renderRows();
            }
        });
        // Re-render the header row if there is a difference in its columns.
        if (this._headerRowDef && this._headerRowDef.getColumnsDiff()) {
            this._renderHeaderRow();
        }
    };
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the row placeholder. Otherwise start listening for new data.
     * @param {?} dataSource
     * @return {?}
     */
    CdkTable.prototype._switchDataSource = /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the row placeholder. Otherwise start listening for new data.
     * @param {?} dataSource
     * @return {?}
     */
    function (dataSource) {
        this._data = [];
        if (this.dataSource instanceof collections.DataSource) {
            this.dataSource.disconnect(this);
        }
        // Stop listening for data from the previous data source.
        if (this._renderChangeSubscription) {
            this._renderChangeSubscription.unsubscribe();
            this._renderChangeSubscription = null;
        }
        if (!dataSource) {
            if (this._dataDiffer) {
                this._dataDiffer.diff([]);
            }
            this._rowPlaceholder.viewContainer.clear();
        }
        this._dataSource = dataSource;
    };
    /**
     * Set up a subscription for the data provided by the data source.
     * @return {?}
     */
    CdkTable.prototype._observeRenderChanges = /**
     * Set up a subscription for the data provided by the data source.
     * @return {?}
     */
    function () {
        var _this = this;
        // If no data source has been set, there is nothing to observe for changes.
        if (!this.dataSource) {
            return;
        }
        var /** @type {?} */ dataStream;
        // Check if the datasource is a DataSource object by observing if it has a connect function.
        // Cannot check this.dataSource['connect'] due to potential property renaming, nor can it
        // checked as an instanceof DataSource<T> since the table should allow for data sources
        // that did not explicitly extend DataSource<T>.
        if ((/** @type {?} */ (this.dataSource)).connect instanceof Function) {
            dataStream = (/** @type {?} */ (this.dataSource)).connect(this);
        }
        else if (this.dataSource instanceof rxjs.Observable) {
            dataStream = this.dataSource;
        }
        else if (Array.isArray(this.dataSource)) {
            dataStream = rxjs.of(this.dataSource);
        }
        if (dataStream === undefined) {
            throw getTableUnknownDataSourceError();
        }
        this._renderChangeSubscription = dataStream
            .pipe(operators.takeUntil(this._onDestroy))
            .subscribe(function (data) {
            _this._data = data;
            _this.renderRows();
        });
    };
    /**
     * Clears any existing content in the header row placeholder and creates a new embedded view
     * in the placeholder using the header row definition.
     * @return {?}
     */
    CdkTable.prototype._renderHeaderRow = /**
     * Clears any existing content in the header row placeholder and creates a new embedded view
     * in the placeholder using the header row definition.
     * @return {?}
     */
    function () {
        // Clear the header row placeholder if any content exists.
        if (this._headerRowPlaceholder.viewContainer.length > 0) {
            this._headerRowPlaceholder.viewContainer.clear();
        }
        var /** @type {?} */ cells = this._getHeaderCellTemplatesForRow(this._headerRowDef);
        if (!cells.length) {
            return;
        }
        // TODO(andrewseguin): add some code to enforce that exactly
        //   one CdkCellOutlet was instantiated as a result
        //   of `createEmbeddedView`.
        this._headerRowPlaceholder.viewContainer
            .createEmbeddedView(this._headerRowDef.template, { cells: cells });
        cells.forEach(function (cell) {
            if (CdkCellOutlet.mostRecentCellOutlet) {
                CdkCellOutlet.mostRecentCellOutlet._viewContainer.createEmbeddedView(cell.template, {});
            }
        });
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Finds the matching row definition that should be used for this row data. If there is only
     * one row definition, it is returned. Otherwise, find the row definition that has a when
     * predicate that returns true with the data. If none return true, return the default row
     * definition.
     */
    /**
     * Finds the matching row definition that should be used for this row data. If there is only
     * one row definition, it is returned. Otherwise, find the row definition that has a when
     * predicate that returns true with the data. If none return true, return the default row
     * definition.
     * @param {?} data
     * @param {?} i
     * @return {?}
     */
    CdkTable.prototype._getRowDef = /**
     * Finds the matching row definition that should be used for this row data. If there is only
     * one row definition, it is returned. Otherwise, find the row definition that has a when
     * predicate that returns true with the data. If none return true, return the default row
     * definition.
     * @param {?} data
     * @param {?} i
     * @return {?}
     */
    function (data, i) {
        if (this._rowDefs.length == 1) {
            return this._rowDefs[0];
        }
        var /** @type {?} */ rowDef = this._rowDefs.find(function (def) { return def.when && def.when(i, data); }) || this._defaultRowDef;
        if (!rowDef) {
            throw getTableMissingMatchingRowDefError();
        }
        return rowDef;
    };
    /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     * @param {?} rowData
     * @param {?} index
     * @return {?}
     */
    CdkTable.prototype._insertRow = /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     * @param {?} rowData
     * @param {?} index
     * @return {?}
     */
    function (rowData, index) {
        var /** @type {?} */ row = this._getRowDef(rowData, index);
        // Row context that will be provided to both the created embedded row view and its cells.
        var /** @type {?} */ context = { $implicit: rowData };
        // TODO(andrewseguin): add some code to enforce that exactly one
        //   CdkCellOutlet was instantiated as a result  of `createEmbeddedView`.
        this._rowPlaceholder.viewContainer.createEmbeddedView(row.template, context, index);
        this._getCellTemplatesForRow(row).forEach(function (cell) {
            if (CdkCellOutlet.mostRecentCellOutlet) {
                CdkCellOutlet.mostRecentCellOutlet._viewContainer
                    .createEmbeddedView(cell.template, context);
            }
        });
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Updates the index-related context for each row to reflect any changes in the index of the rows,
     * e.g. first/last/even/odd.
     * @return {?}
     */
    CdkTable.prototype._updateRowIndexContext = /**
     * Updates the index-related context for each row to reflect any changes in the index of the rows,
     * e.g. first/last/even/odd.
     * @return {?}
     */
    function () {
        var /** @type {?} */ viewContainer = this._rowPlaceholder.viewContainer;
        for (var /** @type {?} */ index = 0, /** @type {?} */ count = viewContainer.length; index < count; index++) {
            var /** @type {?} */ viewRef = /** @type {?} */ (viewContainer.get(index));
            viewRef.context.index = index;
            viewRef.context.count = count;
            viewRef.context.first = index === 0;
            viewRef.context.last = index === count - 1;
            viewRef.context.even = index % 2 === 0;
            viewRef.context.odd = !viewRef.context.even;
        }
    };
    /**
     * Returns the cell template definitions to insert into the header
     * as defined by its list of columns to display.
     * @param {?} headerDef
     * @return {?}
     */
    CdkTable.prototype._getHeaderCellTemplatesForRow = /**
     * Returns the cell template definitions to insert into the header
     * as defined by its list of columns to display.
     * @param {?} headerDef
     * @return {?}
     */
    function (headerDef) {
        var _this = this;
        if (!headerDef || !headerDef.columns) {
            return [];
        }
        return Array.from(headerDef.columns, function (columnId) {
            var /** @type {?} */ column = _this._columnDefsByName.get(columnId);
            if (!column) {
                throw getTableUnknownColumnError(columnId);
            }
            return column.headerCell;
        });
    };
    /**
     * Returns the cell template definitions to insert in the provided row
     * as defined by its list of columns to display.
     * @param {?} rowDef
     * @return {?}
     */
    CdkTable.prototype._getCellTemplatesForRow = /**
     * Returns the cell template definitions to insert in the provided row
     * as defined by its list of columns to display.
     * @param {?} rowDef
     * @return {?}
     */
    function (rowDef) {
        var _this = this;
        if (!rowDef.columns) {
            return [];
        }
        return Array.from(rowDef.columns, function (columnId) {
            var /** @type {?} */ column = _this._columnDefsByName.get(columnId);
            if (!column) {
                throw getTableUnknownColumnError(columnId);
            }
            return column.cell;
        });
    };
    /**
     * Adds native table sections (e.g. tbody) and moves the row placeholders into them.
     * @return {?}
     */
    CdkTable.prototype._applyNativeTableSections = /**
     * Adds native table sections (e.g. tbody) and moves the row placeholders into them.
     * @return {?}
     */
    function () {
        var /** @type {?} */ thead = document.createElement('thead');
        var /** @type {?} */ tbody = document.createElement('tbody');
        this._elementRef.nativeElement.appendChild(thead);
        this._elementRef.nativeElement.appendChild(tbody);
        thead.appendChild(this._headerRowPlaceholder.elementRef.nativeElement);
        tbody.appendChild(this._rowPlaceholder.elementRef.nativeElement);
    };
    CdkTable.decorators = [
        { type: core.Component, args: [{selector: 'cdk-table, table[cdk-table]',
                    exportAs: 'cdkTable',
                    template: CDK_TABLE_TEMPLATE,
                    host: {
                        'class': 'cdk-table',
                    },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    CdkTable.ctorParameters = function () { return [
        { type: core.IterableDiffers, },
        { type: core.ChangeDetectorRef, },
        { type: core.ElementRef, },
        { type: undefined, decorators: [{ type: core.Attribute, args: ['role',] },] },
    ]; };
    CdkTable.propDecorators = {
        "trackBy": [{ type: core.Input },],
        "dataSource": [{ type: core.Input },],
        "_rowPlaceholder": [{ type: core.ViewChild, args: [RowPlaceholder,] },],
        "_headerRowPlaceholder": [{ type: core.ViewChild, args: [HeaderRowPlaceholder,] },],
        "_contentColumnDefs": [{ type: core.ContentChildren, args: [CdkColumnDef,] },],
        "_contentRowDefs": [{ type: core.ContentChildren, args: [CdkRowDef,] },],
        "_headerRowDef": [{ type: core.ContentChild, args: [CdkHeaderRowDef,] },],
    };
    return CdkTable;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ EXPORTED_DECLARATIONS = [
    CdkTable,
    CdkRowDef,
    CdkCellDef,
    CdkCellOutlet,
    CdkHeaderCellDef,
    CdkColumnDef,
    CdkCell,
    CdkRow,
    CdkHeaderCell,
    CdkHeaderRow,
    CdkHeaderRowDef,
    RowPlaceholder,
    HeaderRowPlaceholder,
];
var CdkTableModule = /** @class */ (function () {
    function CdkTableModule() {
    }
    CdkTableModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: EXPORTED_DECLARATIONS,
                    declarations: EXPORTED_DECLARATIONS
                },] },
    ];
    return CdkTableModule;
}());

exports.DataSource = collections.DataSource;
exports.RowPlaceholder = RowPlaceholder;
exports.HeaderRowPlaceholder = HeaderRowPlaceholder;
exports.CDK_TABLE_TEMPLATE = CDK_TABLE_TEMPLATE;
exports.CdkTable = CdkTable;
exports.CdkCellDef = CdkCellDef;
exports.CdkHeaderCellDef = CdkHeaderCellDef;
exports.CdkColumnDef = CdkColumnDef;
exports.CdkHeaderCell = CdkHeaderCell;
exports.CdkCell = CdkCell;
exports.CDK_ROW_TEMPLATE = CDK_ROW_TEMPLATE;
exports.BaseRowDef = BaseRowDef;
exports.CdkHeaderRowDef = CdkHeaderRowDef;
exports.CdkRowDef = CdkRowDef;
exports.CdkCellOutlet = CdkCellOutlet;
exports.CdkHeaderRow = CdkHeaderRow;
exports.CdkRow = CdkRow;
exports.CdkTableModule = CdkTableModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-table.umd.js.map
