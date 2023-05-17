#!/bin/bash

# MongoDB connection details
HOST="localhost"
PORT=27017
USERNAME=$MONGO_INITDB_ROOT_USERNAME
PASSWORD=$MONGO_INITDB_ROOT_PASSWORD
DATABASE=$MONGO_INITDB_DATABASE

# Import BSON and metadata files
FILES="/docker-entrypoint-initdb.d/*.bson"
for f in $FILES
do
    echo "Processing $f file..."
    basename=${f%.*}  # Remove file extension
    metadata_file="$basename.metadata.json"

    if [ -f "$metadata_file" ]; then
        echo "Processing $metadata_file metadata file..."
        mongorestore --host $HOST --port $PORT --username $USERNAME --password $PASSWORD --authenticationDatabase admin --nsInclude="${DATABASE}.*" --drop --archive=$f --preserveUUID
    else
        mongorestore --host $HOST --port $PORT --username $USERNAME --password $PASSWORD --authenticationDatabase admin --nsInclude="${DATABASE}.*" --drop --archive=$f
    fi
done