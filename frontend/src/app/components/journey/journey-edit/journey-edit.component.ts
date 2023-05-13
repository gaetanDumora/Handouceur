import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormGroup,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  getError,
  getSelectedJourney,
  isLoading,
} from '../store/journey.selectors';
import { JOURNEY_ACTIONS } from '../store/journey.actions';
import { MatTable } from '@angular/material/table';
import { JourneyService } from '../journey.service';
import { Journey, SuggestedLocationResult } from 'src/app/models/journeys';

@Component({
  selector: 'app-journey-edit',
  templateUrl: './journey-edit.component.html',
  styleUrls: ['./journey-edit.component.scss'],
})
export class JourneyEditComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id');
  isLoading = this.store.select(isLoading);
  error = this.store.select(getError);
  editForm = new UntypedFormGroup({
    title: new FormControl(),
    subtitle: new FormControl(),
    location: new FormControl(),
    coordinates: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    images: new FormControl([]),
    autonomy: new FormControl(),
    recreation: new FormControl(),
    hosting: new FormControl(),
    transport: new FormControl(),
    groupeSize: new FormControl(),
  });
  formData = new FormData();
  formdataLength = 0;
  selectedJourney: Observable<Journey | null>;
  suggestedLocations: Observable<any>;

  deletedFromDataSource: Set<string> = new Set();
  dataSource = new BehaviorSubject<string[]>([]); // Make it as an Observable to avoid to call renderRows() manually
  @ViewChild(MatTable) table: MatTable<string>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private journeyService: JourneyService
  ) {}

  ngOnInit(): void {
    if (this.id !== 'new') {
      this.store.dispatch(
        JOURNEY_ACTIONS.loadSelectedJourney({ id: Number(this.id) })
      );
      this.selectedJourney = this.store.select(getSelectedJourney);
      this.preFillForm();
    }
  }
  private preFillForm() {
    this.editForm.addControl('id', new FormControl());
    this.selectedJourney.subscribe((journey) => {
      if (journey?.images?.length) {
        this.dataSource.next(journey.images);
      }
      if (journey) {
        Object.keys(this.editForm.value).forEach((formKey) => {
          this.editForm.patchValue({
            [formKey]: journey[formKey as keyof Journey] ?? null,
          });
        });
      }
    });
  }
  checkValidation(input: string) {
    return (
      this.editForm.get(input)?.invalid &&
      (this.editForm.get(input)?.dirty || this.editForm.get(input)?.touched)
    );
  }

  getLocation(input: string) {
    this.journeyService.searchLocation(input).subscribe(({ results }) => {
      this.suggestedLocations = of(results);
    });
  }
  setNewLocation(value: SuggestedLocationResult) {
    this.editForm.patchValue({
      location: value.formatted,
      coordinates: [value.geometry.lat, value.geometry.lng],
    });
    this.suggestedLocations = of(null);
  }
  onFileSelected(event: any) {
    const existingFileNames = this.editForm.get('images')?.value ?? [];
    const selectedFiles: File[] = Array.from(event.target?.files);
    const selectedFilesNames = selectedFiles.map((f) => f.name);

    const images = [...existingFileNames, ...selectedFilesNames];
    this.editForm.patchValue({ images });
    this.dataSource.next([...this.dataSource?.value, ...selectedFilesNames]);

    selectedFiles.forEach((file) => this.formData.append(file.name, file));
    this.formdataLength = selectedFiles.length;
  }

  removeRow(input: string) {
    this.deletedFromDataSource.add(input);
    const images = this.dataSource.value.filter((name) => name !== input);
    this.dataSource.next(images);
    this.editForm.patchValue({ images });
    this.formData.delete(input);
    this.formdataLength--;
  }

  submitForm() {
    this.store.dispatch(
      JOURNEY_ACTIONS.upsertJourney({ journey: this.editForm.value })
    );

    if (this.formdataLength) {
      this.store.dispatch(
        JOURNEY_ACTIONS.uploadImages({ images: this.formData })
      );
      this.formData = new FormData();
    }
    if (this.deletedFromDataSource.size) {
      this.store.dispatch(
        JOURNEY_ACTIONS.deleteImages({
          images: [...this.deletedFromDataSource],
        })
      );
      this.deletedFromDataSource.clear();
    }
  }
}
