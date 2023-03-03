import { Component } from '@angular/core';
import { Journey } from 'src/app/models/journeys';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  journeys: Partial<Journey>[] = [
    {
      id: 1,
      title: "l'île de Ré",
      subtitle: 'Un temps pour soi',
      imageURL: '../../../assets/photo.jpg',
      coordinates: [46.1911, -1.3945],
      startDate: '01.01.2023',
      endDate: '01.01.2023',
      price: 1500,
      descriptionText:
        ' 12 kilomètres de sable doré et un Pavilllon bleu pour la qualité de l’eau ! Les plages de Sète se déploient le long du lido et vous appelle à la baignade ! Plongez dans la vie maritime de Sète et vivez l’intensité de cette ville. Sète est la destination qu’il vous faut pour un doux voyage des sens !',
    },
    {
      id: 2,
      title: 'Ténérife',
      subtitle: 'Les Canaries',
      imageURL: '../../../assets/photo.jpg',
      coordinates: [26.1911, -5.3945],
      startDate: '01.01.2023',
      endDate: '01.01.2023',
      price: 1500,
      descriptionText:
        "La Quatrième plus grande île de France ! Cette île déploie une large palette de paysages, entre ses plages de sable, ses marais salants, ses vignes et ses fôrets. Vous pourrez profiter d'une vue exceptionnelle sur l'île et l'océan à partir du Phare des Baleines qui rayonne à la pointe. Cette île regorge de bonnes adresses avec ses villages typiques de pêcheurs, de marchés, et de petites boutiques propices aux escapades de charmes.",
    },
    {
      id: 3,
      title: "l'île de Ré",
      subtitle: 'Un temps pour soi',
      imageURL: '../../../assets/photo.jpg',
      coordinates: [6.1911, 5.3945],
      startDate: '01.01.2023',
      endDate: '01.01.2023',
      price: 1500,
      descriptionText:
        ' 12 kilomètres de sable doré et un Pavilllon bleu pour la qualité de l’eau ! Les plages de Sète se déploient le long du lido et vous appelle à la baignade ! Plongez dans la vie maritime de Sète et vivez l’intensité de cette ville. Sète est la destination qu’il vous faut pour un doux voyage des sens !',
    },
    {
      id: 4,
      title: "l'île de Ré",
      subtitle: 'Un temps pour soi',
      imageURL: '../../../assets/photo.jpg',
      coordinates: [6.1911, 5.3945],
      startDate: '01.01.2023',
      endDate: '01.01.2023',
      price: 1500,
      descriptionText:
        ' 12 kilomètres de sable doré et un Pavilllon bleu pour la qualité de l’eau ! Les plages de Sète se déploient le long du lido et vous appelle à la baignade ! Plongez dans la vie maritime de Sète et vivez l’intensité de cette ville. Sète est la destination qu’il vous faut pour un doux voyage des sens !',
    },
  ];
  constructor() {}
}
