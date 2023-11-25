import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgAisSearchBox} from 'angular-instantsearch/search-box/search-box';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NgAisInstantSearch} from 'angular-instantsearch';
import {MessagingService} from '../../data/services/messaging.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'cuenca-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
  public searchTerm: String = '';
  public hasResults: Boolean;
  protected messagingServiceSubscription: Subscription;
  @ViewChild('searchBox') searchBox: NgAisSearchBox;
  @ViewChild('instantSearch') instantSearch: NgAisInstantSearch;

  constructor(protected router: Router,
              protected activatedRoute: ActivatedRoute,
              private messagingService: MessagingService) {
  }

  ngOnInit(): void {
    this.searchBox.change.subscribe(
      (data: String) => {
        this.searchTerm = data;
      });
    this.instantSearch.change.subscribe(
      (data: any) => {
        this.hasResults = data.results.hits.length > 0;
      });
  }

  ngAfterViewInit(): void {
    this.messagingServiceSubscription = this.messagingService.getObservable()
      .subscribe(message => {
        switch (message.getChannel()) {
          case 'onMainComponentReady':
            this.getQuery(message.getData());
            break;
          case 'onSearchTerm':
            const query: string = message.getData();
            this.search(query);
            break;
        }
      });
    this.getQuery(null);
  }

  protected getQuery(callback: any) {
    const component = this;
    this.activatedRoute.paramMap
      .map((params: ParamMap) => params.get('query'))
      .delay(500)
      .subscribe((query: string) => {
        component.search(query);
        if (callback != null) {
          callback(query);
        }
      });
  }

  private search(query: string): void {
    if (query && query.length > 0) {
      this.searchTerm = query;
      this.searchBox.state.refine(query);
    } else {
      this.searchTerm = '';
    }
  }

  ngOnDestroy(): void {
    this.messagingServiceSubscription.unsubscribe();
  }

  getLink(hit: any): String {
    let result = '';
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
  }

  openResult(hit: any): void {
    const link = [this.getLink(hit)];
    if (link[0].length > 0) {
      this.router.navigate(link); // TODO Wendy Mayerly to fix router navigation bug
      // window.location.href = 'http://localhost:6200' + link;
    }
  }
}
