import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DonationsService } from 'src/app/pages/donations/donations.service';
import Swal from 'sweetalert2';

// FontAwsome Icons
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { IUserType } from 'src/app/core/store/user/user.actions';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css'],
})
export class ShowcaseComponent implements OnInit {
  faSearch = faSearch;
  donations = [];
  totalPages = 0;
  totalElements = 0;
  pageNumber = 0;
  pageSize = 5;
  pageIndexes: Array<number> = [];
  filter = '';
  loggedUserId: number;
  subscription: any;

  constructor(
    private service: DonationsService,
    private store: Store<{ user: IUserType }>,
    private router: Router
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }

    this.subscription = this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.router.navigated = false;
      }
    });

    this.store
      .select('user')
      .subscribe((user) => (this.loggedUserId = user.id));
  }

  ngOnInit() {
    this.getAll(this.pageNumber);
    //this.getAll();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onChange(value: string) {
    this.filter = value;
  }

  submit() {
    this.getAll(this.pageNumber);
  }

  // getAll() {
  //   this.service.getAll().subscribe(
  //     data => this.donations = data,
  //     // erro => this.users = erro,
  //     erro => console.log(erro),
  //   );
  // }
  getAll(pageNumber: number) {
    // this.loading();
    this.service
      .getPagableAndSorting(pageNumber, this.pageSize, this.filter)
      .subscribe(
        (data) => {
          if (data.content.length > 0) {
            // const filteredDonations = [];

            // data.content.map(donation => {
            //   if(donation.userId != this.loggedUserId){
            //     filteredDonations.push(donation);
            //   }
            // });

            this.donations = data.content;
          }
          this.totalPages = data.totalPages;
          this.totalElements = data.totalElements;
          this.pageNumber = data.number;
          this.pageIndexes = Array(this.totalPages)
            .fill(0)
            .map((x, i) => i);
          Swal.close();
        },
        (err) => console.log(err)
      );
  }

  loading() {
    Swal.fire({
      title: 'Aguarde!',
      text: 'Estamos trabalhando ao máximo.',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  }

  paginate(event) {
    this.getAll(event.page);
    //  this.getAll();
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
  }
}
