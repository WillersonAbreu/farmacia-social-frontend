import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DonationsService } from 'src/app/pages/donations/donations.service';
import Swal from 'sweetalert2';

// FontAwsome Icons
import { faSearch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

  faSearch = faSearch;


  donations = [
    {
      id: 1,
      title: "Amoxicilina",
      pictureFile: "https://static.tuasaude.com/img/posts/2014/07/7f497048a7a864e6190b53caf18bc07f-640_427.jpeg",
      description: "Extrato de Amoxicilina",
      stripe: "verde",
      amount: 1,
      dosage: 500,
      shelfLife: "2020-10-10",
      manufacturyDate: "2020-10-10",
      statusId: "publicado",
    },
    {
      id: 2,
      title: "Doril",
      pictureFile: "https://th.bing.com/th/id/OIP.iniFTNfFYpmyFgyuVO0KawHaHa?pid=Api&rs=1",
      description: "Tomou Doril? A dor sumiu",
      stripe: "amarela",
      amount: 2,
      dosage: 250,
      shelfLife: "2020-10-20",
      manufacturyDate: "2020-10-10",
      statusId: "publicado",
    },
    {
      id: 3,
      title: "Benzetacil",
      pictureFile: "https://th.bing.com/th/id/OIP.B4qyfAw4rbLk-Q4g9ZyuYQAAAA?pid=Api&rs=1",
      description: "Benzetacil Nutella em cartela",
      stripe: "vermelha",
      amount: 4,
      dosage: 1000,
      shelfLife: "2020-10-30",
      manufacturyDate: "2020-10-10",
      statusId: "publicado",
    },
  ];

  totalPages = 0;
  totalElements = 0;
  pageNumber = 0;
  pageSize = 5;
  pageIndexes: Array<number> = [];
  filter = '';

  constructor(private service: DonationsService) { }

  ngOnInit() {
    this.getAll(this.pageNumber);
    //this.getAll();
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
    this.service.getPagableAndSorting(pageNumber, this.pageSize, this.filter).subscribe(
      (data) => {
        this.donations = data.content;
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
      }
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
