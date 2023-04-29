import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit, OnChanges {
  @Input() isRequired?: string;
  @Input() initialValue?: string | null;
  @Input() placeholder?: string;
  @Input() showSuggestionsKey?: string;
  @Input() suggestions: Record<string, any>[] | null;
  @Output() onInputChanges = new EventEmitter<string>();
  @Output() onSelectedValue = new EventEmitter<any>();
  // Inner form control to link input text changes to mat autocomplete
  lengthToTriggerSearch = 3;
  inputControl = new FormControl('');
  noResults = false;
  isSearching = false;

  constructor() {}

  ngOnInit() {
    if (this.isRequired) {
      this.inputControl.setValidators([Validators.required]);
    }
    this.inputControl.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
      this.triggerChanges(val);
    });
  }

  triggerChanges(val: string | null) {
    if (val && this.isMinLength(val)) {
      this.isSearching = true;
      return this.onInputChanges.emit(val);
    }
    this.isSearching = false;
    this.noResults = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialValue) {
      this.inputControl.setValue(this.initialValue);
      this.initialValue = null;
      return;
    }
    if (changes.suggestions && this.isSearching) {
      this.isSearching = false;
      if (
        !changes.suggestions.firstChange &&
        !changes.suggestions.currentValue?.length
      ) {
        return (this.noResults = true);
      }
      return (this.noResults = false);
    }
    return;
  }

  handleSelectedOption(value: any) {
    this.onSelectedValue.emit(value);
    if (this.showSuggestionsKey) {
      return this.inputControl.setValue(value[this.showSuggestionsKey]);
    }
    return this.inputControl.setValue(value);
  }

  isMinLength(value: string) {
    return value.length >= this.lengthToTriggerSearch;
  }
}
