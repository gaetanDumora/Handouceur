import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import {
  getError,
  getSelectedJourney,
  isLoading,
} from '../state/journey.selectors';
import { JOURNEY_ACTIONS } from '../state/journey.actions';
import { MatTable } from '@angular/material/table';

interface DataTable {
  index: number;
  name: string;
}

@Component({
  selector: 'app-journey-edit',
  templateUrl: './journey-edit.component.html',
  styleUrls: ['./journey-edit.component.scss'],
})
export class JourneyEditComponent implements OnInit {
  id = Number(this.route.snapshot.paramMap.get('id')!);
  isLoading = this.store.select(isLoading);
  error = this.store.select(getError);
  editForm: FormGroup;
  formData = new FormData();
  selectedJourney = this.store.select(getSelectedJourney);

  displayedColumns: string[] = ['index', 'name', 'delete'];
  deletedFromDataSource: string[] = [];
  dataSource: BehaviorSubject<DataTable[]>; // Make it as an Observable to avoid to call renderRows() manually
  @ViewChild(MatTable) table: MatTable<DataTable>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.loadSelectedJourney();
    this.selectedJourney.subscribe((journey) => {
      const existingImages = journey?.images?.map((name, index) => ({
        index,
        name,
      }));
      this.dataSource = new BehaviorSubject(existingImages!);
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
        images: new FormControl(journey?.images ?? null),
        autonomy: new FormControl(journey?.autonomy ?? null),
        recreation: new FormControl(journey?.recreation ?? null),
        hosting: new FormControl(journey?.hosting ?? null),
        transport: new FormControl(journey?.transport ?? null),
        groupeSize: new FormControl(journey?.groupSize ?? null),
      });
    });
  }
  loadSelectedJourney() {
    return this.store.dispatch(
      JOURNEY_ACTIONS.loadSelectedJourney({ id: this.id })
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
    files.forEach((file) => {
      // Update the FormControl
      this.editForm.patchValue({
        images: [...this.editForm.get('images')?.value, file.name],
      });
      // Uptade Table
      this.dataSource.next([
        ...this.dataSource.value,
        {
          index: this.dataSource.value.length,
          name: file.name,
        },
      ]);
      // Set Multipart File
      this.formData.append('files', file);
    });
  }

  handleChangeDataTable(dataTable: DataTable) {
    const toUpdate = this.dataSource.value.reduce((acc, curr) => {
      curr.index === dataTable.index
        ? this.deletedFromDataSource.push(curr.name)
        : acc.push(curr);
      return acc;
    }, [] as DataTable[]);

    this.formData.append(
      'filesToDelete',
      JSON.stringify(this.deletedFromDataSource)
    );
    this.dataSource.next(toUpdate);
    // Update the FormControl, because it used to upsert images in the DB
    this.editForm.patchValue({
      images: toUpdate.map(({ name }) => name),
    });
  }

  onSubmit() {
    this.store.dispatch(
      JOURNEY_ACTIONS.upsertJourney({ journey: this.editForm.value })
    );

    if (this.formData.has('files')) {
      this.store.dispatch(
        JOURNEY_ACTIONS.uploadImages({ images: this.formData })
      );
      this.formData.delete('files');
    }
    if (this.deletedFromDataSource.length) {
      this.store.dispatch(
        JOURNEY_ACTIONS.deleteImages({ images: this.deletedFromDataSource })
      );
    }
  }
}
