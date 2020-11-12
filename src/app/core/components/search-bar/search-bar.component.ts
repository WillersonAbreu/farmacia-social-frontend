import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// FontAwsome Icons
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  faSearch = faSearch;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private service: DonationsService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  submit() {
    const donation = this.form.value;
    console.log(donation);
    // this.service.store(donation).subscribe(
    //   data => this.router.navigate(['doacoes']),
    //   erro => console.log(erro)
    // );

  }

}
