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
var search_box_1 = require("angular-instantsearch/search-box/search-box");
var router_1 = require("@angular/router");
var angular_instantsearch_1 = require("angular-instantsearch");
var messaging_service_1 = require("../../data/services/messaging.service");
var SearchComponent = (function () {
    function SearchComponent(router, activatedRoute, messagingService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.messagingService = messagingService;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchBox.change.subscribe(function (data) {
            _this.searchTerm = data;
        });
        this.instantSearch.change.subscribe(function (data) {
            /*this.searchTerm = data.results.query;*/
            _this.hasResults = data.results.hits.length > 0;
        });
        /*this.activatedRoute.paramMap
          .map((params: ParamMap) => +params.get('query') + '')
          .subscribe(query => {
            if (query.length) {
              this.search = query;
            }
          });*/
    };
    SearchComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.messagingServiceSubscription = this.messagingService.getObservable().subscribe(function (message) {
            switch (message.getChannel()) {
                case 'onMainComponentReady':
                    _this.getQuery(message.getData());
                    break;
            }
        });
    };
    SearchComponent.prototype.getQuery = function (callback) {
        this.activatedRoute.paramMap
            .map(function (params) { return params.get('query'); })
            .subscribe(function (query) {
            var input = document.getElementsByClassName('ais-SearchBox-input')[0];
            input.value = query;
            callback(query);
        });
    };
    SearchComponent.prototype.ngOnDestroy = function () {
        this.messagingServiceSubscription.unsubscribe();
    };
    SearchComponent.prototype.getLink = function (hit) {
        var result = '';
        switch (hit.type) {
            case 'Contratista':
                result = '/app/view-contractor/' + hit.entity_id;
                break;
            case 'Encuesta':
                result = '/app/survey/' + hit.entity_id;
                break;
            case 'Mapa':
                result = '/app/map/' + hit.entity_id;
                break;
            case 'bolsa':
                result = '/app/view-pools-of-contracts/' + hit.entity_id;
                break;
            default:
                result = '';
        }
        return result;
    };
    SearchComponent.prototype.openResult = function (hit) {
        var link = [this.getLink(hit)];
        if (link[0].length > 0) {
            this.router.navigate(link); // TODO Wendy Mayerly to fix router navigation bug
            // window.location.href = 'http://localhost:6200' + link;
        }
    };
    return SearchComponent;
}());
__decorate([
    core_1.ViewChild('searchBox'),
    __metadata("design:type", search_box_1.NgAisSearchBox)
], SearchComponent.prototype, "searchBox", void 0);
__decorate([
    core_1.ViewChild('instantSearch'),
    __metadata("design:type", angular_instantsearch_1.NgAisInstantSearch)
], SearchComponent.prototype, "instantSearch", void 0);
SearchComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        messaging_service_1.MessagingService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map