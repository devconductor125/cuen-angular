"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/*const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);*/
var ReportsComponent = (function () {
    function ReportsComponent() {
    }
    ReportsComponent.prototype.ngOnInit = function () {
        this.initChart2();
    };
    ReportsComponent.prototype.ngOnDestroy = function () {
    };
    ReportsComponent.prototype.initChart2 = function () {
        /*const myChart = Highcharts.chart('high-chart', {
    
          chart: {
            type: 'column'
          },
    
          title: {
            text: 'Styling axes and columns'
          },
    
          yAxis: [{
            className: 'highcharts-color-0',
            title: {
              text: 'Primary axis'
            }
          }, {
            className: 'highcharts-color-1',
            opposite: true,
            title: {
              text: 'Secondary axis'
            }
          }],
    
          plotOptions: {
            column: {
              borderRadius: 5
            }
          },
    
          series: [{
            data: [1, 3, 2, 4]
          }, {
            data: [324, 124, 547, 221],
            yAxis: 1
          }]
        });*/
    };
    return ReportsComponent;
}());
ReportsComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-reports',
        templateUrl: './reports.component.html',
        styleUrls: ['./reports.component.css']
    }),
    __metadata("design:paramtypes", [])
], ReportsComponent);
exports.ReportsComponent = ReportsComponent;
//# sourceMappingURL=reports.component.js.map