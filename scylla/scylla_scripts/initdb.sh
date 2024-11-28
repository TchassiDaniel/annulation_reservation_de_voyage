#!/bin/bash
echo "######### Starting to execute SH script... #########"
python3 /docker-entrypoint.py &
# If you have credentials for your DB uncomment the following two lines
#USER_NAME='user_name'
#PASSWORD='user_password'

echo "######### Sleeping for 25 seconds #########"
sleep 25

# If you have credentials for your DB use: while ! cqlsh database-service -u "${USER_NAME}" -p "${PASSWORD}" -e 'describe cluster' ; do
while ! cqlsh database-service -e 'describe cluster' ; do
     echo "######### Waiting for main instance to be ready... #########"
     sleep 5
done

for cql_file in ./scylla_scripts/*.cql;
do
# If you have credentials on your db use this line cqlsh database-service -u "${USER_NAME}" -p "${PASSWORD}" -f "${cql_file}" ;
  cqlsh database-service -f "${cql_file}" ;
  echo "######### Script ""${cql_file}"" executed!!! #########"
done
echo "######### Execution of SH script is finished! #########"
echo "######### Stopping temporary instance! #########"
