call cd C:\Program Files\MongoDB\Server\4.2\bin

call mongoimport --db haircutdb --collection reservations --file %~dp0\reservations_data.json --jsonArray

call mongoimport --db haircutdb --collection users --file %~dp0\users_data.json --jsonArray

