import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable, debounceTime, of, switchMap } from 'rxjs';
import {
  SuggestedLocationResult,
  SuggestedLocations,
} from 'src/app/types/journeys';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class SearchLocationComponent implements OnInit {
  @Input() isRequired?: string;
  @Output() onSelectedValue = new EventEmitter<any>();
  suggestions: Observable<SuggestedLocationResult[]>;
  inputControl = new FormControl('');
  noResults = false;
  isSearching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.isRequired) {
      this.inputControl.setValidators([Validators.required]);
    }

    this.inputControl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((valueChange) => {
          this.isSearching = true;
          if (valueChange && this.isMinLength(valueChange)) {
            const url = new URL(environment.openCageURL);
            url.searchParams.append('q', valueChange);
            return this.http.get<SuggestedLocations>(url.href);
          }
          return of({ results: [] });
        })
      )
      .subscribe(({ results }) => {
        if (results.length) {
          this.suggestions = of(results);
          this.isSearching = false;
        } else {
          this.isSearching = false;
          this.noResults = true;
        }
      });
  }

  handleSelectedOption({ formatted }: SuggestedLocationResult) {
    this.onSelectedValue.emit(formatted);

    return this.inputControl.setValue(formatted);
  }

  isMinLength(value: string) {
    return value.length >= 3;
  }
}
