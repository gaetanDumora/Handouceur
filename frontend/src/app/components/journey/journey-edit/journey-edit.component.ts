import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ErrorType } from 'src/app/models/error';
import { Journey } from 'src/app/models/journeys';
import {
  getError,
  getSelectedJourney,
  isLoading,
} from '../state/journey.selectors';
import { JOURNEY_ACTIONS } from '../state/journey.actions';

@Component({
  selector: 'app-journey-edit',
  templateUrl: './journey-edit.component.html',
  styleUrls: ['./journey-edit.component.scss'],
})
export class JourneyEditComponent implements OnInit {
  journeyId: number;
  journey: Observable<Journey | null>;
  isLoading: Observable<boolean>;
  error: Observable<ErrorType>;
  editForm: FormGroup;
  fileNames: string[] = [];
  formData = new FormData();

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.loadJourney();
    this.journeyId = Number(this.route.snapshot.paramMap.get('id')!);
    this.isLoading = this.store.select(isLoading);
    this.journey = this.store.select(getSelectedJourney);
    this.error = this.store.select(getError);
    this.journey.subscribe((journey) => {
      this.editForm = new FormGroup({
        id: new FormControl(journey?.id ?? null),
        title: new FormControl(journey?.title ?? null),
        subtitle: new FormControl(journey?.subtitle ?? null),
        location: new FormControl(journey?.location ?? null),
        coordinates: new FormControl(journey?.coordinates ?? null),
        startDate: new FormControl(journey?.startDate ?? null),
        endDate: new FormControl(journey?.endDate ?? null),
        price: new FormControl(journey?.price ?? null),
        description: new FormControl(journey?.description ?? null),
        imageUrl: new FormControl(journey?.imageUrl ?? null),
        autonomy: new FormControl(journey?.autonomy ?? null),
        recreation: new FormControl(journey?.recreation ?? null),
        hosting: new FormControl(journey?.hosting ?? null),
        transport: new FormControl(journey?.transport ?? null),
        groupeSize: new FormControl(journey?.groupSize ?? null),
      });
    });
  }

  private loadJourney() {
    return this.store.dispatch(
      JOURNEY_ACTIONS.loadSelectedJourney({ id: this.journeyId })
    );
  }

  checkValidation(input: string) {
    return (
      this.editForm.get(input)?.invalid &&
      (this.editForm.get(input)?.dirty || this.editForm.get(input)?.touched)
    );
  }

  onFileSelected(event: any) {
    const files: File[] = Array.from(event.target?.files);
    for (const file of files) {
      this.fileNames.push(file.name);
      this.formData.append(this.journeyId.toString(), file);
    }
  }
  onSubmit() {
    Object.keys(this.editForm.value).forEach((key) =>
      this.formData.append(key, this.editForm.value[key])
    );
    this.formData.forEach((e) => console.log(e));
    this.store.dispatch(
      JOURNEY_ACTIONS.upsertJourney({ journey: this.editForm.value })
    );
    this.loadJourney();
  }
}
