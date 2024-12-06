package com.annulation_reservation_voyage.annulation_reservation_voyage.configurations;



/*
 * @Configuration
 * public class CassandraConfig extends AbstractCassandraConfiguration {
 * 
 * @Value("${spring.cassandra.keyspace-name}")
 * private String keyspaceName;
 * 
 * @Value("${spring.cassandra.contact-points}")
 * private String contactPoints;
 * 
 * @Value("${spring.cassandra.local-datacenter}")
 * private String localDatacenter;
 * 
 * @Override
 * public SchemaAction getSchemaAction() {
 * return SchemaAction.CREATE_IF_NOT_EXISTS;
 * }
 * 
 * @Override
 * protected String getKeyspaceName() {
 * return keyspaceName;
 * }
 * 
 * @PostConstruct
 * public void createKeyspace() {
 * try (CqlSession session = CqlSession.builder()
 * .addContactPoint(new InetSocketAddress(contactPoints, 9042))
 * .withLocalDatacenter(localDatacenter)
 * .build()) {
 * 
 * String createKeyspaceQuery = String.format(
 * "CREATE KEYSPACE IF NOT EXISTS %s WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};"
 * ,
 * keyspaceName);
 * 
 * session.execute(createKeyspaceQuery); // Exécution de la requête de création
 * du keyspace
 * 
 * System.out.println("Keyspace " + keyspaceName + " créé avec succès !");
 * } catch (Exception e) {
 * e.printStackTrace();
 * System.err.println("Erreur lors de la création du keyspace.");
 * }
 * }
 * }
 */