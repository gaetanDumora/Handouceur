import { Component, OnInit } from '@angular/core';
import { Journey } from 'src/app/models/journeys';
import { JourneyService } from '../journey/journey.service';
import { Observable, map, of } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  journeys: Observable<Partial<Journey>[]>;

  constructor(private journeyService: JourneyService) {}

  ngOnInit(): void {
    // this.journeyService
    //   .postJourney({
    //     id: 12,
    //     title: "l'île de Ré",
    //     subtitle: 'Un temps pour soi',
    //     imageUrl: '../../../assets/photo.jpg',
    //     coordinates: [46.1911, -1.3945],
    //     location: 'France',
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     price: 1500,
    //     description:
    //       '12 kilomètres de sable doré et un Pavilllon bleu pour la qualité de l’eau ! Les plages de Sète se déploient le long du lido et vous appelle à la baignade ! Plongez dans la vie maritime de Sète et vivez l’intensité de cette ville. Sète est la destination qu’il vous faut pour un doux voyage des sens !',
    //     groupSize: [3, 3],
    //     recreation: 'good leisure',
    //     hosting: 'in tent',
    //     transport: 'awesome truck',
    //     autonomy: AutonomyStatus.GOOD,
    //   })
    //   .subscribe();

    this.listJourneys();
  }

  listJourneys() {
    this.journeyService
      .getAllJourney()
      .pipe(
        map((res) => {
          this.journeys = of(res);
        })
      )
      .subscribe();
  }
}
