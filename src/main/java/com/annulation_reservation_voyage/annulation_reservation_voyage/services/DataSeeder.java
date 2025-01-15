package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.RoleType;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.ClassVoyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Coordonnee;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.LigneVoyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.User;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Vehicule;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Voyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.ClassVoyageRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.LigneVoyageRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.UserRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.VehiculeRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.VoyageRepository;
import com.github.javafaker.Faker;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class DataSeeder implements CommandLineRunner {
  private final VehiculeRepository vehiculeRepository;
  private final UserRepository userRepository;
  private final VoyageRepository voyageRepository;
  private final LigneVoyageRepository ligneVoyageRepository;
  private final ClassVoyageRepository classVoyageRepository;
  private final Faker faker = new Faker(new Locale("fr"));

  // Liste des villes camerounaises
  private final List<String> villesCameroun = Arrays.asList(
      "Yaoundé", "Douala", "Maroua", "Bertoua", "Baffoussam",
      "MBouda", "Bangangté", "Ngaoudéré");
  // Points de départ communs au Cameroun
  private final List<String> pointsDepart = Arrays.asList(
      "Gare routière principale", "Station Total", "Carrefour MEEC",
      "Rond-point Express", "Entrée de la ville", "Carrefour Bancaire",
      "Station Mobile", "Marché central", "Carrefour Sise",
      "Monument de la Réunification", "Place des fêtes");
  // Liste des agences de voyage
  private final List<String> agencesVoyage = Arrays.asList(
      "Charter Express", "Touristique", "General", "Vatican Express");

  // Configuration des véhicules
  private final List<Integer> nbrePlaces = Arrays.asList(75, 70, 80, 56);

  // Images de bus (URLs d'exemple - à remplacer par vos vraies URLs)
  private final List<String> busImages = Arrays.asList(
      "https://st.depositphotos.com/1019192/4338/i/950/depositphotos_43389909-stock-photo-tourist-bus-traveling-on-road.jpg",
      "https://c.wallhere.com/photos/d8/b5/travel_sunset_sea_italy_public_night_landscape_dawn-751857.jpg!d",
      "https://bougna.net/wp-content/uploads/2018/08/Bus-de-transport-de-Finex-Voyages-Mini-696x461.jpg",
      "https://media.istockphoto.com/id/2171315771/photo/car-for-traveling-with-a-mountain-road.jpg?s=1024x1024&w=is&k=20&c=TUgprCSRnVZD7eTGTilieHJq6fu1zK7cDiqOUY7jk5I=",
      "https://media.istockphoto.com/id/2171315718/photo/car-for-traveling-with-a-mountain-road.jpg?s=1024x1024&w=is&k=20&c=y5XqIYLzxfb4kDTZpQgElyeiIGL34YzJrvHxbgp4Ud0=",
      "https://media.istockphoto.com/id/1161674685/photo/two-white-buses-traveling-on-the-asphalt-road-in-rural-landscape-at-sunset-with-dramatic.jpg?s=1024x1024&w=is&k=20&c=MfOEF5o2as5hiKtaVJUO94Xqn3JoU9rY-MgGjLe3pz0=",
      "https://media.istockphoto.com/id/157526603/photo/white-bus-crossing-the-alpes.jpg?s=1024x1024&w=is&k=20&c=AOCRwt95N_M2HgHzSAXkdYCqjca4-p2H3XYrGFgYkDU=",
      "https://media.istockphoto.com/id/1095141322/photo/bus-traveling-on-the-asphalt-road-in-rural-landscape-at-sunset.jpg?s=1024x1024&w=is&k=20&c=C0Cn3oPbEfhe9cf-FDyw7VaLqavkcbdCEsPJ7Q3alPI=");

  @Override
  public void run(String... args) {
    // Création des agences de voyage
    List<User> agences = createAgences();

    // Création des véhicules pour chaque agence
    List<Vehicule> vehicules = createVehicules(agences);

    // Création des voyages
    List<Voyage> voyages = createVoyages();

    // Création des classes de voyage
    List<ClassVoyage> classesVoyage = createClassesVoyage(agences);

    // Création des lignes de voyage
    createLignesVoyage(voyages, vehicules, classesVoyage);
  }

  private List<User> createAgences() {
    List<User> agences = new ArrayList<>();

    for (String nomAgence : agencesVoyage) {
      User agence = new User();
      agence.setUserId(UUID.randomUUID());
      agence.setNom(nomAgence);
      agence.setEmail(nomAgence.toLowerCase().replace(" ", "") + "@voyage.cm");
      agence.setPassword("azerty");
      agence.setRole(RoleType.AGENCE_VOYAGE);
      agence.setTelNumber("+237" + faker.numerify("########"));

      // Création des coordonnées GPS pour l'agence
      Coordonnee coord = new Coordonnee();
      coord.setIdCoordonnee(UUID.randomUUID());
      coord.setLatitude(faker.address().latitude());
      coord.setLongitude(faker.address().longitude());
      coord.setAltitude(String.valueOf(faker.number().numberBetween(0, 1000)));

      agence.setIdcoordonneeGPS(coord.getIdCoordonnee());
      agences.add(userRepository.save(agence));
    }

    return agences;
  }

  private List<Vehicule> createVehicules(List<User> agences) {
    List<Vehicule> vehicules = new ArrayList<>();

    for (User agence : agences) {
      for (int i = 0; i < 5; i++) {
        Vehicule vehicule = new Vehicule();
        vehicule.setIdVehicule(UUID.randomUUID());
        vehicule.setNom("Bus " + faker.commerce().productName());
        vehicule.setModele(faker.company().buzzword());
        vehicule.setDescription("Bus de luxe pour voyage confortable");
        vehicule.setNbrPlaces(nbrePlaces.get(faker.random().nextInt(nbrePlaces.size())));
        vehicule.setPlaqueMatricule("LT" + faker.numerify("####") + faker.letterify("??"));
        vehicule.setLienPhoto(busImages.get(faker.random().nextInt(busImages.size())));
        vehicule.setIdAgenceVoyage(agence.getUserId());

        vehicules.add(vehiculeRepository.save(vehicule));
      }
    }

    return vehicules;
  }

  private List<Voyage> createVoyages() {
    List<Voyage> voyages = new ArrayList<>();

    for (int i = 0; i < 20; i++) {
      Voyage voyage = new Voyage();
      voyage.setIdVoyage(UUID.randomUUID());

      // Sélection des villes
      String villeDepart = villesCameroun.get(faker.random().nextInt(villesCameroun.size()));
      String villeArrivee;
      do {
        villeArrivee = villesCameroun.get(faker.random().nextInt(villesCameroun.size()));
      } while (villeDepart.equals(villeArrivee));

      // Configuration du voyage
      voyage.setTitre(villeDepart + " - " + villeArrivee);
      voyage.setDescription("Voyage confortable en bus climatisé de " + villeDepart +
          " à " + villeArrivee + ". Wifi à bord. Arrêts prévus pour votre confort.");

      // Dates et heures
      LocalDateTime now = LocalDateTime.now();
      LocalDateTime depart = now.plusDays(faker.random().nextInt(1, 30))
          .withHour(faker.random().nextInt(5, 23))
          .withMinute(faker.random().nextInt(0, 59));

      voyage.setDateDepartPrev(Date.from(depart.atZone(ZoneId.systemDefault()).toInstant()));
      voyage.setDateDepartEffectif(Date.from(depart.plusMinutes(faker.random().nextInt(0, 30))
          .atZone(ZoneId.systemDefault()).toInstant()));

      // Calcul de la durée du voyage (entre 3 et 8 heures)
      int dureeEnHeures = faker.random().nextInt(3, 8);
      LocalDateTime arrivee = depart.plusHours(dureeEnHeures);

      voyage.setDateArriveEffectif(Date.from(arrivee.atZone(ZoneId.systemDefault()).toInstant()));
      voyage.setDureeVoyage(Duration.ofHours(dureeEnHeures).plusMinutes(30));

      // Heures de départ et d'arrivée
      voyage.setHeureDepartEffectif(Date.from(depart.atZone(ZoneId.systemDefault()).toInstant()));
      voyage.setHeureArrive(Date.from(arrivee.atZone(ZoneId.systemDefault()).toInstant()));

      // Lieux
      voyage.setLieuDepart(villeDepart);
      voyage.setLieuArrive(villeArrivee);
      voyage.setPointDeDepart(pointsDepart.get(faker.random().nextInt(pointsDepart.size())));
      voyage.setPointArrivee(pointsDepart.get(faker.random().nextInt(pointsDepart.size())));
      // Gestion des places
      int totalPlaces = nbrePlaces.get(faker.random().nextInt(nbrePlaces.size()));
      voyage.setNbrPlaceReservable(totalPlaces);
      voyage.setNbrPlaceReserve(0);
      voyage.setNbrPlaceConfirm(0);
      voyage.setNbrPlaceRestante(totalPlaces);

      // Dates limites
      voyage.setDatePublication(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
      voyage.setDateLimiteReservation(Date.from(depart.minusDays(1)
          .atZone(ZoneId.systemDefault()).toInstant()));
      voyage.setDateLimiteConfirmation(Date.from(depart.minusHours(2)
          .atZone(ZoneId.systemDefault()).toInstant()));

      // Status et images
      String[] statuts = { "PLANIFIÉ", "EN_ATTENTE", "CONFIRMÉ", "EN_COURS" };
      voyage.setStatusVoyage(statuts[faker.random().nextInt(statuts.length)]);

      voyage.setSmallImage(busImages.get(faker.random().nextInt(busImages.size())));
      voyage.setBigImage(busImages.get(faker.random().nextInt(busImages.size())));

      voyages.add(voyageRepository.save(voyage));
    }

    return voyages;
  }

  private List<ClassVoyage> createClassesVoyage(List<User> agences) {
    List<ClassVoyage> classesVoyage = new ArrayList<>();

    String[] typesClasse = { "VIP", "ÉCONOMIQUE" };// PREMIUM
    double[] prix = { 15000.0, 10000.0, 7000.0 };
    double[] tauxAnnulation = { 0.8, 0.6, 0.4 };

    for (User agence : agences) {
      for (int i = 0; i < typesClasse.length; i++) {
        ClassVoyage classVoyage = new ClassVoyage();
        classVoyage.setIdClassVoyage(UUID.randomUUID());
        classVoyage.setNom(typesClasse[i]);
        classVoyage.setPrix(prix[i]);
        classVoyage.setTauxAnnulation(tauxAnnulation[i]);
        classVoyage.setIdAgenceVoyage(agence.getUserId());

        classesVoyage.add(this.classVoyageRepository.save(classVoyage));
      }
    }

    return classesVoyage;
  }

  private void createLignesVoyage(List<Voyage> voyages, List<Vehicule> vehicules, List<ClassVoyage> classesVoyage) {
    for (Voyage voyage : voyages) {
      Vehicule vehicule = vehicules.get(faker.random().nextInt(vehicules.size()));
      ClassVoyage classVoyage = classesVoyage.stream()
          .filter(cv -> cv.getIdAgenceVoyage().equals(vehicule.getIdAgenceVoyage()))
          .findFirst()
          .orElse(classesVoyage.get(0));

      LigneVoyage ligneVoyage = new LigneVoyage();
      ligneVoyage.setIdLigneVoyage(UUID.randomUUID());
      ligneVoyage.setIdClassVoyage(classVoyage.getIdClassVoyage());
      ligneVoyage.setIdVehicule(vehicule.getIdVehicule());
      ligneVoyage.setIdVoyage(voyage.getIdVoyage());
      ligneVoyage.setIdAgenceVoyage(vehicule.getIdAgenceVoyage());

      ligneVoyageRepository.save(ligneVoyage);
    }
  }
}