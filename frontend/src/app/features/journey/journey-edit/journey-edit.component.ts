import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  getError,
  getSelectedJourney,
  isLoading,
} from '../../../store/journey/journey.selectors';
import { JOURNEY_ACTIONS } from '../../../store/journey/journey.actions';
import { MatTable, MatTableModule } from '@angular/material/table';
import { JourneyService } from '../../../store/journey/journey.service';
import {
  AutonomyStatus,
  Journey,
  SuggestedLocationResult,
} from 'src/app/types/journeys';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AutocompleteComponent } from 'src/app/shared/autocomplete/autocomplete.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-journey-edit',
  templateUrl: './journey-edit.component.html',
  styleUrls: ['./journey-edit.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatTableModule,
    MatOptionModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class JourneyEditComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id');
  isLoading = this.store.select(isLoading);
  error = this.store.select(getError);
  editForm = new UntypedFormGroup({
    title: new FormControl(),
    subtitle: new FormControl(),
    location: new FormControl(),
    coordinates: new FormControl([48.86, 2.35]),
    startDate: new FormControl(new Date()),
    endDate: new FormControl(new Date()),
    price: new FormControl(0, Validators.pattern('[0-9]+')),
    description: new FormControl(),
    images: new FormControl([]),
    autonomy: new FormControl(AutonomyStatus.RELATIVE),
    recreation: new FormControl(),
    hosting: new FormControl(),
    transport: new FormControl(),
    groupSize: new FormControl(0),
    companions: new FormControl(0),
  });
  formData = new FormData();
  formdataLength = 0;
  selectedJourney: Observable<Journey | null>;
  suggestedLocations: Observable<any>;

  deletedFromDataSource: Set<string> = new Set();
  dataSource = new BehaviorSubject<string[]>([]); // Make it as an Observable to avoid to call renderRows() manually
  @ViewChild(MatTable) table: MatTable<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private journeyService: JourneyService,
    private snackBar: MatSnackBar
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
      const images = journey?.images?.length ? journey?.images : [];
      this.dataSource.next(images);

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

    this.snackBar.open(
      `Update journey: "${this.editForm.get('title')?.value}" `,
      'OK',
      {
        duration: 2000,
      }
    );
    // setTimeout(() => this.redirectHome(), 2000);
    // this.redirectHome();
  }

  deleteJourney() {
    const images = this.editForm.get('images')?.value;
    this.store.dispatch(JOURNEY_ACTIONS.deleteJourney({ id: Number(this.id) }));
    if (images.length) {
      this.store.dispatch(JOURNEY_ACTIONS.deleteImages({ images }));
    }
    this.redirectHome();
  }

  private redirectHome() {
    this.router.navigate(['/home']);
  }
}
